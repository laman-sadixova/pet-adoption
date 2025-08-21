import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <img src="/images/dog.png" className={styles.image} />
        <div className={styles.heroInfo}>
          <h2 className={styles.heroTitle}>
            Your new best friend is waiting for you!
          </h2>
          <p className={styles.heroSubtitle}>
            Every pawprint tells a story — one of hope, resilience, and
            unconditional love. In shelters across the world, animals wait not
            for perfection, but for a heart willing to care. You don’t just
            rescue them — they rescue you right back, in the most unexpected
            ways. Open your heart and find more than a pet — find a lifelong
            companion. Your new best friend is closer than you think.
          </p>
        </div>
      </div>
    </div>
  );
}
