
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ExerciseLibrary = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-card transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground transition-colors duration-300 mb-4">Exercise Library</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto transition-colors duration-300">
              Discover exercises, workouts, and fitness guidance tailored to your health needs.
            </p>
          </div>
          
          <Card className="p-12 text-center">
            <CardHeader>
              <CardTitle>Coming Soon!</CardTitle>
              <CardDescription>
                We're currently building our exercise library with instructional videos, workout plans, and customized fitness recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>In the meantime, you can explore other sections of HealthHub or visit our health articles for fitness-related content.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button>Explore Articles</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExerciseLibrary;
