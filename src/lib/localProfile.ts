// src/lib/localProfile.ts

export type LocalProfile = {
  step: number;
  // básicos
  name: string;
  email: string;
  university: string;
  city: string;
  age: number | "";
  // cuestionarios
  fg: (number | null)[];                    // 20
  big5: { O: number | null; C: number | null; E: number | null; A: number | null; N: number | null };
  dark: { M: number | null; N: number | null; P: number | null };
  mbti: { EI: number | null; SN: number | null; TF: number | null; JP: number | null };
  zodiac: string;
};

const KEY = "rentle_profile_v1";

export function defaultProfile(): LocalProfile {
  return {
    step: 0,
    name: "",
    email: "",
    university: "",
    city: "",
    age: "",
    fg: Array(20).fill(null),
    big5: { O: null, C: null, E: null, A: null, N: null },
    dark: { M: null, N: null, P: null },
    mbti: { EI: null, SN: null, TF: null, JP: null },
    zodiac: "",
  };
}

export function loadLocalProfile(): LocalProfile {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProfile();
    const parsed = JSON.parse(raw);
    // soft-merge por si añadimos campos nuevos
    return { ...defaultProfile(), ...parsed };
  } catch {
    return defaultProfile();
  }
}

export function saveLocalProfile(p: LocalProfile) {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function clearLocalProfile() {
  localStorage.removeItem(KEY);
}

/** Útil para Results/n8n más adelante */
export function buildSubmitPayload(p: LocalProfile) {
  return {
    name: p.name,
    email: p.email,
    university: p.university,
    profile: {
      fg: p.fg.map((v) => (v == null ? 0 : Number(v))),
      big5: p.big5,
      dark: p.dark,
      mbti: p.mbti,
      zodiac: p.zodiac,
      city: p.city,
      age: typeof p.age === "number" ? p.age : 0,
    },
  };
}
