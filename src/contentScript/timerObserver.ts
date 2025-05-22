
import { getThreadUrlWithoutPostNumber } from "./utils";

export default {
    run: () => {
        setInterval(() => {
            const threadUrl = getThreadUrlWithoutPostNumber(location.href)
            if (location.href != threadUrl) {
                history.replaceState(null, "", threadUrl);
            }
        }, 100);
    }
}