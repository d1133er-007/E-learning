-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  instructor TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course_modules table
CREATE TABLE IF NOT EXISTS course_modules (
  id SERIAL PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tests table
CREATE TABLE IF NOT EXISTS tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Mock Test', 'Practice Test', 'Section Test')),
  duration TEXT NOT NULL,
  questions INTEGER NOT NULL,
  description TEXT NOT NULL,
  instructions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create test_sections table
CREATE TABLE IF NOT EXISTS test_sections (
  id SERIAL PRIMARY KEY,
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  questions INTEGER NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create classes table
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  instructor TEXT NOT NULL,
  instructor_role TEXT,
  instructor_image TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  category TEXT NOT NULL CHECK (category IN ('Speaking', 'Writing', 'Reading', 'Listening', 'General')),
  description TEXT NOT NULL,
  topics JSONB,
  prerequisites JSONB,
  materials JSONB,
  max_capacity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_courses table for tracking enrollments and progress
CREATE TABLE IF NOT EXISTS user_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  enrolled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  last_accessed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Create user_tests table for tracking test attempts and results
CREATE TABLE IF NOT EXISTS user_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  completed BOOLEAN DEFAULT FALSE,
  score NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, test_id, scheduled_date)
);

-- Create user_classes table for tracking class enrollments and attendance
CREATE TABLE IF NOT EXISTS user_classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  enrolled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  attended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, class_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_classes ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles: Users can read all profiles but only update their own
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Courses: Anyone can view courses
CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  USING (true);

-- Course modules: Anyone can view course modules
CREATE POLICY "Anyone can view course modules"
  ON course_modules FOR SELECT
  USING (true);

-- Tests: Anyone can view tests
CREATE POLICY "Anyone can view tests"
  ON tests FOR SELECT
  USING (true);

-- Test sections: Anyone can view test sections
CREATE POLICY "Anyone can view test sections"
  ON test_sections FOR SELECT
  USING (true);

-- Classes: Anyone can view classes
CREATE POLICY "Anyone can view classes"
  ON classes FOR SELECT
  USING (true);

-- User courses: Users can view and update their own enrollments
CREATE POLICY "Users can view their own course enrollments"
  ON user_courses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in courses"
  ON user_courses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own course progress"
  ON user_courses FOR UPDATE
  USING (auth.uid() = user_id);

-- User tests: Users can view and update their own test attempts
CREATE POLICY "Users can view their own test attempts"
  ON user_tests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can schedule tests"
  ON user_tests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own test results"
  ON user_tests FOR UPDATE
  USING (auth.uid() = user_id);

-- User classes: Users can view and update their own class enrollments
CREATE POLICY "Users can view their own class enrollments"
  ON user_classes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in classes"
  ON user_classes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own class attendance"
  ON user_classes FOR UPDATE
  USING (auth.uid() = user_id);

-- Enable realtime subscriptions
alter publication supabase_realtime add table courses;
alter publication supabase_realtime add table course_modules;
alter publication supabase_realtime add table tests;
alter publication supabase_realtime add table test_sections;
alter publication supabase_realtime add table classes;
alter publication supabase_realtime add table user_courses;
alter publication supabase_realtime add table user_tests;
alter publication supabase_realtime add table user_classes;
