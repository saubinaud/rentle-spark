// src/lib/summaryApi.ts
import { hasN8n, fetchJson } from "./n8nClient";
import { getCreditsMock, consumeFreeCreditMock } from "./creditsService";

type SummaryResponse = {
  text: string;
  credits_left: { freeLeft: number; paidLeft: number };
};

/**
 * Pide el mini análisis A→B y consume 1 crédito free si hay (fallback a mock si no hay n8n).
 * myEmail = email del usuario logueado (Persona A)
 * otherId = id del perfil visto (Persona B)
 */
export async function requestFreeSummary(
  myEmail: string,
  otherId: string
): Promise<SummaryResponse> {
  if (!hasN8n()) {
    // MOCK: consume 1 crédito y devuelve un texto de ejemplo
    await consumeFreeCreditMock();
    const creds = await getCreditsMock();
    const text =
      "You both value tidy spaces and clear routines. Social energy looks balanced. Communication styles are compatible — likely smooth co-living with minor adjustments.";
    return { text, credits_left: creds };
  }

  // REAL (n8n)
  return await fetchJson<SummaryResponse>("webhook/free-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ myEmail, otherId }),
  });
}
