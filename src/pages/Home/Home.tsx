import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import type { Animal } from "../../types";
import type { AppDispatch, RootState } from "../../store/store";
import { addFavorite, removeFavorite } from "../../store/favoritesSlice";
import Hero from "./components/Hero/Hero";
import AnimalList from "./components/AnimalList/AnimalList";
import Pagination from "./components/Pagination/Pagination";
import AnimalFilters from "./components/AnimalFilters/AnimalFilters";

const ANIMALS_PER_PAGE = 9;

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const type = searchParams.get("type") || "All";
  const gender = searchParams.get("gender") || "All";
  const ageRange = searchParams.get("age") || "All";

  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get("/animals");
        setAnimals(response.data);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchAnimals();
  }, []);

  const typeChange = (val: string) => {
    setSearchParams((prev) => {
      prev.set("type", val);
      prev.set("page", "1");
      return prev;
    });
  };

  const genderChange = (val: string) => {
    setSearchParams((prev) => {
      prev.set("gender", val);
      prev.set("page", "1");
      return prev;
    });
  };

  const ageRangeChange = (val: string) => {
    setSearchParams((prev) => {
      prev.set("age", val);
      prev.set("page", "1");
      return prev;
    });
  };

  const filteredAnimals = animals.filter((animal) => {
    const typeMatch = type === "All" || animal.type === type;
    const genderMatch = gender === "All" || animal.gender === gender;
    const ageMatch =
      ageRange === "All" ||
      (ageRange === "young" && animal.age >= 1 && animal.age <= 2) ||
      (ageRange === "adult" && animal.age >= 3 && animal.age <= 6) ||
      (ageRange === "senior" && animal.age >= 7);

    return typeMatch && genderMatch && ageMatch;
  });

  const totalPages = Math.ceil(filteredAnimals.length / ANIMALS_PER_PAGE);
  const startIndex = (currentPage - 1) * ANIMALS_PER_PAGE;
  const endIndex = startIndex + ANIMALS_PER_PAGE;
  const currentAnimals = filteredAnimals.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
  };

  const handleAddFavorite = (animal: Animal) => {
    dispatch(addFavorite(animal));
  };
  const handleRemoveFavorite = (animalId: number) => {
    dispatch(removeFavorite(animalId));
  };

  if (loading) return <div className={styles.status}>Loading...</div>;
  if (error) return <div className={styles.status}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <Hero />
      <h1 className={styles.title}>
        <span className={styles.span}>R</span>eady for Adoption
      </h1>
      <AnimalFilters
        type={type}
        gender={gender}
        ageRange={ageRange}
        typeChange={typeChange}
        genderChange={genderChange}
        ageRangeChange={ageRangeChange}
      />
      <div className={styles.paginationInfo}>
        Showing {startIndex + 1}-{Math.min(endIndex, filteredAnimals.length)} of{" "}
        {filteredAnimals.length} animals
      </div>
      <AnimalList
        animals={currentAnimals}
        favorites={favorites}
        onAddFavorite={handleAddFavorite}
        onRemoveFavorite={handleRemoveFavorite}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageChange={handlePageChange}
      />
    </div>
  );
}
