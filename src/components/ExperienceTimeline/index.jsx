import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ExperienceTimeline.module.scss";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 14 } },
};

const toLinks = (link) => {
  if (!link) return [];
  if (Array.isArray(link)) return link.filter(Boolean);
  return typeof link === "string" && link.trim() ? [link] : [];
};

const linkLabel = (url) => {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    const path = u.pathname.replace(/^\/+|\/+$/g, "");
    return path ? `${host}/${path}` : host;
  } catch {
    return url;
  }
};

export default function ExperienceTimeline({ items, title = "Experience", compact = false }) {
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, margin: "-20% 0px -10% 0px" });
  const open = (url) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <section ref={rootRef} className={styles.wrapper} aria-label={title}>
      {title && <h2 className={styles.title}>{title}</h2>}

      <motion.ol
        className={styles.timeline}
        role="list"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1;
          const links = toLinks(it.link);
          const hasOne = links.length === 1;

          return (
            <motion.li key={it.id} className={styles.item} variants={item}>
              <div className={styles.axisCell} aria-hidden>
                <span className={`${styles.dot} ${it.isCurrent ? styles.dotActive : ""}`} />
                {!isLast && <span className={styles.line} />}
              </div>

              <motion.article
                className={`${styles.card} ${hasOne ? styles.cardClickable : ""}`}
                whileHover={{ boxShadow: "0 10px 32px rgba(116,110,161,.18)" }}
                whileTap={{ scale: 0.995 }}
                onClick={() => hasOne && open(links[0])}
                onKeyDown={(e) => hasOne && e.key === "Enter" && open(links[0])}
                role={hasOne ? "link" : undefined}
                tabIndex={hasOne ? 0 : -1}
                aria-label={hasOne ? `Open ${it.company}` : undefined}
              >
                {hasOne && (
                  <a
                    className={styles.stretchedLink}
                    href={links[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                )}

                <header className={styles.header}>
                  <div className={styles.role}>{it.role}</div>
                  <div className={styles.meta}>
                    <span className={styles.company}>
                      {hasOne ? (
                        <a className={styles.companyLink} href={links[0]} target="_blank" rel="noreferrer">
                          {it.company}
                          <span className={styles.externalIcon} aria-hidden>↗</span>
                        </a>
                      ) : (
                        it.company
                      )}
                    </span>
                    <span className={styles.sep}>•</span>
                    <time className={styles.dates}>{it.start} – {it.end ?? "Now"}</time>
                    {it.location && (<><span className={styles.sep}>•</span><span>{it.location}</span></>)}
                  </div>
                </header>

                {it.summary && <p className={styles.summary}>{it.summary}</p>}

                {!compact && it.bullets?.length ? (
                  <ul className={styles.bullets}>
                    {it.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                ) : null}

                {!compact && it.stack?.length ? (
                  <div className={styles.stack}>
                    {it.stack.map((t, i) => <span key={i} className={styles.tag}>{t}</span>)}
                  </div>
                ) : null}

                {links.length > 0 && (
                  <div className={styles.actions}>
                    {hasOne ? (
                      <button
                        className={styles.visitBtn}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); open(links[0]); }}
                      >
                        Visit site <span className={styles.arrow} aria-hidden>→</span>
                      </button>
                    ) : (
                      links.map((u, i) => (
                        <button
                          key={i}
                          className={`${styles.visitBtn} ${styles.visitBtnGhost}`}
                          type="button"
                          onClick={(e) => { e.stopPropagation(); open(u); }}
                        >
                          {it.linkNames?.[i] || linkLabel(u)} <span className={styles.arrow} aria-hidden>→</span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </motion.article>
            </motion.li>
          );
        })}
      </motion.ol>
    </section>
  );
}
