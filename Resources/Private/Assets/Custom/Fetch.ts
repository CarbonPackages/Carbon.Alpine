const pathname = window.location.pathname;

window.addEventListener("alpine:init", () => {
    window.Alpine.data("fetch", (url: string, notfication: string, maxItems: number) => ({
        noMarkup: false,
        noContentFound() {
            if (notfication) {
                this.noMarkup = true;
                return;
            }
            this.$el.remove();
        },
        init() {
            const element = this.$el;
            const target = this.$refs.target || element;
            if (!url || typeof url !== "string") {
                this.noContentFound();
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
                    })
                )
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
                        throw new Error("No Markup found");
                    }
                    target.innerHTML = markup;
                })
                .catch((e) => {
                    console.error(e);
                    this.noContentFound();
                });
        },
    }));
});
