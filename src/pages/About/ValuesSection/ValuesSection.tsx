import { FaHeart, FaPaw, FaShieldAlt } from "react-icons/fa";
import type { Value } from "../../../types";
import styles from "./ValuesSection.module.css";

interface ValuesSectionProps {
  values: Value[];
}

export function ValuesSection({ values }: ValuesSectionProps) {
  const renderIcon = (icon: string) => {
    switch (icon) {
      case "heart":
        return <FaHeart className={styles.valueIcon} />;
      case "shield":
        return <FaShieldAlt className={styles.valueIcon} />;
      case "paw":
      default:
        return <FaPaw className={styles.valueIcon} />;
    }
  };

  return (
    <section className={styles.values}>
      <h2 className={styles.valuesTitle}>Our Values</h2>
      <div className={styles.valuesGrid}>
        {values.map((value, index) => (
          <div key={index} className={styles.valueCard}>
            {renderIcon(value.icon)}
            <h3 className={styles.valueTitle}>{value.title}</h3>
            <p className={styles.valueDescription}>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
