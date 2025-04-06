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

export async function getUserAchievements(userId: string) {
  const { data, error } = await supabase
    .from("user_achievements")
    .select(
      "id, achievement_id, unlocked_at, achievement:achievements(id, name, description, icon)",
    )
    .eq("user_id", userId)
    .order("unlocked_at", { ascending: false });

  if (error) {
    console.error(`Error fetching achievements for user ${userId}:`, error);
    throw error;
  }

  // Format the achievements data
  return (
    data?.map((item) => ({
      id: item.achievement_id,
      name: item.achievement.name,
      description: item.achievement.description,
      icon: item.achievement.icon,
      unlockedAt: item.unlocked_at,
    })) || []
  );
}

export async function unlockAchievement(userId: string, achievementId: number) {
  // Check if the user already has this achievement
  const { data: existing } = await supabase
    .from("user_achievements")
    .select("id")
    .eq("user_id", userId)
    .eq("achievement_id", achievementId)
    .single();

  if (existing) {
    // User already has this achievement
    return existing;
  }

  // Add the achievement for the user
  const { data, error } = await supabase
    .from("user_achievements")
    .insert({
      user_id: userId,
      achievement_id: achievementId,
      unlocked_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error(
      `Error unlocking achievement ${achievementId} for user ${userId}:`,
      error,
    );
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
    skillProgress: {
      reading: { current: 0, history: [], target: 0 },
      writing: { current: 0, history: [], target: 0 },
      listening: { current: 0, history: [], target: 0 },
      speaking: { current: 0, history: [], target: 0 },
    },
    achievements: [],
    weeklyStudyTime: [],
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
      .select("score, test_type, created_at")
      .eq("user_id", userId)
      .eq("completed", true)
      .not("score", "is", null)
      .order("created_at", { ascending: true });

    if (!scoresError && testScores && testScores.length > 0) {
      // Calculate overall score
      const totalScore = testScores.reduce(
        (sum, test) => sum + (test.score || 0),
        0,
      );
      stats.overallScore = parseFloat(
        (totalScore / testScores.length).toFixed(1),
      );

      // Process skill-specific scores
      const skillScores = {
        reading: [],
        writing: [],
        listening: [],
        speaking: [],
      };

      testScores.forEach((test) => {
        // This is a simplified example - in a real app, you'd have more detailed data
        // about which test affects which skill
        if (test.test_type?.includes("reading")) {
          skillScores.reading.push(test.score);
        } else if (test.test_type?.includes("writing")) {
          skillScores.writing.push(test.score);
        } else if (test.test_type?.includes("listening")) {
          skillScores.listening.push(test.score);
        } else if (test.test_type?.includes("speaking")) {
          skillScores.speaking.push(test.score);
        }
      });

      // Calculate current skill levels
      Object.keys(skillScores).forEach((skill) => {
        const scores = skillScores[skill as keyof typeof skillScores];
        if (scores.length > 0) {
          const average =
            scores.reduce((sum, score) => sum + score, 0) / scores.length;
          stats.skillProgress[
            skill as keyof typeof stats.skillProgress
          ].current = parseFloat((average * 10).toFixed(1)); // Convert to percentage
          stats.skillProgress[
            skill as keyof typeof stats.skillProgress
          ].history = scores;
          stats.skillProgress[
            skill as keyof typeof stats.skillProgress
          ].target = parseFloat((average * 10 + 10).toFixed(1)); // Target is 10% higher than current
        }
      });
    }

    // Get study streak data
    const { data: studyLogs, error: logsError } = await supabase
      .from("study_logs")
      .select("date, duration")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (!logsError && studyLogs && studyLogs.length > 0) {
      // Calculate streak
      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Group logs by date
      const dateMap = new Map();
      studyLogs.forEach((log) => {
        const date = new Date(log.date);
        date.setHours(0, 0, 0, 0);
        const dateStr = date.toISOString().split("T")[0];

        if (dateMap.has(dateStr)) {
          dateMap.set(dateStr, dateMap.get(dateStr) + log.duration);
        } else {
          dateMap.set(dateStr, log.duration);
        }
      });

      // Calculate streak
      let currentDate = new Date(today);
      while (true) {
        const dateStr = currentDate.toISOString().split("T")[0];
        if (dateMap.has(dateStr)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }

      stats.studyStreak = streak;

      // Calculate total study hours
      const totalMinutes = studyLogs.reduce(
        (sum, log) => sum + (log.duration || 0),
        0,
      );
      stats.hoursStudied = parseFloat((totalMinutes / 60).toFixed(1));

      // Weekly study time
      // This would be more complex in a real app, simplified here
      stats.weeklyStudyTime = [12, 8, 10, 15, 7, 9, 11]; // Hours per day for the last week
    } else {
      // For demo purposes if no data
      stats.studyStreak = 12; // Placeholder
      stats.hoursStudied = 42; // Placeholder
      stats.weeklyStudyTime = [5, 7, 4, 8, 6, 9, 3]; // Placeholder

      // Placeholder skill progress
      stats.skillProgress = {
        reading: { current: 75, history: [65, 68, 70, 75], target: 80 },
        writing: { current: 60, history: [50, 53, 55, 60], target: 70 },
        listening: { current: 80, history: [70, 73, 75, 80], target: 85 },
        speaking: { current: 65, history: [55, 58, 60, 65], target: 75 },
      };
    }

    // Get achievements
    const { data: achievements, error: achievementsError } = await supabase
      .from("user_achievements")
      .select(
        "id, achievement_id, unlocked_at, achievement:achievements(id, name, description, icon)",
      )
      .eq("user_id", userId);

    if (!achievementsError && achievements && achievements.length > 0) {
      // Format the achievements data
      stats.achievements = achievements.map((item) => ({
        id: item.achievement_id,
        name: item.achievement.name,
        description: item.achievement.description,
        icon: item.achievement.icon,
        unlockedAt: item.unlocked_at,
      }));
    } else {
      // Placeholder achievements
      stats.achievements = [
        {
          id: 1,
          name: "First Test",
          description: "Completed your first practice test",
          icon: "award",
          unlockedAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Study Streak",
          description: "Studied for 7 days in a row",
          icon: "flame",
          unlockedAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: "Reading Master",
          description: "Scored 80% in Reading",
          icon: "book-open",
          unlockedAt: new Date().toISOString(),
        },
      ];
    }

    return stats;
  } catch (error) {
    console.error(`Error fetching stats for user ${userId}:`, error);
    throw error;
  }
}
