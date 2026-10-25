"use client";

import { useEffect, useState } from "react";

import { download } from "../lib/content";

type Status = "idle" | "copied" | "failed";

const labels: Record<Status, string> = {
  idle: download.copy,
  copied: download.copied,
  failed: download.copyFailed,
};

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") {
      return;
    }
    const timer = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <button type="button" className={className} onClick={copy} aria-live="polite">
      {labels[status]}
    </button>
  );
}
