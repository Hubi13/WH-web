type ScrollFrameState = {
  scrollY: number;
  viewportHeight: number;
  viewportWidth: number;
};

type ScrollSubscriber = {
  id: number;
  callback: (state: ScrollFrameState) => void;
  shouldRun?: () => boolean;
};

class ScrollRuntime {
  private subscribers = new Map<number, ScrollSubscriber>();
  private nextId = 1;
  private rafId: number | null = null;
  private listening = false;

  private readonly handleEvent = () => {
    this.schedule();
  };

  private readonly flush = () => {
    this.rafId = null;
    if (this.subscribers.size === 0) return;

    const state: ScrollFrameState = {
      scrollY: window.scrollY || window.pageYOffset || 0,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
    };

    for (const subscriber of this.subscribers.values()) {
      if (subscriber.shouldRun && !subscriber.shouldRun()) continue;
      subscriber.callback(state);
    }
  };

  private schedule() {
    if (this.rafId !== null) return;
    this.rafId = window.requestAnimationFrame(this.flush);
  }

  private ensureListeners() {
    if (this.listening) return;
    window.addEventListener('scroll', this.handleEvent, { passive: true });
    window.addEventListener('resize', this.handleEvent, { passive: true });
    window.addEventListener('orientationchange', this.handleEvent, { passive: true });
    this.listening = true;
  }

  private teardownListeners() {
    if (!this.listening) return;
    window.removeEventListener('scroll', this.handleEvent);
    window.removeEventListener('resize', this.handleEvent);
    window.removeEventListener('orientationchange', this.handleEvent);
    this.listening = false;
  }

  subscribe(callback: (state: ScrollFrameState) => void, shouldRun?: () => boolean) {
    const id = this.nextId++;
    this.subscribers.set(id, { id, callback, shouldRun });
    this.ensureListeners();
    this.schedule();

    return () => {
      this.subscribers.delete(id);
      if (this.subscribers.size === 0) {
        if (this.rafId !== null) {
          window.cancelAnimationFrame(this.rafId);
          this.rafId = null;
        }
        this.teardownListeners();
      }
    };
  }

  requestFrame() {
    this.schedule();
  }
}

const runtime = typeof window !== 'undefined' ? new ScrollRuntime() : null;

export const subscribeScrollFrame = (
  callback: (state: ScrollFrameState) => void,
  shouldRun?: () => boolean
) => {
  if (!runtime) return () => {};
  return runtime.subscribe(callback, shouldRun);
};

export const requestScrollRuntimeTick = () => {
  runtime?.requestFrame();
};

export type { ScrollFrameState };
