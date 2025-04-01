export interface Database {
  public: {
    Tables: {
      courses: {
        Row: Course;
        Insert: Omit<Course, "id">;
        Update: Partial<Omit<Course, "id">>;
      };
      tests: {
        Row: Test;
        Insert: Omit<Test, "id">;
        Update: Partial<Omit<Test, "id">>;
      };
      classes: {
        Row: Class;
        Insert: Omit<Class, "id">;
        Update: Partial<Omit<Class, "id">>;
      };
      user_courses: {
        Row: UserCourse;
        Insert: Omit<UserCourse, "id">;
        Update: Partial<Omit<UserCourse, "id">>;
      };
      user_tests: {
        Row: UserTest;
        Insert: Omit<UserTest, "id">;
        Update: Partial<Omit<UserTest, "id">>;
      };
      user_classes: {
        Row: UserClass;
        Insert: Omit<UserClass, "id">;
        Update: Partial<Omit<UserClass, "id">>;
      };
      course_modules: {
        Row: CourseModule;
        Insert: Omit<CourseModule, "id">;
        Update: Partial<Omit<CourseModule, "id">>;
      };
      test_sections: {
        Row: TestSection;
        Insert: Omit<TestSection, "id">;
        Update: Partial<Omit<TestSection, "id">>;
      };
    };
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  created_at?: string;
}

export interface UserCourse {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  enrolled_date: string;
  last_accessed?: string;
  created_at?: string;
}

export interface CourseModule {
  id: number;
  course_id: string;
  title: string;
  duration: string;
  completed?: boolean;
  order: number;
  created_at?: string;
}

export interface Test {
  id: string;
  title: string;
  type: "Mock Test" | "Practice Test" | "Section Test";
  duration: string;
  questions: number;
  description: string;
  instructions?: string[];
  created_at?: string;
}

export interface TestSection {
  id: number;
  test_id: string;
  title: string;
  questions: number;
  duration: string;
  description: string;
  order: number;
  created_at?: string;
}

export interface UserTest {
  id: string;
  user_id: string;
  test_id: string;
  scheduled_date?: string;
  completed?: boolean;
  score?: number;
  created_at?: string;
}

export interface Class {
  id: string;
  title: string;
  instructor: string;
  instructor_role?: string;
  instructor_image?: string;
  date: string;
  time: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Speaking" | "Writing" | "Reading" | "Listening" | "General";
  description: string;
  topics?: string[];
  prerequisites?: string[];
  materials?: string[];
  max_capacity: number;
  created_at?: string;
}

export interface UserClass {
  id: string;
  user_id: string;
  class_id: string;
  enrolled_date: string;
  attended?: boolean;
  created_at?: string;
}
