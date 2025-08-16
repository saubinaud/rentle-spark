// src/lib/matchService.ts
import type { UserProfile } from "./profileService";

export type MatchResult = {
  user: UserProfile;
  compatibility: number; // porcentaje 0-100
};

/**
 * Genera matches mock entre un perfil y todos los demás.
 * Aquí solo calculamos un número random como compatibilidad.
 */
export async function generateMatchesMock(user: UserProfile, others: UserProfile[]): Promise<MatchResult[]> {
  return others
    .filter(o => o.id !== user.id)
    .map(o => ({
      user: o,
      compatibility: Math.floor(Math.random() * 41) + 60, // entre 60% y 100%
    }))
    .sort((a, b) => b.compatibility - a.compatibility) // ordenar mayor a menor
    .slice(0, 10); // top 10
}
