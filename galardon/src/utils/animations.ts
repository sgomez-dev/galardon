export const fadeIn = {
  beforeEnter(el: HTMLElement) {
    el.style.opacity = "0";
  },
  enter(el: HTMLElement, done: () => void) {
    el.style.transition = "opacity 0.3s";
    el.style.opacity = "1";
    setTimeout(done, 300);
  },
  leave(el: HTMLElement, done: () => void) {
    el.style.transition = "opacity 0.3s";
    el.style.opacity = "0";
    setTimeout(done, 300);
  },
};
