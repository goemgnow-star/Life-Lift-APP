import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [faithMode, setFaithMode] = useState(user?.faith_mode || false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <p className="text-[#4a5e5e]">Please sign in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-[#1a2a2a] font-serif mb-6">Profile</h1>
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#ede8df]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1B6B6B] flex items-center justify-center text-white font-bold text-lg">
            {(user.name || 'U')[0].toUpperCase()}
          </div>
          <div>
            <h2 className="font-semibold text-[#1a2a2a]">{user.name || 'User'}</h2>
            <p className="text-sm text-[#4a5e5e]">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#ede8df]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[#1a2a2a]">Faith Mode</h3>
            <p className="text-xs text-[#4a5e5e]">{faithMode ? 'Spiritual guidance on' : 'Secular mode'}</p>
          </div>
          <button onClick={() => setFaithMode(!faithMode)}
            className={`w-12 h-7 rounded-full transition-colors ${faithMode ? 'bg-[#1B6B6B]' : 'bg-[#ede8df]'}`}>
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${faithMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#ede8df]">
        <p className="text-sm text-[#4a5e5e]">Stability Tier: <strong className="text-[#1a2a2a]">{user.stability_tier || 1}</strong></p>
        <p className="text-sm text-[#4a5e5e] mt-1">Check-in Streak: <strong className="text-[#F4A836]">{user.checkin_streak || 0} days</strong></p>
      </div>
      <button onClick={logout} className="w-full bg-[#e05555] text-white rounded-xl py-3.5 font-semibold text-sm">Sign Out</button>
    </div>
  );
};

export default Profile;
