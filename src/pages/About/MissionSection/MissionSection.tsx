import { Link } from "react-router-dom";
import styles from "./MissionSection.module.css";
import aboutStyles from "../About.module.css";

interface MissionSectionProps {
  title: string;
  description: string;
  image?: string;
}

export function MissionSection({
  title,
  description,
  image,
}: MissionSectionProps) {
  return (
    <section className={styles.mission}>
      <div className={styles.missionContent}>
        <div className={styles.missionInfo}>
          <h1 className={aboutStyles.title}>{title}</h1>
          <p className={aboutStyles.description}>{description}</p>
          <Link to="/contact" className={aboutStyles.contactButton}>
            Contact Us
          </Link>
        </div>
        {image && (
          <img src={image} alt="Our mission" className={styles.missionImage} />
        )}
      </div>
    </section>
  );
}
