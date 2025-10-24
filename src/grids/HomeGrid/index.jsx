// HomeGrid.jsx
import { motion } from "framer-motion";
import SocialLinks from "../../components/SocialLinks";
import ExperienceTimeline from "../../components/ExperienceTimeline";
import OrbitSkills from "../../components/OrbitSkills";
import ProjectList from "../../components/ProjectList";
import { useIsCompact } from "../../hooks/layout/isCompact";
import { useExperience } from "../../hooks/services/useExperience";
import { useProjects } from "../../hooks/services/useProjects";
import styles from "./HomeGrid.module.scss";

export default function HomeGrid() {
  const isCompact = useIsCompact();
  const { experience } = useExperience();
  const { projects } = useProjects();
  return (
    <motion.section
      className={`${styles.container} ${isCompact ? styles.compact : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div layout transition={{ layout:{ duration:0.35 } }} className={styles.IMG}>
        <motion.div
          layoutId="pfp"
          className={styles.pfpInGrid}
          transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
        />
        <motion.div 
          layoutId="devName"
          className={styles.greetingsWrapper}
          transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
        >
          <p
            className={styles.devName}
          >
            {`Juan Carlos Ceballos.`}
          </p>
          <p
            className={styles.devRole}
          >
            Fullstack Engineer | Freelancer
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        layoutId="devDescription" 
        transition={{ layout:{ duration:0.35 } }} 
        className={styles.Description}
      >
        <div>
          <h2 className={styles.AboutMeTitle}>
            About Me
          </h2>
          
          <p>
            Computer Engineer with over 6 years of experience developing scalable and maintainable web solutions. Specialized in frontend (React, Next.js, TypeScript) and backend (Node.js, Docker, and AWS).
          </p>
          <p>
            I have led end-to-end projects, implemented CI/CD pipelines, process automation, and high performance UX-oriented animations.
          </p>
          <p>
            I work remotely or hybrid under agile methodologies (Scrum/Sprints), collaborating in multidisciplinary design, backend, and product teams
          </p>
        </div>
      </motion.div>

      <motion.div 
        layoutId="devContact1"
        transition={{ layout:{ duration:0.35 } }}
        className={styles.Contact1}
      >
        <SocialLinks half="first" />
      </motion.div>

      <motion.div 
        layoutId="devContact2"
        transition={{ layout:{ duration:0.35 } }}
        className={styles.Contact2}
      >
        <SocialLinks half="second" />
      </motion.div>

      <motion.div 
        layoutId="devContent1"
        transition={{ layout:{ duration:0.35 } }}
        className={styles.Content1}
      >
        <ExperienceTimeline items={experience} title="Professional Experience" />
      </motion.div>
      <motion.div 
        layoutId="devContent2"
        transition={{ layout:{ duration:0.35 } }}
        className={styles.Content2}
      >
        <OrbitSkills experience={experience} title="Tech Stack" />
      </motion.div>
      <motion.div 
        layoutId="devContent3"
        transition={{ layout:{ duration:0.35 } }}
        className={styles.Content3}
      >
        <ProjectList projects={projects} title="Projects" />
      </motion.div>
    </motion.section>
  );
}
