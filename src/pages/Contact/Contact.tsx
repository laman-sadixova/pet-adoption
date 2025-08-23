import { FaPaw } from "react-icons/fa";
import ContactForm from "./ContactForm/ContactForm";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.span}>C</span>ontact Us
      </h1>
      <p className={styles.subtitle}>
        We'd love to hear from you! Send us a message below.
      </p>
      <ContactForm />
      <div className={styles.bottomContainer}>
        <img
          className={styles.image}
          src="/images/siameseCat.png"
          alt="siamese cat"
        />
        <div className={styles.message}>
          <FaPaw className={styles.icon} />
          <span>Join our mission to give pets a loving home!</span>
        </div>
        <img
          className={styles.image}
          src="/images/britishCat.png"
          alt="british shorthair cat"
        />
      </div>
    </div>
  );
}
