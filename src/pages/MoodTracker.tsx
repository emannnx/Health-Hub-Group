
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MoodSelector from '@/components/mood/MoodSelector';
import MoodCalendar from '@/components/mood/MoodCalendar';
import MoodStreak from '@/components/mood/MoodStreak';
import MoodSuggestion from '@/components/mood/MoodSuggestion';
import MoodRecap from '@/components/mood/MoodRecap';
import MoodPatterns from '@/components/mood/MoodPatterns';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BarChart, Flame, MessageSquare, LineChart } from 'lucide-react';

// Define mood types
export type MoodType = 'happy' | 'sad' | 'anxious' | 'tired' | 'energized' | 'neutral' | 'calm' | 'stressed' | 'excited';

export interface MoodEntry {
  id: string;
  mood: MoodType;
  note?: string;
  date: Date;
  timeOfDay: string;
}

const MoodTracker = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('today');
  
  // Mock mood data
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      id: '1',
      mood: 'happy',
      note: 'Had a great workout today!',
      date: new Date(),
      timeOfDay: 'morning'
    },
    {
      id: '2',
      mood: 'tired',
      note: 'Woke up tired. Too much scrolling last night.',
      date: new Date(Date.now() - 86400000), // Yesterday
      timeOfDay: 'morning'
    },
    {
      id: '3',
      mood: 'energized',
      note: 'Productive day at work',
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      timeOfDay: 'afternoon'
    },
    {
      id: '4',
      mood: 'anxious',
      note: 'Big presentation tomorrow',
      date: new Date(Date.now() - 86400000 * 3), // 3 days ago
      timeOfDay: 'evening'
    }
  ]);
  
  const [currentStreak, setCurrentStreak] = useState(3);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moodNote, setMoodNote] = useState('');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/?auth=login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }
  
  const handleMoodSubmit = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Select how you're feeling today",
        variant: "destructive",
      });
      return;
    }
    
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      note: moodNote,
      date: new Date(),
      timeOfDay: getTimeOfDay(),
    };
    
    setMoodEntries([newEntry, ...moodEntries]);
    setCurrentStreak(currentStreak + 1);
    
    toast({
      title: "Mood logged successfully!",
      description: "Keep up the streak!",
    });
    
    setSelectedMood(null);
    setMoodNote('');
  };
  
  const getTimeOfDay = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-card transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground transition-colors duration-300">Mood Tracker</h1>
              <p className="text-muted-foreground mt-2 transition-colors duration-300">
                Track your mood patterns and build healthy habits
              </p>
            </div>
            <MoodStreak streak={currentStreak} />
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="today" className="text-sm md:text-base">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Today's</span> Mood
              </TabsTrigger>
              <TabsTrigger value="calendar" className="text-sm md:text-base">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Mood</span> Calendar
              </TabsTrigger>
              <TabsTrigger value="patterns" className="text-sm md:text-base">
                <BarChart className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Mood</span> Patterns
              </TabsTrigger>
              <TabsTrigger value="recap" className="text-sm md:text-base">
                <LineChart className="mr-2 h-4 w-4" />
                Weekly Recap
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="space-y-6">
              <Card className="bg-card border-muted shadow-md transition-all duration-300 slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    How are you feeling today?
                  </CardTitle>
                  <CardDescription>Select your mood and add an optional note</CardDescription>
                </CardHeader>
                <CardContent>
                  <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
                  <div className="mt-6">
                    <textarea 
                      className="w-full p-3 rounded-md border border-input bg-background text-foreground"
                      placeholder="Add a note about how you're feeling... (optional)"
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleMoodSubmit}>
                    Log My Mood
                  </Button>
                </CardFooter>
              </Card>
              
              {selectedMood && (
                <MoodSuggestion mood={selectedMood} />
              )}
              
              {moodEntries.length > 0 && (
                <Card className="bg-card border-muted shadow-md">
                  <CardHeader>
                    <CardTitle>Recent Entries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {moodEntries.slice(0, 3).map(entry => (
                        <div key={entry.id} className="p-4 border rounded-lg flex items-start gap-3">
                          <div className="text-2xl">
                            {entry.mood === 'happy' && '😊'}
                            {entry.mood === 'sad' && '😢'}
                            {entry.mood === 'anxious' && '😰'}
                            {entry.mood === 'tired' && '😴'}
                            {entry.mood === 'energized' && '⚡'}
                            {entry.mood === 'neutral' && '😐'}
                            {entry.mood === 'calm' && '😌'}
                            {entry.mood === 'stressed' && '😫'}
                            {entry.mood === 'excited' && '🤩'}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium capitalize">{entry.mood}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(entry.date).toLocaleDateString()}
                              </p>
                            </div>
                            {entry.note && <p className="text-sm mt-1">{entry.note}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="calendar">
              <Card className="bg-card border-muted shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Mood Calendar
                  </CardTitle>
                  <CardDescription>View your mood history and patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <MoodCalendar moodEntries={moodEntries} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="patterns">
              <Card className="bg-card border-muted shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Mood Patterns & Trends
                  </CardTitle>
                  <CardDescription>
                    Insights based on your recent mood logs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MoodPatterns moodEntries={moodEntries} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recap">
              <Card className="bg-card border-muted shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    Weekly Mood Recap
                  </CardTitle>
                  <CardDescription>
                    Your mood summary for the last 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MoodRecap moodEntries={moodEntries.slice(0, 7)} streak={currentStreak} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MoodTracker;
