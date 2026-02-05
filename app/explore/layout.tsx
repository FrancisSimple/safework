import React from 'react';
import { Sidebar } from '../../modules/explore/presentation/components/Sidebar';

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. Stack vertically on mobile, horizontally on desktop
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans">
      
      {/* Sidebar / Mobile Header */}
      <Sidebar />

      {/* 2. Remove padding on mobile (px-4 py-6) so content breathes */}
      <main className="flex-1 px-4 py-6 md:p-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
}