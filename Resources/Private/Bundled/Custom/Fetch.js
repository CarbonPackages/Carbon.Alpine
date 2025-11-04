// Resources/Private/Source/Custom/Fetch.ts
function Fetch_default(Alpine) {
    Alpine.data("fetch", (url, notification, maxItems, showErrorIfNoMarkup, insertMode = "replace", filter = true) => ({
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
                urls.map((url2) =>
                    fetch(url2).then((response) => {
                        if (!response.ok || response.status >= 300) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    }),
                ),
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
    }));
}
export { Fetch_default as default };
