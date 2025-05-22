import timerObserver from "./timerObserver";
import mutationObserver from "./mutationObserver";

const runSelectedApproach = mutationObserver.run;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        runSelectedApproach();
    });
} else {
    runSelectedApproach();
}