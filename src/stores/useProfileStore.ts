
import { create } from 'zustand';

interface BasicProfile {
  name: string;
  email: string;
  university: string;
  city: string;
  age: number;
  photo: string;
}

interface ExtraProfile {
  hobbies: string[];
  bio: string;
}

interface ProfileState {
  basicProfile: BasicProfile;
  extraProfile: ExtraProfile;
  updateProfile: (profile: Partial<BasicProfile & ExtraProfile>) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  basicProfile: {
    name: '',
    email: '',
    university: '',
    city: '',
    age: 18,
    photo: '',
  },
  extraProfile: {
    hobbies: [],
    bio: '',
  },
  updateProfile: (profile) => {
    set((state) => ({
      basicProfile: { ...state.basicProfile, ...profile },
      extraProfile: { ...state.extraProfile, ...profile },
    }));
  },
}));
