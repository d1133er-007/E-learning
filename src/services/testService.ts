import { supabase } from "@/lib/supabase";
import type { Test, UserTest, TestSection } from "@/types/database";

export async function getAllTests() {
  const { data, error } = await supabase
    .from("tests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tests:", error);
    throw error;
  }

  return data || [];
}

export async function getTestById(testId: string) {
  const { data, error } = await supabase
    .from("tests")
    .select("*")
    .eq("id", testId)
    .single();

  if (error) {
    console.error(`Error fetching test with ID ${testId}:`, error);
    throw error;
  }

  return data;
}

export async function getTestSections(testId: string) {
  const { data, error } = await supabase
    .from("test_sections")
    .select("*")
    .eq("test_id", testId)
    .order("order", { ascending: true });

  if (error) {
    console.error(`Error fetching sections for test ${testId}:`, error);
    throw error;
  }

  return data || [];
}

export async function getUserScheduledTests(userId: string) {
  const { data, error } = await supabase
    .from("user_tests")
    .select(
      `
      *,
      tests:test_id(*)
    `,
    )
    .eq("user_id", userId)
    .not("scheduled_date", "is", null);

  if (error) {
    console.error(`Error fetching scheduled tests for user ${userId}:`, error);
    throw error;
  }

  return data || [];
}

export async function scheduleTest(
  userId: string,
  testId: string,
  scheduledDate: string,
) {
  const { data, error } = await supabase
    .from("user_tests")
    .insert({
      user_id: userId,
      test_id: testId,
      scheduled_date: scheduledDate,
      completed: false,
    })
    .select()
    .single();

  if (error) {
    console.error(`Error scheduling test ${testId} for user ${userId}:`, error);
    throw error;
  }

  return data;
}

export async function completeTest(
  userId: string,
  testId: string,
  score: number,
) {
  const { data, error } = await supabase
    .from("user_tests")
    .update({
      completed: true,
      score: score,
    })
    .eq("user_id", userId)
    .eq("test_id", testId)
    .select()
    .single();

  if (error) {
    console.error(`Error completing test ${testId} for user ${userId}:`, error);
    throw error;
  }

  return data;
}

export async function getUpcomingTests(userId: string, limit = 3) {
  // First get the user's scheduled tests
  const { data: userTests, error: userTestsError } = await supabase
    .from("user_tests")
    .select(
      `
      *,
      tests:test_id(*)
    `,
    )
    .eq("user_id", userId)
    .eq("completed", false)
    .not("scheduled_date", "is", null)
    .order("scheduled_date", { ascending: true })
    .limit(limit);

  if (userTestsError) {
    console.error(
      `Error fetching upcoming tests for user ${userId}:`,
      userTestsError,
    );
    throw userTestsError;
  }

  // If we don't have enough scheduled tests, get some recommended tests
  if (!userTests || userTests.length < limit) {
    const remainingLimit = limit - (userTests?.length || 0);

    // Get tests the user hasn't taken yet
    const { data: recommendedTests, error: recommendedError } = await supabase
      .from("tests")
      .select("*")
      .not(
        "id",
        "in",
        (userTests || []).map((ut) => ut.test_id),
      )
      .limit(remainingLimit);

    if (recommendedError) {
      console.error("Error fetching recommended tests:", recommendedError);
      throw recommendedError;
    }

    return [
      ...(userTests || []).map((ut) => ut.tests),
      ...(recommendedTests || []),
    ];
  }

  return userTests.map((ut) => ut.tests);
}
