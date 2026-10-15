import { decodeBase64Url } from "../chunk-4ZNF6U5X.js";

// Resources/Private/Source/Custom/Fetch.ts
var release = ENV.RELEASE_DATE || "v1";
function Fetch_default(Alpine) {
    Alpine.magic("base64UrlDecode", () => (value) => decodeBase64Url(value));
    Alpine.magic(
        "fetch",
        () =>
            async (
                url,
                { maxAgeInSeconds = 0, prefix = "alpine-fetch-", version = release, cache = true, hashed = false } = {},
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
    Alpine.data(
        "fetch",
        (
            url,
            {
                notification = false,
                maxItems = null,
                showErrorIfNoMarkup = false,
                insertMode = "replace",
                filter = true,
                maxAgeInSeconds = 300,
                cache = true,
                version = release,
                hashed = false,
            },
        ) => {
            url = decodeUrl(url, hashed);
            return {
                noMarkup: false,
                target: null,
                fetched: false,
                noContentFound(errorMessage) {
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
                        urls.map(async (url2) => {
                            const response = cache
                                ? await cachedFetch({
                                      url: url2,
                                      prefix: "alpine-fetch-",
                                      version,
                                      maxAgeInSeconds,
                                      forceFlush: cache === "flush",
                                  })
                                : await fetch(url2);
                            if (!response?.ok) {
                                throw new Error("Network response was not ok " + JSON.stringify(response));
                            }
                            return response.json();
                        }),
                    )
                        .then((data) => {
                            let entries = {};
                            data.forEach((group) => {
                                group.forEach((item) => {
                                    if (!filter || item.url != window.location.pathname) {
                                        entries[item.url] = item.markup;
                                    }
                                });
                            });
                            let entriesArray = Object.values(entries);
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
async function cachedFetch({ url, prefix = "alpine-", version = release, maxAgeInSeconds = 0, forceFlush = false }) {
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
async function getCachedResponse(cacheName, url, maxAgeInSeconds = 0) {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);
    if (!cachedResponse?.ok) {
        return void 0;
    }
    if (maxAgeInSeconds > 0) {
        const timestamps = await caches.open(`${cacheName}-timestamps`);
        const timestamp = await timestamps.match(url);
        const cachedAt = Number(await timestamp?.text());
        if (!Number.isFinite(cachedAt) || cachedAt <= 0 || Date.now() > cachedAt + 1e3 * maxAgeInSeconds) {
            return false;
        }
    }
    return cachedResponse;
}
async function deleteOldCaches(currentCache, prefix, forceFlush = false) {
    const keys = await caches.keys();
    for (const key of keys) {
        if (!key.startsWith(prefix.toString())) {
            continue;
        }
        if (forceFlush || (currentCache !== key && `${currentCache}-timestamps` !== key)) {
            await caches.delete(key);
        }
    }
}
function decodeUrl(url, hashed = false) {
    if (!hashed) {
        return url;
    }
    return decodeBase64Url(url);
}
export { cachedFetch, Fetch_default as default };
