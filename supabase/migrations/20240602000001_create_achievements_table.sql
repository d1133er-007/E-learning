-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_achievements table for tracking which users have which achievements
CREATE TABLE IF NOT EXISTS user_achievements (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id INTEGER NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Enable realtime for these tables
alter publication supabase_realtime add table achievements;
alter publication supabase_realtime add table user_achievements;

-- Insert some initial achievements
INSERT INTO achievements (name, description, icon) VALUES
('First Test', 'Completed your first practice test', 'award'),
('Study Streak', 'Studied for 7 days in a row', 'flame'),
('Reading Master', 'Scored 80% in Reading', 'book-open'),
('Writing Pro', 'Scored 75% in Writing', 'pen-tool'),
('Listening Expert', 'Scored 85% in Listening', 'headphones'),
('Speaking Star', 'Scored 70% in Speaking', 'mic'),
('Perfect Score', 'Achieved a perfect score in any section', 'star'),
('Dedicated Learner', 'Spent over 50 hours studying', 'clock'),
('Test Champion', 'Completed 10 practice tests', 'trophy'),
('Course Completer', 'Completed your first course', 'check-circle');
