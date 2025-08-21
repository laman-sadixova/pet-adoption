import type { Animal } from "../../../../types";
import styles from "./AnimalInfo.module.css";
import { Link, useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaPaw } from "react-icons/fa";

interface Props {
  animal: Animal;
}

export default function AnimalInfo({ animal }: Props) {
  const location = useLocation();
  const {
    page = "1",
    type = "All",
    gender = "All",
    age = "All",
  } = location.state || {};
  const backToHomeUrl = `/?page=${page}&type=${type}&gender=${gender}&age=${age}`;

  return (
    <div className={styles.info}>
      <div className={styles.header}>
        <h1 className={styles.name}>{animal.name}</h1>
        <div className={styles.type}>{animal.type}</div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <FaUser className={styles.icon} />
          <span className={styles.label}>Gender:</span>
          <span className={styles.value}>{animal.gender}</span>
        </div>

        <div className={styles.detailItem}>
          <FaCalendarAlt className={styles.icon} />
          <span className={styles.label}>Age:</span>
          <span className={styles.value}>
            {animal.age} year{animal.age !== 1 ? "s" : ""} old
          </span>
        </div>

        <div className={styles.detailItem}>
          <FaPaw className={styles.icon} />
          <span className={styles.label}>Breed:</span>
          <span className={styles.value}>{animal.breed}</span>
        </div>

        <div className={styles.detailItem}>
          <FaMapMarkerAlt className={styles.icon} />
          <span className={styles.label}>Location:</span>
          <span className={styles.value}>{animal.location}</span>
        </div>
      </div>

      <div className={styles.descriptionSection}>
        <h3 className={styles.descriptionTitle}>About {animal.name}</h3>
        <p className={styles.description}>{animal.description}</p>
      </div>

      <div className={styles.buttons}>
        <Link to={backToHomeUrl} className={styles.backBtn}>
          Back to Animals
        </Link>
        <Link to="/contact">
          <button className={styles.adoptBtn}>Adopt {animal.name}</button>
        </Link>
      </div>
    </div>
  );
}
