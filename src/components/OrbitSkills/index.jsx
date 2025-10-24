// OrbitSkills.jsx
import React, { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./OrbitSkills.module.scss";
import { deriveSkillsFromExperience } from "../../utils/StractData/deriveSkills";

export default function OrbitSkills({ experience, title = "Tech Stack" }) {
  const skills = useMemo(() => deriveSkillsFromExperience(experience), [experience]);

  const core = skills.slice(0, 6).map(s => s.name);
  const more = skills.slice(6, 16).map(s => s.name);

  const offsetA = 0;
  const offsetB = 20;

  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, margin: "-20% 0px -10% 0px" });

  const ringA = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const ringB = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.35 } }
  };
  const item = {
    hidden: { opacity: 0, "--s": 0.95 },                  // 👈 var CSS
    show:   { opacity: 1, "--s": 1, transition: { duration: 0.35, ease: "easeOut" } }
  };

  return (
    <section ref={rootRef} className={styles.wrapper} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.stage}>
        <div className={styles.core}><span>Core</span></div>

        <motion.div
          className={`${styles.ring} ${styles.ringA}`}
          variants={ringA}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {core.map((name, i) => (
            <motion.div
              key={name}
              className={styles.bubble}
              style={{ "--angle": `${(360 / core.length) * i + offsetA}deg` }}
              variants={item}
            >
              {name}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={`${styles.ring} ${styles.ringB}`}
          variants={ringB}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {more.map((name, i) => (
            <motion.div
              key={name}
              className={`${styles.bubble} ${styles.bubbleSm}`}
              style={{ "--angle": `${(360 / more.length) * i + offsetB}deg` }}
              variants={item}
            >
              {name}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ul className={styles.srList}>
        {skills.map(s => <li key={s.name}>{s.name}</li>)}
      </ul>
    </section>
  );
}
