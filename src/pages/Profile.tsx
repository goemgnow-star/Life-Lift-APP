import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [faithMode, setFaithMode] = useState(user?.faith_mode || false);

  if (!user) return <div className="max-w-md mx-auto text-center py-12"><p className="text-[#4a5e5e]">Please sign in.</p></div>;

  const toggleFaith = async () => {
    const newMode = !faithMode;
    setFaithMode(newMode);
    await fetch('/api/settings/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ faith_mode: newMode }),
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#1a2a2a] font-serif mb-6">Profile</h1>
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#ede8df]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1B6B6B] flex items-center justify-center text-white font-bold text-lg">{(user.name || 'U')[0].toUpperCase()}</div>
          <div><h2 className="font-semibold text-[#1a2a2a]">{user.name || 'User'}</h2><p className="text-sm text-[#4a5e5e]">{user.email}</p></div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#ede8df]">
        <h3 className="font-semibold text-[#1a2a2a] mb-2">Stability Tier</h3>
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-[#F4A836] text-white font-bold text-sm flex items-center justify-center">{user.stability_tier || 1}</span>
          <span className="text-sm text-[#4a5e5e]">{['','Crisis / Survival','Unstable / Fragile','Stabilizing','Functional Growth'][user.stability_tier || 1]}</span>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#ede8df]">
        <div className="flex items-center justify-between">
          <div><h3 className="font-semibold text-[#1a2a2a]">Faith Mode</h3><p className="text-xs text-[#4a5e5e] mt-0.5">{faithMode ? 'Hope uses faith language' : 'Secular / neutral language'}</p></div>
          <button onClick={toggleFaith} className={`w-12 h-7 rounded-full transition-colors ${faithMode ? 'bg-[#1B6B6B]' : 'bg-[#ede8df]'}`}><div className={`w-5 h-5 rounded-full bg-white transition-transform ${faithMode ? 'translate-x-6' : 'translate-x-1'}`} /></button>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#ede8df]">
        <h3 className="font-semibold text-[#1a2a2a] mb-1">Check-In Streak</h3>
        <p className="text-2xl font-bold text-[#F4A836]">{user.checkin_streak || 0} days</p>
      </div>
      <button onClick={logout} className="w-full bg-[#e05555] text-white rounded-xl py-3.5 font-semibold text-sm">Sign Out</button>
    </div>
  );
};

export default Profile;
