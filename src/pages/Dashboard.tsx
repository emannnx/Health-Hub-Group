
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Activity, Heart, Calculator, FileText, Bell, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-health-blue border-t-transparent"></div>
          <p className="mt-2 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/?auth=login" replace />;
  }

  // Check if health profile is complete
  const isProfileComplete = !!user.healthProfile;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-health-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 mt-1">Here's your health dashboard</p>
              </div>
              <div className="mt-4 md:mt-0">
                {isProfileComplete ? (
                  <Link to="/profile" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-health-blue hover:bg-blue-700">
                    Update health profile
                  </Link>
                ) : (
                  <Link to="/profile" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-health-green hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Complete health profile
                  </Link>
                )}
              </div>
            </div>
          </div>

          {isProfileComplete ? (
            <>
              {/* Health status cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-health-light-blue rounded-full p-2 mr-3">
                      <Heart className="h-6 w-6 text-health-blue" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Overall Status</h3>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <div className="text-2xl font-bold text-health-green">Good</div>
                    <div className="text-sm text-gray-600">2 concerns</div>
                  </div>
                  <div className="mt-4 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-health-green rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-health-light-blue rounded-full p-2 mr-3">
                      <Activity className="h-6 w-6 text-health-blue" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Vital Signs</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">O₂ Level</p>
                      <p className="text-xl font-bold">{user.healthProfile.oxygenLevel}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">BMI</p>
                      <p className="text-xl font-bold">{user.healthProfile.bmi}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-health-light-blue rounded-full p-2 mr-3">
                      <Calculator className="h-6 w-6 text-health-blue" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Blood Info</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">Blood Type</p>
                      <p className="text-xl font-bold">{user.healthProfile.bloodType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Genotype</p>
                      <p className="text-xl font-bold">{user.healthProfile.genotype}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-health-light-blue rounded-full p-2 mr-3">
                      <FileText className="h-6 w-6 text-health-blue" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Conditions</h3>
                  </div>
                  {user.healthProfile.conditions.length > 0 ? (
                    <ul className="space-y-1 mt-2">
                      {user.healthProfile.conditions.map((condition, index) => (
                        <li key={index} className="text-gray-700 flex items-center">
                          <span className="h-2 w-2 rounded-full bg-health-blue mr-2"></span>
                          {condition}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 mt-2">No conditions recorded</p>
                  )}
                </div>
              </div>

              {/* Recommendations and Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Personalized Recommendations</h2>
                      <Link to="/articles" className="text-health-blue hover:text-blue-700 text-sm font-medium">
                        View all
                      </Link>
                    </div>
                    {user.healthProfile.conditions.includes("Mild Hypertension") && (
                      <div className="mb-6 border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Managing Hypertension
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Based on your mild hypertension diagnosis, consider these recommendations:
                        </p>
                        <ul className="space-y-3">
                          <li className="flex">
                            <div className="flex-shrink-0">
                              <div className="h-6 w-6 rounded-full bg-health-light-green flex items-center justify-center text-health-green">
                                1
                              </div>
                            </div>
                            <p className="ml-3 text-gray-700">
                              Reduce sodium intake to less than 2,300mg per day
                            </p>
                          </li>
                          <li className="flex">
                            <div className="flex-shrink-0">
                              <div className="h-6 w-6 rounded-full bg-health-light-green flex items-center justify-center text-health-green">
                                2
                              </div>
                            </div>
                            <p className="ml-3 text-gray-700">
                              Engage in moderate aerobic activity for at least 150 minutes per week
                            </p>
                          </li>
                          <li className="flex">
                            <div className="flex-shrink-0">
                              <div className="h-6 w-6 rounded-full bg-health-light-green flex items-center justify-center text-health-green">
                                3
                              </div>
                            </div>
                            <p className="ml-3 text-gray-700">
                              Monitor blood pressure twice daily and record readings
                            </p>
                          </li>
                        </ul>
                        <div className="mt-4">
                          <Link to="/article/understanding-hypertension" className="text-health-blue hover:text-blue-700 font-medium">
                            Read more about managing hypertension →
                          </Link>
                        </div>
                      </div>
                    )}

                    {user.healthProfile.conditions.includes("Seasonal Allergies") && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Managing Seasonal Allergies
                        </h3>
                        <p className="text-gray-600 mb-4">
                          For your seasonal allergies, we recommend:
                        </p>
                        <ul className="space-y-3">
                          <li className="flex">
                            <div className="flex-shrink-0">
                              <div className="h-6 w-6 rounded-full bg-health-light-green flex items-center justify-center text-health-green">
                                1
                              </div>
                            </div>
                            <p className="ml-3 text-gray-700">
                              Track local pollen counts and limit outdoor activities when counts are high
                            </p>
                          </li>
                          <li className="flex">
                            <div className="flex-shrink-0">
                              <div className="h-6 w-6 rounded-full bg-health-light-green flex items-center justify-center text-health-green">
                                2
                              </div>
                            </div>
                            <p className="ml-3 text-gray-700">
                              Use HEPA filters in your home to reduce allergen exposure
                            </p>
                          </li>
                          <li className="flex">
                            <div className="flex-shrink-0">
                              <div className="h-6 w-6 rounded-full bg-health-light-green flex items-center justify-center text-health-green">
                                3
                              </div>
                            </div>
                            <p className="ml-3 text-gray-700">
                              Consider non-drowsy antihistamines during peak allergy season
                            </p>
                          </li>
                        </ul>
                        <div className="mt-4">
                          <a href="#" className="text-health-blue hover:text-blue-700 font-medium">
                            Read more about seasonal allergies →
                          </a>
                        </div>
                      </div>
                    )}

                    {user.healthProfile.conditions.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">No specific recommendations yet.</p>
                        <Link
                          to="/profile"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-health-blue hover:bg-blue-700"
                        >
                          Update health information
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Alerts</h2>
                      <Bell className="h-5 w-5 text-health-blue" />
                    </div>
                    <div className="space-y-4">
                      {user.healthProfile.conditions.includes("Mild Hypertension") && (
                        <div className="border-l-4 border-yellow-500 pl-4 py-2">
                          <p className="text-sm font-medium text-gray-900">Blood Pressure Check</p>
                          <p className="text-xs text-gray-500 mt-1">Due in 3 days</p>
                        </div>
                      )}
                      <div className="border-l-4 border-health-green pl-4 py-2">
                        <p className="text-sm font-medium text-gray-900">Annual Physical Exam</p>
                        <p className="text-xs text-gray-500 mt-1">Due in 3 months</p>
                      </div>
                      <div className="border-l-4 border-health-blue pl-4 py-2">
                        <p className="text-sm font-medium text-gray-900">Update Health Profile</p>
                        <p className="text-xs text-gray-500 mt-1">Last updated 30 days ago</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Recommended readings</h3>
                      <ul className="space-y-3">
                        <li>
                          <Link 
                            to="/article/understanding-hypertension" 
                            className="block hover:bg-gray-50 p-2 -mx-2 rounded transition-colors"
                          >
                            <p className="text-sm font-medium text-gray-900">Understanding Hypertension</p>
                            <p className="text-xs text-gray-500">7 min read</p>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/article/nutrition-essentials" 
                            className="block hover:bg-gray-50 p-2 -mx-2 rounded transition-colors"
                          >
                            <p className="text-sm font-medium text-gray-900">Essential Nutrition</p>
                            <p className="text-xs text-gray-500">10 min read</p>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/article/exercise-benefits" 
                            className="block hover:bg-gray-50 p-2 -mx-2 rounded transition-colors"
                          >
                            <p className="text-sm font-medium text-gray-900">Benefits of Exercise</p>
                            <p className="text-xs text-gray-500">8 min read</p>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-health-light-blue rounded-full flex items-center justify-center mb-4">
                <Plus className="h-8 w-8 text-health-blue" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Complete Your Health Profile</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                To receive personalized health recommendations and insights, please complete your health profile with essential information.
              </p>
              <Link 
                to="/profile" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-health-blue hover:bg-blue-700"
              >
                Complete Profile
              </Link>
              <div className="mt-8 pt-6 border-t border-gray-200 max-w-md mx-auto">
                <h3 className="text-lg font-medium mb-3">Why create a health profile?</h3>
                <ul className="text-left space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-health-green mt-0.5">✓</div>
                    <p className="ml-2 text-gray-600">Get personalized health recommendations</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-health-green mt-0.5">✓</div>
                    <p className="ml-2 text-gray-600">Track your health metrics over time</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-health-green mt-0.5">✓</div>
                    <p className="ml-2 text-gray-600">Receive alerts for important health checkups</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
