import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Clock, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RecommendedTestsProps {
  fullWidth?: boolean;
  className?: string;
}

const RecommendedTests = ({
  fullWidth = false,
  className = "",
}: RecommendedTestsProps) => {
  const navigate = useNavigate();

  const tests = [
    {
      id: 1,
      title: "IELTS Academic Writing Task 2",
      type: "Writing",
      duration: 40,
      difficulty: "Medium",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80",
    },
    {
      id: 2,
      title: "PTE Describe Image Practice",
      type: "Speaking",
      duration: 30,
      difficulty: "Hard",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
    },
    {
      id: 3,
      title: "IELTS Reading Practice Test",
      type: "Reading",
      duration: 60,
      difficulty: "Medium",
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80",
    },
    {
      id: 4,
      title: "PTE Summarize Written Text",
      type: "Writing",
      duration: 20,
      difficulty: "Easy",
      image:
        "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=500&q=80",
    },
  ];

  const handleStartTest = (testId: number) => {
    navigate(`/test/${testId}`);
  };

  return (
    <Card className={`${className} ${fullWidth ? "w-full" : ""}`}>
      <CardHeader>
        <CardTitle>Recommended Tests</CardTitle>
        <CardDescription>Practice tests based on your progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`grid gap-4 ${fullWidth ? "md:grid-cols-2 lg:grid-cols-3" : ""}`}
        >
          {tests.slice(0, fullWidth ? tests.length : 2).map((test) => (
            <div
              key={test.id}
              className="overflow-hidden rounded-lg border bg-white"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={test.image}
                  alt={test.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{test.title}</h3>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <FileText className="mr-1 h-4 w-4" />
                    <span>{test.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{test.duration} min</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs ${test.difficulty === "Easy" ? "bg-green-100 text-green-800" : test.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                  >
                    {test.difficulty}
                  </span>
                </div>
                <Button
                  className="mt-4 w-full"
                  onClick={() => handleStartTest(test.id)}
                >
                  Start Test
                </Button>
              </div>
            </div>
          ))}

          {!fullWidth && tests.length > 2 && (
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => navigate("/tests")}
            >
              View All Tests
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedTests;
