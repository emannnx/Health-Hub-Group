
export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  readTime: number;
  imageUrl?: string;
}

const articles: Article[] = [
  {
    id: "understanding-hypertension",
    title: "Understanding Hypertension: Causes, Symptoms, and Management",
    summary: "Learn the essentials about high blood pressure and how to keep it under control.",
    content: `
      <h2>What is Hypertension?</h2>
      <p>Hypertension, or high blood pressure, is a common condition where the force of blood against your artery walls is consistently too high. Over time, this can cause health problems like heart disease.</p>
      
      <h2>Symptoms of Hypertension</h2>
      <p>Most people with hypertension don't experience symptoms, which is why it's often called the "silent killer." Some may experience:</p>
      <ul>
        <li>Headaches</li>
        <li>Shortness of breath</li>
        <li>Nosebleeds</li>
      </ul>
      
      <h2>Risk Factors</h2>
      <p>Several factors increase your risk of developing hypertension:</p>
      <ul>
        <li>Age: Risk increases as you get older</li>
        <li>Family history: Hypertension tends to run in families</li>
        <li>Obesity: Being overweight or obese increases your risk</li>
        <li>Sedentary lifestyle: Physical inactivity</li>
        <li>Tobacco use: Smoking or chewing tobacco</li>
        <li>High sodium diet: Too much salt can raise blood pressure</li>
        <li>Excessive alcohol consumption</li>
        <li>Stress: High levels of stress can temporarily increase blood pressure</li>
      </ul>
      
      <h2>Management Strategies</h2>
      <p>Lifestyle changes can help manage hypertension:</p>
      <ul>
        <li>Regular physical activity</li>
        <li>Maintaining a healthy weight</li>
        <li>DASH diet (Dietary Approaches to Stop Hypertension)</li>
        <li>Limiting alcohol consumption</li>
        <li>Reducing stress</li>
        <li>Taking prescribed medications consistently</li>
      </ul>
      
      <h2>When to See a Doctor</h2>
      <p>Regular blood pressure screenings are essential. If you haven't had yours checked recently, schedule an appointment with your healthcare provider. If you're already taking medication for hypertension, regular follow-ups are important to ensure your treatment plan is working effectively.</p>
    `,
    category: "cardiovascular",
    tags: ["hypertension", "blood pressure", "heart health", "prevention"],
    author: "Dr. Sarah Johnson",
    publishDate: "2025-03-15",
    readTime: 7,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ymxvb2QlMjBwcmVzc3VyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "managing-diabetes",
    title: "Managing Diabetes: A Comprehensive Guide",
    summary: "Essential information for individuals living with diabetes, from blood sugar monitoring to diet and exercise.",
    content: `
      <h2>Understanding Diabetes</h2>
      <p>Diabetes is a chronic condition that affects how your body turns food into energy. With diabetes, your body either doesn't make enough insulin or can't effectively use the insulin it produces.</p>
      
      <h2>Types of Diabetes</h2>
      <ul>
        <li><strong>Type 1 Diabetes:</strong> The body doesn't produce insulin. This is usually diagnosed in children and young adults.</li>
        <li><strong>Type 2 Diabetes:</strong> The body doesn't use insulin properly. This is the most common form of diabetes.</li>
        <li><strong>Gestational Diabetes:</strong> Occurs during pregnancy and typically resolves after childbirth.</li>
      </ul>
      
      <h2>Blood Sugar Monitoring</h2>
      <p>Regular monitoring is essential for managing diabetes. It helps you:</p>
      <ul>
        <li>Evaluate how well your treatment plan is working</li>
        <li>Track how diet, physical activity, and medications affect blood sugar levels</li>
        <li>Identify blood sugar trends and prevent complications</li>
      </ul>
      
      <h2>Healthy Eating for Diabetes</h2>
      <p>A balanced diet is crucial for managing diabetes:</p>
      <ul>
        <li>Focus on fruits, vegetables, whole grains, and lean proteins</li>
        <li>Limit refined carbohydrates and sugars</li>
        <li>Monitor portion sizes</li>
        <li>Maintain consistency in carbohydrate intake</li>
      </ul>
      
      <h2>Physical Activity</h2>
      <p>Regular exercise helps control blood sugar levels by:</p>
      <ul>
        <li>Increasing insulin sensitivity</li>
        <li>Helping maintain a healthy weight</li>
        <li>Reducing cardiovascular risk factors</li>
      </ul>
      
      <h2>Medications and Insulin Therapy</h2>
      <p>Depending on the type and severity of diabetes, medications may include:</p>
      <ul>
        <li>Oral medications to improve insulin sensitivity or stimulate insulin production</li>
        <li>Insulin therapy administered through injections or an insulin pump</li>
      </ul>
      
      <h2>Managing Complications</h2>
      <p>Regular check-ups with healthcare providers help monitor for and prevent complications affecting:</p>
      <ul>
        <li>Heart and blood vessels</li>
        <li>Eyes (diabetic retinopathy)</li>
        <li>Kidneys (nephropathy)</li>
        <li>Nerves (neuropathy)</li>
        <li>Feet</li>
      </ul>
    `,
    category: "diabetes",
    tags: ["diabetes", "blood sugar", "insulin", "chronic condition"],
    author: "Dr. Michael Chen",
    publishDate: "2025-03-10",
    readTime: 9,
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlhYmV0ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "mental-health-basics",
    title: "Mental Health 101: Understanding the Basics",
    summary: "An introduction to mental health concepts, common disorders, and strategies for maintaining emotional wellbeing.",
    content: `
      <h2>What is Mental Health?</h2>
      <p>Mental health encompasses emotional, psychological, and social well-being. It affects how we think, feel, act, handle stress, relate to others, and make choices.</p>
      
      <h2>Common Mental Health Disorders</h2>
      <ul>
        <li><strong>Anxiety Disorders:</strong> Including generalized anxiety, panic disorder, and specific phobias.</li>
        <li><strong>Mood Disorders:</strong> Such as depression and bipolar disorder.</li>
        <li><strong>Psychotic Disorders:</strong> Like schizophrenia.</li>
        <li><strong>Eating Disorders:</strong> Including anorexia, bulimia, and binge eating.</li>
        <li><strong>Trauma-Related Disorders:</strong> Such as post-traumatic stress disorder (PTSD).</li>
      </ul>
      
      <h2>Signs of Mental Health Challenges</h2>
      <p>Watch for these potential warning signs:</p>
      <ul>
        <li>Persistent sadness or low mood</li>
        <li>Excessive fears or worries</li>
        <li>Significant changes in eating or sleeping patterns</li>
        <li>Withdrawal from social activities</li>
        <li>Difficulty concentrating or making decisions</li>
        <li>Unexplained physical problems</li>
        <li>Changes in performance at work or school</li>
      </ul>
      
      <h2>Maintaining Good Mental Health</h2>
      <p>Strategies that support mental wellness:</p>
      <ul>
        <li>Regular physical activity</li>
        <li>Adequate sleep</li>
        <li>Healthy eating habits</li>
        <li>Stress management techniques</li>
        <li>Building and maintaining social connections</li>
        <li>Practicing mindfulness and relaxation</li>
        <li>Limiting alcohol and avoiding drugs</li>
      </ul>
      
      <h2>Seeking Help</h2>
      <p>Professional support options include:</p>
      <ul>
        <li>Psychotherapy (talk therapy)</li>
        <li>Medication when appropriate</li>
        <li>Support groups</li>
        <li>Self-help strategies</li>
      </ul>
      
      <h2>Reducing Stigma</h2>
      <p>Mental health stigma can prevent people from seeking help. To combat stigma:</p>
      <ul>
        <li>Educate yourself and others about mental health</li>
        <li>Choose language carefully when discussing mental health</li>
        <li>Show empathy and support to those experiencing mental health challenges</li>
        <li>Share personal experiences when comfortable</li>
      </ul>
    `,
    category: "mental-health",
    tags: ["mental health", "anxiety", "depression", "well-being"],
    author: "Dr. Amelia Rodriguez",
    publishDate: "2025-02-28",
    readTime: 8,
    imageUrl: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
  },
  {
    id: "nutrition-essentials",
    title: "Essential Nutrition: Building Blocks for a Healthy Diet",
    summary: "Learn about the fundamentals of nutrition and how to create balanced, nutritious meals for optimal health.",
    content: `
      <h2>Introduction to Nutrition</h2>
      <p>Nutrition is the science of how food affects the body and its processes. Good nutrition involves consuming a variety of foods that provide the necessary nutrients to maintain health, feel good, and have energy.</p>
      
      <h2>Macronutrients</h2>
      <ul>
        <li><strong>Proteins:</strong> Essential for building and repairing tissue. Sources include meat, fish, eggs, dairy, legumes, and nuts.</li>
        <li><strong>Carbohydrates:</strong> The body's main source of energy. Choose complex carbs like whole grains, fruits, and vegetables over simple carbs like refined sugar.</li>
        <li><strong>Fats:</strong> Necessary for energy, cell growth, and hormone production. Focus on unsaturated fats from sources like olive oil, avocados, and fatty fish.</li>
      </ul>
      
      <h2>Micronutrients</h2>
      <p>These include:</p>
      <ul>
        <li><strong>Vitamins:</strong> Organic compounds needed in small amounts to support various bodily functions.</li>
        <li><strong>Minerals:</strong> Inorganic nutrients like calcium, iron, and potassium that play vital roles in the body.</li>
      </ul>
      
      <h2>Building a Balanced Plate</h2>
      <p>A balanced meal typically includes:</p>
      <ul>
        <li>Half the plate filled with vegetables and fruits</li>
        <li>Quarter of the plate with lean protein</li>
        <li>Quarter of the plate with whole grains or starchy vegetables</li>
        <li>Small amounts of healthy fats</li>
        <li>Water or another hydrating beverage</li>
      </ul>
      
      <h2>Hydration</h2>
      <p>Adequate hydration is essential for:</p>
      <ul>
        <li>Regulating body temperature</li>
        <li>Transporting nutrients</li>
        <li>Removing waste</li>
        <li>Supporting cognitive function</li>
      </ul>
      <p>Most adults should aim for 8-10 cups of fluid daily, with water as the primary source.</p>
      
      <h2>Reading Food Labels</h2>
      <p>Understanding food labels can help you make informed choices:</p>
      <ul>
        <li>Check serving sizes and adjust calculations accordingly</li>
        <li>Look at total calories if you're managing weight</li>
        <li>Monitor nutrients like sodium, added sugars, and saturated fats</li>
        <li>Seek products with more fiber, vitamins, and minerals</li>
      </ul>
      
      <h2>Meal Planning Strategies</h2>
      <p>Effective meal planning can help you maintain a balanced diet:</p>
      <ul>
        <li>Plan meals for the week ahead</li>
        <li>Prepare batch meals when time allows</li>
        <li>Keep healthy snacks accessible</li>
        <li>Practice portion control</li>
      </ul>
    `,
    category: "nutrition",
    tags: ["nutrition", "diet", "healthy eating", "food"],
    author: "Lisa Thompson, RD",
    publishDate: "2025-03-05",
    readTime: 10,
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "exercise-benefits",
    title: "The Comprehensive Benefits of Regular Exercise",
    summary: "Discover how physical activity impacts nearly every aspect of your health and well-being.",
    content: `
      <h2>Physical Health Benefits</h2>
      <p>Regular exercise contributes to physical health in numerous ways:</p>
      <ul>
        <li>Reduces risk of heart disease and stroke</li>
        <li>Helps manage blood pressure and cholesterol levels</li>
        <li>Improves insulin sensitivity and helps prevent type 2 diabetes</li>
        <li>Strengthens bones and muscles, reducing risk of osteoporosis</li>
        <li>Supports weight management</li>
        <li>Enhances immune function</li>
      </ul>
      
      <h2>Mental Health Benefits</h2>
      <p>Exercise is a powerful tool for mental well-being:</p>
      <ul>
        <li>Reduces symptoms of depression and anxiety</li>
        <li>Alleviates stress</li>
        <li>Improves sleep quality</li>
        <li>Boosts mood through the release of endorphins</li>
        <li>Enhances cognitive function and memory</li>
        <li>May reduce risk of cognitive decline and dementia</li>
      </ul>
      
      <h2>Types of Exercise</h2>
      <p>A complete fitness program includes:</p>
      <ul>
        <li><strong>Aerobic Exercise:</strong> Activities like walking, swimming, cycling, or dancing that increase heart rate and breathing.</li>
        <li><strong>Strength Training:</strong> Resistance exercises that build muscle strength and endurance.</li>
        <li><strong>Flexibility Work:</strong> Stretching to maintain or improve range of motion.</li>
        <li><strong>Balance Training:</strong> Exercises that enhance stability and prevent falls.</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>Tips for beginning an exercise routine:</p>
      <ul>
        <li>Start slowly and gradually increase intensity and duration</li>
        <li>Choose activities you enjoy</li>
        <li>Set realistic goals</li>
        <li>Schedule exercise as a regular part of your day</li>
        <li>Find an exercise partner for accountability and motivation</li>
      </ul>
      
      <h2>Exercise Recommendations</h2>
      <p>General guidelines for adults:</p>
      <ul>
        <li>150-300 minutes of moderate-intensity aerobic activity weekly</li>
        <li>OR 75-150 minutes of vigorous-intensity aerobic activity weekly</li>
        <li>Muscle-strengthening activities at least 2 days per week</li>
      </ul>
      
      <h2>Overcoming Barriers</h2>
      <p>Strategies to address common exercise challenges:</p>
      <ul>
        <li>Time constraints: Break activity into shorter sessions</li>
        <li>Lack of energy: Schedule exercise when your energy is highest</li>
        <li>Discomfort: Start with gentle activities and proper equipment</li>
        <li>Boredom: Vary your routine and try new activities</li>
      </ul>
      
      <h2>Safety Considerations</h2>
      <p>Exercise safely by:</p>
      <ul>
        <li>Consulting healthcare providers before beginning a new program, especially if you have chronic conditions</li>
        <li>Warming up before and cooling down after exercise</li>
        <li>Staying hydrated</li>
        <li>Using proper form and appropriate equipment</li>
        <li>Listening to your body and adjusting as needed</li>
      </ul>
    `,
    category: "fitness",
    tags: ["exercise", "physical activity", "fitness", "health benefits"],
    author: "James Rodriguez, CPT",
    publishDate: "2025-03-20",
    readTime: 8,
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXhlcmNpc2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
  },
];

export default articles;
