
import { create } from 'zustand';

interface Match {
  id: string;
  name: string;
  university: string;
  photo: string;
  compatibility: number;
  teaser: string;
  age: number;
  city: string;
  mbti: string;
  zodiac: string;
}

interface MatchState {
  matches: Match[];
  loading: boolean;
  generateMatches: () => Promise<void>;
}

const mockMatches: Match[] = [
  {
    id: '1',
    name: 'Sophie Laurent',
    university: 'Sorbonne',
    photo: '/placeholder-avatar-1.jpg',
    compatibility: 94,
    teaser: 'Passionate about philosophy and modern art. Looking for deep conversations.',
    age: 22,
    city: 'Paris',
    mbti: 'INFP',
    zodiac: 'Pisces',
  },
  {
    id: '2',
    name: 'Marie Dubois',
    university: 'Sciences Po',
    photo: '/placeholder-avatar-2.jpg',
    compatibility: 89,
    teaser: 'Political science student with a love for traveling and photography.',
    age: 21,
    city: 'Paris',
    mbti: 'ENFJ',
    zodiac: 'Leo',
  },
  {
    id: '3',
    name: 'Emma Martin',
    university: 'HEC',
    photo: '/placeholder-avatar-3.jpg',
    compatibility: 85,
    teaser: 'Business student who enjoys hiking and sustainable living.',
    age: 23,
    city: 'Paris',
    mbti: 'ESTJ',
    zodiac: 'Virgo',
  },
];

export const useMatchStore = create<MatchState>((set) => ({
  matches: [],
  loading: false,
  generateMatches: async () => {
    set({ loading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    set({ matches: mockMatches, loading: false });
  },
}));
