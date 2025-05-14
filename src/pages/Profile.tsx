
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

type HealthProfile = {
  age: number;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
  bloodType: string;
  genotype: string;
  oxygenLevel: number;
  conditions: string[];
};

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genotypes = ["AA", "AS", "SS", "AC", "SC", "CC"];
const commonConditions = [
  "Hypertension",
  "Diabetes Type 1",
  "Diabetes Type 2",
  "Asthma",
  "Heart Disease",
  "Allergies",
  "Arthritis",
  "Chronic Pain",
  "Thyroid Issues",
  "Anxiety",
  "Depression",
  "Migraine",
  "Insomnia",
];

const ProfilePage = () => {
  const { isAuthenticated, user, updateHealthProfile, isLoading } = useAuth();
  const { toast } = useToast();
  
  const initialProfile: HealthProfile = user?.healthProfile || {
    age: 30,
    gender: "Male",
    height: 175,
    weight: 70,
    bmi: 22.9,
    bloodType: "A+",
    genotype: "AA",
    oxygenLevel: 98,
    conditions: [],
  };
  
  const [profile, setProfile] = useState<HealthProfile>(initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [hasFamilyHistory, setHasFamilyHistory] = useState(false);
  const [familyHistory, setFamilyHistory] = useState("");

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: name === "age" || name === "height" || name === "weight" || name === "oxygenLevel"
        ? parseFloat(value)
        : value
    });
    
    // Recalculate BMI when height or weight changes
    if (name === "height" || name === "weight") {
      const height = name === "height" ? parseFloat(value) / 100 : profile.height / 100;
      const weight = name === "weight" ? parseFloat(value) : profile.weight;
      const bmi = weight / (height * height);
      setProfile(prev => ({
        ...prev,
        bmi: parseFloat(bmi.toFixed(1))
      }));
    }
  };

  const handleConditionToggle = (condition: string) => {
    setProfile(prev => {
      if (prev.conditions.includes(condition)) {
        return {
          ...prev,
          conditions: prev.conditions.filter(c => c !== condition)
        };
      } else {
        return {
          ...prev,
          conditions: [...prev.conditions, condition]
        };
      }
    });
  };

  const handleAddCustomCondition = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const customCondition = new FormData(form).get('customCondition') as string;
    
    if (customCondition && !profile.conditions.includes(customCondition)) {
      setProfile(prev => ({
        ...prev,
        conditions: [...prev.conditions, customCondition]
      }));
      form.reset();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Add family history to profile if applicable
      const updatedProfile = {
        ...profile,
        familyHistory: hasFamilyHistory ? familyHistory : undefined
      };
      
      // Call updateHealthProfile function from auth context
      updateHealthProfile(updatedProfile);
      
      toast({
        title: "Success",
        description: "Your health profile has been updated.",
      });
      
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update your health profile.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-health-gray py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Health Profile</h1>
              <p className="text-gray-600">Complete your health profile to receive personalized recommendations</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        min="1"
                        max="120"
                        value={profile.age}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-health-blue focus:border-health-blue sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={profile.gender}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-health-blue focus:border-health-blue sm:text-sm"
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Physical Measurements */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Physical Measurements</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        id="height"
                        name="height"
                        min="50"
                        max="250"
                        value={profile.height}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-health-blue focus:border-health-blue sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        min="1"
                        max="500"
                        step="0.1"
                        value={profile.weight}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-health-blue focus:border-health-blue sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="bmi" className="block text-sm font-medium text-gray-700 mb-1">
                        BMI (Calculated)
                      </label>
                      <input
                        type="number"
                        id="bmi"
                        name="bmi"
                        value={profile.bmi}
                        readOnly
                        className="block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-health-blue focus:border-health-blue sm:text-sm"
                      />
                      <p className="mt-1 text-xs text-gray-500">Automatically calculated from height and weight</p>
                    </div>
                  </div>
                </div>

                {/* Blood and Oxygen */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Blood Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">
                        Blood Type
                      </label>
                      <select
                        id="bloodType"
                        name="bloodType"
                        value={profile.bloodType}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-health-blue focus:border-health-blue sm:text-sm"
                        required
                      >
                        <option value="">Select Blood Type</option>
                        {bloodTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="genotype" className="block text-sm font-medium text-gray-700 mb-1">
                        Genotype
                      </label>
                      <select
                        id="genotype"
                        name="genotype"
                        value={profile.genotype}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-health-blue focus:border-health-blue sm:text-sm"
                        required
                      >
                        <option value="">Select Genotype</option>
                        {genotypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="oxygenLevel" className="block text-sm font-medium text-gray-700 mb-1">
                        Oxygen (O₂) Level (%)
                      </label>
                      <input
                        type="number"
                        id="oxygenLevel"
                        name="oxygenLevel"
                        min="70"
                        max="100"
                        step="0.1"
                        value={profile.oxygenLevel}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-health-blue focus:border-health-blue sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Medical Conditions */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Medical Conditions</h2>
                  <p className="text-sm text-gray-600 mb-4">Select all conditions that apply to you:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                    {commonConditions.map(condition => (
                      <div key={condition} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`condition-${condition}`}
                          checked={profile.conditions.includes(condition)}
                          onChange={() => handleConditionToggle(condition)}
                          className="h-4 w-4 text-health-blue focus:ring-health-blue border-gray-300 rounded"
                        />
                        <label htmlFor={`condition-${condition}`} className="ml-2 block text-sm text-gray-900">
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="customCondition" className="block text-sm font-medium text-gray-700 mb-1">
                      Add other condition
                    </label>
                    <form onSubmit={handleAddCustomCondition} className="flex">
                      <input
                        type="text"
                        id="customCondition"
                        name="customCondition"
                        placeholder="Enter condition name"
                        className="block flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-health-blue focus:border-health-blue sm:text-sm"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-health-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-health-blue"
                      >
                        Add
                      </button>
                    </form>
                  </div>

                  {profile.conditions.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Selected conditions:</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.conditions.map(condition => (
                          <div
                            key={condition}
                            className="bg-health-light-blue text-health-blue rounded-full px-3 py-1 text-sm flex items-center"
                          >
                            {condition}
                            <button
                              type="button"
                              onClick={() => handleConditionToggle(condition)}
                              className="ml-2 text-health-blue hover:text-blue-700"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Family Medical History */}
                <div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="hasFamilyHistory"
                      checked={hasFamilyHistory}
                      onChange={(e) => setHasFamilyHistory(e.target.checked)}
                      className="h-4 w-4 text-health-blue focus:ring-health-blue border-gray-300 rounded"
                    />
                    <label htmlFor="hasFamilyHistory" className="ml-2 block text-lg font-semibold text-gray-900">
                      Family Medical History
                    </label>
                  </div>
                  
                  {hasFamilyHistory && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Please provide information about significant medical conditions in your immediate family.
                      </p>
                      <textarea
                        id="familyHistory"
                        name="familyHistory"
                        rows={4}
                        value={familyHistory}
                        onChange={(e) => setFamilyHistory(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-health-blue focus:border-health-blue sm:text-sm"
                        placeholder="E.g., Mother had diabetes, Father with hypertension, etc."
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-health-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-health-blue disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="mr-2 h-5 w-5" />
                          Save Health Profile
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
