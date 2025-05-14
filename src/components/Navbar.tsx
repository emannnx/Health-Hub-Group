
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, Activity, Pill, AlertTriangle, Users, Apple, Dumbbell, Calculator, Video } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { toast } from 'sonner';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import healthTopics from '@/data/healthTopics';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (topic: string) => {
    setIsSearchOpen(false);
    navigate(`/health-search?q=${encodeURIComponent(topic)}`);
    toast.success(`Searching for "${topic}"`);
  };

  return (
    <>
      <nav className="bg-background dark:bg-card shadow-md sticky top-0 z-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center">
                  <span className="text-primary font-bold text-2xl">Health</span>
                  <span className="text-secondary font-bold text-2xl">Hub</span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                <Link to="/" className={`inline-flex items-center px-1 pt-1 border-b-2 ${location.pathname === '/' ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground'} hover:text-foreground hover:border-primary transition-colors duration-200`}>
                  Home
                </Link>
                <Link to="/articles" className={`inline-flex items-center px-1 pt-1 border-b-2 ${location.pathname === '/articles' ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground'} hover:text-foreground hover:border-primary transition-colors duration-200`}>
                  Health Topics
                </Link>
                <Link to="/health-search" className={`inline-flex items-center px-1 pt-1 border-b-2 ${location.pathname === '/health-search' ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground'} hover:text-foreground hover:border-primary transition-colors duration-200`}>
                  Search Conditions
                </Link>
                <div className="relative group">
                  <div className={`inline-flex items-center px-1 pt-1 border-b-2 ${location.pathname === '/my-health' || location.pathname === '/medication-tracker' ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground'} hover:text-foreground hover:border-primary transition-colors duration-200 cursor-pointer`}>
                    Health Tools
                  </div>
                  <div className="absolute left-0 mt-2 w-48 bg-background dark:bg-card rounded-md shadow-lg overflow-hidden z-20 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out">
                    <div className="py-1">
                      <Link to="/symptom-checker" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">Symptom Checker</Link>
                      <Link to="/health-calculators" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">Health Calculators</Link>
                      <Link to="/nutrition-guide" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">Nutrition Guide</Link>
                      <Link to="/exercise-library" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">Exercise Library</Link>
                      <Link to="/emergency-guide" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">Emergency Guide</Link>
                    </div>
                  </div>
                </div>
                {isAuthenticated && (
                  <div className="relative group">
                    <div className={`inline-flex items-center px-1 pt-1 border-b-2 ${location.pathname === '/my-health' || location.pathname === '/medication-tracker' ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground'} hover:text-foreground hover:border-primary transition-colors duration-200 cursor-pointer`}>
                      My Health
                    </div>
                    <div className="absolute left-0 mt-2 w-48 bg-background dark:bg-card rounded-md shadow-lg overflow-hidden z-20 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out">
                      <div className="py-1">
                        <Link to="/my-health" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">Health Dashboard</Link>
                        <Link to="/medication-tracker" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">Medication Tracker</Link>
                        <Link to="/telehealth" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200">TeleHealth</Link>
                      </div>
                    </div>
                  </div>
                )}
                <Link to="/community-forum" className={`inline-flex items-center px-1 pt-1 border-b-2 ${location.pathname === '/community-forum' ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground'} hover:text-foreground hover:border-primary transition-colors duration-200`}>
                  Community
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
              >
                <Search className="h-5 w-5" />
              </button>
              <ThemeToggle />
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200">
                    <User className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link to="/?auth=login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 transition-colors duration-200">
                  Sign in
                </Link>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted ml-2 transition-colors duration-200"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted ml-2 focus:outline-none transition-colors duration-200"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden bg-background dark:bg-card shadow-lg transition-colors duration-300 animate-fade-in" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 text-base ${location.pathname === '/' ? 'text-foreground font-medium border-l-4 border-primary' : 'text-muted-foreground border-l-4 border-transparent'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
              >
                Home
              </Link>
              <Link
                to="/articles"
                className={`block px-3 py-2 text-base ${location.pathname === '/articles' ? 'text-foreground font-medium border-l-4 border-primary' : 'text-muted-foreground border-l-4 border-transparent'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
              >
                Health Topics
              </Link>
              <Link
                to="/health-search"
                className={`block px-3 py-2 text-base ${location.pathname === '/health-search' ? 'text-foreground font-medium border-l-4 border-primary' : 'text-muted-foreground border-l-4 border-transparent'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
              >
                Search Conditions
              </Link>
              
              {/* Health Tools Dropdown for Mobile */}
              <div className="block px-3 py-2 text-base text-muted-foreground border-l-4 border-transparent">
                Health Tools
              </div>
              <div className="pl-6 space-y-1">
                <Link
                  to="/symptom-checker"
                  className={`block px-3 py-2 text-sm ${location.pathname === '/symptom-checker' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
                >
                  Symptom Checker
                </Link>
                <Link
                  to="/health-calculators"
                  className={`block px-3 py-2 text-sm ${location.pathname === '/health-calculators' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
                >
                  Health Calculators
                </Link>
                <Link
                  to="/nutrition-guide"
                  className={`block px-3 py-2 text-sm ${location.pathname === '/nutrition-guide' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
                >
                  Nutrition Guide
                </Link>
                <Link
                  to="/exercise-library"
                  className={`block px-3 py-2 text-sm ${location.pathname === '/exercise-library' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
                >
                  Exercise Library
                </Link>
                <Link
                  to="/emergency-guide"
                  className={`block px-3 py-2 text-sm ${location.pathname === '/emergency-guide' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
                >
                  Emergency Guide
                </Link>
              </div>
              
              {isAuthenticated && (
                <>
                  {/* My Health Dropdown for Mobile */}
                  <div className="block px-3 py-2 text-base text-muted-foreground border-l-4 border-transparent">
                    My Health
                  </div>
                  <div className="pl-6 space-y-1">
                    <Link
                      to="/my-health"
                      className={`block px-3 py-2 text-sm ${location.pathname === '/my-health' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
                    >
                      Health Dashboard
                    </Link>
                    <Link
                      to="/medication-tracker"
                      className={`block px-3 py-2 text-sm ${location.pathname === '/medication-tracker' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
                    >
                      Medication Tracker
                    </Link>
                    <Link
                      to="/telehealth"
                      className={`block px-3 py-2 text-sm ${location.pathname === '/telehealth' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
                    >
                      TeleHealth
                    </Link>
                  </div>
                </>
              )}
              
              <Link
                to="/community-forum"
                className={`block px-3 py-2 text-base ${location.pathname === '/community-forum' ? 'text-foreground font-medium border-l-4 border-primary' : 'text-muted-foreground border-l-4 border-transparent'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
              >
                Community
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className={`block px-3 py-2 text-base ${location.pathname === '/profile' ? 'text-foreground font-medium border-l-4 border-primary' : 'text-muted-foreground border-l-4 border-transparent'} hover:text-foreground hover:bg-muted transition-colors duration-200`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 text-base text-muted-foreground border-l-4 border-transparent hover:text-foreground hover:bg-muted hover:border-primary transition-colors duration-200"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  to="/?auth=login"
                  className="block w-full text-center mx-3 my-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput 
          placeholder="Search health conditions..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Health Topics">
            {healthTopics
              .filter(topic => 
                topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                topic.description.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(topic => (
                <CommandItem 
                  key={topic.id}
                  onSelect={() => handleSearch(topic.title)}
                >
                  {topic.title}
                </CommandItem>
              ))
            }
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Navbar;
