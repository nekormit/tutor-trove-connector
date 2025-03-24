
'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export default function TutorDashboard() {
  const { isAuthenticated, userType } = useAuth();
  
  if (!isAuthenticated || userType !== 'tutor') {
    redirect('/signin');
    return null;
  }
  
  // For now, return a placeholder. You can replace this with the actual TutorDashboard content
  return (
    <div className="container mx-auto p-4">
      <h1>Tutor Dashboard</h1>
      <p>Welcome to the tutor dashboard!</p>
    </div>
  );
}
