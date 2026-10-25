"use client";

import { useState, type CSSProperties } from "react";

import { accentColors, themes } from "../lib/content";
import { originOf, washFrom } from "../motion/wash";
import styles from "./AccentPicker.module.css";

const customKey = "custom";

function setAccent(color: string) {
  document.documentElement.style.setProperty("--blue", color);
}

export function AccentPicker() {
  const [active, setActive] = useState(accentColors[0].name);
  const [customColor, setCustomColor] = useState(accentColors[0].value);

  const choose = (name: string, color: string, origin: Element) => {
    if (name === active && name !== customKey) {
      return;
    }
    setActive(name);
    washFrom(originOf(origin), () => setAccent(color));
  };

  return (
    <div className={styles.dots} role="group" aria-label={themes.pickerLabel}>
      {accentColors.map((accent) => (
        <button
          key={accent.name}
          type="button"
          className={[styles.dot, active === accent.name && styles.on].filter(Boolean).join(" ")}
          style={{ "--c": accent.value } as CSSProperties}
          aria-label={accent.name}
          aria-pressed={active === accent.name}
          onClick={(event) => choose(accent.name, accent.value, event.currentTarget)}
        />
      ))}
      <label
        className={[styles.dot, styles.custom, active === customKey && styles.on].filter(Boolean).join(" ")}
        style={{ "--c": customColor } as CSSProperties}
        title={themes.custom}
      >
        <input
          type="color"
          value={customColor}
          aria-label={themes.custom}
          onChange={(event) => {
            setCustomColor(event.target.value);
            setActive(customKey);
            setAccent(event.target.value);
          }}
        />
      </label>
    </div>
  );
}
