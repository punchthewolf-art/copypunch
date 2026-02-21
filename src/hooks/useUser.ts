"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { PLANS } from "@/types";
import type { PlanType } from "@/types";

export interface UserState {
  isLoggedIn: boolean;
  email: string | null;
  plan: PlanType;
  generationsUsed: number;
  generationsLimit: number;
  bonusGenerations: number;
  isLoading: boolean;
}

export function useUser(): UserState {
  const { user, profile, isLoading } = useAuth();

  if (!user || !profile) {
    return {
      isLoggedIn: false,
      email: null,
      plan: "gratuit",
      generationsUsed: 0,
      generationsLimit: 5,
      bonusGenerations: 0,
      isLoading,
    };
  }

  const planConfig = PLANS[profile.plan];

  return {
    isLoggedIn: true,
    email: profile.email,
    plan: profile.plan,
    generationsUsed: profile.generations_used_this_month,
    generationsLimit: planConfig.generationsPerMonth,
    bonusGenerations: profile.bonus_generations,
    isLoading: false,
  };
}
