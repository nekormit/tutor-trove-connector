
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/auth-context';
import { validateEmail, validatePassword } from '@/utils/authUtils';
import AnimatedContainer from '@/components/ui/AnimatedContainer';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const { login } = useAuth();

  const validateForm = () => {
    let isValid = true;
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (!success) {
        // The error toast is already shown in the login function
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <AnimatedContainer animation="scale-in" className="glass-card w-full max-w-md mx-auto p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <p className="text-muted-foreground mt-2">Sign in to your TutorTrove account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              emailError ? 'border-red-500' : 'border-input'
            }`}
            placeholder="your.email@example.com"
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <a href="#" className="text-xs text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              passwordError ? 'border-red-500' : 'border-input'
            }`}
            placeholder="••••••••"
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Demo accounts:
        </p>
        <div className="mt-1 p-2 bg-muted rounded-md text-xs text-left">
          <p>Tutor: tutor@example.com / Password123!</p>
          <p>Lecturer: lecturer@example.com / Password123!</p>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signin" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AnimatedContainer>
  );
};

export default SignInForm;
