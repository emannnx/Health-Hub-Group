
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, User, Activity, Heart, Calendar, Shield, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-background dark:bg-card overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-background dark:bg-card sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 transition-colors duration-300">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-background dark:text-card transform translate-x-1/2 transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl transition-colors duration-300 fade-in">
                <span className="block">Your health,</span>{' '}
                <span className="block text-primary slide-in-right delay-100">personalized</span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 transition-colors duration-300 fade-in delay-200">
                HealthHub provides reliable health information and personalized recommendations based on your unique health profile. Take control of your wellbeing today.
              </p>
              
              <div className="mt-5 space-y-2 fade-in delay-300">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span className="text-foreground">Evidence-based health information</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span className="text-foreground">Personalized wellness recommendations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span className="text-foreground">Track medications and symptoms</span>
                </div>
              </div>
              
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start slide-up delay-300">
                <div className="rounded-md shadow">
                  <Link
                    to="/health-search"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Conditions
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/my-health"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                  >
                    <Activity className="w-5 h-5 mr-2" />
                    My Health
                  </Link>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 fade-in delay-400">
                <div className="p-2 sm:p-3 bg-primary/5 rounded-lg text-center">
                  <Heart className="h-6 w-6 text-primary mx-auto mb-1" />
                  <p className="text-xs sm:text-sm font-medium">Health Tracking</p>
                </div>
                <div className="p-2 sm:p-3 bg-primary/5 rounded-lg text-center">
                  <Calendar className="h-6 w-6 text-primary mx-auto mb-1" />
                  <p className="text-xs sm:text-sm font-medium">Medication Reminders</p>
                </div>
                <div className="p-2 sm:p-3 bg-primary/5 rounded-lg text-center">
                  <Shield className="h-6 w-6 text-primary mx-auto mb-1" />
                  <p className="text-xs sm:text-sm font-medium">Emergency Guide</p>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 fade-in delay-400">
                <Link
                  to="/?auth=register"
                  className="inline-flex items-center text-primary hover:text-primary/90 transition-colors duration-200"
                >
                  <User className="w-4 h-4 mr-1" /> Create free account
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full transition-transform duration-500 hover:scale-105"
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoJTIwY2hlY2t1cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt="Doctor with patient"
        />
      </div>
    </div>
  );
};

export default Hero;
