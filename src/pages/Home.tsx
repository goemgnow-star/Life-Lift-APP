import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PlantVisual from '../components/dashboard/PlantVisual';
import CrisisCard from '../components/dashboard/CrisisCard';

const Home: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [todayTask, setTodayTask] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetch('/trpc/plans.getCurrent', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.result?.data?.daily_tasks) {
            const tasks = data.result.data.daily_tasks;
            const today = new Date().getDate();
            setTodayTask(tasks[today] || null);
          }
        })
        .catch(() => {});
    }
  }, [user]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen"><p className="text-[#4a5e5e]">Loading...</p></div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-3xl font-bold text-[#1B6B6B] font-serif mb-4">LifeLift</h1>
        <p className="text-[#4a5e5e] mb-6">One step at a time. You are not alone.</p>
        <button onClick={() => window.location.href = '/login'} className="bg-[#1B6B6B] text-white px-6 py-3 rounded-xl font-semibold">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#1a2a2a] font-serif mb-6">Hi, {user.name || 'Friend'}</h1>
      
      <PlantVisual stage={user.plant_stage || 0} streak={user.checkin_streak || 0} />
      
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#ede8df]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#4a5e5e] uppercase">Check-In Streak</p>
            <p className="text-2xl font-bold text-[#1B6B6B]">{user.checkin_streak || 0} days</p>
          </div>
          <button className="bg-[#F4A836] text-white px-4 py-2 rounded-xl text-sm font-semibold">Check In</button>
        </div>
      </div>

      {todayTask && (
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#ede8df]">
          <p className="text-xs font-semibold text-[#4a5e5e] mb-1">Today's Focus</p>
          <p className="text-[#1a2a2a] font-medium">{todayTask}</p>
        </div>
      )}

      <CrisisCard />
    </div>
  );
};

export default Home;
