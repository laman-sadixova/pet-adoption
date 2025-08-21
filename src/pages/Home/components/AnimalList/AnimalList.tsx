import AnimalCard from "../../../../components/AnimalCard/AnimalCard";
import type { Animal } from "../../../../types";
import styles from "./AnimalList.module.css";

interface AnimalListProps {
  animals: Animal[];
  favorites: Animal[];
  onAddFavorite: (animal: Animal) => void;
  onRemoveFavorite: (id: number) => void;
}

export default function AnimalList({
  animals,
  favorites,
  onAddFavorite,
  onRemoveFavorite,
}: AnimalListProps) {
  return (
    <ul className={styles.cards}>
      {animals.map((animal) => {
        const isFavorite = favorites.some((fav) => fav.id === animal.id);
        return (
          <AnimalCard
            key={animal.id}
            animal={animal}
            isFavorite={isFavorite}
            onAdd={onAddFavorite}
            onRemove={onRemoveFavorite}
          />
        );
      })}
    </ul>
  );
}
