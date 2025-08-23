import { useState, useEffect } from "react";
import type { HeroData } from "../../../../types";
import { api } from "../../../../services/api";
import styles from "./Hero.module.css";

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await api.get<HeroData>("/hero");
        setHeroData(response.data);
        setLoading(false);
      } catch {
        setError("Failed to load hero data");
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return <div className={styles.status}>Loading...</div>;
  }
  if (error) {
    return <div className={styles.status}>Error: {error}</div>;
  }
  if (!heroData) {
    return null;
  }

  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <img
          src={heroData.image}
          className={styles.image}
          alt="Hero pet image"
        />
        <div className={styles.heroInfo}>
          <h2 className={styles.heroTitle}>{heroData.title}</h2>
          <p className={styles.heroSubtitle}>{heroData.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
