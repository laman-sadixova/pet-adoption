import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Animal } from "../types";

const loadFavorites = (): Animal[] => {
  try {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites: Animal[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

interface FavoritesState {
  items: Animal[];
}
const initialState: FavoritesState = {
  items: loadFavorites(),
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Animal>) => {
      if (!state.items.find((a) => a.id === action.payload.id)) {
        state.items.push(action.payload);
        saveFavorites(state.items);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((a) => a.id !== action.payload);
      saveFavorites(state.items);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
