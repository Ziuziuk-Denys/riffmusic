"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { gsap, prefersReducedMotion, ScrollTrigger } from "./gsap";

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.11 });
    const tick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
