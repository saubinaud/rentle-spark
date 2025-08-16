import { create } from 'zustand';

interface CreditState {
  freeLeft: number;
  paidLeft: number;
  consumeOne: () => void;
  resetCredits: () => void;
  /** NUEVO: setea ambos contadores (para sincronizar con API/mock) */
  setCounts: (freeLeft: number, paidLeft: number) => void;
  /** NUEVO: suma créditos pagados (para “comprar” packs) */
  addPaid: (n: number) => void;
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

  setCounts: (freeLeft, paidLeft) => set({ freeLeft, paidLeft }),

  addPaid: (n) => {
    const { paidLeft } = get();
    set({ paidLeft: paidLeft + Math.max(0, n || 0) });
  },
}));
