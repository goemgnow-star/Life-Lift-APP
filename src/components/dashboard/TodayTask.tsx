import React from 'react';

const PILLAR_COLORS: Record<string, string> = {
  mental: 'bg-purple-100 text-purple-700',
  physical: 'bg-green-100 text-green-700',
  spiritual: 'bg-amber-100 text-amber-700',
  financial: 'bg-blue-100 text-blue-700',
};

const TodayTask: React.FC<{ task: { id: number; task: string; focus_pillar: string } | null }> = ({ task }) => {
  if (!task) {
    return (
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#ede8df]">
        <p className="text-sm text-[#4a5e5e]">No active plan. Complete your assessment to get started.</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#ede8df]">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PILLAR_COLORS[task.focus_pillar] || 'bg-gray-100 text-gray-700'}`}>{task.focus_pillar}</span>
        <span className="text-xs text-[#4a5e5e]">Today's Focus</span>
      </div>
      <p className="text-[#1a2a2a] font-medium text-base">{task.task}</p>
    </div>
  );
};

export default TodayTask;
