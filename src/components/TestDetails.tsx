import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  AlertCircle,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

interface TestSection {
  id: number;
  title: string;
  questions: number;
  duration: string;
  description: string;
}

const TestDetails = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(true);
  const [testInProgress, setTestInProgress] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  // Mock data for a test
  const test = {
    id: testId,
    title: "Full IELTS Mock Test",
    type: "Mock Test",
    duration: "2 hours 45 minutes",
    questions: 40,
    description:
      "This comprehensive mock test simulates the actual IELTS exam environment and covers all four sections: Listening, Reading, Writing, and Speaking. Your responses will be evaluated based on the official IELTS marking criteria.",
    instructions: [
      "This test must be completed in one sitting.",
      "You will not be able to pause the timer once the test begins.",
      "Ensure you have a quiet environment and stable internet connection.",
      "For the speaking section, you will need a microphone.",
      "Your results will be available immediately after completion.",
    ],
    sections: [
      {
        id: 1,
        title: "Listening",
        questions: 40,
        duration: "30 minutes",
        description:
          "Four recorded conversations and monologues with 40 questions.",
      },
      {
        id: 2,
        title: "Reading",
        questions: 40,
        duration: "60 minutes",
        description: "Three reading passages with a total of 40 questions.",
      },
      {
        id: 3,
        title: "Writing",
        questions: 2,
        duration: "60 minutes",
        description:
          "Two writing tasks: a graph/chart description and an essay.",
      },
      {
        id: 4,
        title: "Speaking",
        questions: 3,
        duration: "15 minutes",
        description: "Three-part speaking assessment with an examiner.",
      },
    ],
  };

  const handleStartTest = () => {
    setShowInstructions(false);
  };

  const startTestSection = (sectionIndex) => {
    setTestInProgress(true);
    setCurrentSection(sectionIndex);

    // Convert duration string to seconds for timer
    const durationParts = test.sections[sectionIndex].duration.split(" ");
    const minutes = parseInt(durationParts[0]);
    setTimeRemaining(minutes * 60);

    // Start the timer
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clean up timer on component unmount
    return () => clearInterval(timer);
  };

  const completeTest = () => {
    setTestInProgress(false);
    setTestCompleted(true);
    // In a real app, we would submit test answers to the backend here

    // Navigate to results page after a delay
    setTimeout(() => {
      navigate(`/test-results/${testId}`);
    }, 2000);
  };

  const SectionItem = ({ section }: { section: TestSection }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-lg">{section.title}</h4>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              <Clock size={14} className="inline mr-1" /> {section.duration}
            </span>
            <Badge variant="outline">{section.questions} questions</Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {section.description}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
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
          <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
          <div className="flex items-center text-sm">
            <Clock size={16} className="mr-1" /> {test.duration}
            <span className="mx-2">•</span>
            {test.questions} questions
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {showInstructions ? (
          <Card className="mb-8 max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
                Test Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{test.description}</p>
              <div className="space-y-4 mb-8">
                <h3 className="font-medium">Before you begin:</h3>
                <ul className="space-y-2">
                  {test.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <Button size="lg" onClick={handleStartTest}>
                  Start Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-3xl mx-auto">
            {testInProgress ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {test.sections[currentSection].title} Section
                  </h2>
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {Math.floor(timeRemaining / 60)}:
                    {(timeRemaining % 60).toString().padStart(2, "0")}
                  </div>
                </div>

                <Card className="p-6">
                  <h3 className="font-medium mb-4">Section in progress...</h3>
                  <p className="text-muted-foreground mb-6">
                    This is a simulation. In a real application, this would show
                    the actual test questions for the{" "}
                    {test.sections[currentSection].title} section.
                  </p>

                  <div className="space-y-4">
                    <div className="h-32 bg-slate-100 rounded-md flex items-center justify-center text-muted-foreground">
                      Test content would appear here
                    </div>

                    <div className="h-32 bg-slate-100 rounded-md flex items-center justify-center text-muted-foreground">
                      Answer area would appear here
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button onClick={completeTest}>Complete Section</Button>
                  </div>
                </Card>
              </div>
            ) : testCompleted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Test Completed!</h2>
                <p className="text-muted-foreground mb-6">
                  Your responses have been recorded. Redirecting to results...
                </p>
                <div className="flex justify-center">
                  <Button variant="outline" onClick={() => navigate("/")}>
                    Return to Dashboard
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Test Sections</h2>
                {test.sections.map((section, index) => (
                  <div key={section.id} className="mb-4">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-lg">
                            {section.title}
                          </h4>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-muted-foreground">
                              <Clock size={14} className="inline mr-1" />{" "}
                              {section.duration}
                            </span>
                            <Badge variant="outline">
                              {section.questions} questions
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {section.description}
                        </p>
                        <div className="flex justify-end">
                          <Button onClick={() => startTestSection(index)}>
                            Start Section
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setShowInstructions(true)}
                  >
                    Back to Instructions
                  </Button>
                  <Button onClick={() => startTestSection(0)}>
                    Begin Full Test
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        <Card className="mt-8 max-w-3xl mx-auto bg-muted/30 border-dashed">
          <CardContent className="p-6 flex items-center">
            <HelpCircle className="h-10 w-10 text-muted-foreground mr-4" />
            <div>
              <h3 className="font-medium mb-1">Need help?</h3>
              <p className="text-sm text-muted-foreground">
                If you have any questions about this test or encounter technical
                issues, please contact our support team.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestDetails;
