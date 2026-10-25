import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return matchMedia(reducedMotionQuery).matches;
}
