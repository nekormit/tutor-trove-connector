
'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export default function LecturerDashboard() {
  const { isAuthenticated, userType } = useAuth();
  
  if (!isAuthenticated || userType !== 'lecturer') {
    redirect('/signin');
    return null;
  }
  
  // For now, return a placeholder. You can replace this with the actual LecturerDashboard content
  return (
    <div className="container mx-auto p-4">
      <h1>Lecturer Dashboard</h1>
      <p>Welcome to the lecturer dashboard!</p>
    </div>
  );
}
