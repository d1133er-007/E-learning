import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  formSubmitting: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    userData: any,
  ) => Promise<{ error: any; user: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setFormSubmitting(true);
      setError(null);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      }

      return { error };
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      return { error: err };
    } finally {
      setFormSubmitting(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setFormSubmitting(true);
      setError(null);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        setError(error.message);
        return { error, user: null };
      }

      // If signup is successful, create a profile record
      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            full_name: userData.full_name,
            avatar_url: userData.avatar_url || null,
            email: email,
          },
        ]);

        if (profileError) {
          console.error("Error creating profile:", profileError);
          setError(
            "Account created but profile setup failed. Please contact support.",
          );
          return { error: profileError, user: null };
        }
      }

      return { error, user: data.user };
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      return { error: err, user: null };
    } finally {
      setFormSubmitting(false);
    }
  };

  const signOut = async () => {
    try {
      setFormSubmitting(true);
      setError(null);
      await supabase.auth.signOut();
    } catch (err: any) {
      setError(err.message || "Failed to sign out");
    } finally {
      setFormSubmitting(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setFormSubmitting(true);
      setError(null);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
      }

      return { error };
    } catch (err: any) {
      setError(err.message || "Failed to send password reset email");
      return { error: err };
    } finally {
      setFormSubmitting(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    session,
    user,
    loading,
    error,
    formSubmitting,
    signIn,
    signUp,
    signOut,
    resetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Separate the hook from the provider to make it compatible with Fast Refresh
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
