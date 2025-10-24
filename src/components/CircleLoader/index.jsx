// CircleLoader.jsx
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import styles from "./CircleLoader.module.scss";

const CircleLoader = forwardRef((_, ref) => {
  const [progress, setProgress] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  useImperativeHandle(ref, () => ({
    confirmLoad: handleConfirm,
  }));

  useEffect(() => {
    let value = 0;
    const duration = 2000;
    const end = 90;
    const step = 10;
    const increment = end / (duration / step);
    const interval = setInterval(() => {
      value += increment;
      if (value >= end) { value = end; clearInterval(interval); }
      setProgress(value);
    }, step);
    return () => clearInterval(interval);
  }, []);

  const handleConfirm = () => {
    if (confirmed) return;
    setConfirmed(true);
    let value = progress;
    const end = 100;
    const step = 10;
    const increment = (end - value) / (800 / step);

    const interval = setInterval(() => {
      value += increment;
      if (value >= end) { value = end; clearInterval(interval); }
      setProgress(value);
    }, step);
  };

  const offset = circumference - (progress / 100) * circumference;
  const isDone = confirmed && Math.round(progress) >= 100;

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.svgWrap}>
        <svg
          className={styles.loader}
          viewBox="0 0 100 100"
          style={{ "--dasharray": circumference, "--dashoffset": offset }}
        >
          <circle
            className={`${styles.track} ${confirmed ? styles.trackConfirmed : ""}`}
            cx="50" cy="50" r={radius}
          />
          <circle className={styles.progress} cx="50" cy="50" r={radius} />
        </svg>

        {isDone && (
          <div className={styles.centerIcon} aria-label="completed">✓</div>
        )}
      </div>
    </div>
  );
});

export default CircleLoader;
