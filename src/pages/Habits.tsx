import React, { useState, useEffect } from 'react';

interface Habit { id: number; name: string; description: string | null; completedToday: boolean; }

const Habits: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const token = localStorage.getItem('token');

  const fetchHabits = () => {
    fetch('/trpc/habits.list', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setHabits(d?.result?.data?.habits || [])).catch(() => {});
  };

  useEffect(() => { fetchHabits(); }, []);

  const add = async () => {
    if (!name.trim()) return;
    await fetch('/trpc/habits.create', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, description: desc }),
    });
    setName(''); setDesc(''); fetchHabits();
  };

  const toggle = async (id: number, completed: boolean) => {
    if (completed) {
      await fetch('/trpc/habits.complete', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ habit_id: id }),
      });
    }
    fetchHabits();
  };

  const remove = async (id: number) => {
    await fetch('/trpc/habits.delete', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ habit_id: id }),
    });
    fetchHabits();
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#1a2a2a] font-serif mb-6">Habits</h1>
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#ede8df] space-y-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Habit name" className="w-full bg-[#F7F3EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B6B]" />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description (optional)" className="w-full bg-[#F7F3EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B6B]" />
        <button onClick={add} disabled={!name.trim()} className="w-full bg-[#1B6B6B] text-white rounded-xl py-3 font-semibold text-sm disabled:opacity-50">Add Habit</button>
      </div>
      <div className="space-y-3">
        {habits.map(h => (
          <div key={h.id} className={`bg-white rounded-2xl p-4 shadow-sm border flex items-center gap-3 ${h.completedToday ? 'border-[#1B6B6B] bg-[#1B6B6B]/5' : 'border-[#ede8df]'}`}>
            <button onClick={() => toggle(h.id, !h.completedToday)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${h.completedToday ? 'bg-[#1B6B6B] border-[#1B6B6B]' : 'border-[#ede8df]'}`}>
              {h.completedToday && <span className="text-white text-sm">✓</span>}
            </button>
            <div className="flex-1">
              <p className={`text-sm font-medium ${h.completedToday ? 'line-through text-[#4a5e5e]' : 'text-[#1a2a2a]'}`}>{h.name}</p>
              {h.description && <p className="text-xs text-[#4a5e5e]">{h.description}</p>}
            </div>
            <button onClick={() => remove(h.id)} className="text-[#e05555] text-sm">🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Habits;
