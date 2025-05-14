
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import articles from '@/data/articles';
import healthTopics from '@/data/healthTopics';
import { Search } from 'lucide-react';

const Articles = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [filteredArticles, setFilteredArticles] = useState(articles);

  useEffect(() => {
    let filtered = articles;
    
    if (activeCategory) {
      filtered = filtered.filter(article => article.category === activeCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(term) || 
        article.summary.toLowerCase().includes(term) || 
        article.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredArticles(filtered);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (categoryId: string | null) => {
    setActiveCategory(categoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
            Health Articles & Resources
          </h1>
          
          {/* Search and filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-health-blue focus:border-health-blue sm:text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === null
                    ? 'bg-health-blue text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All Topics
              </button>
              {healthTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleCategoryChange(topic.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === topic.id
                      ? 'bg-health-blue text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {topic.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* Articles grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No articles found matching your criteria.</p>
              <button 
                onClick={() => {
                  setActiveCategory(null);
                  setSearchTerm('');
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-health-blue hover:bg-blue-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
