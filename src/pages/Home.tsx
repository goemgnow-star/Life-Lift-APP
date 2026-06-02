import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PlantVisual from '../components/dashboard/PlantVisual';
import CrisisCard from '../components/dashboard/CrisisCard';
import TodayTask from '../components/dashboard/TodayTask';

interface DashboardData {
  user: { name: string; stability_tier: number; checkin_streak: number; plant_stage: number; faith_mode: boolean };
  todayTask: { id: number; task: string; focus_pillar: string } | null;
}

const Home: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    if (user) {
      fetch('/trpc/plans.getCurrent', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then(r => r.json()).then(d => {
        const plan = d?.result?.data;
        if (plan?.daily_tasks) {
          const day = new Date().getDate();
          const task = plan.daily_tasks[day];
          setData({
            user: { name: user.name || 'Friend', stability_tier: user.stability_tier || 1, checkin_streak: user.checkin_streak || 0, plant_stage: user.plant_stage || 0, faith_mode: user.faith_mode || false },
            todayTask: task ? { id: day, task, focus_pillar: plan.primary_focus_pillar || 'mental' } : null,
          });
        } else {
          setData({ user: { name: user.name || 'Friend', stability_tier: user.stability_tier || 1, checkin_streak: user.checkin_streak || 0, plant_stage: user.plant_stage || 0, faith_mode: user.faith_mode || false }, todayTask: null });
        }
      }).catch(() => {
        setData({ user: { name: user.name || 'Friend', stability_tier: user.stability_tier || 1, checkin_streak: user.checkin_streak || 0, plant_stage: user.plant_stage || 0, faith_mode: user.faith_mode || false }, todayTask: null });
      });
    }
  }, [user]);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><p className="text-[#4a5e5e]">Loading...</p></div>;
  if (!user) return null;
  if (!data) return <div className="flex items-center justify-center min-h-screen"><p className="text-[#4a5e5e]">Loading...</p></div>;

  const { user: u, todayTask } = data;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a2a2a] font-serif">Hi, {u.name}</h1>
        <p className="text-sm text-[#4a5e5e] mt-1">Tier {u.stability_tier} — {['','Crisis / Survival','Unstable / Fragile','Stabilizing','Functional Growth'][u.stability_tier]}</p>
      </div>
      <PlantVisual stage={u.plant_stage} streak={u.checkin_streak} />
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#ede8df]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#4a5e5e] uppercase">Check-In Streak</p>
            <p className="text-2xl font-bold text-[#1B6B6B]">{u.checkin_streak} {u.checkin_streak === 1 ? 'day' : 'days'}</p>
          </div>
          <a href="/hope" className="bg-[#F4A836] text-white px-4 py-2 rounded-xl text-sm font-semibold">Check In</a>
        </div>
      </div>
      <TodayTask task={todayTask} />
      <CrisisCard />
    </div>
  );
};

export default Home;
