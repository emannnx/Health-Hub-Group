
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { AlertCircle, Info } from 'lucide-react';

const BMICalculator = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [heightInches, setHeightInches] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  
  const calculateBMI = () => {
    let bmiValue: number;
    
    if (!weight || !height || (unit === 'imperial' && !heightInches)) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height);
      const heightInchesNum = unit === 'imperial' ? parseFloat(heightInches) : 0;
      
      if (weightNum <= 0 || heightNum <= 0 || (unit === 'imperial' && heightInchesNum < 0)) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      if (unit === 'metric') {
        // BMI = weight(kg) / height(m)²
        bmiValue = weightNum / Math.pow(heightNum / 100, 2);
      } else {
        // Convert height to inches (1 foot = 12 inches)
        const totalHeightInches = (heightNum * 12) + heightInchesNum;
        // BMI = (weight(lb) / height(in)²) * 703
        bmiValue = (weightNum / Math.pow(totalHeightInches, 2)) * 703;
      }
      
      setBmi(parseFloat(bmiValue.toFixed(1)));
      
      // Determine BMI category
      if (bmiValue < 18.5) {
        setCategory('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setCategory('Normal weight');
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setCategory('Overweight');
      } else {
        setCategory('Obesity');
      }
      
    } catch (error) {
      toast.error('An error occurred while calculating BMI');
      console.error('BMI calculation error:', error);
    }
  };
  
  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setHeightInches('');
    setBmi(null);
    setCategory('');
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
        <CardDescription>Calculate your Body Mass Index</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Unit System</Label>
          <RadioGroup 
            value={unit} 
            onValueChange={(value) => {
              setUnit(value as 'metric' | 'imperial');
              resetCalculator();
            }}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="metric" id="metric" />
              <Label htmlFor="metric">Metric (kg/cm)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="imperial" id="imperial" />
              <Label htmlFor="imperial">Imperial (lb/ft)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight">
            Weight {unit === 'metric' ? '(kg)' : '(lb)'}
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder={`Enter weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          {unit === 'metric' ? (
            <>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Enter height in centimeters"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height-feet">Height (feet)</Label>
                <Input
                  id="height-feet"
                  type="number"
                  placeholder="Feet"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height-inches">Inches</Label>
                <Input
                  id="height-inches"
                  type="number"
                  placeholder="Inches"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        
        {bmi !== null && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-lg font-semibold">Your BMI</p>
              <p className="text-3xl font-bold">{bmi}</p>
              <p className={`text-lg font-medium ${
                category === 'Normal weight' 
                  ? 'text-green-600' 
                  : category === 'Underweight' 
                    ? 'text-amber-600' 
                    : 'text-red-600'
              }`}>
                {category}
              </p>
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 p-3 rounded-md flex items-start space-x-2">
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          <p className="text-sm text-blue-700">
            BMI is a screening tool but it does not directly measure body fat. 
            Consult a healthcare provider for a complete health assessment.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetCalculator}>Reset</Button>
        <Button onClick={calculateBMI}>Calculate BMI</Button>
      </CardFooter>
    </Card>
  );
};

export default BMICalculator;
