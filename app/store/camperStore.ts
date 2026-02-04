import { create } from 'zustand';
import axios from 'axios';
import { Camper, Filters } from '../types/camper';
import api from '../services/api';

import { perPage } from '../constants/const'



interface CamperStore {
  campers: Camper[];
  currentCamper: Camper | null;
  filters: Filters;
  page: number;
  isLoading: boolean;
  error: string | null;
  isMoreAvailable: boolean;

  getCampers: (isNewSearch?: boolean) => Promise<void>;
  getCamperById: (id: string) => Promise<void>;
  clearCurrentCamper: () => void;
  setFilters: (newFilters: Partial<Filters>) => void;
  resetFilters: () => void;
  resetItems: () => void;
}

const initialFilters: Filters = {
  location: '',
  form: null,
  transmission: null,
  AC: false,
  kitchen: false,
  TV: false,
  bathroom: false,
};

const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return error instanceof Error ? error.message : 'Невідома помилка';
};

export const useCamperStore = create<CamperStore>((set, get) => ({
  campers: [],
  currentCamper: null,
  filters: initialFilters,
  page: 1,
  isLoading: false,
  error: null,
  isMoreAvailable: true,

  clearCurrentCamper: () =>
    set({
      currentCamper: null,
      error: null,
    }),

  getCamperById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get<Camper>(`/campers/${id}`);
      set({ currentCamper: data });
    } catch (error) {
      set({ error: handleAxiosError(error) });
    } finally {
      set({ isLoading: false });
    }
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      page: 1,
      campers: [],
      isMoreAvailable: true,
    })),

  resetFilters: () =>
    set({
      filters: initialFilters,
      page: 1,
      campers: [],
      isMoreAvailable: true,
    }),

  resetItems: () =>
    set({
      campers: [],
      page: 1,
      isMoreAvailable: true,
    }),

  getCampers: async (isNewSearch = false) => {
    const { filters, page, isLoading, campers } = get();
    if (isLoading && !isNewSearch) return;

    set({ isLoading: true, error: null });
    const currentPage = isNewSearch ? 1 : page;

    try {
      const params: Record<string, string | number | boolean> = {
        page: currentPage,
        limit: perPage,
      };

      if (filters.location) params.location = filters.location;
      if (filters.form) params.form = filters.form;
      if (filters.transmission) params.transmission = filters.transmission;
      if (filters.AC) params.AC = true;
      if (filters.kitchen) params.kitchen = true;
      if (filters.TV) params.TV = true;
      if (filters.bathroom) params.bathroom = true;

      const { data } = await api.get<Camper[]>('/campers', { params });

      set({
        campers: isNewSearch ? data : [...campers, ...data],
        page: currentPage + 1,
        isMoreAvailable: data.length === perPage,
      });
    } catch (error) {
      set({ error: handleAxiosError(error) });
    } finally {
      set({ isLoading: false });
    }
  },
}));
