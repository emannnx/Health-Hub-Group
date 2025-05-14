
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Activity, Droplet, Thermometer, Clock, BarChart, CheckCircle, AlertCircle, ArrowRight, SmilePlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const MyHealth = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = React.useState('weekly');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/?auth=login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }

  // Mock health data
  const healthProfile = user.healthProfile || {
    age: 35,
    gender: 'Male',
    height: 175,
    weight: 70,
    bmi: 22.9,
    bloodType: 'A+',
    genotype: 'AA',
    oxygenLevel: 98,
    conditions: ['Mild Hypertension', 'Seasonal Allergies']
  };

  const healthGoals = [
    { id: 1, name: 'Daily Steps', current: 7500, target: 10000, unit: 'steps', completed: false },
    { id: 2, name: 'Water Intake', current: 6, target: 8, unit: 'glasses', completed: false },
    { id: 3, name: 'Exercise', current: 3, target: 5, unit: 'days', completed: false },
    { id: 4, name: 'Sleep', current: 7, target: 8, unit: 'hours', completed: false },
  ];

  const healthRecommendations = [
    {
      id: 1,
      title: 'Lower Blood Pressure',
      description: 'Reduce sodium intake and practice stress management to help with your mild hypertension.',
      actionItems: [
        { id: 1, text: 'Limit salt intake to less than 2300mg daily', completed: true },
        { id: 2, text: 'Practice 10 minutes of meditation daily', completed: false },
        { id: 3, text: 'Monitor blood pressure 3x weekly', completed: true }
      ],
      icon: <Heart className="h-5 w-5 text-primary" />
    },
    {
      id: 2,
      title: 'Manage Seasonal Allergies',
      description: 'Take preventive measures during high pollen seasons to reduce allergy symptoms.',
      actionItems: [
        { id: 1, text: 'Take antihistamine during high pollen count days', completed: true },
        { id: 2, text: 'Keep windows closed during peak pollen times', completed: true },
        { id: 3, text: 'Shower after outdoor activities', completed: false }
      ],
      icon: <Droplet className="h-5 w-5 text-primary" />
    }
  ];

  const healthTools = [
    {
      title: "Mood Tracker",
      icon: <SmilePlus className="h-8 w-8 text-primary" />,
      description: "Log your daily mood and track patterns over time",
      link: "/mood-tracker",
      isNew: true
    },
    {
      title: "Medication Tracker",
      icon: <Thermometer className="h-8 w-8 text-primary" />,
      description: "Manage your medications and set reminders",
      link: "/medication-tracker",
      isNew: false
    },
    {
      title: "Symptom Checker",
      icon: <AlertCircle className="h-8 w-8 text-primary" />,
      description: "Check your symptoms and get guidance",
      link: "/symptom-checker",
      isNew: false
    },
    {
      title: "Health Calculators",
      icon: <BarChart className="h-8 w-8 text-primary" />,
      description: "Calculate BMI, calories, and more",
      link: "/health-calculators",
      isNew: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-card transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground transition-colors duration-300">My Health</h1>
              <p className="text-muted-foreground mt-2 transition-colors duration-300">
                Your personalized health dashboard and recommendations
              </p>
            </div>
            <ToggleGroup type="single" value={timeframe} onValueChange={(value) => value && setTimeframe(value)} className="mt-4 md:mt-0">
              <ToggleGroupItem value="daily" aria-label="Toggle daily">Daily</ToggleGroupItem>
              <ToggleGroupItem value="weekly" aria-label="Toggle weekly">Weekly</ToggleGroupItem>
              <ToggleGroupItem value="monthly" aria-label="Toggle monthly">Monthly</ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Health Tools Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fade-in">
            {healthTools.map((tool) => (
              <Link key={tool.title} to={tool.link}>
                <Card className="h-full hover:shadow-md transition-all hover:border-primary/50 hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="rounded-full bg-primary/10 p-3 mb-3">
                        {tool.icon}
                      </div>
                      <div className="relative">
                        <h3 className="font-semibold mb-1">{tool.title}</h3>
                        {tool.isNew && (
                          <span className="absolute -right-8 -top-1 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Health Profile Summary */}
          <Card className="mb-8 shadow-md bg-card border-muted hover:border-primary transition-all duration-300 slide-up">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center gap-2 transition-colors duration-300">
                <Activity className="h-6 w-6 text-primary" />
                Health Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-background dark:bg-muted p-4 rounded-lg transition-colors duration-300">
                  <div className="text-sm text-muted-foreground mb-1 transition-colors duration-300">BMI</div>
                  <div className="text-xl font-semibold text-foreground transition-colors duration-300">{healthProfile.bmi}</div>
                  <div className="text-xs text-muted-foreground transition-colors duration-300">
                    {healthProfile.bmi < 18.5 ? 'Underweight' : 
                     healthProfile.bmi < 25 ? 'Normal weight' : 
                     healthProfile.bmi < 30 ? 'Overweight' : 'Obese'}
                  </div>
                </div>
                
                <div className="bg-background dark:bg-muted p-4 rounded-lg transition-colors duration-300">
                  <div className="text-sm text-muted-foreground mb-1 transition-colors duration-300">Blood Type</div>
                  <div className="text-xl font-semibold text-foreground transition-colors duration-300">{healthProfile.bloodType}</div>
                  <div className="text-xs text-muted-foreground transition-colors duration-300">Genotype: {healthProfile.genotype}</div>
                </div>
                
                <div className="bg-background dark:bg-muted p-4 rounded-lg transition-colors duration-300">
                  <div className="text-sm text-muted-foreground mb-1 transition-colors duration-300">Oxygen Level</div>
                  <div className="text-xl font-semibold text-foreground flex items-end transition-colors duration-300">
                    {healthProfile.oxygenLevel}
                    <span className="text-sm ml-1">%</span>
                  </div>
                  <div className="text-xs text-muted-foreground transition-colors duration-300">
                    {healthProfile.oxygenLevel >= 95 ? 'Normal' : 'Below normal'}
                  </div>
                </div>
                
                <div className="bg-background dark:bg-muted p-4 rounded-lg transition-colors duration-300">
                  <div className="text-sm text-muted-foreground mb-1 transition-colors duration-300">Conditions</div>
                  <div className="text-sm font-semibold text-foreground transition-colors duration-300">
                    {healthProfile.conditions.map((condition, index) => (
                      <div key={index}>{condition}</div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Goals */}
          <h2 className="text-2xl font-bold text-foreground mb-4 mt-10 transition-colors duration-300 fade-in">Your Health Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {healthGoals.map((goal, index) => (
              <Card 
                key={goal.id} 
                className="shadow-md bg-card border-muted hover:border-primary transition-all duration-300 pop delay-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-foreground flex items-center justify-between transition-colors duration-300">
                    {goal.name}
                    {goal.current >= goal.target ? (
                      <CheckCircle className="h-5 w-5 text-secondary" />
                    ) : (
                      <Clock className="h-5 w-5 text-primary" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground transition-colors duration-300">Progress</span>
                      <span className="text-foreground font-medium transition-colors duration-300">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Health Recommendations */}
          <h2 className="text-2xl font-bold text-foreground mb-4 mt-10 transition-colors duration-300 fade-in">Personalized Recommendations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {healthRecommendations.map((recommendation, index) => (
              <Card 
                key={recommendation.id} 
                className="shadow-md bg-card border-muted hover:border-primary transition-all duration-300 slide-up delay-200"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center gap-2 transition-colors duration-300">
                    {recommendation.icon}
                    {recommendation.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground transition-colors duration-300">
                    {recommendation.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recommendation.actionItems.map(item => (
                      <li key={item.id} className="flex items-start gap-2">
                        {item.completed ? (
                          <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-primary/80 mt-0.5" />
                        )}
                        <span className={`${item.completed ? 'text-muted-foreground line-through' : 'text-foreground'} transition-colors duration-300`}>
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full justify-between">
                    View detailed plan
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Health Insights */}
          <h2 className="text-2xl font-bold text-foreground mb-4 mt-10 transition-colors duration-300 fade-in">Health Insights</h2>
          <Card className="shadow-md bg-card border-muted hover:border-primary transition-all duration-300 slide-up delay-300">
            <CardHeader>
              <CardTitle className="text-xl text-foreground flex items-center gap-2 transition-colors duration-300">
                <BarChart className="h-5 w-5 text-primary" />
                Weekly Health Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border border-dashed border-muted-foreground rounded-md">
                <p className="text-muted-foreground transition-colors duration-300">Health trend visualization will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyHealth;
