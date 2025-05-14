
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  healthProfile?: HealthProfile;
};

type HealthProfile = {
  age: number;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
  bloodType: string;
  genotype: string;
  oxygenLevel: number;
  conditions: string[];
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateHealthProfile: (healthProfile: HealthProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is stored in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("healthhub-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser: User = {
      id: "user-" + Math.floor(Math.random() * 10000),
      name: email.split('@')[0],
      email,
      healthProfile: email === "demo@healthhub.com" ? {
        age: 35,
        gender: "Male",
        height: 175,
        weight: 70,
        bmi: 22.9,
        bloodType: "A+",
        genotype: "AA",
        oxygenLevel: 98,
        conditions: ["Mild Hypertension", "Seasonal Allergies"]
      } : undefined
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem("healthhub-user", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  // Mock registration function
  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful registration
    const mockUser: User = {
      id: "user-" + Math.floor(Math.random() * 10000),
      name,
      email
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem("healthhub-user", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("healthhub-user");
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update health profile
  const updateHealthProfile = (healthProfile: HealthProfile) => {
    if (user) {
      const updatedUser = { ...user, healthProfile };
      setUser(updatedUser);
      localStorage.setItem("healthhub-user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      updateHealthProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
