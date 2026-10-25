"use client";

import { useEffect, useState } from "react";

import { prefersReducedMotion } from "../motion/gsap";

// Steps through `length` items while `running`, pausing for reduced motion
export function useCycle(length: number, interval: number, running: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!running || prefersReducedMotion()) {
      return;
    }
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % length), interval);
    return () => window.clearInterval(timer);
  }, [length, interval, running]);

  return [index, setIndex] as const;
}
