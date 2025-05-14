
import React from 'react';
import Hero from '@/components/Hero';
import HealthTopics from '@/components/HealthTopics';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { Activity, Heart, Brain, Shield, User, FileText, PieChart, Smile, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <HealthTopics />
        
        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Why Choose HealthHub?
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Our platform offers comprehensive health information and personalized recommendations.
              </p>
            </div>

            <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-health-light-blue">
                  <Heart className="h-8 w-8 text-health-blue" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Personalized Health Insights</h3>
                <p className="mt-2 text-base text-gray-500">
                  Receive tailored health recommendations based on your unique health profile.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-health-light-blue">
                  <Shield className="h-8 w-8 text-health-blue" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Secure Health Data</h3>
                <p className="mt-2 text-base text-gray-500">
                  Your health information is protected with enterprise-grade security.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-health-light-blue">
                  <Brain className="h-8 w-8 text-health-blue" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Expert-Verified Content</h3>
                <p className="mt-2 text-base text-gray-500">
                  All health information is reviewed and verified by medical professionals.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-health-light-blue">
                  <Activity className="h-8 w-8 text-health-blue" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Progress Tracking</h3>
                <p className="mt-2 text-base text-gray-500">
                  Monitor improvements in your health metrics over time.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tools Section */}
        <section className="py-16 bg-health-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Powerful Health Tools
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Discover our complete suite of tools designed to help you manage and improve your health.
              </p>
            </div>
            
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <PieChart className="h-12 w-12 text-health-blue mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Health Calculators</h3>
                <p className="text-gray-600 mb-4">
                  Calculate key health metrics like BMI, calorie needs, target heart rate, and more.
                </p>
                <Link to="/health-calculators" className="inline-flex items-center text-health-blue hover:text-health-dark-blue transition-colors">
                  Try calculators <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <FileText className="h-12 w-12 text-health-blue mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Symptom Checker</h3>
                <p className="text-gray-600 mb-4">
                  Identify possible causes of your symptoms and get guidance on next steps.
                </p>
                <Link to="/symptom-checker" className="inline-flex items-center text-health-blue hover:text-health-dark-blue transition-colors">
                  Check symptoms <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <User className="h-12 w-12 text-health-blue mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Health Dashboard</h3>
                <p className="text-gray-600 mb-4">
                  Track your health journey with personalized recommendations and progress monitoring.
                </p>
                <Link to="/my-health" className="inline-flex items-center text-health-blue hover:text-health-dark-blue transition-colors">
                  View dashboard <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-12 bg-health-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                What Our Users Say
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Real experiences from people who have transformed their health journey with HealthHub.
              </p>
            </div>

            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-health-blue text-white flex items-center justify-center font-bold text-xl">
                    JD
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">John Doe</h4>
                    <p className="text-gray-500 text-sm">Diabetes Management</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "HealthHub helped me understand my diabetes better than any other resource. The personalized recommendations have made managing my condition so much easier."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-health-green text-white flex items-center justify-center font-bold text-xl">
                    MS
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Maria Smith</h4>
                    <p className="text-gray-500 text-sm">Heart Health</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "After my heart attack, I was overwhelmed with information. HealthHub curated exactly what I needed to know and tracked my recovery progress."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-health-blue text-white flex items-center justify-center font-bold text-xl">
                    RJ
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Robert Johnson</h4>
                    <p className="text-gray-500 text-sm">Fitness Journey</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I've tried many health apps, but HealthHub's combination of reliable information and personalized recommendations actually helped me stick to my fitness goals."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                How HealthHub Works
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Our simple process to help you achieve better health outcomes
              </p>
            </div>
            
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
              
              <div className="grid gap-8 grid-cols-1 md:grid-cols-4">
                <div className="relative z-10 text-center">
                  <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-health-blue text-white text-xl font-bold border-4 border-white">
                    1
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Create Account</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Sign up and set up your personal health profile with key information.
                  </p>
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-health-blue text-white text-xl font-bold border-4 border-white">
                    2
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Get Personalized Plan</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Receive customized recommendations based on your health data.
                  </p>
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-health-blue text-white text-xl font-bold border-4 border-white">
                    3
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Track Progress</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Monitor your health improvements and adjust your plan as needed.
                  </p>
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-health-blue text-white text-xl font-bold border-4 border-white">
                    4
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Achieve Goals</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Reach your health targets and maintain your improved wellbeing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-health-blue">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Take control of your health today
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-blue-100 sm:mt-4">
              Join thousands of users who have transformed their health journey with HealthHub.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/?auth=register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-health-blue bg-white hover:bg-blue-50"
                >
                  Create free account
                </a>
              </div>
              <div className="ml-3 inline-flex">
                <a
                  href="/articles"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
                >
                  Browse health topics
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <AuthModal />
    </div>
  );
};

export default Index;
