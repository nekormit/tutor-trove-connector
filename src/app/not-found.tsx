
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedContainer from '@/components/ui/AnimatedContainer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 rmit-gradient-bg pt-32 pb-20 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedContainer animation="scale-in" className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-rmit-darkGray">404</h1>
            <h2 className="text-2xl font-bold mb-2 text-rmit-red">Page Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The page you were looking for doesn't exist or has been moved.
            </p>
            <Link href="/" className="inline-flex items-center justify-center gap-2 text-white bg-rmit-red px-6 py-3 rounded-md hover:bg-rmit-red/90 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Return to Home
            </Link>
          </AnimatedContainer>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
