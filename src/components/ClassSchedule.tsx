import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Video,
  Filter,
  Loader,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getAllClasses, getClassesByCategory } from "@/services/classService";
import { toast } from "sonner";

interface ClassProps {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Speaking" | "Writing" | "Reading" | "Listening" | "General";
  enrolled: number;
  maxCapacity: number;
}

const ClassSchedule = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;
        if (filter === "all") {
          data = await getAllClasses();
        } else {
          data = await getClassesByCategory(filter);
        }

        setClasses(data);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Failed to load classes. Please try again.");
        // Fallback to mock data if API fails
        setClasses(scheduledClasses);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [filter]);

  // Mock data for scheduled classes (fallback)
  const scheduledClasses = [
    {
      id: "1",
      title: "Speaking Practice: Part 2 Long Turn",
      instructor: "James Wilson",
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "60 minutes",
      level: "Intermediate",
      category: "Speaking",
      enrolled: 24,
      maxCapacity: 30,
    },
    {
      id: "2",
      title: "Writing Task 1: Data Analysis",
      instructor: "Dr. Sarah Johnson",
      date: "Wed, 15 Jun",
      time: "2:30 PM",
      duration: "90 minutes",
      level: "Intermediate",
      category: "Writing",
      enrolled: 18,
      maxCapacity: 25,
    },
    {
      id: "3",
      title: "Reading Strategies for PTE",
      instructor: "Lisa Wong",
      date: "Thu, 16 Jun",
      time: "11:00 AM",
      duration: "60 minutes",
      level: "Beginner",
      category: "Reading",
      enrolled: 15,
      maxCapacity: 30,
    },
    {
      id: "4",
      title: "IELTS Listening Section Masterclass",
      instructor: "Emma Thompson",
      date: "Fri, 17 Jun",
      time: "3:00 PM",
      duration: "75 minutes",
      level: "Advanced",
      category: "Listening",
      enrolled: 22,
      maxCapacity: 30,
    },
    {
      id: "5",
      title: "PTE Speaking: Describe Image",
      instructor: "Prof. Michael Brown",
      date: "Mon, 20 Jun",
      time: "9:30 AM",
      duration: "60 minutes",
      level: "Intermediate",
      category: "Speaking",
      enrolled: 12,
      maxCapacity: 20,
    },
    {
      id: "6",
      title: "IELTS Writing Task 2: Essay Structure",
      instructor: "Dr. Sarah Johnson",
      date: "Tue, 21 Jun",
      time: "1:00 PM",
      duration: "90 minutes",
      level: "Beginner",
      category: "Writing",
      enrolled: 20,
      maxCapacity: 25,
    },
    {
      id: "7",
      title: "Test Day Preparation Workshop",
      instructor: "James Wilson",
      date: "Wed, 22 Jun",
      time: "4:00 PM",
      duration: "120 minutes",
      level: "Intermediate",
      category: "General",
      enrolled: 28,
      maxCapacity: 30,
    },
  ];

  // We're now filtering on the server side through the API calls
  const filteredClasses = classes;

  const handleRequestClass = () => {
    toast.success("Class request submitted! We'll contact you soon.");
  };

  const ClassCard = ({ classData }: { classData: ClassProps }) => (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer mb-4"
      onClick={() => navigate(`/class/${classData.id}`)}
    >
      <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <Badge className="mr-2">{classData.level}</Badge>
            <Badge variant="outline">{classData.category}</Badge>
          </div>
          <h3 className="font-medium text-lg">{classData.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <User size={14} className="mr-1" /> {classData.instructor}
            <span className="mx-2">•</span>
            <Clock size={14} className="mr-1" /> {classData.duration}
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-4 text-right">
            <div className="text-sm font-medium">{classData.date}</div>
            <div className="text-sm text-muted-foreground">
              {classData.time}
            </div>
          </div>
          <Button>
            <Video className="mr-2 h-4 w-4" /> Join
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
          <h1 className="text-xl font-bold">Live Class Schedule</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Upcoming Live Classes</h2>
            <p className="text-muted-foreground">
              Join interactive sessions with expert instructors
            </p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading classes...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
            <p>{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="all" className="mb-6">
            <div className="flex items-center mb-4">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium mr-4">Filter by:</span>
              <TabsList>
                <TabsTrigger value="all" onClick={() => setFilter("all")}>
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="Speaking"
                  onClick={() => setFilter("Speaking")}
                >
                  Speaking
                </TabsTrigger>
                <TabsTrigger
                  value="Writing"
                  onClick={() => setFilter("Writing")}
                >
                  Writing
                </TabsTrigger>
                <TabsTrigger
                  value="Reading"
                  onClick={() => setFilter("Reading")}
                >
                  Reading
                </TabsTrigger>
                <TabsTrigger
                  value="Listening"
                  onClick={() => setFilter("Listening")}
                >
                  Listening
                </TabsTrigger>
                <TabsTrigger
                  value="General"
                  onClick={() => setFilter("General")}
                >
                  General
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              {filteredClasses.map((classData) => (
                <ClassCard key={classData.id} classData={classData} />
              ))}
            </TabsContent>

            <TabsContent value="speaking" className="mt-0">
              {filteredClasses.map((classData) => (
                <ClassCard key={classData.id} classData={classData} />
              ))}
            </TabsContent>

            <TabsContent value="writing" className="mt-0">
              {filteredClasses.map((classData) => (
                <ClassCard key={classData.id} classData={classData} />
              ))}
            </TabsContent>

            <TabsContent value="reading" className="mt-0">
              {filteredClasses.map((classData) => (
                <ClassCard key={classData.id} classData={classData} />
              ))}
            </TabsContent>

            <TabsContent value="listening" className="mt-0">
              {filteredClasses.map((classData) => (
                <ClassCard key={classData.id} classData={classData} />
              ))}
            </TabsContent>

            <TabsContent value="general" className="mt-0">
              {filteredClasses.map((classData) => (
                <ClassCard key={classData.id} classData={classData} />
              ))}
            </TabsContent>
          </Tabs>
        )}

        <Card className="bg-primary/5 border-dashed border-primary/30">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Calendar className="h-12 w-12 text-primary/70 mb-4" />
            <h4 className="text-lg font-medium mb-2">
              Want to request a specific class?
            </h4>
            <p className="text-center text-muted-foreground mb-4">
              If you need help with a specific topic, you can request a custom
              live class
            </p>
            <Button onClick={handleRequestClass}>Request a Class</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ClassSchedule;
