import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/hope', label: 'Hope', icon: '💛' },
  { to: '/study', label: 'Study', icon: '📚' },
  { to: '/habits', label: 'Habits', icon: '✅' },
  { to: '/journal', label: 'Journal', icon: '📝' },
];

const BottomNav: React.FC = () => {
  const location = useLocation();
  if (location.pathname === '/login') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#1B6B6B] flex items-center justify-around z-50 pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full transition-colors ${isActive ? 'text-[#F4A836]' : 'text-[#F7F3EB]'}`
          }
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-[0.65rem] mt-0.5 font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
