import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { PageTransition, SectionTransition } from "./ui/page-transition";

interface TestCardProps {
  id: string;
  title: string;
  type: "Mock Test" | "Practice Test" | "Section Test";
  duration: string;
  questions: number;
  date?: string;
}

const AllTests = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [availableTests, setAvailableTests] = useState<TestCardProps[]>([]);
  const [scheduledTests, setScheduledTests] = useState<TestCardProps[]>([]);

  // Fetch tests data
  useEffect(() => {
    // Simulate API call
    const fetchTests = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll use setTimeout to simulate network delay
        setTimeout(() => {
          // Mock data for all available tests
          setAvailableTests([
            {
              id: "1",
              title: "Full IELTS Mock Test",
              type: "Mock Test",
              duration: "2 hours 45 minutes",
              questions: 40,
            },
            {
              id: "2",
              title: "PTE Reading Practice",
              type: "Practice Test",
              duration: "45 minutes",
              questions: 15,
            },
            {
              id: "3",
              title: "IELTS Speaking Section",
              type: "Section Test",
              duration: "15 minutes",
              questions: 3,
            },
            {
              id: "4",
              title: "IELTS Academic Reading Test",
              type: "Practice Test",
              duration: "60 minutes",
              questions: 40,
            },
            {
              id: "5",
              title: "PTE Full Mock Exam",
              type: "Mock Test",
              duration: "3 hours",
              questions: 70,
            },
            {
              id: "6",
              title: "IELTS Writing Task 1",
              type: "Section Test",
              duration: "20 minutes",
              questions: 1,
            },
            {
              id: "7",
              title: "IELTS Writing Task 2",
              type: "Section Test",
              duration: "40 minutes",
              questions: 1,
            },
            {
              id: "8",
              title: "PTE Speaking Practice",
              type: "Section Test",
              duration: "30 minutes",
              questions: 5,
            },
          ]);

          // Mock data for scheduled tests
          setScheduledTests([
            {
              id: "101",
              title: "IELTS Computer-Based Test",
              type: "Mock Test",
              duration: "2 hours 45 minutes",
              questions: 40,
              date: "June 15, 2023",
            },
            {
              id: "102",
              title: "PTE Academic Exam Simulation",
              type: "Mock Test",
              duration: "3 hours",
              questions: 70,
              date: "June 22, 2023",
            },
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching tests:", error);
        toast.error("Failed to load tests", {
          description: "Please try again later",
        });
        setIsLoading(false);
      }
    };

    fetchTests();
  }, []);

  // Filter tests based on search query and type filter
  const filteredAvailableTests = availableTests.filter((test) => {
    const matchesSearch = test.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || test.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleStartTest = (e: React.MouseEvent, testId: string) => {
    e.stopPropagation(); // Prevent navigation
    toast.info("Test starting", {
      description: "Preparing your test environment...",
      duration: 2000,
    });
    // Then navigate to the test
    setTimeout(() => navigate(`/test/${testId}`), 500);
  };

  const testVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  };

  return (
    <PageTransition className="bg-slate-50">
      <motion.header
        className="sticky top-0 z-10 bg-white border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <h1 className="text-xl font-bold">Practice Tests</h1>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <SectionTransition className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tests..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Mock Test">Mock Test</SelectItem>
                <SelectItem value="Practice Test">Practice Test</SelectItem>
                <SelectItem value="Section Test">Section Test</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SectionTransition>

        {scheduledTests.length > 0 && (
          <SectionTransition className="mb-10" delay={0.1}>
            <h2 className="text-xl font-semibold mb-4">
              Upcoming Scheduled Tests
            </h2>
            <motion.div
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {scheduledTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  variants={testVariants}
                  custom={index}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className="hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate(`/test/${test.id}`)}
                  >
                    <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <Badge
                          variant={
                            test.type === "Mock Test"
                              ? "destructive"
                              : test.type === "Practice Test"
                                ? "default"
                                : "outline"
                          }
                          className="mb-2"
                        >
                          {test.type}
                        </Badge>
                        <h3 className="font-medium text-lg">{test.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock size={14} className="mr-1" /> {test.duration}
                          <span className="mx-2">•</span>
                          {test.questions} questions
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 text-right">
                          <div className="text-sm font-medium">
                            <Calendar size={14} className="inline mr-1" />{" "}
                            {test.date}
                          </div>
                        </div>
                        <Button onClick={(e) => handleStartTest(e, test.id)}>
                          Start Test
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </SectionTransition>
        )}

        <SectionTransition delay={0.2}>
          <h2 className="text-xl font-semibold mb-4">
            Available Practice Tests
          </h2>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
              <p className="mt-2 text-muted-foreground">Loading tests...</p>
            </div>
          ) : filteredAvailableTests.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">
                No tests found matching your criteria.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {filteredAvailableTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  variants={testVariants}
                  custom={index}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className="hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate(`/test/${test.id}`)}
                  >
                    <CardHeader className="pb-2">
                      <Badge
                        variant={
                          test.type === "Mock Test"
                            ? "destructive"
                            : test.type === "Practice Test"
                              ? "default"
                              : "outline"
                        }
                        className="w-fit mb-2"
                      >
                        {test.type}
                      </Badge>
                      <CardTitle className="text-lg">{test.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" /> {test.duration}
                        </div>
                        <div>{test.questions} questions</div>
                      </div>
                      <Button
                        className="w-full"
                        onClick={(e) => handleStartTest(e, test.id)}
                      >
                        Start Test
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </SectionTransition>
      </main>
    </PageTransition>
  );
};

export default AllTests;
