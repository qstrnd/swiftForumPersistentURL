import debugLog from "./debugLog";
import { replaceHrefWithThreadUrlWithoutPostNumber } from "./utils";

type ScrollDirection = 'up' | 'down';

interface ScrollObserverOptions {
  onScroll?: (info: {
    direction: ScrollDirection;
    scrollTop: number;
  }) => void;
  onScrollEnd?: (scrollTop: number) => void;
  throttleDelay?: number; // ms for scroll event throttle
  scrollEndDelay?: number; // ms debounce for scroll end event
}

class ScrollObserver {
  private lastScrollTop = 0;
  private ticking = false;
  private onScrollCallback?: ScrollObserverOptions['onScroll'];
  private onScrollEndCallback?: ScrollObserverOptions['onScrollEnd'];
  private throttleDelay: number;
  private scrollEndDelay: number;
  private scrollEndTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private boundHandleScroll: () => void;

  constructor(options: ScrollObserverOptions) {
    this.onScrollCallback = options.onScroll;
    this.onScrollEndCallback = options.onScrollEnd;
    this.throttleDelay = options.throttleDelay ?? 100;
    this.scrollEndDelay = options.scrollEndDelay ?? 200;
    this.boundHandleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.boundHandleScroll);
  }

  private handleScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const direction: ScrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';

        if (this.onScrollCallback) {
          this.onScrollCallback({ direction, scrollTop });
        }

        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        this.ticking = false;
      });

      this.ticking = true;
    }

    // Clear and reset scroll end debounce timer
    if (this.scrollEndTimeoutId) {
      clearTimeout(this.scrollEndTimeoutId);
    }
    this.scrollEndTimeoutId = setTimeout(() => {
      if (this.onScrollEndCallback) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        this.onScrollEndCallback(scrollTop);
      }
    }, this.scrollEndDelay);
  }

  public disconnect() {
    window.removeEventListener('scroll', this.boundHandleScroll);
    if (this.scrollEndTimeoutId) {
      clearTimeout(this.scrollEndTimeoutId);
      this.scrollEndTimeoutId = null;
    }
  }
}

let observer: ScrollObserver | null = null;

export default {
  /**
   * This approach uses a ScrollObserver to watch for scroll events.
   * The page stays stable during scrolling and the URL is replaced when the scroll ends after a delay,
   * because the URL of the thread page gets updated only after some time after scrolling.
   */
  run: () => {
    if (observer) {
      observer.disconnect();
      debugLog('Previous scroll observer disconnected');
    }

    debugLog('Scroll observer started');

    observer = new ScrollObserver({
      onScrollEnd: (scrollTop) => {
        debugLog(`Scroll ended at position ${scrollTop}`);
        replaceHrefWithThreadUrlWithoutPostNumber();
      },
      scrollEndDelay: 1000,
    });
  },
};