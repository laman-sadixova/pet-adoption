import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import type { AboutData } from "../../types";
import { StorySection } from "./StorySection/StorySection";
import { MissionSection } from "./MissionSection/MissionSection";
import { ValuesSection } from "./ValuesSection/ValuesSection";
import styles from "./About.module.css";

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.get("/about");
        setAboutData(response.data);
      } catch {
        setError("Failed to load about data");
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return <div className={styles.status}>Loading...</div>;
  if (error) return <div className={styles.status}>Error: {error}</div>;
  if (!aboutData) return null;

  return (
    <div className={styles.container}>
      {aboutData.story && <StorySection story={aboutData.story} />}
      <MissionSection
        title={aboutData.title}
        description={aboutData.description}
        image={aboutData.image}
      />
      {aboutData.values && <ValuesSection values={aboutData.values} />}
      <Link to="/" className={styles.backButton}>
        Back to Animals
      </Link>
    </div>
  );
}
