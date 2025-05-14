import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import HealthSearch from "./pages/HealthSearch";
import MyHealth from "./pages/MyHealth";
import MedicationTracker from "./pages/MedicationTracker";
import SymptomChecker from "./pages/SymptomChecker";
import EmergencyGuide from "./pages/EmergencyGuide";
import NutritionGuide from "./pages/NutritionGuide";
import ExerciseLibrary from "./pages/ExerciseLibrary";
import HealthCalculators from "./pages/HealthCalculators";
import TeleHealth from "./pages/TeleHealth";
import MoodTracker from "./pages/MoodTracker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/health-search" element={<HealthSearch />} />
            <Route path="/my-health" element={<MyHealth />} />
            <Route path="/medication-tracker" element={<MedicationTracker />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/emergency-guide" element={<EmergencyGuide />} />
            <Route path="/nutrition-guide" element={<NutritionGuide />} />
            <Route path="/exercise-library" element={<ExerciseLibrary />} />
            <Route path="/health-calculators" element={<HealthCalculators />} />
            <Route path="/telehealth" element={<TeleHealth />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
