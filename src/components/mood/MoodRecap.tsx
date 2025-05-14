
import React from 'react';
import { type MoodEntry } from '@/pages/MoodTracker';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Quote, Flame } from 'lucide-react';

interface MoodRecapProps {
  moodEntries: MoodEntry[];
  streak: number;
}

const MoodRecap: React.FC<MoodRecapProps> = ({ moodEntries, streak }) => {
  const getWeekSummary = () => {
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
        count
      }));
  };
  
  const getBestQuote = () => {
    const entriesWithNotes = moodEntries.filter(entry => entry.note && entry.note.trim() !== '');
    
    if (entriesWithNotes.length === 0) {
      return null;
    }
    
    // For demo purposes, just returning the first note with content
    return entriesWithNotes[0];
  };

  const weekSummary = getWeekSummary();
  const bestQuote = getBestQuote();
  
  const getEmoji = (mood: string): string => {
    switch (mood) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'anxious': return '😰';
      case 'tired': return '😴';
      case 'energized': return '⚡';
      case 'neutral': return '😐';
      case 'calm': return '😌';
      case 'stressed': return '😫';
      case 'excited': return '🤩';
      default: return '😐';
    }
  };

  if (moodEntries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No mood entries to recap this week</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <BarChart className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-3">7-Day Mood Pattern</h3>
              <p className="text-sm mb-4">
                {weekSummary.map((item, index) => (
                  <React.Fragment key={item.mood}>
                    <span className="font-medium">{item.count}</span>
                    <span> {item.count === 1 ? 'day' : 'days'} feeling </span>
                    <span className="capitalize font-medium">{item.mood}</span>
                    {index < weekSummary.length - 1 && <span>, </span>}
                  </React.Fragment>
                ))}
              </p>
              <div className="flex mt-2 gap-1">
                {Array(7).fill(0).map((_, i) => {
                  const entry = i < moodEntries.length ? moodEntries[i] : null;
                  return (
                    <div 
                      key={i} 
                      className={`h-10 flex-1 rounded flex items-center justify-center ${
                        entry ? 'bg-secondary' : 'bg-muted'
                      }`}
                    >
                      {entry ? (
                        <span className="text-lg">{getEmoji(entry.mood)}</span>
                      ) : (
                        <span className="text-muted-foreground text-xs">No data</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {bestQuote && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Quote className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium mb-3">Highlight of the Week</h3>
                <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                  "{bestQuote.note}"
                </blockquote>
                <div className="flex justify-end mt-2 text-sm">
                  <span className="text-muted-foreground">
                    {new Date(bestQuote.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Flame className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-2">Streak Status</h3>
              <p className="text-sm">
                {streak > 0 ? (
                  <>You're on a <span className="font-medium">{streak}-day streak</span> of logging your mood. Keep it up!</>
                ) : (
                  <>Start a new streak by logging your mood today!</>
                )}
              </p>
              
              <div className="mt-4 flex gap-1">
                {Array(7).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 flex-1 rounded ${
                      i < streak ? 'bg-orange-500' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodRecap;
