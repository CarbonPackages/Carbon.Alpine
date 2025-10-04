export default function (Alpine) {
    // x-data="fetch(url, notification, maxItems, showErrorIfNoMarkup, insertMode)"
    // insertMode: replace | beforeBegin | afterBegin | beforeEnd | afterEnd
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    Alpine.data(
        "fetch",
        (url: string, notfication: string, maxItems: number, showErrorIfNoMarkup: false, insertMode = "replace") => ({
            noMarkup: false,
            target: null,
            fetched: false,
            noContentFound(errorMessage) {
                this.$dispatch("fetch-no-content", { url, element: this.$el, target: this.target });

                if (errorMessage) {
                    console.error(errorMessage);
                }

                if (notfication) {
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
                    urls.map((url) =>
                        fetch(url).then((response) => {
                            if (!response.ok || response.status >= 300) {
                                throw new Error("Network response was not ok");
                            }
                            return response.json();
                        }),
                    ),
                )
                    .then((data) => {
                        let entries = {};
                        // Write entries to object with key as path (This removes duplicates)
                        data.forEach((group) => {
                            group.forEach((item) => {
                                if (item.url != window.location.pathname) {
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
                            this.noContentFound();
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
