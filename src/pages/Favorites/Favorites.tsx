import styles from "./Favorites.module.css";
import type { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { PiHeartStraightFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import type { Animal } from "../../types";
import AnimalCard from "../../components/AnimalCard/AnimalCard";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../../store/favoritesSlice";

export default function Favorites() {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleRemoveFavorite = (animalId: number) => {
    dispatch(removeFavorite(animalId));
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <PiHeartStraightFill color="red" /> My Favorites
      </h1>
      {favorites.length === 0 ? (
        <div className={styles.noFavorites}>
          <div className={styles.containerImg}>
            <img src="/images/catInBox.png" />
          </div>
          <p>
            You haven't added any pets to your favorites yet. Start exploring!
          </p>
          <Link to="/" className={styles.exploreBtn}>
            Find a new friend
          </Link>
        </div>
      ) : (
        <ul className={styles.cards}>
          {favorites.map((animal: Animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              isFavoritePage={true}
              onRemove={handleRemoveFavorite}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
