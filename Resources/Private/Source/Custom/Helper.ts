export function decodeUrl(url: string, hashed: boolean = false): string {
    if (!hashed) {
        return url;
    }
    const length = url.length;
    const m = length % 4;
    url = url
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(length + (m === 0 ? 0 : 4 - m), "=");
    return window.atob(url);
}
