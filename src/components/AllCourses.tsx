import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  image: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

const AllCourses = () => {
  const navigate = useNavigate();
  const [enrollingCourse, setEnrollingCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Mock data for all available courses
  const [availableCourses, setAvailableCourses] = useState([
    {
      id: "1",
      title: "IELTS Academic Writing Masterclass",
      description:
        "Learn how to excel in IELTS Academic Writing tasks with proven strategies",
      progress: 45,
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80",
      instructor: "Dr. Sarah Johnson",
      duration: "6 weeks",
      level: "Intermediate",
    },
    {
      id: "2",
      title: "PTE Speaking & Writing Skills",
      description:
        "Comprehensive guide to ace the speaking and writing sections of PTE Academic",
      progress: 72,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
      instructor: "Prof. Michael Brown",
      duration: "8 weeks",
      level: "Advanced",
    },
    {
      id: "3",
      title: "IELTS Listening Techniques",
      description:
        "Master the listening section with effective note-taking and prediction strategies",
      progress: 18,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
      instructor: "Emma Thompson",
      duration: "4 weeks",
      level: "Beginner",
    },
    {
      id: "4",
      title: "TOEFL iBT Preparation",
      description:
        "Complete preparation for the TOEFL iBT test with practice exercises and strategies",
      progress: 0,
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&q=80",
      instructor: "Dr. Robert Chen",
      duration: "10 weeks",
      level: "Advanced",
    },
    {
      id: "5",
      title: "PTE Reading & Listening",
      description:
        "Strategies and techniques to improve your PTE Reading and Listening scores",
      progress: 0,
      image:
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&q=80",
      instructor: "Lisa Wong",
      duration: "6 weeks",
      level: "Intermediate",
    },
    {
      id: "6",
      title: "IELTS General Training",
      description:
        "Comprehensive preparation for all sections of the IELTS General Training test",
      progress: 0,
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80",
      instructor: "James Wilson",
      duration: "8 weeks",
      level: "Beginner",
    },
  ]);

  const handleEnroll = (e, courseId) => {
    e.stopPropagation(); // Prevent navigation to course details
    setEnrollingCourse(courseId);

    // Simulate enrollment process
    setTimeout(() => {
      // Update the course progress to 0% (now enrolled)
      setAvailableCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId ? { ...course, progress: 0 } : course,
        ),
      );

      // Add to enrolled courses
      setEnrolledCourses((prev) => [...prev, courseId]);
      setEnrollingCourse(null);

      // Show success message (in a real app, we would use a toast notification)
      alert("Successfully enrolled in the course!");
    }, 1500);
  };

  const isEnrolled = (courseId) => {
    return (
      availableCourses.find((course) => course.id === courseId)?.progress > -1
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <h1 className="text-xl font-bold">All Available Courses</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/course/${course.id}`)}
            >
              <div className="relative h-48 w-full">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white text-sm font-medium py-1 px-2 rounded">
                  {course.level}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {course.instructor}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  {course.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {course.duration}
                  </span>
                  {course.progress > -1 ? (
                    <span className="text-sm text-blue-600">
                      {course.progress > 0
                        ? `${course.progress}% completed`
                        : "Enrolled"}
                    </span>
                  ) : enrollingCourse === course.id ? (
                    <Button size="sm" variant="outline" disabled>
                      <span className="animate-pulse">Enrolling...</span>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => handleEnroll(e, course.id)}
                    >
                      Enroll
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllCourses;
