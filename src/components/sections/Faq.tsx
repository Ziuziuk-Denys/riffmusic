"use client";

import { useState } from "react";

import { faq } from "../lib/content";
import typeStyles from "../styles/type.module.css";
import styles from "./Faq.module.css";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.faq} id="faq">
      <h2 className={`${typeStyles.display} ${styles.title}`} data-reveal>
        {faq.title}
      </h2>
      <div className={styles.list} data-reveal>
        {faq.items.map((item, index) => {
          const open = openIndex === index;
          const id = `faq-${index}`;
          return (
            <div key={item.question} className={[styles.item, open && styles.open].filter(Boolean).join(" ")}>
              <h3 className={styles.heading}>
                <button
                  type="button"
                  className={styles.question}
                  id={`${id}-q`}
                  aria-expanded={open}
                  aria-controls={id}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{item.question}</span>
                  <i className={styles.sign} aria-hidden="true" />
                </button>
              </h3>
              <div className={styles.answer} id={id}>
                <div>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
