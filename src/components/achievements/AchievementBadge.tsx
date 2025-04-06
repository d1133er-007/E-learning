import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as LucideIcons from "lucide-react";

interface AchievementBadgeProps {
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const AchievementBadge = ({
  name,
  description,
  icon,
  unlockedAt,
  size = "md",
  onClick,
}: AchievementBadgeProps) => {
  // Dynamically get the icon from lucide-react
  const IconComponent =
    LucideIcons[icon as keyof typeof LucideIcons] || LucideIcons.Award;

  // Format the unlocked date if available
  const formattedDate = unlockedAt
    ? new Date(unlockedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  // Size classes
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full bg-gradient-to-br from-amber-100 to-amber-300 hover:from-amber-200 hover:to-amber-400 border-amber-400 ${onClick ? "cursor-pointer" : "cursor-default"}`}
            onClick={onClick}
          >
            <IconComponent className={`${sizeClasses[size]} text-amber-700`} />
            <span className="sr-only">{name}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
            {formattedDate && (
              <p className="text-xs text-muted-foreground">
                Unlocked on {formattedDate}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AchievementBadge;
