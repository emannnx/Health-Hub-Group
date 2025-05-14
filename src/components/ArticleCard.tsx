
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link to={`/article/${article.id}`} className="card-hover flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={article.imageUrl || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"} alt={article.title} />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-health-blue">
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-gray-900">
            {article.title}
          </h3>
          <p className="mt-3 text-base text-gray-500">
            {article.summary}
          </p>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <span className="sr-only">{article.author}</span>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              {article.author.split(' ').map(name => name[0]).join('')}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {article.author}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={article.publishDate}>
                {new Date(article.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </time>
              <span aria-hidden="true">
                &middot;
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {article.readTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
