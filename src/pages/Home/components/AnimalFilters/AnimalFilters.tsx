import styles from "./AnimalFilters.module.css";

interface AnimalFiltersProps {
  type: string;
  gender: string;
  ageRange: string;
  typeChange: (type: string) => void;
  genderChange: (gender: string) => void;
  ageRangeChange: (range: string) => void;
}

export default function AnimalFilters({
  type,
  gender,
  ageRange,
  typeChange,
  genderChange,
  ageRangeChange,
}: AnimalFiltersProps) {
  return (
    <div className={styles.filters}>
      <select
        className={styles.select}
        value={type}
        onChange={(e) => typeChange(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Dog">Dogs</option>
        <option value="Cat">Cats</option>
      </select>
      <select
        className={styles.select}
        value={gender}
        onChange={(e) => genderChange(e.target.value)}
      >
        <option value="All">All genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select
        className={styles.select}
        value={ageRange}
        onChange={(e) => ageRangeChange(e.target.value)}
      >
        <option value="All">All ages</option>
        <option value="young">1 - 2 years</option>
        <option value="adult">3 - 6 years</option>
        <option value="senior">7+ years</option>
      </select>
    </div>
  );
}
