import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStoreProps {
  favorites: string[];
  toggleFavorite: (camperId: string) => void;
  isFavorite: (camperId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStoreProps>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      toggleFavorite: (camperId) => {
        const { favorites } = get();
        const isFav = favorites.includes(camperId);
        
        if (isFav) {
          set({ favorites: favorites.filter((id) => id !== camperId) });
        } else {
          set({ favorites: [...favorites, camperId] });
        }
      },

      isFavorite: (camperId) => {
        return get().favorites.includes(camperId);
      },
    }),
    {
      name: 'camper-favorites',
    }
  )
);