import { Alpine as AlpineType } from "alpinejs";

type ItemType = {
    url: string;
    markup: string;
}

type InsertMode = "replace" | "beforebegin" | "afterbegin" | "beforeend" | "afterend";

export default function (Alpine: AlpineType) {
    // x-data="fetch(url, notification, maxItems, showErrorIfNoMarkup, insertMode, filter)"
    // insertMode: replace | beforeBegin | afterBegin | beforeEnd | afterEnd
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    Alpine.data(
        "fetch",
        (url: string, notfication: string, maxItems: number, showErrorIfNoMarkup: false, insertMode: InsertMode = "replace", filter = true) => ({
            noMarkup: false,
            target: null as HTMLElement | null,
            fetched: false,
            noContentFound(errorMessage: any) {
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
                        let entries: { [key: string]: string } = {};
                        // Write entries to object with key as path (This removes duplicates)
                        data.forEach((group) => {
                            group.forEach((item: ItemType) => {
                                // If filter is true, only add items that are not the current page
                                if (filter && item.url != window.location.pathname) {
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
