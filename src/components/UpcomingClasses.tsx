import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Clock, Users, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UpcomingClassesProps {
  className?: string;
}

const UpcomingClasses = ({ className = "" }: UpcomingClassesProps) => {
  const navigate = useNavigate();

  const classes = [
    {
      id: 1,
      title: "IELTS Speaking Strategies",
      instructor: "Dr. Sarah Johnson",
      date: "2023-06-15",
      time: "10:00 AM",
      duration: 60,
      participants: 24,
    },
    {
      id: 2,
      title: "PTE Writing Workshop",
      instructor: "Prof. Michael Chen",
      date: "2023-06-18",
      time: "2:30 PM",
      duration: 90,
      participants: 18,
    },
    {
      id: 3,
      title: "IELTS Reading Techniques",
      instructor: "Emma Wilson",
      date: "2023-06-20",
      time: "11:00 AM",
      duration: 60,
      participants: 30,
    },
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleJoinClass = (classId: number) => {
    navigate(`/class/${classId}`);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upcoming Live Classes</CardTitle>
        <CardDescription>
          Join interactive sessions with expert instructors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classes.slice(0, 2).map((classItem) => (
            <div
              key={classItem.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="space-y-1">
                <h4 className="font-medium">{classItem.title}</h4>
                <div className="flex flex-col space-y-1 text-sm text-gray-500 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    <span>{formatDate(classItem.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3.5 w-3.5" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-3.5 w-3.5" />
                    <span>{classItem.participants}</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleJoinClass(classItem.id)}
              >
                <Video className="h-4 w-4" />
                Join
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/classes")}
          >
            View All Classes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingClasses;
