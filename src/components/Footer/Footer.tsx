import styles from "./Footer.module.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
export default function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.info}>
          <p>Contact: info@petadoption.com</p>
          <p>© 2025 Pet Adoption</p>
        </div>
        <div className={styles.socials}>
          <a href="#" className={styles.icon} aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" className={styles.icon} aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" className={styles.icon} aria-label="Twitter">
            <FaSquareXTwitter />
          </a>
        </div>
      </footer>
    </div>
  );
}
