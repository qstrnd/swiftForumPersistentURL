import debugLog from "./debugLog";

/**
 * Cleans up a Swift forum URL by removing the last path segment for the post number.
 * For example, converts:
 *   https://forums.swift.org/t/12345/4 
 * to:
 *   https://forums.swift.org/t/12345
 *
 * @param {string} originalUrl - The original URL to clean up.
 * @returns {string} The cleaned URL without the post number.
 */
export function getThreadUrlWithoutPostNumber(originalUrl: string): string {
    const url = new URL(originalUrl);
    const segments = url.pathname.split('/').filter(Boolean);
    const len = segments.length;

    if (
        len >= 2 &&
        /^\d+$/.test(segments[len - 1]) &&
        /^\d+$/.test(segments[len - 2])
    ) {
        // Remove the last numeric segment if preceded by another numeric one
        segments.pop();
        url.pathname = '/' + segments.join('/');
        return url.toString();
    }

    return url.toString();
}

/**
 * Replaces the current URL in the browser's history with a cleaned-up URL version without the post number
 */
export function replaceHrefWithThreadUrlWithoutPostNumber() {
    const threadUrl = getThreadUrlWithoutPostNumber(location.href)
    if (location.href != threadUrl) {
        debugLog(`Replacing URL: ${location.href} with ${threadUrl}`);
        history.replaceState(null, "", threadUrl);
    }
}