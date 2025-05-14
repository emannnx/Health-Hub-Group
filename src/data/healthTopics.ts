
export type HealthTopic = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const healthTopics: HealthTopic[] = [
  {
    id: "cardiovascular",
    title: "Cardiovascular Health",
    description: "Learn about heart disease, high blood pressure, and ways to maintain cardiovascular health.",
    icon: "heart"
  },
  {
    id: "diabetes",
    title: "Diabetes Management",
    description: "Information on managing diabetes, blood sugar monitoring, and healthy living strategies.",
    icon: "activity"
  },
  {
    id: "mental-health",
    title: "Mental Health",
    description: "Resources for anxiety, depression, stress management, and overall mental wellbeing.",
    icon: "brain"
  },
  {
    id: "nutrition",
    title: "Nutrition & Diet",
    description: "Expert advice on balanced diets, nutritional needs, and healthy eating habits.",
    icon: "apple"
  },
  {
    id: "fitness",
    title: "Fitness & Exercise",
    description: "Exercise recommendations, workout plans, and physical activity guidelines for all ages.",
    icon: "dumbbell"
  },
  {
    id: "preventive-care",
    title: "Preventive Care",
    description: "Information on screenings, vaccinations, and preventive measures for various health conditions.",
    icon: "shield"
  }
];

export default healthTopics;
