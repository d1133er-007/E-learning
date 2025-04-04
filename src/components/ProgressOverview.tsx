import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";

interface ProgressOverviewProps {
  className?: string;
}

const ProgressOverview = ({ className = "" }: ProgressOverviewProps) => {
  const skills = [
    { name: "Reading", progress: 75 },
    { name: "Writing", progress: 60 },
    { name: "Listening", progress: 80 },
    { name: "Speaking", progress: 65 },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Skills Progress</CardTitle>
        <CardDescription>
          Track your improvement across all IELTS/PTE skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{skill.name}</div>
                <div className="text-sm text-gray-500">{skill.progress}%</div>
              </div>
              <Progress value={skill.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
