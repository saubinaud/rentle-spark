// src/lib/creditsApi.ts
import { hasN8n, fetchJson } from "./n8nClient";
import type { Credits } from "./creditsService";
import { getCreditsMock, consumeFreeCreditMock, addPaidCreditsMock } from "./creditsService";

// GET  /webhook/credits?email=...
// POST /webhook/consume-free  { email }
// POST /webhook/buy           { email, pack: number }

export async function getCredits(email: string): Promise<Credits> {
  if (!hasN8n()) return getCreditsMock();
  return await fetchJson<Credits>(`webhook/credits?email=${encodeURIComponent(email)}`, { method: "GET" });
}

export async function consumeFree(email: string): Promise<Credits> {
  if (!hasN8n()) return consumeFreeCreditMock();
  return await fetchJson<Credits>("webhook/consume-free", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export async function buyCredits(email: string, pack = 5): Promise<Credits> {
  if (!hasN8n()) return addPaidCreditsMock(pack);
  return await fetchJson<Credits>("webhook/buy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, pack }),
  });
}
