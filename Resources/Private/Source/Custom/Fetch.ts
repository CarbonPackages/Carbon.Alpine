import { Alpine as AlpineType } from "alpinejs";

type ItemType = {
    url: string;
    markup: string;
};

type magicOptions = {
    maxAgeInSeconds: number;
    prefix: string | number;
    version: string | number;
    cache: boolean | "flush";
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
    // add $fetch
    Alpine.magic(
        "fetch",
        () =>
            async (
                url: string,
                { maxAgeInSeconds = 0, prefix = "alpine-fetch-", version = release, cache = true } = {} as magicOptions,
            ) =>
                cache
                    ? await cachedFetch({ url, prefix, version, maxAgeInSeconds, forceFlush: cache === "flush" })
                    : await fetch(url),
    );

    // x-data="fetch(url, notification, maxItems, showErrorIfNoMarkup, insertMode, filter)"
    // insertMode: replace | beforeBegin | afterBegin | beforeEnd | afterEnd
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    Alpine.data(
        "fetch",
        (
            url: string,
            notification: boolean,
            maxItems: number,
            showErrorIfNoMarkup: false,
            insertMode: InsertMode = "replace",
            filter = true,
            maxAgeInSeconds = 300,
            cache: boolean | "flush" = true,
            release: string,
        ) => ({
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
                                  version: release,
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
        }),
    );
}

export async function cachedFetch(
    {
        url = "",
        prefix = "alpine-",
        version = release,
        maxAgeInSeconds = 0,
        forceFlush = false,
    } = {} as cachedFetchOptions,
): Promise<Response> {
    if (!("caches" in window)) {
        return fetch(url);
    }
    const cacheName = `${prefix}${version}`;

    if (forceFlush) {
        await deleteOldCaches(cacheName, prefix, true);
    } else {
        const cachedResponse = await getCachedResponse(cacheName, url, maxAgeInSeconds);

        if (cachedResponse !== false && cachedResponse !== undefined) {
            return new Promise((resolve) => resolve(cachedResponse));
        }
    }

    const cacheStorage = await caches.open(cacheName);
    await cacheStorage.add(url);
    const fetchedResponse = await getCachedResponse(cacheName, url);
    if (!forceFlush) {
        await deleteOldCaches(cacheName, prefix);
    }

    return new Promise((resolve, reject) => {
        if (fetchedResponse === false || !fetchedResponse?.ok) {
            reject(fetchedResponse);
        }
        // @ts-ignore
        resolve(fetchedResponse);
    });
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
        return cachedResponse;
    }

    const dateHeader = maxAgeInSeconds > 0 ? cachedResponse.headers.get("date") : null;
    if (dateHeader) {
        const date = new Date(dateHeader);
        // if cached file is older maxAgeInSeconds
        const needRefetch = date && Date.now() > date.getTime() + 1000 * maxAgeInSeconds;

        if (needRefetch) {
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

        if (forceFlush || currentCache !== key) {
            caches.delete(key);
        }
    }
}
