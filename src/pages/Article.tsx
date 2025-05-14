
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import articles from '@/data/articles';

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/articles" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-health-blue hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section with image and title */}
        <div className="relative bg-gray-900">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover opacity-40"
              src={article.imageUrl || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"}
              alt={article.title}
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <Link 
                to="/articles" 
                className="inline-flex items-center text-white hover:text-health-light-blue mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Link>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                {article.title}
              </h1>
              <p className="mt-4 text-xl text-gray-200 max-w-3xl mx-auto">
                {article.summary}
              </p>
              <div className="mt-6 flex items-center justify-center text-gray-200 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <time dateTime={article.publishDate}>
                    {new Date(article.publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </time>
                </div>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article content */}
        <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6">
          <div className="flex items-center mb-8">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {article.author.split(' ').map(name => name[0]).join('')}
              </div>
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-900">
                {article.author}
              </p>
              <div className="flex text-sm text-gray-500">
                <span>Medical Specialist</span>
                <span className="mx-1">•</span>
                <span>Verified Contributor</span>
              </div>
            </div>
          </div>

          <div className="prose prose-blue prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-6">
              <Tag className="h-5 w-5 text-gray-500" />
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-health-light-blue text-health-blue"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center">
              <Link 
                to="/articles" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-health-blue bg-blue-50 hover:bg-blue-100 mb-4 sm:mb-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Link>
              <div className="flex space-x-4">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Share
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-health-blue hover:bg-blue-700">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related articles */}
        <div className="bg-health-gray py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
              {articles
                .filter(a => a.category === article.category && a.id !== article.id)
                .slice(0, 3)
                .map(relatedArticle => (
                  <Link 
                    key={relatedArticle.id} 
                    to={`/article/${relatedArticle.id}`}
                    className="card-hover bg-white rounded-lg overflow-hidden shadow-md"
                  >
                    <img 
                      className="h-40 w-full object-cover" 
                      src={relatedArticle.imageUrl || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"} 
                      alt={relatedArticle.title} 
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">{relatedArticle.title}</h3>
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">{relatedArticle.summary}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Article;
