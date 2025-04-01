import { supabase } from "@/lib/supabase";
import type { Course, UserCourse, CourseModule } from "@/types/database";

export async function getAllCourses() {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }

  return data || [];
}

export async function getCourseById(courseId: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (error) {
    console.error(`Error fetching course with ID ${courseId}:`, error);
    throw error;
  }

  return data;
}

export async function getCourseModules(courseId: string) {
  const { data, error } = await supabase
    .from("course_modules")
    .select("*")
    .eq("course_id", courseId)
    .order("order", { ascending: true });

  if (error) {
    console.error(`Error fetching modules for course ${courseId}:`, error);
    throw error;
  }

  return data || [];
}

export async function getUserEnrolledCourses(userId: string) {
  const { data, error } = await supabase
    .from("user_courses")
    .select(
      `
      *,
      courses:course_id(*)
    `,
    )
    .eq("user_id", userId);

  if (error) {
    console.error(`Error fetching enrolled courses for user ${userId}:`, error);
    throw error;
  }

  return data || [];
}

export async function enrollInCourse(userId: string, courseId: string) {
  const enrolledDate = new Date().toISOString();

  const { data, error } = await supabase
    .from("user_courses")
    .insert({
      user_id: userId,
      course_id: courseId,
      progress: 0,
      enrolled_date: enrolledDate,
    })
    .select()
    .single();

  if (error) {
    console.error(
      `Error enrolling user ${userId} in course ${courseId}:`,
      error,
    );
    throw error;
  }

  return data;
}

export async function updateCourseProgress(
  userId: string,
  courseId: string,
  progress: number,
) {
  const { data, error } = await supabase
    .from("user_courses")
    .update({ progress, last_accessed: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .select()
    .single();

  if (error) {
    console.error(
      `Error updating progress for user ${userId} in course ${courseId}:`,
      error,
    );
    throw error;
  }

  return data;
}

export async function updateModuleCompletion(
  userId: string,
  moduleId: number,
  completed: boolean,
) {
  // First, get the module to find its course_id
  const { data: moduleData, error: moduleError } = await supabase
    .from("course_modules")
    .select("course_id")
    .eq("id", moduleId)
    .single();

  if (moduleError) {
    console.error(`Error fetching module ${moduleId}:`, moduleError);
    throw moduleError;
  }

  // Update the module completion status
  const { data, error } = await supabase
    .from("course_modules")
    .update({ completed })
    .eq("id", moduleId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating completion for module ${moduleId}:`, error);
    throw error;
  }

  // Calculate and update the overall course progress
  if (moduleData?.course_id) {
    await recalculateCourseProgress(userId, moduleData.course_id);
  }

  return data;
}

async function recalculateCourseProgress(userId: string, courseId: string) {
  // Get all modules for the course
  const { data: modules, error: modulesError } = await supabase
    .from("course_modules")
    .select("*")
    .eq("course_id", courseId);

  if (modulesError) {
    console.error(
      `Error fetching modules for course ${courseId}:`,
      modulesError,
    );
    throw modulesError;
  }

  if (!modules || modules.length === 0) return;

  // Calculate progress percentage
  const completedModules = modules.filter((module) => module.completed).length;
  const totalModules = modules.length;
  const progress = Math.round((completedModules / totalModules) * 100);

  // Update the user's course progress
  await updateCourseProgress(userId, courseId, progress);
}
