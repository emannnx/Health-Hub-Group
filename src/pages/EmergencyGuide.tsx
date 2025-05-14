
import React, { useState } from 'react';
import { Search, AlertCircle, Heart, Thermometer, Skull, Droplets, Sparkles, Phone, Ambulance, Clock, PlusCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

// Mock emergency data
const emergencyCategories = [
  { id: 'cardiac', name: 'Cardiac Emergencies', icon: <Heart className="h-5 w-5 text-destructive" /> },
  { id: 'breathing', name: 'Breathing Difficulties', icon: <Droplets className="h-5 w-5 text-primary" /> },
  { id: 'injury', name: 'Severe Injuries', icon: <PlusCircle className="h-5 w-5 text-amber-500" /> },
  { id: 'poison', name: 'Poisoning', icon: <Skull className="h-5 w-5 text-destructive" /> },
  { id: 'burn', name: 'Burns', icon: <Sparkles className="h-5 w-5 text-orange-500" /> },
  { id: 'stroke', name: 'Stroke', icon: <Thermometer className="h-5 w-5 text-red-500" /> }
];

// Emergency procedures
const emergencyProcedures = {
  cardiac: {
    title: 'Cardiac Emergencies',
    description: 'Quick action is crucial for cardiac emergencies. These procedures can help while waiting for emergency services.',
    procedures: [
      {
        id: 'cpr',
        title: 'CPR (Cardiopulmonary Resuscitation)',
        steps: [
          'Check if the person is responsive by tapping them and shouting "Are you okay?"',
          'If unresponsive, call emergency services (911) immediately or ask someone else to call',
          'Place the person on their back on a firm surface',
          'Kneel beside the person and place the heel of one hand on the center of the chest',
          'Place your other hand on top of the first hand and interlock your fingers',
          'Keep your arms straight and position your shoulders directly above your hands',
          'Push hard and fast: Press down at least 2 inches at a rate of 100-120 compressions per minute',
          'Allow the chest to completely recoil after each compression',
          'Continue CPR until emergency services arrive or the person shows signs of life'
        ],
        warnings: [
          'If you\'re not trained in CPR, perform hands-only CPR (chest compressions without rescue breaths)',
          'If you\'re trained and confident, you can provide rescue breaths (30 compressions followed by 2 breaths)'
        ],
        video: 'https://example.com/cpr-video'
      },
      {
        id: 'aed',
        title: 'Using an AED (Automated External Defibrillator)',
        steps: [
          'Turn on the AED and follow the visual and/or audio prompts',
          'Expose the person\'s chest and wipe it dry if necessary',
          'Attach the AED pads to the person\'s bare chest as shown in the AED instructions',
          'Make sure no one is touching the person, and press the analyze button if instructed',
          'If the AED advises a shock, make sure no one is touching the person',
          'Press the shock button if instructed to do so by the AED',
          'Resume CPR immediately after the shock for 2 minutes, then follow AED prompts again'
        ],
        warnings: [
          'Do not use an AED if the person is wet or lying in water',
          'Do not use an AED if there are drug patches or a pacemaker (visible lump with a scar) where pads would be placed',
          'For children under 8 years old, use pediatric pads if available'
        ],
        video: 'https://example.com/aed-video'
      }
    ]
  },
  stroke: {
    title: 'Stroke',
    description: 'Remember the acronym FAST to recognize stroke symptoms and act quickly.',
    procedures: [
      {
        id: 'fast',
        title: 'FAST: Stroke Recognition and Response',
        steps: [
          'F - Face: Ask the person to smile. Does one side of their face droop?',
          'A - Arms: Ask the person to raise both arms. Does one arm drift downward?',
          'S - Speech: Ask the person to repeat a simple phrase. Is their speech slurred or strange?',
          'T - Time: If you observe any of these signs, call emergency services (911) immediately',
          'Note the time when symptoms first appeared, this is critical information for treatment decisions',
          'Do not give the person anything to eat or drink',
          'If possible, have the person lie down with their head slightly elevated and turned to the side'
        ],
        warnings: [
          'Never delay calling emergency services - prompt treatment is critical for stroke outcomes',
          'Do not give aspirin as you would for suspected heart attack, as some strokes are caused by bleeding'
        ],
        video: 'https://example.com/stroke-video'
      }
    ]
  },
  // Additional emergency categories would be added here
};

// Emergency contact information
const emergencyContacts = [
  { service: 'Emergency Services', number: '911', when: 'Life-threatening emergencies' },
  { service: 'Poison Control', number: '1-800-222-1222', when: 'Poisoning or exposure to toxic substances' },
  { service: 'Suicide Prevention Lifeline', number: '988', when: 'Mental health crisis or suicidal thoughts' },
  { service: 'Disaster Distress Helpline', number: '1-800-985-5990', when: 'Emotional distress related to disasters' },
  { service: 'National Domestic Violence Hotline', number: '1-800-799-7233', when: 'Domestic violence situations' },
];

const EmergencyGuide = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('cardiac');

  // Search functionality
  const filteredProcedures = Object.values(emergencyProcedures)
    .flatMap(category => category.procedures)
    .filter(procedure => 
      procedure.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-card transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Emergency Banner */}
          <div className="bg-destructive/90 text-destructive-foreground p-4 rounded-lg mb-8 fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 mr-3" />
                <div>
                  <h2 className="text-xl font-bold">If this is an emergency</h2>
                  <p>Call 911 or your local emergency number immediately</p>
                </div>
              </div>
              <Button variant="outline" className="bg-white/20 border-white/30 hover:bg-white/30">
                <Phone className="h-4 w-4 mr-2" />
                Call 911
              </Button>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8 fade-in">
            <h1 className="text-3xl font-bold text-foreground transition-colors duration-300 mb-2">Emergency First Aid Guide</h1>
            <p className="text-muted-foreground transition-colors duration-300">
              Quick reference for emergency situations. This guide is not a substitute for professional medical training or emergency medical services.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6 slide-up">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search emergency procedures..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-8 slide-up">
              <h2 className="text-xl font-semibold mb-4">Search Results for "{searchQuery}"</h2>
              {filteredProcedures.length > 0 ? (
                <div className="space-y-4">
                  {filteredProcedures.map(procedure => (
                    <Card key={procedure.id}>
                      <CardHeader>
                        <CardTitle>{procedure.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="list-decimal pl-6 space-y-2">
                          {procedure.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No emergency procedures found for "{searchQuery}"</p>
              )}
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </div>
          )}

          {!searchQuery && (
            <>
              {/* Emergency Categories */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {emergencyCategories.map(category => (
                  <Card 
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`cursor-pointer hover:border-primary transition-colors duration-200 text-center pop ${
                      selectedCategory === category.id ? 'border-primary bg-primary/5' : ''
                    }`}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <div className="mb-2 mt-2">{category.icon}</div>
                      <p className="text-sm font-medium">{category.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Emergency Procedures */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
                <TabsList className="mb-4">
                  {emergencyCategories.map(category => (
                    <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                      {category.icon} {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {Object.entries(emergencyProcedures).map(([key, category]) => (
                  <TabsContent key={key} value={key} className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      {key === 'cardiac' && <Heart className="h-6 w-6 text-destructive" />}
                      {key === 'stroke' && <Thermometer className="h-6 w-6 text-red-500" />}
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">{category.description}</p>
                    
                    <div className="space-y-6">
                      {category.procedures.map((procedure) => (
                        <Card key={procedure.id} className="slide-up">
                          <CardHeader>
                            <CardTitle>{procedure.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2 flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-primary" />
                                Steps to Follow:
                              </h4>
                              <ol className="list-decimal pl-6 space-y-2">
                                {procedure.steps.map((step, index) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ol>
                            </div>
                            
                            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-md">
                              <h4 className="font-medium mb-2 text-amber-800 dark:text-amber-300 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Important Warnings:
                              </h4>
                              <ul className="list-disc pl-5 space-y-1 text-amber-700 dark:text-amber-200">
                                {procedure.warnings.map((warning, index) => (
                                  <li key={index}>{warning}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              Watch Instructional Video
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Emergency Contacts */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Emergency Contact Information
                </h2>
                
                <Card>
                  <CardContent className="p-0 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Emergency Service</TableHead>
                          <TableHead>Phone Number</TableHead>
                          <TableHead>When to Call</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {emergencyContacts.map((contact) => (
                          <TableRow key={contact.service}>
                            <TableCell className="font-medium">{contact.service}</TableCell>
                            <TableCell>{contact.number}</TableCell>
                            <TableCell>{contact.when}</TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant={contact.service === 'Emergency Services' ? 'destructive' : 'outline'}>
                                <Phone className="h-4 w-4 mr-2" /> Call
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Prevention and Preparedness */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Ambulance className="h-5 w-5 mr-2 text-primary" />
                  Emergency Preparedness
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Emergency Kit Essentials</CardTitle>
                      <CardDescription>Items every household should have readily available</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>First aid kit with adhesive bandages, gauze, antiseptic wipes</li>
                        <li>Emergency contact information</li>
                        <li>Flashlight and extra batteries</li>
                        <li>Medications (prescription and over-the-counter)</li>
                        <li>Emergency blanket</li>
                        <li>Whistle to signal for help</li>
                        <li>Basic tools (wrench, pliers, etc.)</li>
                        <li>3-day supply of water and non-perishable food</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Emergency Planning</CardTitle>
                      <CardDescription>Steps to prepare before emergencies happen</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Create and practice a family emergency plan</li>
                        <li>Identify emergency exits and meeting places</li>
                        <li>Learn CPR and basic first aid</li>
                        <li>Sign up for local emergency alerts</li>
                        <li>Keep important documents in a waterproof, fireproof container</li>
                        <li>Know how to turn off utilities (gas, water, electricity)</li>
                        <li>Plan for pets and family members with special needs</li>
                        <li>Review and update emergency plans annually</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmergencyGuide;
