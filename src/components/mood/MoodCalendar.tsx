
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { type MoodEntry } from '@/pages/MoodTracker';

interface MoodCalendarProps {
  moodEntries: MoodEntry[];
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({ moodEntries }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);

  // Function to get entries for a specific date
  const getEntryForDate = (date: Date | undefined) => {
    if (!date) return null;
    
    return moodEntries.find(entry => 
      new Date(entry.date).toDateString() === new Date(date).toDateString()
    ) || null;
  };

  // Handle calendar date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedEntry(getEntryForDate(date));
  };

  // Function to get appropriate mood color for date decoration
  const getMoodColor = (mood: string): string => {
    switch (mood) {
      case 'happy': return 'bg-green-500';
      case 'sad': return 'bg-blue-500';
      case 'anxious': return 'bg-amber-500';
      case 'tired': return 'bg-gray-400';
      case 'energized': return 'bg-yellow-400';
      case 'neutral': return 'bg-gray-300';
      case 'calm': return 'bg-teal-400';
      case 'stressed': return 'bg-red-500';
      case 'excited': return 'bg-purple-500';
      default: return 'bg-gray-300';
    }
  };

  // Function to decorate calendar days with mood indicators
  const decorateDay = (date: Date) => {
    const entry = moodEntries.find(e => 
      new Date(e.date).toDateString() === date.toDateString()
    );
    
    if (!entry) return {};
    
    return {
      className: 'relative',
      children: (
        <div 
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 ${getMoodColor(entry.mood)} rounded-full mb-1`}
        />
      ),
    };
  };

  const getMoodEmoji = (mood: string): string => {
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

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="border rounded-md p-4"
          modifiers={{
            booked: moodEntries.map(e => new Date(e.date)),
          }}
          modifiersStyles={{
            booked: {
              fontWeight: 'bold',
            }
          }}
          components={{
            DayContent: (props) => {
              const dateIsInEntries = moodEntries.some(
                entry => new Date(entry.date).toDateString() === props.date.toDateString()
              );
              
              if (!dateIsInEntries) return <>{props.date.getDate()}</>;
              
              return (
                <div>
                  {props.date.getDate()}
                  {decorateDay(props.date).children}
                </div>
              );
            }
          }}
        />
      </div>
      
      <div className="lg:w-1/2">
        {selectedEntry ? (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{getMoodEmoji(selectedEntry.mood)}</span>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium capitalize text-lg">{selectedEntry.mood}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedEntry.date).toLocaleDateString()} • {selectedEntry.timeOfDay}
                    </p>
                  </div>
                  {selectedEntry.note ? (
                    <p className="mt-2">{selectedEntry.note}</p>
                  ) : (
                    <p className="text-muted-foreground italic mt-2">No note added</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : selectedDate ? (
          <div className="flex flex-col items-center justify-center h-full bg-muted/30 rounded-lg p-6 text-center">
            <p className="text-muted-foreground mb-2">No mood entry for</p>
            <p className="font-medium">{selectedDate.toLocaleDateString()}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-muted/30 rounded-lg p-6 text-center">
            <p className="text-muted-foreground">Select a date to see your mood entry</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodCalendar;
