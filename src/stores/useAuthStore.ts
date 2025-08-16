
import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  session: string | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  login: (email: string) => {
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    set({ user: mockUser, session: 'mock-session-token' });
  },
  logout: () => {
    set({ user: null, session: null });
  },
}));
