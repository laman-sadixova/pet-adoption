import styles from "./AnimalCard.module.css";
import type { Animal } from "../../types";
import { Link, useSearchParams } from "react-router-dom";
import { PiHeartStraight, PiHeartStraightFill } from "react-icons/pi";

interface AnimalCardProps {
  animal: Animal;
  onAdd?: (animal: Animal) => void;
  isFavorite?: boolean;
  isFavoritePage?: boolean;
  onRemove?: (id: number) => void;
  isDetailsPage?: boolean;
}

export default function AnimalCard({
  animal,
  onAdd,
  isFavorite,
  isFavoritePage = false,
  onRemove,
  isDetailsPage = false,
}: AnimalCardProps) {
  const [searchParams] = useSearchParams();
  const isHeartIconFilled = isFavorite || isFavoritePage;
  const isHeartIconInteractive = onAdd || onRemove;
  const handleFavoriteClick = () => {
    if (isFavoritePage && onRemove) {
      onRemove(animal.id);
    } else if (onAdd && onRemove) {
      if (isFavorite) {
        onRemove(animal.id);
      } else {
        onAdd(animal);
      }
    } else if (onAdd) {
      onAdd(animal);
    }
  };

  return (
    <li className={`${styles.card} ${isDetailsPage ? styles.detailsCard : ""}`}>
      {isDetailsPage ? (
        <div className={styles.imageContainer}>
          {isHeartIconInteractive && (
            <button
              className={styles.detailsFavoriteBtn}
              onClick={handleFavoriteClick}
            >
              {isHeartIconFilled ? (
                <PiHeartStraightFill color="red" />
              ) : (
                <PiHeartStraight />
              )}
            </button>
          )}
          <img
            src={animal.image}
            alt={animal.name}
            className={styles.detailsImage}
          />
        </div>
      ) : (
        <>
          {isHeartIconInteractive && (
            <button
              className={styles.favoriteBtn}
              onClick={handleFavoriteClick}
            >
              {isHeartIconFilled ? (
                <PiHeartStraightFill color="red" />
              ) : (
                <PiHeartStraight />
              )}
            </button>
          )}
          <img src={animal.image} alt={animal.name} className={styles.image} />
          <div>
            <h3 className={styles.title}> {animal.name}</h3>
            <p className={styles.text}>{animal.type}</p>
            <p className={styles.text}>{animal.age} years</p>
            <Link
              to={`/animals/${animal.id}`}
              state={{
                page: searchParams.get("page") || "1",
                type: searchParams.get("type") || "All",
                gender: searchParams.get("gender") || "All",
                age: searchParams.get("age") || "All",
              }}
              className={`${styles.moreBtn} ${
                animal.type === "Dog" ? styles.dogBtn : styles.catBtn
              }`}
            >
              Show more
            </Link>
          </div>
        </>
      )}
    </li>
  );
}
