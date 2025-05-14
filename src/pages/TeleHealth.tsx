
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const TeleHealth = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-card transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground transition-colors duration-300 mb-4">TeleHealth Services</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto transition-colors duration-300">
              Connect with healthcare providers remotely for consultations, follow-ups, and health advice.
            </p>
          </div>
          
          <Card className="p-12 text-center">
            <CardHeader>
              <CardTitle>Coming Soon!</CardTitle>
              <CardDescription>
                We're currently building our telehealth platform to connect you with qualified healthcare providers from the comfort of your home.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>In the meantime, you can explore other sections of HealthHub or view your health profile to prepare for future telehealth appointments.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button>View Health Profile</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeleHealth;
