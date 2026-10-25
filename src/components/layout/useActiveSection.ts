"use client";

import { useEffect, useState } from "react";

// A section is active while it crosses the middle band of the viewport
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        });
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
