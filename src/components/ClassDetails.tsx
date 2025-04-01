import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Users,
  Video,
  FileText,
  MessageSquare,
} from "lucide-react";

const ClassDetails = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [countdown, setCountdown] = useState(null);

  // Mock data for a class
  const classData = {
    id: classId,
    title: "Speaking Practice: Part 2 Long Turn",
    instructor: "James Wilson",
    instructorRole: "Senior IELTS Examiner",
    instructorImage:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=instructor",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "60 minutes",
    enrolled: 24,
    maxCapacity: 30,
    level: "Intermediate",
    description:
      "This interactive speaking practice session focuses on Part 2 of the IELTS Speaking test, where you need to speak for 1-2 minutes on a given topic. You'll learn effective strategies for organizing your thoughts quickly and speaking fluently without hesitation.",
    topics: [
      "Strategies for the 1-minute preparation time",
      "How to structure your long turn response",
      "Techniques to avoid hesitation and pauses",
      "Vocabulary enrichment for common Part 2 topics",
      "Live practice with instructor feedback",
    ],
    prerequisites: [
      "Basic understanding of IELTS Speaking test format",
      "Intermediate English proficiency",
    ],
    materials: [
      "Speaking Part 2 cue cards (will be provided)",
      "Notebook for taking notes",
    ],
    status: "upcoming", // upcoming, live, completed
  };

  const handleJoinClass = () => {
    setIsJoining(true);

    // Simulate connection delay
    let count = 3;
    setCountdown(count);

    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);

      if (count <= 0) {
        clearInterval(timer);
        setIsJoining(false);
        setHasJoined(true);
      }
    }, 1000);
  };

  const handleLeaveClass = () => {
    setHasJoined(false);
  };

  const toggleMaterials = () => {
    setShowMaterials(!showMaterials);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <div className="bg-primary/10 py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <Badge className="mb-2">{classData.level}</Badge>
              <h1 className="text-3xl font-bold mb-2">{classData.title}</h1>
              <div className="flex items-center text-sm">
                <Calendar size={16} className="mr-1" /> {classData.date}
                <span className="mx-2">•</span>
                <Clock size={16} className="mr-1" /> {classData.time} (
                {classData.duration})
              </div>
            </div>
            {isJoining ? (
              <Button className="mt-4 md:mt-0" disabled>
                <span className="animate-pulse">Connecting... {countdown}</span>
              </Button>
            ) : hasJoined ? (
              <Button
                className="mt-4 md:mt-0"
                variant="destructive"
                onClick={handleLeaveClass}
              >
                <Video className="mr-2 h-4 w-4" /> Leave Class
              </Button>
            ) : (
              <Button className="mt-4 md:mt-0" onClick={handleJoinClass}>
                <Video className="mr-2 h-4 w-4" /> Join Class
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Class details */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Class Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{classData.description}</p>

                <h3 className="font-medium mb-3">What You'll Learn</h3>
                <ul className="space-y-2 mb-6">
                  {classData.topics.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Prerequisites</h3>
                    <ul className="space-y-2">
                      {classData.prerequisites.map((item, index) => (
                        <li key={index} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Materials Needed</h3>
                    <ul className="space-y-2">
                      {classData.materials.map((item, index) => (
                        <li key={index} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {hasJoined && (
              <Card className="mb-8 border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                      <h3 className="font-medium text-green-800">
                        Live Class in Progress
                      </h3>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-green-800 border-green-300 bg-green-100"
                    >
                      {classData.enrolled + 1}/{classData.maxCapacity}{" "}
                      Participants
                    </Badge>
                  </div>

                  <div className="bg-white rounded-md p-4 mb-4">
                    <h4 className="font-medium mb-2">Virtual Classroom</h4>
                    <div className="aspect-video bg-slate-200 rounded-md flex items-center justify-center mb-4">
                      <Video className="h-12 w-12 text-slate-400" />
                      <span className="ml-2 text-slate-500">
                        Video feed would appear here
                      </span>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" /> Chat
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="mr-2 h-4 w-4" /> Participants
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex space-x-4 mb-8">
              <Button
                variant="outline"
                className="flex-1"
                onClick={toggleMaterials}
              >
                <FileText className="mr-2 h-4 w-4" />{" "}
                {showMaterials ? "Hide" : "Show"} Materials
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageSquare className="mr-2 h-4 w-4" /> Discussion Forum
              </Button>
            </div>

            {showMaterials && (
              <Card className="mb-8 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">Class Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-3" />
                        <span>Speaking_Part2_Cue_Cards.pdf</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        Download
                      </Button>
                    </li>
                    <li className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-3" />
                        <span>Vocabulary_List.pdf</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        Download
                      </Button>
                    </li>
                    <li className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-3" />
                        <span>Practice_Exercises.pdf</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        Download
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column - Instructor and class info */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={classData.instructorImage}
                      alt={classData.instructor}
                    />
                    <AvatarFallback>
                      {classData.instructor.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{classData.instructor}</h3>
                    <p className="text-sm text-muted-foreground">
                      {classData.instructorRole}
                    </p>
                  </div>
                </div>
                <p className="text-sm">
                  James is a certified IELTS examiner with over 10 years of
                  experience in teaching English for academic purposes. He
                  specializes in helping students master the speaking section of
                  language proficiency tests.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Class Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{classData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span>{classData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{classData.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level:</span>
                  <span>{classData.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Enrollment:</span>
                  <span>
                    <Users size={14} className="inline mr-1" />
                    {classData.enrolled}/{classData.maxCapacity}
                  </span>
                </div>
                <div className="pt-4">
                  {isJoining ? (
                    <Button className="w-full" disabled>
                      <span className="animate-pulse">
                        Connecting... {countdown}
                      </span>
                    </Button>
                  ) : hasJoined ? (
                    <Button
                      className="w-full"
                      variant="destructive"
                      onClick={handleLeaveClass}
                    >
                      <Video className="mr-2 h-4 w-4" /> Leave Class
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={handleJoinClass}>
                      <Video className="mr-2 h-4 w-4" /> Join Class
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
