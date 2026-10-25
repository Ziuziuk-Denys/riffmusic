"use client";

import { useEffect } from "react";

import { gsap, reducedMotionQuery, ScrollTrigger } from "./gsap";

const desktop = "(min-width: 901px)";

function revealBlocks() {
  gsap.set("[data-reveal]", { autoAlpha: 0, y: 32, filter: "blur(12px)" });
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (targets) =>
      gsap.to(targets, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out", stagger: 0.1 }),
  });
}

function revealLists() {
  gsap.utils.toArray<HTMLElement>("[data-reveal-list]").forEach((list) => {
    const items = list.querySelectorAll("[data-reveal-item]");
    gsap.from(items, {
      autoAlpha: 0,
      y: 48,
      scale: 0.96,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.09,
      scrollTrigger: { trigger: list, start: "top 82%", once: true },
    });
  });
}

function heroExit() {
  gsap
    .timeline({ scrollTrigger: { trigger: "[data-scene='hero']", start: "top top", end: "bottom top", scrub: true } })
    .to("[data-hero-copy]", { y: -90, autoAlpha: 0, filter: "blur(10px)", ease: "none" }, 0)
    .to("[data-hero-stage]", { xPercent: -10, yPercent: 8, scale: 1.08, ease: "none" }, 0);
}

function slideMedia(isDesktop: boolean) {
  gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((media) => {
    const direction = media.dataset.slide === "left" ? -1 : 1;
    gsap.fromTo(
      media,
      isDesktop
        ? { xPercent: 14 * direction, scale: 0.92, autoAlpha: 0.4 }
        : { yPercent: 12, scale: 0.94, autoAlpha: 0.4 },
      {
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: { trigger: media, start: "top bottom", end: "center 60%", scrub: 0.6 },
      },
    );
  });
}

function zoomShots() {
  gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((shot) => {
    gsap.fromTo(
      shot,
      { scale: 0.88, autoAlpha: 0, filter: "blur(10px)" },
      {
        scale: 1,
        autoAlpha: 1,
        filter: "blur(0px)",
        ease: "none",
        scrollTrigger: { trigger: shot, start: "top 95%", end: "center 65%", scrub: 0.6 },
      },
    );
  });
}

export function ScrollScenes() {
  useEffect(() => {
    const media = gsap.matchMedia();

    media.add({ isDesktop: desktop, reduce: reducedMotionQuery }, (context) => {
      const { isDesktop, reduce } = context.conditions as { isDesktop: boolean; reduce: boolean };
      if (reduce) {
        return;
      }
      revealBlocks();
      revealLists();
      slideMedia(isDesktop);
      zoomShots();
      if (isDesktop) {
        heroExit();
      }
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => media.revert();
  }, []);

  return null;
}
