-- Seed courses
INSERT INTO courses (id, title, description, image, instructor, duration, level) VALUES
('1', 'IELTS Academic Writing Masterclass', 'Learn how to excel in IELTS Academic Writing tasks with proven strategies', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80', 'Dr. Sarah Johnson', '6 weeks', 'Intermediate'),
('2', 'PTE Speaking & Writing Skills', 'Comprehensive guide to ace the speaking and writing sections of PTE Academic', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80', 'Prof. Michael Brown', '8 weeks', 'Advanced'),
('3', 'IELTS Listening Techniques', 'Master the listening section with effective note-taking and prediction strategies', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80', 'Emma Thompson', '4 weeks', 'Beginner'),
('4', 'TOEFL iBT Preparation', 'Complete preparation for the TOEFL iBT test with practice exercises and strategies', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&q=80', 'Dr. Robert Chen', '10 weeks', 'Advanced'),
('5', 'PTE Reading & Listening', 'Strategies and techniques to improve your PTE Reading and Listening scores', 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&q=80', 'Lisa Wong', '6 weeks', 'Intermediate'),
('6', 'IELTS General Training', 'Comprehensive preparation for all sections of the IELTS General Training test', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80', 'James Wilson', '8 weeks', 'Beginner');

-- Seed course modules
INSERT INTO course_modules (course_id, title, duration, completed, "order") VALUES
('1', 'Introduction to IELTS Writing', '45 minutes', true, 1),
('1', 'Task 1: Describing Charts and Graphs', '1 hour 30 minutes', true, 2),
('1', 'Task 1: Process Diagrams', '1 hour 15 minutes', false, 3),
('1', 'Task 2: Essay Structure', '2 hours', false, 4),
('1', 'Task 2: Opinion Essays', '1 hour 45 minutes', false, 5),
('1', 'Common Mistakes and How to Avoid Them', '1 hour', false, 6);

-- Seed tests
INSERT INTO tests (id, title, type, duration, questions, description, instructions) VALUES
('1', 'Full IELTS Mock Test', 'Mock Test', '2 hours 45 minutes', 40, 'This comprehensive mock test simulates the actual IELTS exam environment and covers all four sections: Listening, Reading, Writing, and Speaking. Your responses will be evaluated based on the official IELTS marking criteria.', '["This test must be completed in one sitting.", "You will not be able to pause the timer once the test begins.", "Ensure you have a quiet environment and stable internet connection.", "For the speaking section, you will need a microphone.", "Your results will be available immediately after completion."]'),
('2', 'PTE Reading Practice', 'Practice Test', '45 minutes', 15, 'Practice your reading skills with this focused PTE reading test.', '["You can pause this test and resume later.", "Focus on understanding the main ideas and details.", "Practice your time management skills."]'),
('3', 'IELTS Speaking Section', 'Section Test', '15 minutes', 3, 'Practice the three parts of the IELTS speaking test with this focused practice session.', '["You will need a microphone for this test.", "Speak clearly and at a natural pace.", "Try to provide detailed answers."]'),
('4', 'IELTS Academic Reading Test', 'Practice Test', '60 minutes', 40, 'Practice your reading skills with passages similar to those in the actual IELTS Academic test.', '["Read the instructions carefully before starting.", "Manage your time effectively - spend about 20 minutes on each passage.", "Transfer your answers carefully to the answer sheet."]'),
('5', 'PTE Full Mock Exam', 'Mock Test', '3 hours', 70, 'Complete simulation of the PTE Academic exam covering all sections.', '["This test must be completed in one sitting.", "You will need a microphone and headphones.", "Ensure you have a quiet environment and stable internet connection."]'),
('6', 'IELTS Writing Task 1', 'Section Test', '20 minutes', 1, 'Practice describing visual information in the form of a graph, table, chart, or diagram.', '["Spend about 5 minutes planning your response.", "Write at least 150 words.", "Check your grammar and vocabulary usage."]'),
('7', 'IELTS Writing Task 2', 'Section Test', '40 minutes', 1, 'Practice writing an essay in response to a point of view, argument, or problem.', '["Spend about 10 minutes planning your essay.", "Write at least 250 words.", "Structure your essay with an introduction, body paragraphs, and conclusion."]'),
('8', 'PTE Speaking Practice', 'Section Test', '30 minutes', 5, 'Practice the speaking tasks from the PTE Academic test.', '["You will need a microphone for this test.", "Speak clearly and at a natural pace.", "Focus on pronunciation and fluency."]');

-- Seed test sections
INSERT INTO test_sections (test_id, title, questions, duration, description, "order") VALUES
('1', 'Listening', 40, '30 minutes', 'Four recorded conversations and monologues with 40 questions.', 1),
('1', 'Reading', 40, '60 minutes', 'Three reading passages with a total of 40 questions.', 2),
('1', 'Writing', 2, '60 minutes', 'Two writing tasks: a graph/chart description and an essay.', 3),
('1', 'Speaking', 3, '15 minutes', 'Three-part speaking assessment with an examiner.', 4);

-- Seed classes
INSERT INTO classes (id, title, instructor, instructor_role, instructor_image, date, time, duration, level, category, description, topics, prerequisites, materials, max_capacity) VALUES
('1', 'Speaking Practice: Part 2 Long Turn', 'James Wilson', 'Senior IELTS Examiner', 'https://api.dicebear.com/7.x/avataaars/svg?seed=instructor', 'Tomorrow', '10:00 AM', '60 minutes', 'Intermediate', 'Speaking', 'This interactive speaking practice session focuses on Part 2 of the IELTS Speaking test, where you need to speak for 1-2 minutes on a given topic. You''ll learn effective strategies for organizing your thoughts quickly and speaking fluently without hesitation.', '["Strategies for the 1-minute preparation time", "How to structure your long turn response", "Techniques to avoid hesitation and pauses", "Vocabulary enrichment for common Part 2 topics", "Live practice with instructor feedback"]', '["Basic understanding of IELTS Speaking test format", "Intermediate English proficiency"]', '["Speaking Part 2 cue cards (will be provided)", "Notebook for taking notes"]', 30),
('2', 'Writing Task 1: Data Analysis', 'Dr. Sarah Johnson', 'IELTS Writing Expert', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', 'Wed, 15 Jun', '2:30 PM', '90 minutes', 'Intermediate', 'Writing', 'Learn how to analyze and describe different types of charts, graphs, and diagrams for IELTS Writing Task 1. This class will cover the essential skills needed to achieve a high score in this section.', '["Understanding different chart types", "Identifying key trends and features", "Organizing your response effectively", "Using appropriate language for data description", "Common mistakes and how to avoid them"]', '["Basic understanding of IELTS Writing Task 1 requirements", "Intermediate English proficiency"]', '["Sample charts and graphs", "Task 1 vocabulary list", "Model answers"]', 25),
('3', 'Reading Strategies for PTE', 'Lisa Wong', 'PTE Specialist', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa', 'Thu, 16 Jun', '11:00 AM', '60 minutes', 'Beginner', 'Reading', 'This class focuses on effective strategies for the reading section of the PTE Academic test. Learn how to approach different question types and manage your time efficiently.', '["Skimming and scanning techniques", "Identifying main ideas and supporting details", "Strategies for multiple-choice questions", "Approaches for re-order paragraph questions", "Time management tips"]', '["Basic English reading skills", "Familiarity with PTE test format"]', '["Practice reading passages", "Question type examples", "Strategy guide"]', 30),
('4', 'IELTS Listening Section Masterclass', 'Emma Thompson', 'IELTS Trainer', 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma', 'Fri, 17 Jun', '3:00 PM', '75 minutes', 'Advanced', 'Listening', 'Master the IELTS Listening section with advanced strategies and techniques. This class will help you improve your listening skills and answer questions accurately.', '["Prediction techniques for each section", "Note-taking strategies", "Understanding different accents", "Dealing with distractors", "Practice with authentic test materials"]', '["Intermediate listening skills", "Previous experience with IELTS listening tests"]', '["Listening practice materials", "Note-taking templates", "Common spelling guide"]', 30),
('5', 'PTE Speaking: Describe Image', 'Prof. Michael Brown', 'PTE Academic Coach', 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael', 'Mon, 20 Jun', '9:30 AM', '60 minutes', 'Intermediate', 'Speaking', 'Learn how to effectively describe images in the PTE Speaking section. This class will provide you with a structured approach and useful language for this challenging task.', '["Understanding the scoring criteria", "Structured approach to image description", "Key vocabulary for different image types", "Time management strategies", "Live practice with feedback"]', '["Basic speaking skills", "Familiarity with PTE test format"]', '["Sample images", "Template for image description", "Useful phrases handout"]', 20),
('6', 'IELTS Writing Task 2: Essay Structure', 'Dr. Sarah Johnson', 'IELTS Writing Expert', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', 'Tue, 21 Jun', '1:00 PM', '90 minutes', 'Beginner', 'Writing', 'This class focuses on developing a clear and effective structure for IELTS Writing Task 2 essays. Learn how to organize your ideas and write a coherent essay that meets the task requirements.', '["Understanding different essay types", "Planning and outlining your essay", "Writing effective introductions and conclusions", "Developing body paragraphs", "Using cohesive devices"]', '["Basic writing skills", "Familiarity with IELTS Writing Task 2"]', '["Essay structure templates", "Sample essays", "Cohesive devices handout"]', 25),
('7', 'Test Day Preparation Workshop', 'James Wilson', 'Senior IELTS Examiner', 'https://api.dicebear.com/7.x/avataaars/svg?seed=instructor', 'Wed, 22 Jun', '4:00 PM', '120 minutes', 'Intermediate', 'General', 'Prepare for your test day with this comprehensive workshop. Learn what to expect, how to manage stress, and last-minute strategies to maximize your performance.', '["Test day procedures and requirements", "Time management across all sections", "Stress management techniques", "Last-minute preparation strategies", "Common test day mistakes to avoid"]', '["Scheduled test date within the next month", "Familiarity with test format"]', '["Test day checklist", "Quick reference guide", "Relaxation techniques handout"]', 30);

-- Create a demo user profile
INSERT INTO profiles (id, full_name, avatar_url, email)
VALUES ('00000000-0000-0000-0000-000000000000', 'Alex Johnson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=student', 'alex@example.com');

-- Enroll the demo user in some courses
INSERT INTO user_courses (user_id, course_id, progress, enrolled_date, last_accessed)
VALUES 
('00000000-0000-0000-0000-000000000000', '1', 45, NOW() - INTERVAL '30 days', NOW() - INTERVAL '2 days'),
('00000000-0000-0000-0000-000000000000', '2', 72, NOW() - INTERVAL '45 days', NOW() - INTERVAL '1 day'),
('00000000-0000-0000-0000-000000000000', '3', 18, NOW() - INTERVAL '15 days', NOW() - INTERVAL '5 days');

-- Schedule some tests for the demo user
INSERT INTO user_tests (user_id, test_id, scheduled_date, completed, score)
VALUES 
('00000000-0000-0000-0000-000000000000', '1', NOW() + INTERVAL '7 days', FALSE, NULL),
('00000000-0000-0000-0000-000000000000', '5', NOW() + INTERVAL '14 days', FALSE, NULL),
('00000000-0000-0000-0000-000000000000', '3', NOW() - INTERVAL '10 days', TRUE, 7.5),
('00000000-0000-0000-0000-000000000000', '6', NOW() - INTERVAL '20 days', TRUE, 6.5);

-- Enroll the demo user in some classes
INSERT INTO user_classes (user_id, class_id, enrolled_date, attended)
VALUES 
('00000000-0000-0000-0000-000000000000', '1', NOW() - INTERVAL '5 days', FALSE),
('00000000-0000-0000-0000-000000000000', '2', NOW() - INTERVAL '3 days', FALSE);
