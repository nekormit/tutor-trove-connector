
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import AnimatedContainer from '@/components/ui/AnimatedContainer';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, userType, logout } = useAuth();
  const location = useLocation();
  
  // Handle scroll effect for transparent header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'py-4 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b' : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <AnimatedContainer animation="fade-in" className="flex items-center gap-2">
          <Link 
            to="/" 
            className="font-display text-xl font-semibold tracking-tight transition-colors"
          >
            Tutor<span className="text-primary">Trove</span>
          </Link>
        </AnimatedContainer>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <AnimatedContainer animation="slide-down" delay={100}>
            <Link to="/" className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}>
              Home
            </Link>
          </AnimatedContainer>
          
          {!isAuthenticated && (
            <AnimatedContainer animation="slide-down" delay={200}>
              <Link to="/signin" className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/signin" ? "text-primary" : "text-muted-foreground"
              )}>
                Sign In
              </Link>
            </AnimatedContainer>
          )}
          
          {isAuthenticated && userType === 'tutor' && (
            <AnimatedContainer animation="slide-down" delay={300}>
              <Link to="/tutor-dashboard" className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/tutor-dashboard" ? "text-primary" : "text-muted-foreground"
              )}>
                Dashboard
              </Link>
            </AnimatedContainer>
          )}
          
          {isAuthenticated && userType === 'lecturer' && (
            <AnimatedContainer animation="slide-down" delay={300}>
              <Link to="/lecturer-dashboard" className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/lecturer-dashboard" ? "text-primary" : "text-muted-foreground"
              )}>
                Dashboard
              </Link>
            </AnimatedContainer>
          )}
          
          {isAuthenticated && (
            <AnimatedContainer animation="slide-down" delay={400}>
              <button 
                onClick={logout}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Sign Out
              </button>
            </AnimatedContainer>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card absolute top-full left-0 right-0 border-b">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            
            {!isAuthenticated && (
              <Link 
                to="/signin" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === "/signin" ? "text-primary" : "text-muted-foreground"
                )}
              >
                Sign In
              </Link>
            )}
            
            {isAuthenticated && userType === 'tutor' && (
              <Link 
                to="/tutor-dashboard" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === "/tutor-dashboard" ? "text-primary" : "text-muted-foreground"
                )}
              >
                Dashboard
              </Link>
            )}
            
            {isAuthenticated && userType === 'lecturer' && (
              <Link 
                to="/lecturer-dashboard" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === "/lecturer-dashboard" ? "text-primary" : "text-muted-foreground"
                )}
              >
                Dashboard
              </Link>
            )}
            
            {isAuthenticated && (
              <button 
                onClick={logout}
                className="text-sm font-medium text-left text-muted-foreground transition-colors hover:text-primary"
              >
                Sign Out
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
