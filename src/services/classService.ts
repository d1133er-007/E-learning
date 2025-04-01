import { supabase } from "@/lib/supabase";
import type { Class, UserClass } from "@/types/database";

export async function getAllClasses() {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }

  return data || [];
}

export async function getClassesByCategory(category: string) {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("category", category)
    .order("date", { ascending: true });

  if (error) {
    console.error(`Error fetching classes for category ${category}:`, error);
    throw error;
  }

  return data || [];
}

export async function getClassById(classId: string) {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("id", classId)
    .single();

  if (error) {
    console.error(`Error fetching class with ID ${classId}:`, error);
    throw error;
  }

  return data;
}

export async function getUserEnrolledClasses(userId: string) {
  const { data, error } = await supabase
    .from("user_classes")
    .select(
      `
      *,
      classes:class_id(*)
    `,
    )
    .eq("user_id", userId);

  if (error) {
    console.error(`Error fetching enrolled classes for user ${userId}:`, error);
    throw error;
  }

  return data || [];
}

export async function enrollInClass(userId: string, classId: string) {
  const enrolledDate = new Date().toISOString();

  const { data, error } = await supabase
    .from("user_classes")
    .insert({
      user_id: userId,
      class_id: classId,
      enrolled_date: enrolledDate,
      attended: false,
    })
    .select()
    .single();

  if (error) {
    console.error(`Error enrolling user ${userId} in class ${classId}:`, error);
    throw error;
  }

  return data;
}

export async function markClassAttendance(
  userId: string,
  classId: string,
  attended: boolean,
) {
  const { data, error } = await supabase
    .from("user_classes")
    .update({ attended })
    .eq("user_id", userId)
    .eq("class_id", classId)
    .select()
    .single();

  if (error) {
    console.error(
      `Error updating attendance for user ${userId} in class ${classId}:`,
      error,
    );
    throw error;
  }

  return data;
}

export async function getUpcomingClasses(userId: string, limit = 3) {
  // Get current date in ISO format
  const currentDate = new Date().toISOString();

  // First get the user's enrolled classes that haven't happened yet
  const { data: userClasses, error: userClassesError } = await supabase
    .from("user_classes")
    .select(
      `
      *,
      classes:class_id(*)
    `,
    )
    .eq("user_id", userId)
    .eq("attended", false);

  if (userClassesError) {
    console.error(
      `Error fetching upcoming classes for user ${userId}:`,
      userClassesError,
    );
    throw userClassesError;
  }

  // Filter classes that are in the future and sort by date
  const upcomingUserClasses = (userClasses || [])
    .filter((uc) => uc.classes.date > currentDate)
    .sort(
      (a, b) =>
        new Date(a.classes.date).getTime() - new Date(b.classes.date).getTime(),
    )
    .slice(0, limit);

  // If we don't have enough enrolled classes, get some recommended classes
  if (upcomingUserClasses.length < limit) {
    const remainingLimit = limit - upcomingUserClasses.length;

    // Get classes the user hasn't enrolled in yet that are in the future
    const { data: recommendedClasses, error: recommendedError } = await supabase
      .from("classes")
      .select("*")
      .gt("date", currentDate)
      .not(
        "id",
        "in",
        upcomingUserClasses.map((uc) => uc.class_id),
      )
      .order("date", { ascending: true })
      .limit(remainingLimit);

    if (recommendedError) {
      console.error("Error fetching recommended classes:", recommendedError);
      throw recommendedError;
    }

    return [
      ...upcomingUserClasses.map((uc) => uc.classes),
      ...(recommendedClasses || []),
    ];
  }

  return upcomingUserClasses.map((uc) => uc.classes);
}

export async function getClassEnrollmentCount(classId: string) {
  const { count, error } = await supabase
    .from("user_classes")
    .select("*", { count: "exact", head: true })
    .eq("class_id", classId);

  if (error) {
    console.error(
      `Error getting enrollment count for class ${classId}:`,
      error,
    );
    throw error;
  }

  return count || 0;
}
