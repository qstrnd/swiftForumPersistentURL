
import { replaceHrefWithThreadUrlWithoutPostNumber } from "./utils";
import debugLog from "./debugLog";

export default {
    /**
     * Run a timer to periodically check and replace the URL.
     * Don't think that it's performance efficient.
     */
    run: () => {
        debugLog('Timer observer started');

        setInterval(() => {
            debugLog('Timer fired');
            replaceHrefWithThreadUrlWithoutPostNumber();
        }, 100);
    }
}