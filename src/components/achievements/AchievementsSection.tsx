import React, { useState } from "react";
import AchievementsList from "./AchievementsList";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
  className?: string;
}

const AchievementsSection = ({
  achievements = [],
  className = "",
}: AchievementsSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleAchievementClick = (achievement: Achievement) => {
    toast.success(`Achievement: ${achievement.name}`, {
      description: achievement.description,
      duration: 3000,
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold">Your Achievements</h2>
        </div>
        <Button variant="ghost" size="icon">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pb-4">
              <AchievementsList
                achievements={achievements}
                title="Badges Earned"
                description="Achievements you've unlocked on your learning journey"
                onAchievementClick={handleAchievementClick}
                className="border-none shadow-none"
              />

              {achievements.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs text-muted-foreground"
                    onClick={() =>
                      toast.info("View all achievements", {
                        description: "Coming soon!",
                      })
                    }
                  >
                    View All Achievements
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementsSection;
