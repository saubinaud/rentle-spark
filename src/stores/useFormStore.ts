
import { create } from 'zustand';

interface FormState {
  currentStep: number;
  general: string[];
  big5: string[];
  dark: string[];
  mbti: string[];
  zodiac: string;
  nextStep: () => void;
  prevStep: () => void;
  updateAnswers: (step: string, answers: string[] | string) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormState>((set, get) => ({
  currentStep: 0,
  general: [],
  big5: [],
  dark: [],
  mbti: [],
  zodiac: '',
  nextStep: () => {
    const currentStep = get().currentStep;
    if (currentStep < 4) {
      set({ currentStep: currentStep + 1 });
    }
  },
  prevStep: () => {
    const currentStep = get().currentStep;
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },
  updateAnswers: (step, answers) => {
    set((state) => ({
      ...state,
      [step]: answers,
    }));
  },
  resetForm: () => {
    set({
      currentStep: 0,
      general: [],
      big5: [],
      dark: [],
      mbti: [],
      zodiac: '',
    });
  },
}));
