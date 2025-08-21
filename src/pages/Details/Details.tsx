import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../services/api";
import { addFavorite, removeFavorite } from "../../store/favoritesSlice";
import type { AppDispatch, RootState } from "../../store/store";
import type { Animal } from "../../types";
import styles from "./Details.module.css";
import AnimalInfo from "./components/AnimalInfo/AnimalInfo";
import AnimalCard from "../../components/AnimalCard/AnimalCard";

export default function Details() {
  const { id } = useParams();
  const numericId = Number(id);
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.some((fav) => Number(fav.id) === numericId)
  );

  useEffect(() => {
    const fetchAnimal = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get<Animal>(`/animals/${id}`);
        setAnimal(response.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchAnimal();
  }, [id]);

  const handleAdd = (animalToAdd: Animal) => {
    dispatch(addFavorite(animalToAdd));
  };

  const handleRemove = (animalId: number) => {
    dispatch(removeFavorite(animalId));
  };

  if (loading) return <div className={styles.status}>Loading...</div>;
  if (error) return <div className={styles.status}>Error: {error}</div>;
  if (!animal) return <div className={styles.status}>Animal not found</div>;

  return (
    <div className={styles.details}>
      <AnimalCard
        animal={animal}
        isDetailsPage={true}
        onAdd={handleAdd}
        onRemove={handleRemove}
        isFavorite={isFavorite}
      />
      <AnimalInfo animal={animal} />
    </div>
  );
}
