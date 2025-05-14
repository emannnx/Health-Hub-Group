
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Info, AlertCircle, Activity, Heart, Pill } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import healthTopics from '@/data/healthTopics';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for condition details
const conditionData = {
  cardiovascular: {
    overview: "Cardiovascular diseases affect the heart and blood vessels. They're often linked to atherosclerosis, where plaque builds up in arteries.",
    symptoms: ["Chest pain or discomfort", "Shortness of breath", "Pain or discomfort in arms, left shoulder, elbows, jaw", "Nausea, indigestion, or heartburn", "Fatigue", "Dizziness"],
    causes: ["High blood pressure", "High cholesterol", "Smoking", "Diabetes", "Family history", "Age", "Stress"],
    prevention: ["Regular exercise", "Healthy diet low in salt, sugar and fat", "Maintaining healthy weight", "Not smoking", "Limiting alcohol consumption", "Regular health checkups"],
    treatments: ["Lifestyle changes", "Medications like statins, blood thinners", "Surgical procedures in some cases", "Cardiac rehabilitation programs"]
  },
  diabetes: {
    overview: "Diabetes is a chronic disease that affects how your body turns food into energy. With diabetes, your body doesn't make enough insulin or can't use it as well as it should.",
    symptoms: ["Increased thirst", "Frequent urination", "Extreme hunger", "Unexplained weight loss", "Fatigue", "Blurred vision", "Slow-healing sores"],
    causes: ["Type 1: Immune system attacks pancreas", "Type 2: Cells become resistant to insulin", "Gestational: Hormonal changes during pregnancy", "Genetic factors", "Environmental factors"],
    prevention: ["Maintain healthy weight", "Regular physical activity", "Balanced diet", "Avoid smoking", "Moderate alcohol consumption"],
    treatments: ["Insulin therapy", "Oral medications", "Blood sugar monitoring", "Healthy eating and exercise", "Weight loss if needed", "Diabetes education and support"]
  },
  "mental-health": {
    overview: "Mental health includes emotional, psychological, and social well-being. It affects how we think, feel, act, handle stress, relate to others, and make choices.",
    symptoms: ["Feeling sad or down", "Confused thinking", "Excessive fears or worries", "Extreme mood changes", "Withdrawal from friends and activities", "Significant tiredness", "Sleep problems"],
    causes: ["Biological factors like genes or brain chemistry", "Life experiences such as trauma or abuse", "Family history of mental health problems", "Ongoing medical conditions", "Stress", "Isolation"],
    prevention: ["Talk about your feelings", "Stay active", "Eat well", "Drink sensibly", "Keep in touch with friends and loved ones", "Ask for help when needed", "Take breaks", "Do something you're good at"],
    treatments: ["Psychotherapy", "Medication", "Self-help and coping strategies", "Support groups", "Lifestyle changes", "Alternative approaches like meditation"]
  }
};

type ConditionSection = {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

const HealthSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<typeof healthTopics>([]);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Set initial search query from URL parameters
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
      handleSearch(queryParam);
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filteredResults = healthTopics.filter(
      topic => 
        topic.title.toLowerCase().includes(query.toLowerCase()) || 
        topic.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(filteredResults);
    
    // If we have a direct match, select that condition
    const directMatch = filteredResults.find(
      topic => topic.title.toLowerCase() === query.toLowerCase()
    );
    
    if (directMatch) {
      setSelectedCondition(directMatch.id);
    } else if (filteredResults.length === 1) {
      setSelectedCondition(filteredResults[0].id);
    } else {
      setSelectedCondition(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
    // Update URL with search query
    setSearchParams({ q: searchQuery });
  };

  const currentConditionData = selectedCondition && conditionData[selectedCondition as keyof typeof conditionData];

  const conditionSections: ConditionSection[] = currentConditionData
    ? [
        {
          title: 'Overview',
          icon: <Info className="h-5 w-5" />,
          content: <p className="text-foreground">{currentConditionData.overview}</p>
        },
        {
          title: 'Symptoms',
          icon: <AlertCircle className="h-5 w-5" />,
          content: (
            <ul className="list-disc pl-5 space-y-1">
              {currentConditionData.symptoms.map((symptom, index) => (
                <li key={index} className="text-foreground">{symptom}</li>
              ))}
            </ul>
          )
        },
        {
          title: 'Causes',
          icon: <Activity className="h-5 w-5" />,
          content: (
            <ul className="list-disc pl-5 space-y-1">
              {currentConditionData.causes.map((cause, index) => (
                <li key={index} className="text-foreground">{cause}</li>
              ))}
            </ul>
          )
        },
        {
          title: 'Prevention',
          icon: <Heart className="h-5 w-5" />,
          content: (
            <ul className="list-disc pl-5 space-y-1">
              {currentConditionData.prevention.map((prevention, index) => (
                <li key={index} className="text-foreground">{prevention}</li>
              ))}
            </ul>
          )
        },
        {
          title: 'Treatment',
          icon: <Pill className="h-5 w-5" />,
          content: (
            <ul className="list-disc pl-5 space-y-1">
              {currentConditionData.treatments.map((treatment, index) => (
                <li key={index} className="text-foreground">{treatment}</li>
              ))}
            </ul>
          )
        }
      ]
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-card transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-6 fade-in transition-colors duration-300">Health Condition Search</h1>
          
          <form onSubmit={handleSubmit} className="mb-8 slide-up">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for health conditions..."
                  className="pl-10 py-6 text-foreground bg-background dark:bg-card border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white transition-colors">
                Search
              </Button>
            </div>
          </form>

          {!selectedCondition && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 pop">
              {results.map((result, index) => (
                <Card 
                  key={result.id} 
                  className="card-hover cursor-pointer bg-card hover:border-primary transition-all duration-300"
                  onClick={() => {
                    setSelectedCondition(result.id);
                    setSearchParams({ q: result.title });
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-foreground transition-colors duration-300">{result.title}</CardTitle>
                    <CardDescription className="text-muted-foreground transition-colors duration-300">{result.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          {selectedCondition && currentConditionData && (
            <div className="space-y-6 fade-in">
              <Card className="bg-card border-primary shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center gap-2 transition-colors duration-300">
                    {healthTopics.find(t => t.id === selectedCondition)?.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground transition-colors duration-300">
                    {healthTopics.find(t => t.id === selectedCondition)?.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
                      {conditionSections.map((section) => (
                        <TabsTrigger 
                          key={section.title.toLowerCase()} 
                          value={section.title.toLowerCase()}
                          className="flex items-center gap-1"
                        >
                          {section.icon}
                          <span className="hidden sm:inline">{section.title}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {conditionSections.map((section) => (
                      <TabsContent 
                        key={section.title.toLowerCase()} 
                        value={section.title.toLowerCase()}
                        className="mt-4 slide-up"
                      >
                        <Card className="border-0 shadow-none">
                          <CardHeader>
                            <CardTitle className="text-xl text-foreground flex items-center gap-2 transition-colors duration-300">
                              {section.icon} {section.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {section.content}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {!selectedCondition && results.length === 0 && searchQuery && (
            <div className="text-center py-12 fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2 transition-colors duration-300">No results found</h3>
              <p className="text-muted-foreground transition-colors duration-300">
                We couldn't find any conditions matching "{searchQuery}".
                <br />Try searching for a different term or browse our health topics.
              </p>
            </div>
          )}

          {!selectedCondition && !searchQuery && (
            <div className="text-center py-12 fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2 transition-colors duration-300">Search for health conditions</h3>
              <p className="text-muted-foreground transition-colors duration-300">
                Enter a condition name like "diabetes" or "hypertension" to find detailed information.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HealthSearch;
