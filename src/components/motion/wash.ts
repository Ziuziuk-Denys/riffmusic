import { prefersReducedMotion } from "./gsap";

type Origin = { x: number; y: number };

// Repaints the page through a circle growing from the control that changed it
export function washFrom(origin: Origin, update: () => void) {
  const root = document.documentElement;

  if (!document.startViewTransition || prefersReducedMotion()) {
    update();
    return;
  }

  const radius = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
  root.classList.add("is-washing");

  const transition = document.startViewTransition(update);
  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        { duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => undefined);
  transition.finished.finally(() => root.classList.remove("is-washing"));
}

export function originOf(element: Element): Origin {
  const rect = element.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}
