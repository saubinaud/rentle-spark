// src/lib/profileApi.ts
import { hasN8n, fetchJson } from "./n8nClient";
import type { UserProfile } from "./profileService";
import { createProfileMock, getProfilesMock } from "./profileService";

// POST /webhook/submit  (n8n)
// GET  /webhook/profiles (opcional) — para pruebas

export async function submitProfile(payload: any): Promise<{ ok: boolean }> {
  if (!hasN8n()) {
    // fallback: guardar como mock
    await createProfileMock(payload as UserProfile);
    return { ok: true };
  }
  return await fetchJson<{ ok: boolean }>("webhook/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function listProfiles(): Promise<UserProfile[]> {
  if (!hasN8n()) {
    return await getProfilesMock();
  }
  return await fetchJson<UserProfile[]>("webhook/profiles", { method: "GET" });
}
