import { supabase } from "@/lib/supabase";

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }

  return user;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(`Error fetching profile for user ${userId}:`, error);
    throw error;
  }

  return data;
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating profile for user ${userId}:`, error);
    throw error;
  }

  return data;
}

export async function getUserStats(userId: string) {
  // Get study streak, hours studied, and tests completed
  const stats = {
    overallScore: 0,
    studyStreak: 0,
    hoursStudied: 0,
    testsCompleted: 0,
  };

  try {
    // Get completed tests count
    const { count: testsCount, error: testsError } = await supabase
      .from("user_tests")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("completed", true);

    if (!testsError) {
      stats.testsCompleted = testsCount || 0;
    }

    // Get average test score
    const { data: testScores, error: scoresError } = await supabase
      .from("user_tests")
      .select("score")
      .eq("user_id", userId)
      .eq("completed", true)
      .not("score", "is", null);

    if (!scoresError && testScores && testScores.length > 0) {
      const totalScore = testScores.reduce(
        (sum, test) => sum + (test.score || 0),
        0,
      );
      stats.overallScore = parseFloat(
        (totalScore / testScores.length).toFixed(1),
      );
    }

    // For study streak and hours studied, we would need additional tables
    // This is a simplified version
    stats.studyStreak = 12; // Placeholder
    stats.hoursStudied = 42; // Placeholder

    return stats;
  } catch (error) {
    console.error(`Error fetching stats for user ${userId}:`, error);
    throw error;
  }
}
