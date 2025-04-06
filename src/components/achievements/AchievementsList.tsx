import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AchievementBadge from "./AchievementBadge";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

interface AchievementsListProps {
  achievements: Achievement[];
  title?: string;
  description?: string;
  className?: string;
  onAchievementClick?: (achievement: Achievement) => void;
}

const AchievementsList = ({
  achievements,
  title = "Achievements",
  description = "Your earned achievements",
  className = "",
  onAchievementClick,
}: AchievementsListProps) => {
  if (!achievements || achievements.length === 0) {
    return (
      <Card
        className={`border-l-4 border-l-amber-500 hover:shadow-md transition-shadow ${className}`}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6">
            <p className="text-sm text-muted-foreground">No achievements yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`border-l-4 border-l-amber-500 hover:shadow-md transition-shadow ${className}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-500" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AchievementBadge
                name={achievement.name}
                description={achievement.description}
                icon={achievement.icon}
                unlockedAt={achievement.unlockedAt}
                onClick={
                  onAchievementClick
                    ? () => onAchievementClick(achievement)
                    : undefined
                }
              />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsList;
