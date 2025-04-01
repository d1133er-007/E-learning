import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, BookOpen, CheckCircle } from "lucide-react";

interface Module {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Mock data for a course
  const course = {
    id: courseId,
    title: "IELTS Academic Writing Masterclass",
    description:
      "Learn how to excel in IELTS Academic Writing tasks with proven strategies and techniques. This comprehensive course covers all aspects of the writing section.",
    progress: 45,
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    instructor: "Dr. Sarah Johnson",
    duration: "6 weeks",
    level: "Intermediate",
    enrolledDate: "April 15, 2023",
    modules: [
      {
        id: 1,
        title: "Introduction to IELTS Writing",
        duration: "45 minutes",
        completed: true,
      },
      {
        id: 2,
        title: "Task 1: Describing Charts and Graphs",
        duration: "1 hour 30 minutes",
        completed: true,
      },
      {
        id: 3,
        title: "Task 1: Process Diagrams",
        duration: "1 hour 15 minutes",
        completed: false,
      },
      {
        id: 4,
        title: "Task 2: Essay Structure",
        duration: "2 hours",
        completed: false,
      },
      {
        id: 5,
        title: "Task 2: Opinion Essays",
        duration: "1 hour 45 minutes",
        completed: false,
      },
      {
        id: 6,
        title: "Common Mistakes and How to Avoid Them",
        duration: "1 hour",
        completed: false,
      },
    ],
  };

  const ModuleItem = ({ module }: { module: Module }) => (
    <Card
      className={`mb-4 ${module.completed ? "border-green-200 bg-green-50" : ""}`}
    >
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          {module.completed ? (
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
          ) : (
            <BookOpen className="h-5 w-5 text-primary mr-3" />
          )}
          <div>
            <h4 className="font-medium">{module.title}</h4>
            <p className="text-sm text-muted-foreground">
              <Clock size={14} className="inline mr-1" /> {module.duration}
            </p>
          </div>
        </div>
        <Button variant={module.completed ? "outline" : "default"}>
          {module.completed ? "Review" : "Start"}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header with course image */}
      <div
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${course.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="container mx-auto px-4 py-6 text-white">
            <Button
              variant="ghost"
              size="sm"
              className="text-white mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
            <Badge className="mb-2">{course.level}</Badge>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <div className="flex items-center text-sm">
              <User size={16} className="mr-1" /> {course.instructor}
              <span className="mx-2">•</span>
              <Clock size={16} className="mr-1" /> {course.duration}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Course details */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Course Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{course.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Enrolled on:</span>
                    <p>{course.enrolledDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <p>{course.duration}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Instructor:</span>
                    <p>{course.instructor}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Level:</span>
                    <p>{course.level}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            {course.modules.map((module) => (
              <ModuleItem key={module.id} module={module} />
            ))}
          </div>

          {/* Right column - Actions and resources */}
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <Button className="w-full mb-4">Continue Learning</Button>
                <Button variant="outline" className="w-full">
                  Download Resources
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-primary mr-3" />
                  <span>Writing Task 1 Templates</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-primary mr-3" />
                  <span>Writing Task 2 Essay Structures</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-primary mr-3" />
                  <span>Vocabulary for Academic Writing</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-primary mr-3" />
                  <span>Grammar Checklist</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
