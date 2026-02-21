"use client";

import type { PlanType } from "@/types";

// Phase 1 stub — returns a mock user for local dev
// Phase 2 will use Supabase auth

export interface UserState {
  isLoggedIn: boolean;
  email: string | null;
  plan: PlanType;
  generationsUsed: number;
  generationsLimit: number;
  bonusGenerations: number;
}

const MOCK_USER: UserState = {
  isLoggedIn: true,
  email: "demo@copypunch.fr",
  plan: "gratuit",
  generationsUsed: 0,
  generationsLimit: 5,
  bonusGenerations: 0,
};

export function useUser(): UserState {
  // Phase 2: replace with real Supabase auth
  return MOCK_USER;
}
