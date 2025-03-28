
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('aiStudioUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock authentication - would connect to Supabase in production
      if (email === 'demo@aistudio.com' && password === 'password') {
        const mockUser = {
          id: '1',
          name: 'Demo User',
          email: 'demo@aistudio.com',
          avatar: '',
        };
        
        localStorage.setItem('aiStudioUser', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsAuthenticated(true);
        toast.success('Login successful');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Failed to login');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock signup - would connect to Supabase in production
      const mockUser = {
        id: '1',
        name,
        email,
        avatar: '',
      };
      
      localStorage.setItem('aiStudioUser', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      toast.success('Account created successfully');
    } catch (error) {
      toast.error('Failed to create account');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('aiStudioUser');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
