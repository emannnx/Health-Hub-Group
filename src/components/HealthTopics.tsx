
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Activity, Brain, Apple, Dumbbell, Shield 
} from 'lucide-react';
import healthTopics from '@/data/healthTopics';

const getIcon = (iconName: string) => {
  switch(iconName) {
    case 'heart': return <Heart className="h-8 w-8 text-health-blue" />;
    case 'activity': return <Activity className="h-8 w-8 text-health-blue" />;
    case 'brain': return <Brain className="h-8 w-8 text-health-blue" />;
    case 'apple': return <Apple className="h-8 w-8 text-health-blue" />;
    case 'dumbbell': return <Dumbbell className="h-8 w-8 text-health-blue" />;
    case 'shield': return <Shield className="h-8 w-8 text-health-blue" />;
    default: return <Heart className="h-8 w-8 text-health-blue" />;
  }
};

const HealthTopics = () => {
  return (
    <section className="py-12 bg-health-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Health Topics
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover reliable information on a wide range of health topics, curated by medical professionals.
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {healthTopics.map((topic) => (
            <Link
              to={`/articles?category=${topic.id}`}
              key={topic.id}
              className="card-hover flex flex-col bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="px-6 py-8 flex-1">
                <div className="mb-4 bg-health-light-blue rounded-full w-16 h-16 flex items-center justify-center">
                  {getIcon(topic.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-gray-600">{topic.description}</p>
              </div>
              <div className="px-6 py-3 bg-health-light-blue">
                <span className="text-health-blue font-semibold">Explore &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthTopics;
