import { useState, useEffect } from "react";
import { FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { BannerData } from "../../../../types";
import { api } from "../../../../services/api";
import styles from "./Banner.module.css";

export default function Banner() {
  const [bannerData, setBannerData] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await api.get<BannerData>("/banner");
        setBannerData(response.data);
        setLoading(false);
      } catch {
        setError("Failed to load banner data");
        setLoading(false);
      }
    };
    fetchBannerData();
  }, []);

  if (loading) {
    return <div className={styles.status}>Loading...</div>;
  }
  if (error) {
    return <div className={styles.status}>Error: {error}</div>;
  }
  if (!bannerData) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <img
        src={bannerData.image}
        className={styles.image}
        alt="Banner pet image"
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{bannerData.title}</h2>
        <p className={styles.subtitle}>{bannerData.subtitle}</p>
        <Link to="/contact" className={styles.adoptBtn}>
          <FaPaw className={styles.icon} />
          {bannerData.buttonText}
        </Link>
      </div>
    </div>
  );
}
