
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedContainer from '@/components/ui/AnimatedContainer';

const NotFound: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-20 gradient-bg">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-center h-full">
          <AnimatedContainer animation="scale-in" className="glass-card p-12 rounded-lg text-center max-w-lg">
            <h1 className="text-6xl font-bold">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-muted-foreground mt-4">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center mt-8 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Link>
          </AnimatedContainer>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
