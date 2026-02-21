"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { UserRow } from "@/types";

interface AuthContextType {
  user: User | null;
  profile: UserRow | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isLoading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

// Singleton module-level — createClient() est déjà un singleton
function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  return createClient();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserRow | null>(null);
  const [isLoading, setIsLoading] = useState(configured);

  const fetchProfile = useCallback(async (userId: string) => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data as UserRow | null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    window.location.href = "/";
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    // Récupérer la session initiale
    (async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
      if (currentUser) await fetchProfile(currentUser.id);
      setIsLoading(false);
    })();

    // Écouter les changements d'état auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);
      if (newUser) {
        fetchProfile(newUser.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  return (
    <AuthContext.Provider
      value={{ user, profile, isLoading, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
