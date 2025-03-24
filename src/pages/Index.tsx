
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Clock } from 'lucide-react';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { initializeLocalStorage } from '@/utils/dataUtils';

const Index: React.FC = () => {
  // Initialize local storage with dummy data
  useEffect(() => {
    initializeLocalStorage();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedContainer animation="slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Connecting <span className="text-primary">Tutors</span> and <span className="text-primary">Courses</span> with Precision
              </h1>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={100} className="mt-6">
              <p className="text-lg md:text-xl text-muted-foreground">
                TutorTrove streamlines the process of matching qualified tutors with university courses, making the selection process transparent and efficient.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={200} className="mt-8">
              <Link
                to="/signin"
                className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </AnimatedContainer>
          </div>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-24 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedContainer animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl font-bold">Why TutorTrove?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our platform offers a comprehensive solution for managing the tutor application and selection process.
            </p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedContainer animation="slide-up" delay={100} className="glass-card p-6 rounded-lg">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Course Matching</h3>
              <p className="text-muted-foreground">
                Easily browse and apply for multiple courses that match your expertise and availability.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={200} className="glass-card p-6 rounded-lg">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Efficient Selection</h3>
              <p className="text-muted-foreground">
                Lecturers can quickly review applicants, sort by skills, and make informed selections.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={300} className="glass-card p-6 rounded-lg">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Skill Showcase</h3>
              <p className="text-muted-foreground">
                Tutors can highlight their skills, credentials, and past experiences to stand out.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={400} className="glass-card p-6 rounded-lg">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
              <p className="text-muted-foreground">
                Streamlined workflows save hours of manual work for both tutors and lecturers.
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedContainer animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our platform makes the tutor assignment process simple and transparent for all parties involved.
            </p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedContainer animation="fade-in" delay={150} className="text-center">
              <div className="relative mx-auto w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                1
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-primary animate-pulse"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply</h3>
              <p className="text-muted-foreground">
                Tutors create profiles and apply for available courses, showcasing their skills and experience.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade-in" delay={300} className="text-center">
              <div className="relative mx-auto w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                2
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-primary animate-pulse"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Review</h3>
              <p className="text-muted-foreground">
                Lecturers review applications, sort candidates, and select the most suitable tutors.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade-in" delay={450} className="text-center">
              <div className="relative mx-auto w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                3
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-primary animate-pulse"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Match</h3>
              <p className="text-muted-foreground">
                Selected tutors are notified and matched with their courses for the upcoming semester.
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <AnimatedContainer animation="scale-in" className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mt-4 text-muted-foreground mb-8">
              Join TutorTrove today and revolutionize your tutor assignment process.
            </p>
            <Link
              to="/signin"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Sign In Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </AnimatedContainer>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
