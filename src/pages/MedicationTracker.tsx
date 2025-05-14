
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Clock, CheckCircle, AlarmClock, Calendar, Pill, AlertTriangle, MoreHorizontal, Edit2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Fake medication data
const MOCK_MEDICATIONS = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    time: "8:00 AM",
    instructions: "Take with water on an empty stomach",
    refillDate: "2025-05-15",
    active: true,
    taken: [true, true, false, true, true, true, false],
    type: "Tablet",
    prescriber: "Dr. Smith",
    notes: "For blood pressure control",
    sideEffects: ["Dry cough", "Dizziness"],
    startDate: "2023-10-01"
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    time: "8:00 AM, 8:00 PM",
    instructions: "Take with food to reduce stomach upset",
    refillDate: "2025-05-20",
    active: true,
    taken: [true, true, true, true, true, false, true],
    type: "Tablet",
    prescriber: "Dr. Johnson",
    notes: "For diabetes management",
    sideEffects: ["Nausea", "Diarrhea"],
    startDate: "2023-12-15"
  },
  {
    id: 3,
    name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    time: "9:00 PM",
    instructions: "Take at bedtime",
    refillDate: "2025-06-10",
    active: true,
    taken: [true, false, true, true, false, true, true],
    type: "Tablet",
    prescriber: "Dr. Smith",
    notes: "For cholesterol management",
    sideEffects: ["Muscle pain", "Fatigue"],
    startDate: "2024-01-10"
  }
];

const MedicationTracker = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [medications, setMedications] = useState(MOCK_MEDICATIONS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRemindersDialogOpen, setIsRemindersDialogOpen] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: "",
    instructions: "",
    refillDate: "",
    type: "Tablet",
    prescriber: "",
    notes: "",
    sideEffects: [""]
  });

  // Days of the week
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.

  // List of upcoming medications for today
  const todaysMedications = medications.filter(med => med.active && !med.taken[today]);

  // Count statistics
  const totalMedications = medications.length;
  const activeMedications = medications.filter(med => med.active).length;
  const adherenceRate = Math.round(
    (medications.reduce((acc, med) => acc + med.taken.filter(Boolean).length, 0) / 
    (medications.length * 7)) * 100
  );

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/?auth=login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }

  const handleAddMedication = () => {
    const newMed = {
      ...newMedication,
      id: medications.length + 1,
      active: true,
      taken: [false, false, false, false, false, false, false],
      startDate: format(new Date(), 'yyyy-MM-dd')
    };
    
    setMedications([...medications, newMed]);
    setIsAddDialogOpen(false);
    setNewMedication({
      name: "",
      dosage: "",
      frequency: "",
      time: "",
      instructions: "",
      refillDate: "",
      type: "Tablet",
      prescriber: "",
      notes: "",
      sideEffects: [""]
    });
    
    toast.success(`${newMed.name} added to your medications`);
  };

  const handleToggleTaken = (medId: number, dayIndex: number) => {
    setMedications(medications.map(med => {
      if (med.id === medId) {
        const newTaken = [...med.taken];
        newTaken[dayIndex] = !newTaken[dayIndex];
        
        if (newTaken[dayIndex]) {
          toast.success(`Marked ${med.name} as taken for ${days[dayIndex]}`);
        } else {
          toast.info(`Marked ${med.name} as not taken for ${days[dayIndex]}`);
        }
        
        return {
          ...med,
          taken: newTaken
        };
      }
      return med;
    }));
  };

  const handleRemind = (medication: any) => {
    toast.success(`Reminder set for ${medication.name} at ${medication.time}`);
    setIsRemindersDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-card transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground transition-colors duration-300">Medication Tracker</h1>
              <p className="text-muted-foreground mt-2 transition-colors duration-300">
                Track and manage your medications, set reminders, and monitor adherence
              </p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button 
                onClick={() => setIsRemindersDialogOpen(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                Reminders
              </Button>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Medication
              </Button>
            </div>
          </div>

          {/* Medication Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 slide-up">
            <Card className="bg-card transition-colors duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between">
                  <span>Active Medications</span>
                  <Pill className="h-5 w-5 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{activeMedications}</p>
                <p className="text-muted-foreground text-sm">of {totalMedications} total</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card transition-colors duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between">
                  <span>Adherence Rate</span>
                  <CheckCircle className="h-5 w-5 text-secondary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{adherenceRate}%</p>
                <p className="text-muted-foreground text-sm">last 7 days</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card transition-colors duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between">
                  <span>Next Refill</span>
                  <Calendar className="h-5 w-5 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{
                  medications
                    .filter(med => med.active)
                    .sort((a, b) => new Date(a.refillDate).getTime() - new Date(b.refillDate).getTime())[0]?.refillDate
                    ? format(new Date(medications
                      .filter(med => med.active)
                      .sort((a, b) => new Date(a.refillDate).getTime() - new Date(b.refillDate).getTime())[0]?.refillDate), 'MMM d')
                    : "N/A"
                }</p>
                <p className="text-muted-foreground text-sm">
                  {medications
                    .filter(med => med.active)
                    .sort((a, b) => new Date(a.refillDate).getTime() - new Date(b.refillDate).getTime())[0]?.name || "No upcoming refills"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Medications */}
          <h2 className="text-2xl font-bold text-foreground mb-4 mt-8 transition-colors duration-300 fade-in">Today's Medications</h2>
          
          {todaysMedications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {todaysMedications.map((med, index) => (
                <Card 
                  key={med.id}
                  className="shadow-sm border-muted hover:border-primary transition-all duration-300 pop"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>{med.name} {med.dosage}</span>
                      <Pill className="h-5 w-5 text-primary" />
                    </CardTitle>
                    <CardDescription>{med.frequency} - {med.time}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{med.instructions}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRemind(med)}
                    >
                      <Clock className="h-4 w-4 mr-2" /> Remind
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleToggleTaken(med.id, today)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> Mark as Taken
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mb-8 text-center p-8 border-dashed">
              <CheckCircle className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">All Done for Today!</h3>
              <p className="text-muted-foreground">You've taken all your medications for today.</p>
            </Card>
          )}

          {/* Medication Log */}
          <h2 className="text-2xl font-bold text-foreground mb-4 transition-colors duration-300 fade-in">Medication Log</h2>
          <Tabs defaultValue="active" className="mb-8 slide-up">
            <TabsList>
              <TabsTrigger value="active">Active Medications</TabsTrigger>
              <TabsTrigger value="all">All Medications</TabsTrigger>
              <TabsTrigger value="adherence">Adherence Calendar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Refill Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.filter(med => med.active).map((med) => (
                    <TableRow key={med.id}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.dosage}</TableCell>
                      <TableCell>{med.frequency} - {med.time}</TableCell>
                      <TableCell>{format(new Date(med.refillDate), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuGroup>
                              <DropdownMenuItem>
                                <Edit2 className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlarmClock className="h-4 w-4 mr-2" /> Set Reminder
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlertTriangle className="h-4 w-4 mr-2" /> Report Issue
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <X className="h-4 w-4 mr-2" /> Discontinue
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Prescriber</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((med) => (
                    <TableRow key={med.id}>
                      <TableCell className="font-medium">
                        {med.name} {med.dosage}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${med.active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                          {med.active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>{format(new Date(med.startDate), 'MMM d, yyyy')}</TableCell>
                      <TableCell>{med.prescriber}</TableCell>
                      <TableCell className="max-w-xs truncate">{med.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="adherence">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      {days.map((day, i) => (
                        <TableHead key={day} className={i === today ? 'bg-muted/50' : ''}>
                          {day}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medications.filter(med => med.active).map((med) => (
                      <TableRow key={med.id}>
                        <TableCell className="font-medium">
                          {med.name} {med.dosage}
                        </TableCell>
                        {days.map((day, i) => (
                          <TableCell key={`${med.id}-${day}`} className={`text-center ${i === today ? 'bg-muted/30' : ''}`}>
                            <Button
                              size="icon"
                              variant={med.taken[i] ? "default" : "outline"}
                              className={`h-8 w-8 rounded-full ${med.taken[i] ? 'bg-secondary hover:bg-secondary/90' : ''}`}
                              onClick={() => handleToggleTaken(med.id, i)}
                            >
                              {med.taken[i] ? <CheckCircle className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            </Button>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Add Medication Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Medication</DialogTitle>
            <DialogDescription>
              Enter the details of your medication to add it to your tracker.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newMedication.name}
                onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dosage" className="text-right">
                Dosage
              </Label>
              <Input
                id="dosage"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                className="col-span-3"
                placeholder="e.g., 10mg"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequency
              </Label>
              <Input
                id="frequency"
                value={newMedication.frequency}
                onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                className="col-span-3"
                placeholder="e.g., Once daily"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                value={newMedication.time}
                onChange={(e) => setNewMedication({...newMedication, time: e.target.value})}
                className="col-span-3"
                placeholder="e.g., 8:00 AM"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="refillDate" className="text-right">
                Refill Date
              </Label>
              <Input
                id="refillDate"
                type="date"
                value={newMedication.refillDate}
                onChange={(e) => setNewMedication({...newMedication, refillDate: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructions" className="text-right">
                Instructions
              </Label>
              <Textarea
                id="instructions"
                value={newMedication.instructions}
                onChange={(e) => setNewMedication({...newMedication, instructions: e.target.value})}
                className="col-span-3"
                placeholder="Special instructions for taking this medication"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddMedication}>Add Medication</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reminders Dialog */}
      <Dialog open={isRemindersDialogOpen} onOpenChange={setIsRemindersDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Medication Reminders</DialogTitle>
            <DialogDescription>
              Configure how you want to be reminded to take your medications.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {medications.filter(med => med.active).map((med) => (
              <div key={med.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{med.name} {med.dosage}</p>
                  <p className="text-sm text-muted-foreground">{med.time}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id={`remind-${med.id}`} defaultChecked />
                    <Label htmlFor={`remind-${med.id}`}>Remind</Label>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleRemind(med)}>
                    Set
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsRemindersDialogOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicationTracker;
