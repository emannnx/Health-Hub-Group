
import React from 'react';
import { type MoodEntry } from '@/pages/MoodTracker';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Info, TrendingUp } from 'lucide-react';

interface MoodPatternsProps {
  moodEntries: MoodEntry[];
}

const MoodPatterns: React.FC<MoodPatternsProps> = ({ moodEntries }) => {
  // Helper to get day of week
  const getDayOfWeek = (date: Date): string => {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
  };
  
  // Function to analyze common moods by day of week
  const getMoodByDayPattern = () => {
    const dayMap: Record<string, Record<string, number>> = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    days.forEach(day => {
      dayMap[day] = {};
    });
    
    moodEntries.forEach(entry => {
      const day = getDayOfWeek(new Date(entry.date));
      if (!dayMap[day][entry.mood]) {
        dayMap[day][entry.mood] = 1;
      } else {
        dayMap[day][entry.mood]++;
      }
    });
    
    // Find most common mood for each day
    const patterns = Object.entries(dayMap).map(([day, moods]) => {
      if (Object.keys(moods).length === 0) {
        return null;
      }
      
      const mostCommonMood = Object.entries(moods).reduce(
        (prev, current) => (current[1] > prev[1] ? current : prev),
        ['', 0]
      );
      
      return {
        day,
        mood: mostCommonMood[0],
        count: mostCommonMood[1]
      };
    }).filter(Boolean);
    
    // Return a subset of significant patterns
    return patterns.filter(p => p?.count && p.count > 0);
  };
  
  // Function to analyze patterns by time of day
  const getMoodByTimePattern = () => {
    const timeMap: Record<string, Record<string, number>> = {
      'morning': {},
      'afternoon': {},
      'evening': {}
    };
    
    moodEntries.forEach(entry => {
      if (!timeMap[entry.timeOfDay][entry.mood]) {
        timeMap[entry.timeOfDay][entry.mood] = 1;
      } else {
        timeMap[entry.timeOfDay][entry.mood]++;
      }
    });
    
    // Find most common mood for each time of day
    return Object.entries(timeMap).map(([time, moods]) => {
      if (Object.keys(moods).length === 0) {
        return {
          time,
          mood: null,
          count: 0
        };
      }
      
      const mostCommonMood = Object.entries(moods).reduce(
        (prev, current) => (current[1] > prev[1] ? current : prev),
        ['', 0]
      );
      
      return {
        time,
        mood: mostCommonMood[0],
        count: mostCommonMood[1]
      };
    });
  };
  
  // Function to get mood distribution
  const getMoodDistribution = () => {
    const distribution: Record<string, number> = {};
    
    moodEntries.forEach(entry => {
      if (!distribution[entry.mood]) {
        distribution[entry.mood] = 1;
      } else {
        distribution[entry.mood]++;
      }
    });
    
    return Object.entries(distribution)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([mood, count]) => ({
        mood,
        count,
        percentage: (count / moodEntries.length) * 100
      }));
  };

  // Get insights
  const dayPatterns = getMoodByDayPattern();
  const timePatterns = getMoodByTimePattern().filter(p => p.mood !== null);
  const moodDistribution = getMoodDistribution();
  
  // If there are not enough entries
  if (moodEntries.length < 3) {
    return (
      <div className="text-center py-10">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Not Enough Data Yet</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Add more mood entries to see patterns and insights about your mood trends.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-2">Your Most Common Mood</h3>
                {moodDistribution.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {moodDistribution[0].mood === 'happy' && '😊'}
                      {moodDistribution[0].mood === 'sad' && '😢'}
                      {moodDistribution[0].mood === 'anxious' && '😰'}
                      {moodDistribution[0].mood === 'tired' && '😴'}
                      {moodDistribution[0].mood === 'energized' && '⚡'}
                      {moodDistribution[0].mood === 'neutral' && '😐'}
                      {moodDistribution[0].mood === 'calm' && '😌'}
                      {moodDistribution[0].mood === 'stressed' && '😫'}
                      {moodDistribution[0].mood === 'excited' && '🤩'}
                    </span>
                    <p className="capitalize">{moodDistribution[0].mood}</p>
                    <p className="text-xs text-muted-foreground">
                      ({Math.round(moodDistribution[0].percentage)}%)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {dayPatterns.length > 0 && (
          <Card className="bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-2">Day of Week Pattern</h3>
                  <p className="text-sm">
                    You feel most <span className="font-medium capitalize">{dayPatterns[0]?.mood}</span> on <span className="font-medium">{dayPatterns[0]?.day}s</span>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {timePatterns.length > 0 && (
          <Card className="bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-2">Time of Day Pattern</h3>
                  <p className="text-sm">
                    You're typically <span className="font-medium capitalize">{timePatterns[0]?.mood}</span> in the <span className="font-medium">{timePatterns[0]?.time}</span>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-4">Your Mood Distribution</h3>
          <div className="space-y-3">
            {moodDistribution.map((item) => (
              <div key={item.mood} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span>
                      {item.mood === 'happy' && '😊'}
                      {item.mood === 'sad' && '😢'}
                      {item.mood === 'anxious' && '😰'}
                      {item.mood === 'tired' && '😴'}
                      {item.mood === 'energized' && '⚡'}
                      {item.mood === 'neutral' && '😐'}
                      {item.mood === 'calm' && '😌'}
                      {item.mood === 'stressed' && '😫'}
                      {item.mood === 'excited' && '🤩'}
                    </span>
                    <span className="capitalize">{item.mood}</span>
                  </span>
                  <span className="text-muted-foreground">{Math.round(item.percentage)}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodPatterns;
