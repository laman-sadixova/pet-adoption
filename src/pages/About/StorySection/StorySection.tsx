import { Link } from "react-router-dom";
import type { Story } from "../../../types";
import styles from "./StorySection.module.css";
import aboutStyles from "../About.module.css";

interface StorySectionProps {
  story: Story;
}

export function StorySection({ story }: StorySectionProps) {
  return (
    <section className={styles.story}>
      <div className={styles.storyContent}>
        {story.image && (
          <img
            src={story.image}
            alt="Our story"
            className={styles.storyImage}
          />
        )}
        <div className={styles.storyInfo}>
          <h1 className={aboutStyles.title}>{story.title}</h1>
          <p className={aboutStyles.description}>{story.description}</p>
          <Link to="/contact" className={aboutStyles.contactButton}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
