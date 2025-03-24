
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SignInForm from '@/components/auth/SignInForm';
import AnimatedContainer from '@/components/ui/AnimatedContainer';

const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 rmit-gradient-bg pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <AnimatedContainer animation="fade-in" className="mb-8 text-center">
              <Link to="/" className="inline-block">
                <h1 className="font-display text-3xl font-bold tracking-tight text-white">
                  Tutor<span className="text-rmit-lightGray">Trove</span>
                </h1>
              </Link>
              <p className="mt-2 text-sm text-white">
                RMIT University Melbourne City Campus
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade-in" delay={100} className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-rmit-darkGray">Sign In to Your Account</h2>
              <SignInForm />
            </AnimatedContainer>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
