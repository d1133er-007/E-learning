import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import ProgressOverview from "./ProgressOverview";
import EnrolledCourses from "./EnrolledCourses";
import RecommendedTests from "./RecommendedTests";
import UpcomingClasses from "./UpcomingClasses";
import AchievementsSection from "./achievements/AchievementsSection";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  Clock,
  GraduationCap,
  BarChart,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { PageTransition, SectionTransition } from "./ui/page-transition";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { stats } = useUser();
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    toast.info("Notifications", {
      description: "You have 3 new notifications",
      duration: 3000,
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <PageTransition className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <motion.header
        className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm md:px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-1 items-center gap-2">
          <GraduationCap className="h-6 w-6 text-indigo-600" />
          <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            IELTS & PTE Prep
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={handleNotificationClick}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || "default"}`}
              alt="Avatar"
              className="h-8 w-8 rounded-full ring-2 ring-indigo-100"
            />
          </Button>
          <Button
            variant="outline"
            onClick={() => signOut()}
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            Sign Out
          </Button>
        </div>
      </motion.header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
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
          <motion.div variants={cardVariants} custom={0}>
            <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-500" />
                  Total Courses
                </CardTitle>
                <CardDescription>Your enrolled courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} custom={1}>
            <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-green-500" />
                  Tests Taken
                </CardTitle>
                <CardDescription>Your completed tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} custom={2}>
            <Card className="border-l-4 border-l-yellow-500 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-yellow-500" />
                  Average Score
                </CardTitle>
                <CardDescription>Your test performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.5</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} custom={3}>
            <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  Study Hours
                </CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats?.hoursStudied || 24}h
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} custom={4}>
            <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  Achievements
                </CardTitle>
                <CardDescription>Your badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats?.achievements?.length || 0}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <SectionTransition delay={0.3}>
          <Tabs
            defaultValue="overview"
            className="bg-white rounded-lg shadow-sm p-1"
          >
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="tests">Tests</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <ProgressOverview />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <EnrolledCourses />
                <RecommendedTests />
                <UpcomingClasses />
              </div>
              <SectionTransition delay={0.5}>
                <AchievementsSection
                  achievements={stats?.achievements || []}
                  className="mt-4"
                />
              </SectionTransition>
            </TabsContent>
            <TabsContent value="courses" className="space-y-4">
              <EnrolledCourses fullWidth />
            </TabsContent>
            <TabsContent value="tests" className="space-y-4">
              <RecommendedTests fullWidth />
            </TabsContent>
          </Tabs>
        </SectionTransition>
      </main>
    </PageTransition>
  );
};

export default Dashboard;
