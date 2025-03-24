
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, userType, logout } = useAuth();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="font-display text-xl font-semibold tracking-tight">
                Tutor<span className="text-rmit-red">Trove</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/' 
                  ? 'text-rmit-red' 
                  : 'text-gray-700 hover:text-rmit-red'
              }`}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  href={userType === 'tutor' ? '/tutor-dashboard' : '/lecturer-dashboard'}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/tutor-dashboard' || pathname === '/lecturer-dashboard'
                      ? 'text-rmit-red' 
                      : 'text-gray-700 hover:text-rmit-red'
                  }`}
                >
                  Dashboard
                </Link>
                
                <button
                  onClick={logout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-rmit-red"
                >
                  <span>Logout</span>
                  <LogOut className="ml-1 h-4 w-4" />
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/signin' 
                    ? 'text-rmit-red' 
                    : 'text-gray-700 hover:text-rmit-red'
                }`}
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-rmit-red focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-3 space-y-1 shadow-lg">
          <Link
            href="/"
            onClick={closeMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/' ? 'text-rmit-red' : 'text-gray-700 hover:text-rmit-red'
            }`}
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link
                href={userType === 'tutor' ? '/tutor-dashboard' : '/lecturer-dashboard'}
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/tutor-dashboard' || pathname === '/lecturer-dashboard'
                    ? 'text-rmit-red' 
                    : 'text-gray-700 hover:text-rmit-red'
                }`}
              >
                Dashboard
              </Link>
              
              <button
                onClick={() => {
                  closeMenu();
                  logout();
                }}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rmit-red"
              >
                <span>Logout</span>
                <LogOut className="ml-1 h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              href="/signin"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/signin' ? 'text-rmit-red' : 'text-gray-700 hover:text-rmit-red'
              }`}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
