import type { Alpine as AlpineType } from "alpinejs";
import { decodeBase64Url } from "./Helper";

type ItemType = {
    url: string;
    markup: string;
};

type magicOptions = {
    maxAgeInSeconds: number;
    prefix: string | number;
    version: string | number;
    cache: boolean | "flush";
    hashed: boolean;
};

type cachedFetchOptions = {
    url: string;
    prefix?: string | number;
    version?: string | number;
    maxAgeInSeconds?: number;
    forceFlush?: boolean;
};

type InsertMode = "replace" | "beforebegin" | "afterbegin" | "beforeend" | "afterend";

// Get release date from environment variable or use default
// @ts-ignore
const release: string = ENV.RELEASE_DATE || "v1";

export default function (Alpine: AlpineType) {
    // add $base64UrlDecode
    Alpine.magic("base64UrlDecode", () => (value: string) => decodeBase64Url(value));

    // add $fetch
    Alpine.magic(
        "fetch",
        () =>
            async (
                url: string,
                {
                    maxAgeInSeconds = 0,
                    prefix = "alpine-fetch-",
                    version = release,
                    cache = true,
                    hashed = false,
                } = {} as magicOptions,
            ) =>
                cache
                    ? await cachedFetch({
                          url: decodeUrl(url, hashed),
                          prefix,
                          version,
                          maxAgeInSeconds,
                          forceFlush: cache === "flush",
                      })
                    : await fetch(decodeUrl(url, hashed)),
    );

    // x-data="fetch(url, {notification, maxItems, showErrorIfNoMarkup, insertMode, filter})"
    // insertMode: replace | beforeBegin | afterBegin | beforeEnd | afterEnd
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    Alpine.data(
        "fetch",
        (
            url: string,
            {
                notification = false as boolean,
                maxItems = null as number | null,
                showErrorIfNoMarkup = false as boolean,
                insertMode = "replace" as InsertMode,
                filter = true as boolean,
                maxAgeInSeconds = 300 as number,
                cache = true as boolean | "flush",
                version = release as string | number,
                hashed = false as boolean,
            },
        ) => {
            url = decodeUrl(url, hashed);
            return {
                noMarkup: false,
                target: null as HTMLElement | null,
                fetched: false,
                noContentFound(errorMessage: any) {
                    this.$dispatch("fetch-no-content", { url, element: this.$el, target: this.target });

                    if (errorMessage) {
                        console.error(errorMessage);
                    }

                    if (notification) {
                        this.noMarkup = true;
                        return;
                    }
                    this.$el.remove();
                },
                init() {
                    const element = this.$el;
                    const target = this.$refs.target || element;
                    this.target = target;

                    if (!url || typeof url !== "string") {
                        this.noContentFound("No URL defined in x-data='fetch'");
                        return;
                    }
                    const urls = url.split("||");
                    Promise.all(
                        urls.map(async (url) => {
                            const response: Response = cache
                                ? await cachedFetch({
                                      url,
                                      prefix: "alpine-fetch-",
                                      version,
                                      maxAgeInSeconds,
                                      forceFlush: cache === "flush",
                                  })
                                : await fetch(url);

                            if (!response?.ok) {
                                throw new Error("Network response was not ok " + JSON.stringify(response));
                            }

                            return response.json();
                        }),
                    )
                        .then((data) => {
                            let entries: { [key: string]: string } = {};
                            // Write entries to object with key as path (This removes duplicates)
                            data.forEach((group) => {
                                group.forEach((item: ItemType) => {
                                    // If filter is true, only add items that are not the current page
                                    if (!filter || item.url != window.location.pathname) {
                                        entries[item.url] = item.markup;
                                    }
                                });
                            });

                            // Convert entries object to array
                            let entriesArray = Object.values(entries);

                            // Limit entries to maxItems
                            if (maxItems) {
                                entriesArray = entriesArray.slice(0, maxItems);
                            }
                            const markup = entriesArray.join("");
                            if (!markup) {
                                if (showErrorIfNoMarkup) {
                                    throw new Error("No Markup found");
                                }
                                this.noContentFound(null);
                                return;
                            }
                            this.fetched = true;
                            this.$dispatch("fetch-has-content", { url, element, target });
                            if (insertMode === "replace") {
                                target.innerHTML = markup;
                                return;
                            }
                            target.insertAdjacentHTML(insertMode, markup);
                        })
                        .catch((error) => {
                            this.fetched = true;
                            this.noContentFound(error);
                        });
                },
            };
        },
    );
}

export async function cachedFetch({
    url,
    prefix = "alpine-",
    version = release,
    maxAgeInSeconds = 0,
    forceFlush = false,
}: cachedFetchOptions): Promise<Response> {
    if (!("caches" in window)) {
        return fetch(url);
    }
    const cacheName = `${prefix}${version}`;

    if (forceFlush) {
        await deleteOldCaches(cacheName, prefix, true);
    } else {
        const cachedResponse = await getCachedResponse(cacheName, url, maxAgeInSeconds);

        if (cachedResponse) {
            return cachedResponse;
        }
    }

    const cacheStorage = await caches.open(cacheName);
    const response = await fetch(url);
    if (!response.ok) {
        throw new TypeError(`Failed to cache ${url}: ${response.status} ${response.statusText}`);
    }
    await cacheStorage.put(url, response.clone());
    const timestamps = await caches.open(`${cacheName}-timestamps`);
    await timestamps.put(url, new Response(Date.now().toString()));
    if (!forceFlush) {
        await deleteOldCaches(cacheName, prefix);
    }

    return response;
}

// Get data from the cache.
async function getCachedResponse(
    cacheName: string,
    url: string,
    maxAgeInSeconds = 0,
): Promise<Response | false | undefined> {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (!cachedResponse?.ok) {
        return undefined;
    }

    if (maxAgeInSeconds > 0) {
        const timestamps = await caches.open(`${cacheName}-timestamps`);
        const timestamp = await timestamps.match(url);
        const cachedAt = Number(await timestamp?.text());
        if (!Number.isFinite(cachedAt) || cachedAt <= 0 || Date.now() > cachedAt + 1000 * maxAgeInSeconds) {
            return false;
        }
    }

    return cachedResponse;
}

// Delete any old caches to respect user's disk space.
async function deleteOldCaches(currentCache: string, prefix: string | number, forceFlush = false) {
    const keys = await caches.keys();

    for (const key of keys) {
        // This is not our cache, continue
        if (!key.startsWith(prefix.toString())) {
            continue;
        }

        if (forceFlush || (currentCache !== key && `${currentCache}-timestamps` !== key)) {
            await caches.delete(key);
        }
    }
}

function decodeUrl(url: string, hashed: boolean = false): string {
    if (!hashed) {
        return url;
    }
    return decodeBase64Url(url);
}
