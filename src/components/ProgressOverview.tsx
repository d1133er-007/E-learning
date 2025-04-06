import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { useUser } from "@/contexts/UserContext";
import { motion } from "framer-motion";
import { BarChart, LineChart, PieChart, TrendingUp } from "lucide-react";

interface ProgressOverviewProps {
  className?: string;
  fullWidth?: boolean;
}

const ProgressOverview = ({
  className = "",
  fullWidth = false,
}: ProgressOverviewProps) => {
  const { stats } = useUser();
  const [viewMode, setViewMode] = useState<"skills" | "history" | "comparison">(
    "skills",
  );

  // Enhanced skills data with target scores and improvement indicators
  const skills = [
    { name: "Reading", progress: 75, target: 80, improving: true },
    { name: "Writing", progress: 60, target: 70, improving: false },
    { name: "Listening", progress: 80, target: 85, improving: true },
    { name: "Speaking", progress: 65, target: 75, improving: true },
  ];

  // Weekly progress data for history view
  const weeklyProgress = [
    { week: "Week 1", reading: 65, writing: 50, listening: 70, speaking: 55 },
    { week: "Week 2", reading: 68, writing: 53, listening: 73, speaking: 58 },
    { week: "Week 3", reading: 70, writing: 55, listening: 75, speaking: 60 },
    { week: "Week 4", reading: 75, writing: 60, listening: 80, speaking: 65 },
  ];

  // Comparison data with average scores
  const comparisonData = {
    reading: { user: 75, average: 70, topPerformers: 85 },
    writing: { user: 60, average: 65, topPerformers: 80 },
    listening: { user: 80, average: 75, topPerformers: 90 },
    speaking: { user: 65, average: 60, topPerformers: 85 },
  };

  const renderSkillsView = () => (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {skills.map((skill) => (
        <motion.div
          key={skill.name}
          className="space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="font-medium flex items-center gap-1">
              {skill.name}
              {skill.improving && (
                <TrendingUp className="h-3 w-3 text-green-500" />
              )}
            </div>
            <div className="text-sm flex items-center gap-2">
              <span className="text-gray-500">{skill.progress}%</span>
              <span className="text-xs text-gray-400">
                Target: {skill.target}%
              </span>
            </div>
          </div>
          <div className="relative">
            <Progress value={skill.progress} className="h-2" />
            <div
              className="absolute top-0 h-2 w-0.5 bg-yellow-400"
              style={{ left: `${skill.target}%` }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderHistoryView = () => (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-sm text-gray-500 mb-2">
        Progress over the last 4 weeks
      </div>
      {Object.keys(weeklyProgress[0])
        .filter((key) => key !== "week")
        .map((skill) => (
          <motion.div
            key={skill}
            className="space-y-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="font-medium capitalize">{skill}</div>
              <div className="text-sm text-gray-500">
                {
                  weeklyProgress[weeklyProgress.length - 1][
                    skill as keyof (typeof weeklyProgress)[0]
                  ]
                }
                %
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full flex">
              {weeklyProgress.map((week, index) => {
                const value = week[skill as keyof typeof week] as number;
                const width = 100 / weeklyProgress.length;
                return (
                  <div
                    key={week.week}
                    className="h-full first:rounded-l-full last:rounded-r-full"
                    style={{
                      width: `${width}%`,
                      backgroundColor: `rgba(79, 70, 229, ${0.4 + index * 0.2})`,
                      height: `${(value / 100) * 8}px`,
                    }}
                    title={`${week.week}: ${value}%`}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}
    </motion.div>
  );

  const renderComparisonView = () => (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-sm text-gray-500 mb-2">
        Your performance compared to others
      </div>
      {Object.entries(comparisonData).map(([skill, data]) => (
        <motion.div
          key={skill}
          className="space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="font-medium capitalize">{skill}</div>
            <div className="text-sm text-gray-500">{data.user}%</div>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-xs text-gray-400 w-full flex justify-between">
                <span>You</span>
                <span>Average</span>
                <span>Top 10%</span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="flex h-full w-full">
                <div
                  className="h-full bg-indigo-500 rounded-l-full"
                  style={{ width: `${data.user}%` }}
                ></div>
                <div
                  className="h-full bg-gray-300"
                  style={{ width: `${100 - data.user}%` }}
                ></div>
              </div>
            </div>
            <div className="relative h-0">
              <div
                className="absolute h-3 w-0.5 bg-gray-400 -top-0.5"
                style={{ left: `${data.average}%` }}
              ></div>
              <div
                className="absolute h-3 w-0.5 bg-green-500 -top-0.5"
                style={{ left: `${data.topPerformers}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <Card className={`${className} ${fullWidth ? "w-full" : ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-indigo-500" />
          Skills Progress
        </CardTitle>
        <CardDescription>
          Track your improvement across all IELTS/PTE skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        {viewMode === "skills" && renderSkillsView()}
        {viewMode === "history" && renderHistoryView()}
        {viewMode === "comparison" && renderComparisonView()}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex gap-2">
          <Button
            variant={viewMode === "skills" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("skills")}
            className="flex items-center gap-1"
          >
            <BarChart className="h-3 w-3" />
            Skills
          </Button>
          <Button
            variant={viewMode === "history" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("history")}
            className="flex items-center gap-1"
          >
            <LineChart className="h-3 w-3" />
            History
          </Button>
          <Button
            variant={viewMode === "comparison" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("comparison")}
            className="flex items-center gap-1"
          >
            <PieChart className="h-3 w-3" />
            Compare
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProgressOverview;
