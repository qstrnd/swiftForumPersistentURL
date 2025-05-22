import { replaceHrefWithThreadUrlWithoutPostNumber } from "./utils";
import debugLog from "./debugLog";

let observer: MutationObserver | null;

export default {
    /*
    * This approach uses a MutationObserver to watch for changes in the DOM.
    * I have to click on the page to trigger the event to be fired.
    */
    run: () => {
        if (observer) {
            observer.disconnect();
            debugLog('Previous mutation observer disconnected');
        }

        debugLog('Mutation observer started');

        observer = new MutationObserver(() => {
            debugLog('Mutation observer fired');
            replaceHrefWithThreadUrlWithoutPostNumber();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
}

