
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/auth-context";
import '@/app/globals.css';

export const metadata = {
  title: 'TutorTrove - RMIT University',
  description: 'Connecting qualified tutors with courses at RMIT University',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner position="top-right" richColors closeButton />
            {children}
          </AuthProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
