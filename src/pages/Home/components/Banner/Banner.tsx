import { FaPaw } from "react-icons/fa";
import styles from "./Banner.module.css";
import { Link } from "react-router-dom";
export default function Banner() {
  return (
    <div className={styles.banner}>
      <img src="/images/peepingCat.png" />
      <div className={styles.content}>
        <h2 className={styles.title}>Give a Pet a Forever Home</h2>
        <p className={styles.subtitle}>
          Discover the joy of adoption. Our pets are waiting for a loving family
          like yours. Take the first step today!
        </p>
        <Link to="/contact" className={styles.adoptBtn}>
          <FaPaw className={styles.icon} />
          Adopt Now
        </Link>
      </div>
    </div>
  );
}
