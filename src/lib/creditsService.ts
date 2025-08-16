// src/lib/creditsService.ts

export type Credits = {
  freeLeft: number;   // arranca en 3
  paidLeft: number;   // arranca en 0
};

let mockCredits: Credits = { freeLeft: 3, paidLeft: 0 };

export async function getCreditsMock(): Promise<Credits> {
  return { ...mockCredits };
}

export async function consumeFreeCreditMock(): Promise<Credits> {
  if (mockCredits.freeLeft > 0) mockCredits.freeLeft -= 1;
  return { ...mockCredits };
}

export async function addPaidCreditsMock(n = 5): Promise<Credits> {
  mockCredits.paidLeft += n;
  return { ...mockCredits };
}
