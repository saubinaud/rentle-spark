// src/lib/profileService.ts

export type UserProfile = {
  id: string;
  name: string;
  university: string;
  zodiacSign?: string;
  mbti?: string;
  bigFive?: Record<string, number>;
  darkTriad?: Record<string, number>;
  photoUrl?: string;
  bio?: string;
};

let mockProfiles: UserProfile[] = [];

/**
 * Crea un perfil en modo mock
 */
export async function createProfileMock(profile: UserProfile): Promise<UserProfile> {
  mockProfiles.push(profile);
  return profile;
}

/**
 * Devuelve todos los perfiles mock
 */
export async function getProfilesMock(): Promise<UserProfile[]> {
  return mockProfiles;
}
