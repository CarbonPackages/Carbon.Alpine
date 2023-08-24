const pathname = window.location.pathname;

export default function (Alpine) {
    // x-data="fetch(url, notification, maxItems, showErrorIfNoMarkup)"
    Alpine.data("fetch", (url: string, notfication: string, maxItems: number, showErrorIfNoMarkup: false) => ({
        noMarkup: false,
        target: null,
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
                            if (item.url != pathname) {
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
                    this.$dispatch("fetch-has-content", { url, element, target });
                    target.innerHTML = markup;
                })
                .catch((error) => {
                    this.noContentFound(error);
                });
        },
    }));
}
