
import React from 'react';
import { type MoodType } from '@/pages/MoodTracker';

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  setSelectedMood: (mood: MoodType) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, setSelectedMood }) => {
  const moods: Array<{ type: MoodType, emoji: string, label: string }> = [
    { type: 'happy', emoji: '😊', label: 'Happy' },
    { type: 'sad', emoji: '😢', label: 'Sad' },
    { type: 'anxious', emoji: '😰', label: 'Anxious' },
    { type: 'tired', emoji: '😴', label: 'Tired' },
    { type: 'energized', emoji: '⚡', label: 'Energized' },
    { type: 'neutral', emoji: '😐', label: 'Neutral' },
    { type: 'calm', emoji: '😌', label: 'Calm' },
    { type: 'stressed', emoji: '😫', label: 'Stressed' },
    { type: 'excited', emoji: '🤩', label: 'Excited' }
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
      {moods.map((mood) => (
        <button
          key={mood.type}
          onClick={() => setSelectedMood(mood.type)}
          className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
            selectedMood === mood.type 
              ? 'bg-primary text-primary-foreground scale-105 shadow-lg' 
              : 'bg-secondary hover:bg-secondary/80'
          }`}
        >
          <span className="text-2xl mb-2">{mood.emoji}</span>
          <span className="text-xs font-medium">{mood.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
