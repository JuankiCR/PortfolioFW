// WelcomeCard.jsx
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import CircleLoader from "../CircleLoader";
import styles from "./WelcomeCard.module.scss";

export default function WelcomeCard() {
  const loaderRef = useRef(null);
  const [status] = useState("loading"); 
  // "loading" | "slow" | "success" | "timeout" | "error"
  const [message] = useState("Loading projects…");

  return (
    <motion.section
      className={styles.cardSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        layoutId="pfp"
        className={styles.pfpWrapper}
        transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      />
      <motion.div
        layoutId="devName"
        className={styles.greetingsWrapper}
        transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      >
        {`Hello, I'm Juan Carlos Ceballos.`}
      </motion.div>

      <motion.div className={styles.loaderWrapper}>
        <CircleLoader ref={loaderRef} />
        <div className={styles.loaderMessage}>
          {message}
          {status === "error" || status === "timeout" ? (
            <button
              className={styles.retryBtn}
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          ) : null}
        </div>
      </motion.div>
    </motion.section>
  );
}
