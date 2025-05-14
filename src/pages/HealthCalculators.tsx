import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BMICalculator from '@/components/calculators/BMICalculator';
import { Link } from 'react-router-dom';
import { Calculator, Heart, Activity, Pill } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const HealthCalculators = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-card transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground transition-colors duration-300 mb-2">Health Calculators</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto transition-colors duration-300">
              Useful tools to calculate important health metrics and track your progress.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* BMI Calculator */}
            <div className="md:col-span-2">
              <BMICalculator />
            </div>
            
            {/* Other Calculators (Coming Soon) */}
            <div className="space-y-6">
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-primary" />
                    Heart Rate Zones
                  </CardTitle>
                  <CardDescription>Calculate your target heart rate zones for exercise</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">Helps optimize your workout intensity</p>
                </CardFooter>
              </Card>
              
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-primary" />
                    Calorie Calculator
                  </CardTitle>
                  <CardDescription>Estimate your daily caloric needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">Based on your activity level and goals</p>
                </CardFooter>
              </Card>
              
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Pill className="mr-2 h-5 w-5 text-primary" />
                    Medication Dosage
                  </CardTitle>
                  <CardDescription>Calculate proper medication dosages</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">Always consult with your healthcare provider</p>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">More Health Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link to="/symptom-checker" className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                <p className="font-medium text-primary">Symptom Checker</p>
                <p className="text-sm text-muted-foreground mt-1">Identify possible conditions based on symptoms</p>
              </Link>
              <Link to="/nutrition-guide" className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                <p className="font-medium text-primary">Nutrition Guide</p>
                <p className="text-sm text-muted-foreground mt-1">Learn about healthy eating and meal planning</p>
              </Link>
              <Link to="/exercise-library" className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                <p className="font-medium text-primary">Exercise Library</p>
                <p className="text-sm text-muted-foreground mt-1">Browse our collection of exercises and workouts</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HealthCalculators;
