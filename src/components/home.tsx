import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Headphones,
  MessageSquare,
  Play,
  Settings,
  Trophy,
  User,
  Loader2,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface CourseCardProps {
  id?: string;
  title?: string;
  description?: string;
  progress?: number;
  image?: string;
  instructor?: string;
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  onClick?: () => void;
}

const CourseCard = ({
  title = "IELTS Academic Writing Masterclass",
  description = "Learn how to excel in IELTS Academic Writing tasks with proven strategies",
  progress = 45,
  image = "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80",
  instructor = "Dr. Sarah Johnson",
  duration = "6 weeks",
  level = "Intermediate",
  onClick,
}: CourseCardProps) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow bg-white cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <Badge className="absolute top-3 right-3" variant="secondary">
          {level}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm">
          <User size={14} />
          {instructor}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock size={14} className="mr-1" />
          {duration}
        </div>
        <Button variant="ghost" size="sm">
          Continue <ChevronRight size={16} className="ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

interface TestCardProps {
  id?: string;
  title?: string;
  type?: "Mock Test" | "Practice Test" | "Section Test";
  duration?: string;
  questions?: number;
  onClick?: () => void;
}

const TestCard = ({
  title = "Full IELTS Mock Test",
  type = "Mock Test",
  duration = "2 hours 45 minutes",
  questions = 40,
  onClick,
}: TestCardProps) => {
  return (
    <Card
      className="hover:shadow-md transition-shadow bg-white cursor-pointer"
      onClick={onClick}
    >
      <CardHeader>
        <Badge
          variant={
            type === "Mock Test"
              ? "destructive"
              : type === "Practice Test"
                ? "default"
                : "outline"
          }
          className="w-fit mb-2"
        >
          {type}
        </Badge>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            {duration}
          </div>
          <div>{questions} questions</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Start Test</Button>
      </CardFooter>
    </Card>
  );
};

interface UpcomingClassProps {
  id?: string;
  title?: string;
  instructor?: string;
  date?: string;
  time?: string;
  onClick?: () => void;
}

const UpcomingClass = ({
  title = "Speaking Practice: Part 2 Long Turn",
  instructor = "James Wilson",
  date = "Tomorrow",
  time = "10:00 AM",
  onClick,
}: UpcomingClassProps) => {
  return (
    <Card
      className="flex items-center p-4 hover:shadow-md transition-shadow bg-white cursor-pointer"
      onClick={onClick}
    >
      <div className="mr-4 p-3 bg-primary/10 rounded-full">
        <Headphones className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{instructor}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">{date}</p>
        <p className="text-sm text-muted-foreground">{time}</p>
      </div>
      <Button variant="ghost" size="icon" className="ml-2">
        <Calendar className="h-4 w-4" />
      </Button>
    </Card>
  );
};

interface StatCardProps {
  title?: string;
  value?: string | number;
  icon?: React.ReactNode;
  description?: string;
}

const StatCard = ({
  title = "Overall Score",
  value = "7.5",
  icon = <Trophy className="h-5 w-5 text-yellow-500" />,
  description = "Your predicted IELTS band",
}: StatCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

function Home() {
  const navigate = useNavigate();
  const { 
    profile, 
    stats, 
    enrolledCourses, 
    upcomingTests, 
    upcomingClasses, 
    loading, 
    error, 
    refreshUserData 
  } = useUser();
  
  const [lastAccessed, setLastAccessed] = useState({
    type: "course",
    id: "1",
    title: "IELTS Academic Writing Masterclass",
  });

  // Handle course click and update last accessed
  const handleCourseClick = (courseId: string, courseTitle: string) => {
    setLastAccessed({
      type: "course",
      id: courseId,
      title: courseTitle,
    });
    navigate(`/course/${courseId}`);
  };

  // Handle test click and update last accessed
  const handleTestClick = (testId: string, testTitle: string) => {
    setLastAccessed({
      type: "test",
      id: testId,
      title: testTitle,
    });
    navigate(`/test/${testId}`);
  };

  // Handle class click
  const handleClassClick = (classId: string) => {
    navigate(`/class/${classId}`);
  };

  // Resume learning based on last accessed item
  const handleResumeLearning = () => {
    if (lastAccessed.type === "course") {
      navigate(`/course/${lastAccessed.id}`);
    } else if (lastAccessed.type === "test") {
      navigate(`/test/${lastAccessed.id}`);
    }
  };

  // Format enrolled courses data
  const formattedCourses = enrolledCourses.map((enrollment: any) => {
    const course = enrollment.courses;
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      progress: enrollment.progress,
      image: course.image,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
    };
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">IELTS & PTE Prep</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage
                src={profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=student"}
                alt="User"
              />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2" 
              onClick={refreshUserData}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            {/* Welcome Section */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold">Welcome back, {profile?.full_name?.split(' ')[