
import { create } from 'zustand';

interface CreditState {
  freeLeft: number;
  paidLeft: number;
  consumeOne: () => void;
  resetCredits: () => void;
}

export const useCreditStore = create<CreditState>((set, get) => ({
  freeLeft: 3,
  paidLeft: 0,
  consumeOne: () => {
    const { freeLeft, paidLeft } = get();
    if (freeLeft > 0) {
      set({ freeLeft: freeLeft - 1 });
    } else if (paidLeft > 0) {
      set({ paidLeft: paidLeft - 1 });
    }
  },
  resetCredits: () => {
    set({ freeLeft: 3, paidLeft: 0 });
  },
}));
