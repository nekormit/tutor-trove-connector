
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { 
  getAuthenticatedUser, 
  authenticateUser, 
  setAuthenticatedUser, 
  removeAuthenticatedUser 
} from '@/utils/authUtils';
import { toast } from '@/components/ui/sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  userType: 'tutor' | 'lecturer' | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'tutor' | 'lecturer' | null>(null);
  const router = useRouter();

  // Check for authenticated user on mount
  useEffect(() => {
    const authenticatedUser = getAuthenticatedUser();
    if (authenticatedUser) {
      setUser(authenticatedUser);
      setIsAuthenticated(true);
      setUserType(authenticatedUser.type);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const authenticatedUser = authenticateUser(email, password);
      
      if (authenticatedUser) {
        setAuthenticatedUser(authenticatedUser);
        setUser(authenticatedUser);
        setIsAuthenticated(true);
        setUserType(authenticatedUser.type);
        
        toast.success(`Welcome back, ${authenticatedUser.name}!`);
        
        // Redirect based on user type
        if (authenticatedUser.type === 'tutor') {
          router.push('/tutor-dashboard');
        } else if (authenticatedUser.type === 'lecturer') {
          router.push('/lecturer-dashboard');
        }
        
        return true;
      } else {
        toast.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return false;
    }
  };

  const logout = () => {
    removeAuthenticatedUser();
    setUser(null);
    setIsAuthenticated(false);
    setUserType(null);
    toast.success('You have been logged out');
    router.push('/');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        userType,
        login, 
        logout 
      }}
    >
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
