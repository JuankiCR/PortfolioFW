import styles from "./ProjectList.module.scss";

export default function ProjectList({ projects = [], title = "Projects" }) {
  if (!projects.length) {
    return (
      <section className={styles.wrapper}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.stateEmpty}>No projects to show.</div>
      </section>
    );
  }

  return (
    <section className={styles.wrapper} aria-label={title}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.grid}>
        {projects.map((p) => (
          <article key={p._id} className={styles.card}>
            <a
              className={styles.imageWrap}
              href={p.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${p.name}`}
            >
              <img
                src={p.picture}
                alt={`Screenshot of ${p.name}`}
                loading="lazy"
              />
            </a>

            <div className={styles.body}>
              <h4 className={styles.name}>{p.name}</h4>
              {p.description && <p className={styles.desc}>{p.description}</p>}

              <div className={styles.footer}>
                <span className={styles.badge}>
                  ♥ {parseInt(p.relevance || 0)}
                </span>
                {p.link ? (
                  <a
                    className={styles.cta}
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit <span aria-hidden>↗</span>
                  </a>
                ) : (
                  <span className={styles.muted}>No public link</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}