
import React from 'react';
import { Flame } from 'lucide-react';

interface MoodStreakProps {
  streak: number;
}

const MoodStreak: React.FC<MoodStreakProps> = ({ streak }) => {
  return (
    <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
      <Flame className={`h-5 w-5 ${streak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
      <div>
        <span className="text-sm font-medium">{streak}</span>
        <span className="text-sm text-muted-foreground ml-1">day streak</span>
      </div>
    </div>
  );
};

export default MoodStreak;
