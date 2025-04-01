import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getUserProfile, getUserStats } from "@/services/userService";
import { getUserEnrolledCourses } from "@/services/courseService";
import { getUpcomingTests } from "@/services/testService";
import { getUpcomingClasses } from "@/services/classService";

interface UserStats {
  overallScore: number;
  studyStreak: number;
  hoursStudied: number;
  testsCompleted: number;
}

interface UserContextType {
  profile: any | null;
  stats: UserStats | null;
  enrolledCourses: any[];
  upcomingTests: any[];
  upcomingClasses: any[];
  loading: boolean;
  error: string | null;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [upcomingTests, setUpcomingTests] = useState<any[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For demo purposes, use a fixed user ID
      const userId = "00000000-0000-0000-0000-000000000000"; // user.id;

      // Fetch user profile
      const profileData = await getUserProfile(userId);
      setProfile(profileData);

      // Fetch user stats
      const statsData = await getUserStats(userId);
      setStats(statsData);

      // Fetch enrolled courses
      const coursesData = await getUserEnrolledCourses(userId);
      setEnrolledCourses(coursesData);

      // Fetch upcoming tests
      const testsData = await getUpcomingTests(userId);
      setUpcomingTests(testsData);

      // Fetch upcoming classes
      const classesData = await getUpcomingClasses(userId);
      setUpcomingClasses(classesData);
    } catch (err: any) {
      console.error("Error fetching user data:", err);
      setError(err.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const value = {
    profile,
    stats,
    enrolledCourses,
    upcomingTests,
    upcomingClasses,
    loading,
    error,
    refreshUserData: fetchUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
