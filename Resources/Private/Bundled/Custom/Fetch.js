// Resources/Private/Source/Custom/Fetch.ts
var release = ENV.RELEASE_DATE || "v1";
function Fetch_default(Alpine) {
    Alpine.magic(
        "fetch",
        () =>
            async (url, { maxAgeInSeconds = 0, prefix = "alpine-fetch-", version = release, cache = true } = {}) =>
                cache
                    ? await cachedFetch({ url, prefix, version, maxAgeInSeconds, forceFlush: cache === "flush" })
                    : await fetch(url),
    );
    Alpine.data(
        "fetch",
        (
            url,
            notification,
            maxItems,
            showErrorIfNoMarkup,
            insertMode = "replace",
            filter = true,
            maxAgeInSeconds = 300,
            cache = true,
            release2,
        ) => ({
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
                                  version: release2,
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
        }),
    );
}
async function cachedFetch({
    url = "",
    prefix = "alpine-",
    version = release,
    maxAgeInSeconds = 0,
    forceFlush = false,
} = {}) {
    if (!("caches" in window)) {
        return fetch(url);
    }
    const cacheName = `${prefix}${version}`;
    if (forceFlush) {
        await deleteOldCaches(cacheName, prefix, true);
    } else {
        const cachedResponse = await getCachedResponse(cacheName, url, maxAgeInSeconds);
        if (cachedResponse !== false && cachedResponse !== void 0) {
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
        resolve(fetchedResponse);
    });
}
async function getCachedResponse(cacheName, url, maxAgeInSeconds = 0) {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);
    if (!cachedResponse?.ok) {
        return cachedResponse;
    }
    const dateHeader = maxAgeInSeconds > 0 ? cachedResponse.headers.get("date") : null;
    if (dateHeader) {
        const date = new Date(dateHeader);
        const needRefetch = date && Date.now() > date.getTime() + 1e3 * maxAgeInSeconds;
        if (needRefetch) {
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
        if (forceFlush || currentCache !== key) {
            caches.delete(key);
        }
    }
}
export { cachedFetch, Fetch_default as default };
