import timerObserver from "./timerObserver";
import mutationObserver from "./mutationObserver";
import scrollObserver from "./scrollObserver";

const selectedApproach = scrollObserver;

const runSelectedApproach = function () {
    const href = window.location.href;
    const matches = /^https:\/\/forums\.swift\.org\/t\/[^/]+\/?\d*\/?\d*$/.test(href);
    if (matches) {
        selectedApproach.run();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        runSelectedApproach();
    });
} else {
    runSelectedApproach();
}