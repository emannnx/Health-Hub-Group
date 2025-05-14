
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Salad, Book, Search, ChefHat, Apple, Carrot } from 'lucide-react';

const NutritionGuide = () => {
  const nutritionResources = [
    {
      icon: <Salad className="w-6 h-6 mb-2" />,
      title: "Meal Planning",
      description: "Get personalized meal plans based on your health goals"
    },
    {
      icon: <Book className="w-6 h-6 mb-2" />,
      title: "Nutrition Education",
      description: "Learn about balanced diets and healthy eating habits"
    },
    {
      icon: <Search className="w-6 h-6 mb-2" />,
      title: "Food Database",
      description: "Access detailed nutritional information for thousands of foods"
    }
  ];

  const healthyRecipes = [
    {
      title: "Quinoa Buddha Bowl",
      category: "Lunch",
      prepTime: "20 mins",
      calories: "450",
      icon: <Salad className="w-6 h-6" />,
      ingredients: ["Quinoa", "Chickpeas", "Avocado", "Sweet Potato", "Kale"]
    },
    {
      title: "Berry Smoothie Bowl",
      category: "Breakfast",
      prepTime: "10 mins",
      calories: "320",
      icon: <Apple className="w-6 h-6" />,
      ingredients: ["Mixed Berries", "Greek Yogurt", "Banana", "Chia Seeds", "Honey"]
    },
    {
      title: "Mediterranean Salad",
      category: "Lunch/Dinner",
      prepTime: "15 mins",
      calories: "380",
      icon: <Carrot className="w-6 h-6" />,
      ingredients: ["Mixed Greens", "Feta Cheese", "Olives", "Cherry Tomatoes", "Cucumber"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-card transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground transition-colors duration-300 mb-4">Nutrition Guide</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto transition-colors duration-300">
              Discover personalized nutrition recommendations, healthy recipes, and expert dietary guidance for optimal health.
            </p>
          </div>

          <Tabs defaultValue="resources" className="mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="resources">Nutrition Resources</TabsTrigger>
              <TabsTrigger value="recipes">Healthy Recipes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources">
              <div className="grid md:grid-cols-3 gap-6">
                {nutritionResources.map((resource, index) => (
                  <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-center text-primary">{resource.icon}</div>
                      <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{resource.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recipes">
              <div className="grid md:grid-cols-3 gap-6">
                {healthyRecipes.map((recipe, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {recipe.icon}
                          <CardTitle className="text-xl">{recipe.title}</CardTitle>
                        </div>
                        <span className="text-sm text-muted-foreground">{recipe.category}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Prep time: {recipe.prepTime}</span>
                          <span>{recipe.calories} cal</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Ingredients:</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {recipe.ingredients.map((ingredient, idx) => (
                              <li key={idx}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="bg-primary/5 border-primary/10">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Personalized Nutrition Planning</CardTitle>
              <CardDescription>
                Get customized meal plans and nutrition advice tailored to your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-muted-foreground">
                Our comprehensive nutrition tools are being developed to help you achieve your health goals.
                Sign up now to be notified when these features become available.
              </p>
              <Button size="lg" className="animate-fade-in">
                Join Waitlist
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NutritionGuide;
