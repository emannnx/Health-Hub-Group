
import React, { useState } from 'react';
import { Search, CheckCircle, X, AlertCircle, Info, ArrowRight, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// Mock symptom data
const bodyParts = [
  { id: 'head', name: 'Head & Face' },
  { id: 'chest', name: 'Chest & Heart' },
  { id: 'abdomen', name: 'Abdomen & Digestive' },
  { id: 'limbs', name: 'Arms & Legs' },
  { id: 'skin', name: 'Skin' },
  { id: 'mental', name: 'Mental & Neurological' },
  { id: 'general', name: 'General & Systemic' }
];

const symptoms = {
  head: [
    { id: 'headache', name: 'Headache' },
    { id: 'dizziness', name: 'Dizziness' },
    { id: 'blurred_vision', name: 'Blurred Vision' },
    { id: 'ear_pain', name: 'Ear Pain' },
    { id: 'sinus_pain', name: 'Sinus Pain' },
    { id: 'sore_throat', name: 'Sore Throat' }
  ],
  chest: [
    { id: 'chest_pain', name: 'Chest Pain' },
    { id: 'shortness_of_breath', name: 'Shortness of Breath' },
    { id: 'palpitations', name: 'Palpitations' },
    { id: 'cough', name: 'Cough' },
    { id: 'wheezing', name: 'Wheezing' }
  ],
  abdomen: [
    { id: 'abdominal_pain', name: 'Abdominal Pain' },
    { id: 'nausea', name: 'Nausea' },
    { id: 'vomiting', name: 'Vomiting' },
    { id: 'diarrhea', name: 'Diarrhea' },
    { id: 'constipation', name: 'Constipation' },
    { id: 'bloating', name: 'Bloating' }
  ],
  limbs: [
    { id: 'joint_pain', name: 'Joint Pain' },
    { id: 'muscle_pain', name: 'Muscle Pain' },
    { id: 'swelling', name: 'Swelling' },
    { id: 'numbness', name: 'Numbness or Tingling' },
    { id: 'mobility_issues', name: 'Difficulty Moving' }
  ],
  skin: [
    { id: 'rash', name: 'Rash' },
    { id: 'itching', name: 'Itching' },
    { id: 'bruising', name: 'Bruising' },
    { id: 'discoloration', name: 'Discoloration' },
    { id: 'dryness', name: 'Dryness' }
  ],
  mental: [
    { id: 'fatigue', name: 'Fatigue' },
    { id: 'insomnia', name: 'Insomnia' },
    { id: 'anxiety', name: 'Anxiety' },
    { id: 'depression', name: 'Depression' },
    { id: 'confusion', name: 'Confusion' },
    { id: 'memory_loss', name: 'Memory Loss' }
  ],
  general: [
    { id: 'fever', name: 'Fever' },
    { id: 'chills', name: 'Chills' },
    { id: 'weight_loss', name: 'Weight Loss' },
    { id: 'weight_gain', name: 'Weight Gain' },
    { id: 'weakness', name: 'General Weakness' },
    { id: 'appetite_loss', name: 'Loss of Appetite' }
  ]
};

// Mock condition data based on symptoms
const conditionMatch = {
  headache: ['Tension Headache', 'Migraine', 'Sinusitis'],
  fever: ['Common Cold', 'Influenza', 'COVID-19'],
  cough: ['Bronchitis', 'Common Cold', 'COVID-19', 'Asthma'],
  shortness_of_breath: ['Asthma', 'COVID-19', 'Heart Failure', 'Anxiety'],
  chest_pain: ['Coronary Artery Disease', 'Anxiety', 'Acid Reflux', 'Costochondritis'],
  abdominal_pain: ['Gastritis', 'Appendicitis', 'Irritable Bowel Syndrome', 'Food Poisoning'],
  joint_pain: ['Arthritis', 'Lupus', 'Lyme Disease', 'Gout'],
  rash: ['Eczema', 'Psoriasis', 'Allergic Reaction', 'Shingles'],
  fatigue: ['Depression', 'Anemia', 'Chronic Fatigue Syndrome', 'Hypothyroidism'],
  anxiety: ['Generalized Anxiety Disorder', 'Panic Disorder', 'Social Anxiety'],
  dizziness: ['Vertigo', 'Low Blood Pressure', 'Inner Ear Infection', 'Dehydration'],
};

// Mock detailed condition information
const conditionDetails = {
  'Tension Headache': {
    description: 'Tension headaches are the most common type of headache and can cause mild, moderate, or intense pain in your head, neck, and behind your eyes.',
    symptoms: ['Dull, aching head pain', 'Sensation of tightness across forehead or sides of head', 'Tenderness in scalp, neck, and shoulder muscles'],
    causes: ['Stress', 'Poor posture', 'Lack of sleep', 'Skipped meals', 'Dehydration'],
    treatment: ['Over-the-counter pain relievers', 'Stress management', 'Adequate sleep and hydration', 'Relaxation techniques'],
    whenToSeeDoctor: ['Headaches that occur more than 15 days a month', 'Headache that keeps getting worse', 'Headache that changes your mental function'],
    emergencySigns: ['Abrupt, severe headache', 'Headache with fever, stiff neck, confusion', 'Headache after head injury']
  },
  'Common Cold': {
    description: 'The common cold is a viral infection of your nose and throat (upper respiratory tract).',
    symptoms: ['Runny or stuffy nose', 'Sore throat', 'Cough', 'Congestion', 'Mild body aches or headache', 'Sneezing', 'Low-grade fever', 'General feeling of being unwell'],
    causes: ['Rhinoviruses', 'Respiratory syncytial virus', 'Seasonal factors'],
    treatment: ['Rest', 'Hydration', 'Over-the-counter cold medications', 'Pain relievers for fever/discomfort'],
    whenToSeeDoctor: ['Fever above 101.3°F (38.5°C)', 'Symptoms lasting more than 10 days', 'Severe or unusual symptoms'],
    emergencySigns: ['Difficulty breathing', 'Severe sore throat', 'Persistent fever']
  },
  'Anxiety': {
    description: 'Anxiety is a feeling of unease, such as worry or fear, that can be mild or severe.',
    symptoms: ['Feeling restless or worried', 'Having trouble concentrating or sleeping', 'Dizziness', 'Rapid heartbeat', 'Muscle tension', 'Shortness of breath'],
    causes: ['Stress', 'Genetics', 'Brain chemistry', 'Life events', 'Medical conditions'],
    treatment: ['Cognitive behavioral therapy', 'Relaxation techniques', 'Lifestyle changes', 'Medication in some cases'],
    whenToSeeDoctor: ['Anxiety interferes with daily activities', 'You have suicidal thoughts', 'You have physical symptoms'],
    emergencySigns: ['Chest pain with shortness of breath', 'Feeling of impending doom', 'Thoughts of self-harm']
  }
};

// Mock firstAid information
const firstAidInfo = {
  'chest_pain': 'If experiencing severe chest pain, especially with shortness of breath, sweating, or nausea, call emergency services immediately. Have the person sit down and rest while waiting for help.',
  'shortness_of_breath': 'Help the person into a comfortable position, usually sitting upright. If they have asthma medication, help them use it. If symptoms are severe or getting worse, seek emergency medical care.',
  'severe_bleeding': 'Apply direct pressure to the wound with a clean cloth or bandage. If blood soaks through, add another layer without removing the first. Elevate the injured area if possible and call for emergency help.',
};

const SymptomChecker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [step, setStep] = useState(1);
  const [possibleConditions, setPossibleConditions] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [progress, setProgress] = useState(20);

  // Logic to search for symptoms
  const filteredSymptoms = searchQuery.length > 0
    ? Object.values(symptoms).flat().filter(symptom => 
        symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedBodyPart 
      ? symptoms[selectedBodyPart as keyof typeof symptoms] || []
      : [];

  // Handle symptom selection
  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomId)) {
        return prev.filter(id => id !== symptomId);
      } else {
        return [...prev, symptomId];
      }
    });
  };

  // Handle continuing to next step
  const handleContinue = () => {
    if (step === 1) {
      if (selectedSymptoms.length === 0) {
        toast.error("Please select at least one symptom");
        return;
      }
      setStep(2);
      setProgress(40);
    } else if (step === 2) {
      if (!severity || !duration) {
        toast.error("Please provide severity and duration");
        return;
      }
      
      // Simple algorithm to determine possible conditions
      const matches = new Set<string>();
      selectedSymptoms.forEach(symptomId => {
        const conditions = conditionMatch[symptomId as keyof typeof conditionMatch];
        if (conditions) {
          conditions.forEach(condition => matches.add(condition));
        }
      });
      
      setPossibleConditions(Array.from(matches));
      setStep(3);
      setProgress(60);
    } else if (step === 3) {
      if (!selectedCondition && possibleConditions.length > 0) {
        setSelectedCondition(possibleConditions[0]);
      }
      setStep(4);
      setProgress(100);
    }
  };

  // Handle going back
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(Math.max(20, progress - 20));
    }
  };

  // Handle starting over
  const handleStartOver = () => {
    setSearchQuery('');
    setSelectedBodyPart('');
    setSelectedSymptoms([]);
    setSeverity('');
    setDuration('');
    setStep(1);
    setProgress(20);
    setPossibleConditions([]);
    setSelectedCondition('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-card transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8 fade-in">
            <h1 className="text-3xl font-bold text-foreground transition-colors duration-300 mb-4">Symptom Checker</h1>
            <p className="text-muted-foreground max-w-2xl transition-colors duration-300">
              Check your symptoms to find possible causes and treatments. This tool is for informational purposes and should not replace professional medical advice.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mb-8 fade-in">
            <div className="flex justify-between text-sm mb-2">
              <span>Start</span>
              <span>Symptoms</span>
              <span>Details</span>
              <span>Results</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Emergency warning */}
          <Card className="mb-8 border-destructive/20 bg-destructive/5 slide-up">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-destructive mr-2" />
                <CardTitle className="text-lg">Emergency Warning</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                If you're experiencing severe chest pain, difficulty breathing, severe bleeding, or other life-threatening symptoms, please call emergency services (911) or go to the nearest emergency room immediately.
              </p>
            </CardContent>
          </Card>

          {/* Step 1: Select Symptoms */}
          {step === 1 && (
            <div className="space-y-6 slide-in-right">
              <Card>
                <CardHeader>
                  <CardTitle>Step 1: Select Your Symptoms</CardTitle>
                  <CardDescription>
                    Choose the symptoms you're experiencing either by searching or selecting a body area.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search for symptoms */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search symptoms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Or select body part */}
                  <div>
                    <Label htmlFor="bodyPart" className="mb-2 block">Or select area of the body</Label>
                    <Select value={selectedBodyPart} onValueChange={value => {
                      setSelectedBodyPart(value);
                      setSearchQuery('');
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select body area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {bodyParts.map(part => (
                            <SelectItem key={part.id} value={part.id}>{part.name}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Symptom list */}
                  <div className="mt-4">
                    <Label className="mb-2 block">Select all that apply:</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {filteredSymptoms.map(symptom => (
                        <div key={symptom.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={symptom.id}
                            checked={selectedSymptoms.includes(symptom.id)}
                            onCheckedChange={() => toggleSymptom(symptom.id)}
                          />
                          <label htmlFor={symptom.id} className="text-sm cursor-pointer">
                            {symptom.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    {filteredSymptoms.length === 0 && searchQuery && (
                      <p className="text-muted-foreground text-sm mt-2">No symptoms found for "{searchQuery}"</p>
                    )}
                  </div>

                  {/* Selected symptoms */}
                  {selectedSymptoms.length > 0 && (
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <Label className="mb-2 block">Selected symptoms:</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedSymptoms.map(symptomId => {
                          const symptom = Object.values(symptoms).flat().find(s => s.id === symptomId);
                          return symptom ? (
                            <div key={symptomId} className="bg-background rounded-full px-3 py-1 text-sm flex items-center">
                              {symptom.name}
                              <X
                                className="h-4 w-4 ml-2 cursor-pointer"
                                onClick={() => toggleSymptom(symptomId)}
                              />
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleStartOver}>
                    Clear All
                  </Button>
                  <Button onClick={handleContinue} disabled={selectedSymptoms.length === 0}>
                    Continue
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Step 2: Additional Information */}
          {step === 2 && (
            <div className="space-y-6 slide-in-right">
              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Symptom Details</CardTitle>
                  <CardDescription>
                    Provide more information about your symptoms to help us better understand your condition.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Severity */}
                  <div>
                    <Label htmlFor="severity" className="mb-2 block">How severe are your symptoms?</Label>
                    <Select value={severity} onValueChange={setSeverity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild - Noticeable but not interfering with daily activities</SelectItem>
                        <SelectItem value="moderate">Moderate - Affecting some daily activities</SelectItem>
                        <SelectItem value="severe">Severe - Significantly impacting daily life</SelectItem>
                        <SelectItem value="very-severe">Very Severe - Unable to perform daily activities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration */}
                  <div>
                    <Label htmlFor="duration" className="mb-2 block">How long have you been experiencing these symptoms?</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Hours (Less than a day)</SelectItem>
                        <SelectItem value="days">Days (1-6 days)</SelectItem>
                        <SelectItem value="week">About a week</SelectItem>
                        <SelectItem value="weeks">Weeks (2-3 weeks)</SelectItem>
                        <SelectItem value="month">About a month</SelectItem>
                        <SelectItem value="months">Months (2+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* First aid information if certain symptoms are selected */}
                  {selectedSymptoms.some(s => ['chest_pain', 'shortness_of_breath', 'severe_bleeding'].includes(s)) && (
                    <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-900/30 rounded-md">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">First Aid Information</h4>
                          {selectedSymptoms.includes('chest_pain') && (
                            <p className="text-sm text-amber-700 dark:text-amber-200 mb-2">{firstAidInfo.chest_pain}</p>
                          )}
                          {selectedSymptoms.includes('shortness_of_breath') && (
                            <p className="text-sm text-amber-700 dark:text-amber-200 mb-2">{firstAidInfo.shortness_of_breath}</p>
                          )}
                          {selectedSymptoms.includes('severe_bleeding') && (
                            <p className="text-sm text-amber-700 dark:text-amber-200">{firstAidInfo.severe_bleeding}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleContinue} disabled={!severity || !duration}>
                    Continue
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Step 3: Possible Conditions */}
          {step === 3 && (
            <div className="space-y-6 slide-in-right">
              <Card>
                <CardHeader>
                  <CardTitle>Step 3: Possible Conditions</CardTitle>
                  <CardDescription>
                    Based on your symptoms, here are some conditions that may be related. This is not a diagnosis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {possibleConditions.length > 0 ? (
                    <div className="space-y-4">
                      {possibleConditions.map((condition, index) => (
                        <div 
                          key={condition}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedCondition === condition 
                              ? 'border-primary bg-primary/5' 
                              : 'border-muted bg-card hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedCondition(condition)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                selectedCondition === condition 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                {index + 1}
                              </div>
                              <div>
                                <h3 className="font-medium">{condition}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {severity === 'severe' || severity === 'very-severe' 
                                    ? 'Consider consulting a healthcare provider' 
                                    : 'May resolve with home care, monitor symptoms'}
                                </p>
                              </div>
                            </div>
                            <ChevronDown className={`h-5 w-5 transition-transform ${
                              selectedCondition === condition ? 'rotate-180' : ''
                            }`} />
                          </div>
                          
                          {selectedCondition === condition && conditionDetails[condition as keyof typeof conditionDetails] && (
                            <div className="mt-4 pl-9 space-y-3">
                              <p className="text-sm">
                                {conditionDetails[condition as keyof typeof conditionDetails].description}
                              </p>
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">Common symptoms include:</p>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                  {conditionDetails[condition as keyof typeof conditionDetails].symptoms.map((symptom, i) => (
                                    <li key={i}>{symptom}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <div className="p-4 bg-muted rounded-md mt-6">
                        <div className="flex items-center">
                          <Info className="h-5 w-5 text-muted-foreground mr-2" />
                          <p className="text-sm text-muted-foreground">
                            Remember: This tool is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Matching Conditions Found</h3>
                      <p className="text-muted-foreground">
                        We couldn't determine specific conditions based on your symptoms. Consider consulting a healthcare provider for proper evaluation.
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleContinue}>
                    Get Detailed Information
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Step 4: Detailed Condition Information */}
          {step === 4 && selectedCondition && conditionDetails[selectedCondition as keyof typeof conditionDetails] && (
            <div className="space-y-6 slide-in-right">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedCondition}</CardTitle>
                  <CardDescription>
                    Detailed information about this condition, treatments, and when to seek medical care.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <p>{conditionDetails[selectedCondition as keyof typeof conditionDetails].description}</p>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="symptoms">
                        <AccordionTrigger>Common Symptoms</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-1">
                            {conditionDetails[selectedCondition as keyof typeof conditionDetails].symptoms.map((symptom, i) => (
                              <li key={i}>{symptom}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="causes">
                        <AccordionTrigger>Possible Causes</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-1">
                            {conditionDetails[selectedCondition as keyof typeof conditionDetails].causes.map((cause, i) => (
                              <li key={i}>{cause}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="treatment">
                        <AccordionTrigger>Treatment Options</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-1">
                            {conditionDetails[selectedCondition as keyof typeof conditionDetails].treatment.map((treatment, i) => (
                              <li key={i}>{treatment}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <Separator />
                    
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                        When to See a Doctor
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {conditionDetails[selectedCondition as keyof typeof conditionDetails].whenToSeeDoctor.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-destructive/5 p-4 rounded-md border border-destructive/20">
                      <h4 className="font-medium text-destructive mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Emergency Warning Signs
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {conditionDetails[selectedCondition as keyof typeof conditionDetails].emergencySigns.map((sign, i) => (
                          <li key={i}>{sign}</li>
                        ))}
                      </ul>
                      <p className="text-sm mt-2">Seek immediate medical attention if you experience any of these symptoms.</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back to Conditions
                  </Button>
                  <Button variant="outline" onClick={handleStartOver}>
                    Start Over
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">More Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <div className="flex items-center">
                      <Search className="h-4 w-4 mr-2" />
                      Find doctors in your area
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Read more about {selectedCondition}
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </div>
                  </Button>
                </CardContent>
              </Card>
              
              <div className="p-4 bg-muted rounded-md text-center text-sm text-muted-foreground">
                <p>This information is for educational purposes only and is not a substitute for professional medical advice.</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SymptomChecker;
