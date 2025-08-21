import { Link } from "react-router-dom";
import { PiHeartStraight } from "react-icons/pi";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span>
            <img src="/images/paw.svg" alt="Paw logo" />
          </span>{" "}
          Pawple
        </div>
        <nav className={styles.nav}>
          <div className={styles.links}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <Link to="/favorites" className={styles.button}>
            <PiHeartStraight /> Favorites
          </Link>
        </nav>
      </header>
    </div>
  );
}
