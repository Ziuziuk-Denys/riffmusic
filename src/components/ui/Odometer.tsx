"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "../motion/gsap";
import styles from "./Odometer.module.css";

type OdometerProps = {
  value: number;
  label: string;
  active: boolean;
  duration?: number;
  delay?: number;
  className?: string;
};

type Part = { separator: string; target: number };

// Lower digits spin extra turns so the number feels like it rolls up
function splitDigits(text: string): Part[] {
  let remaining = text.replace(/\D/g, "").length;
  return [...text].map((char) => {
    if (!/\d/.test(char)) {
      return { separator: char, target: 0 };
    }
    remaining--;
    const turns = remaining < 2 ? 2 : remaining < 4 ? 1 : 0;
    return { separator: "", target: 10 * turns + Number(char) };
  });
}

export function Odometer({ value, label, active, duration = 2400, delay = 0, className }: OdometerProps) {
  const strips = useRef<HTMLSpanElement[]>([]);
  const text = value.toLocaleString("en-US");
  const parts = splitDigits(text);
  const targets = parts.filter((part) => !part.separator).map((part) => part.target);
  const targetKey = targets.join(",");

  useEffect(() => {
    const reduced = prefersReducedMotion();
    if (!active && !reduced) {
      return;
    }
    const ends = targetKey.split(",").map(Number);
    const paint = (progress: number) => {
      const eased = 1 - Math.pow(1 - progress, 4);
      strips.current.forEach((strip, index) => {
        strip.style.transform = `translateY(${-eased * ends[index] * 1.3}em)`;
      });
    };

    if (reduced) {
      paint(1);
      return;
    }

    let frame = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        paint(progress);
        if (progress < 1) {
          frame = requestAnimationFrame(step);
        }
      };
      frame = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [active, targetKey, duration, delay]);

  let digit = -1;
  return (
    <span className={[styles.odometer, className].filter(Boolean).join(" ")} role="img" aria-label={`${text} ${label}`}>
      {parts.map((part, index) => {
        if (part.separator) {
          return (
            <span key={index} className={styles.separator} aria-hidden="true">
              {part.separator}
            </span>
          );
        }
        digit++;
        const slot = digit;
        return (
          <span key={index} className={styles.column} aria-hidden="true">
            <span
              className={styles.strip}
              ref={(element) => {
                if (element) {
                  strips.current[slot] = element;
                }
              }}
            >
              {Array.from({ length: 30 }, (_, k) => (
                <span key={k}>{k % 10}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
