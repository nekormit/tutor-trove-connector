
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Clock, MapPin, Building, GraduationCap } from 'lucide-react';
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
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 rmit-gradient-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedContainer animation="slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                RMIT <span className="text-white">Tutor</span><span className="text-rmit-lightGray">Trove</span>
              </h1>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={100} className="mt-6">
              <p className="text-lg md:text-xl text-white/90">
                Connecting qualified tutors with courses at RMIT University Melbourne City Campus, making the selection process transparent and efficient.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={200} className="mt-8">
              <Link
                to="/signin"
                className="inline-flex items-center justify-center bg-white text-rmit-red px-6 py-3 rounded-md hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </AnimatedContainer>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-24 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </section>
      
      {/* RMIT Campus Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedContainer animation="fade-in" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-rmit-darkGray">Melbourne City Campus</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              In the heart of Melbourne's CBD, RMIT's City campus is home to a vibrant community of students and educators.
            </p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedContainer animation="slide-up" delay={100} className="rounded-lg overflow-hidden shadow-md">
              <div className="aspect-video bg-gray-200 relative">
                <img src="https://source.unsplash.com/photo-1496307653780-42ee777d4833" alt="RMIT Building" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <Building className="h-5 w-5 text-rmit-red" />
                  <h3 className="text-xl font-semibold">Modern Facilities</h3>
                </div>
                <p className="text-muted-foreground">
                  State-of-the-art learning spaces designed to inspire innovation and collaboration across disciplines.
                </p>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={200} className="rounded-lg overflow-hidden shadow-md">
              <div className="aspect-video bg-gray-200 relative">
                <img src="https://source.unsplash.com/photo-1460574283810-2aab119d8511" alt="RMIT Building" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-rmit-red" />
                  <h3 className="text-xl font-semibold">Central Location</h3>
                </div>
                <p className="text-muted-foreground">
                  Located in the heart of Melbourne's CBD, providing easy access to public transportation and city amenities.
                </p>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={300} className="rounded-lg overflow-hidden shadow-md">
              <div className="aspect-video bg-gray-200 relative">
                <img src="https://source.unsplash.com/photo-1527576539890-dfa815648363" alt="RMIT Building" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-5 w-5 text-rmit-red" />
                  <h3 className="text-xl font-semibold">Academic Excellence</h3>
                </div>
                <p className="text-muted-foreground">
                  A hub of academic excellence, offering a diverse range of programs taught by industry-leading experts.
                </p>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 rmit-building-pattern">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedContainer animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl font-bold">Why TutorTrove?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our platform offers a comprehensive solution for managing the tutor application and selection process at RMIT.
            </p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedContainer animation="slide-up" delay={100} className="glass-card p-6 rounded-lg">
              <div className="bg-rmit-red/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-rmit-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Course Matching</h3>
              <p className="text-muted-foreground">
                Easily browse and apply for multiple RMIT courses that match your expertise and availability.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={200} className="glass-card p-6 rounded-lg">
              <div className="bg-rmit-red/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-rmit-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Efficient Selection</h3>
              <p className="text-muted-foreground">
                RMIT lecturers can quickly review applicants, sort by skills, and make informed selections.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={300} className="glass-card p-6 rounded-lg">
              <div className="bg-rmit-red/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-rmit-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Skill Showcase</h3>
              <p className="text-muted-foreground">
                Tutors can highlight their skills, credentials, and past experiences at RMIT to stand out.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={400} className="glass-card p-6 rounded-lg">
              <div className="bg-rmit-red/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-rmit-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
              <p className="text-muted-foreground">
                Streamlined workflows save hours of manual work for both tutors and RMIT lecturers.
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-rmit-lightGray">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedContainer animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl font-bold">How It Works at RMIT</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our platform makes the tutor assignment process simple and transparent across RMIT's Melbourne City campus.
            </p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedContainer animation="fade-in" delay={150} className="text-center">
              <div className="relative mx-auto w-16 h-16 rounded-full bg-rmit-red flex items-center justify-center text-white text-xl font-bold mb-4">
                1
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-rmit-red animate-pulse"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply</h3>
              <p className="text-muted-foreground">
                Tutors create profiles and apply for available RMIT courses, showcasing their skills and experience.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade-in" delay={300} className="text-center">
              <div className="relative mx-auto w-16 h-16 rounded-full bg-rmit-red flex items-center justify-center text-white text-xl font-bold mb-4">
                2
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-rmit-red animate-pulse"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Review</h3>
              <p className="text-muted-foreground">
                RMIT lecturers review applications, sort candidates, and select the most suitable tutors.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade-in" delay={450} className="text-center">
              <div className="relative mx-auto w-16 h-16 rounded-full bg-rmit-red flex items-center justify-center text-white text-xl font-bold mb-4">
                3
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-rmit-red animate-pulse"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Match</h3>
              <p className="text-muted-foreground">
                Selected tutors are notified and matched with their RMIT courses for the upcoming semester.
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 rmit-gradient-bg">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <AnimatedContainer animation="scale-in" className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white">Ready to Join RMIT's Teaching Community?</h2>
            <p className="mt-4 text-white/90 mb-8">
              Join TutorTrove today and be part of RMIT University's vibrant teaching community.
            </p>
            <Link
              to="/signin"
              className="inline-flex items-center justify-center bg-white text-rmit-red px-6 py-3 rounded-md hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
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
