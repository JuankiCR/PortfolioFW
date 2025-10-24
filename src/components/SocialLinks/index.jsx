// SocialLinks.tsx
import { motion } from "framer-motion";
import { useIsCompact } from "../../hooks/layout/isCompact";
import styles from "./SocialLinks.module.scss";

const socials = [
  { name: "GitHub", href: "https://github.com/JuankiCR", icon: "/media/social/github.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/juan-carlos-ceballos-264538224/", icon: "/media/social/linkedin.svg" },
  { name: "Mail", href: "mailto:juankicr@rbduck.com", icon: "/media/social/mail.svg" },
  { name: "GitLab", href: "https://gitlab.com/JuankiCR", icon: "/media/social/gitlab.svg" },
  { name: "HashNode", href: "https://hashnode.com/@juankicrh", icon: "/media/social/hashnode.svg" },
  { name: "Dev.to", href: "https://dev.to/juankicr", icon: "/media/social/devto.svg" },
];

export default function SocialLinks({ half }) {
  const isCompact = useIsCompact();

  const midIndex = Math.ceil(socials.length / 2);
  const displayedLinks =
    half === "first"
      ? socials.slice(0, midIndex)
      : half === "second"
      ? socials.slice(midIndex)
      : socials;

  return (
    <div className={`${styles.socials} ${isCompact ? styles.compact : ""}`}>
      {displayedLinks.map((s) => (
        <div key={s.name}>
          <motion.a
            className={styles.link}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            aria-label={s.name}
          >
            <span
              className={styles.icon}
              style={{
                WebkitMaskImage: `url(${s.icon})`,
                maskImage: `url(${s.icon})`,
              }}
            />
          </motion.a>
        </div>
      ))}
    </div>
  );
}
