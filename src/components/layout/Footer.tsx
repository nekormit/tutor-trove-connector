
import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rmit-darkGray text-white py-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="font-display text-xl font-semibold tracking-tight">
              Tutor<span className="text-rmit-red">Trove</span>
            </Link>
            <p className="mt-2 text-sm text-gray-300 max-w-md">
              Connecting passionate tutors with courses that need them at RMIT University. Making the tutor assignment process simple, transparent, and effective.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-rmit-red transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/signin" className="text-sm text-gray-300 hover:text-rmit-red transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <a href="https://www.rmit.edu.au" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-rmit-red transition-colors flex items-center gap-1">
                  RMIT Website <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-3">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-rmit-red" />
                124 La Trobe St, Melbourne VIC 3000
              </li>
              <li className="text-sm text-gray-300 flex items-center">
                <Phone className="h-4 w-4 mr-2 text-rmit-red" />
                +61 3 9925 2000
              </li>
              <li className="text-sm text-gray-300 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-rmit-red" />
                tutortrove@rmit.edu.au
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">
            © {currentYear} TutorTrove at RMIT University. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-xs text-gray-400 hover:text-rmit-red transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-rmit-red transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
