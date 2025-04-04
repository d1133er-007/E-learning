import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { BookOpen, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EnrolledCoursesProps {
  fullWidth?: boolean;
  className?: string;
}

const EnrolledCourses = ({
  fullWidth = false,
  className = "",
}: EnrolledCoursesProps) => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "IELTS Academic Writing Masterclass",
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80",
    },
    {
      id: 2,
      title: "PTE Speaking Skills",
      progress: 40,
      totalLessons: 18,
      completedLessons: 7,
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&q=80",
    },
    {
      id: 3,
      title: "IELTS Reading Techniques",
      progress: 90,
      totalLessons: 15,
      completedLessons: 13,
      image:
        "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=500&q=80",
    },
    {
      id: 4,
      title: "PTE Listening Practice",
      progress: 25,
      totalLessons: 20,
      completedLessons: 5,
      image:
        "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=500&q=80",
    },
  ];

  const handleContinueCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <Card className={`${className} ${fullWidth ? "w-full" : ""}`}>
      <CardHeader>
        <CardTitle>Enrolled Courses</CardTitle>
        <CardDescription>Continue where you left off</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`grid gap-4 ${fullWidth ? "md:grid-cols-2 lg:grid-cols-3" : ""}`}
        >
          {courses.slice(0, fullWidth ? courses.length : 2).map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-lg border bg-white"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{course.title}</h3>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <BookOpen className="mr-1 h-4 w-4" />
                  <span>
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2 mt-1" />
                </div>
                <Button
                  className="mt-4 w-full"
                  onClick={() => handleContinueCourse(course.id)}
                >
                  Continue Learning
                </Button>
              </div>
            </div>
          ))}

          {!fullWidth && courses.length > 2 && (
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => navigate("/courses")}
            >
              View All Courses
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrolledCourses;
