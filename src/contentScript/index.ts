import timerObserver from "./timerObserver";
import mutationObserver from "./mutationObserver";
import scrollObserver from "./scrollObserver";

const runSelectedApproach = scrollObserver.run;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        runSelectedApproach();
    });
} else {
    runSelectedApproach();
}