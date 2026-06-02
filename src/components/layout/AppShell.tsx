import React from 'react';
import BottomNav from './BottomNav';

const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-[#F7F3EB] flex flex-col">
    <main className="flex-1 overflow-y-auto pb-[calc(64px+env(safe-area-inset-bottom))] px-4 pt-4">
      {children}
    </main>
    <BottomNav />
  </div>
);

export default AppShell;
