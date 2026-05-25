import { create } from 'zustand';

type SortOrder = 'asc' | 'desc';

type Store = {
  selectedDate: string;
  sortOrder: SortOrder;

  setSelectedDate: (date: string) => void;
  setSortOrder: (order: SortOrder) => void;
};

export const useWorkLogsFilterStore = create<Store>((set) => ({
  selectedDate: '',
  sortOrder: 'desc',

  setSelectedDate: (date) => set({ selectedDate: date }),

  setSortOrder: (order) => set({ sortOrder: order }),
}));
