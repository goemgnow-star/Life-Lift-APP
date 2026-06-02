import React, { useState, useEffect } from 'react';

interface Habit {
  id: number;
  name: string;
  completedToday: boolean;
}

const Habits: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newName, setNewName] = useState('');

  const fetchHabits = async () => {
    const res = await fetch('/trpc/habits.list', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    setHabits(data?.result?.data?.habits || []);
  };

  useEffect(() => { fetchHabits(); }, []);

  const addHabit = async () => {
    if (!newName.trim()) return;
    await fetch('/trpc/habits.create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ name: newName }),
    });
    setNewName('');
    fetchHabits();
  };

  const toggleHabit = async (id: number, completed: boolean) => {
    if (completed) {
      await fetch('/trpc/habits.complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ habit_id: id }),
      });
    }
    fetchHabits();
  };

  const deleteHabit = async (id: number) => {
    await fetch('/trpc/habits.delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ habit_id: id }),
    });
    fetchHabits();
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-[#1a2a2a] font-serif mb-6">Habits</h1>
      <div className="flex gap-2 mb-4">
        <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New habit..."
          className="flex-1 bg-white rounded-xl px-4 py-3 text-sm border border-[#ede8df] focus:outline-none focus:ring-2 focus:ring-[#1B6B6B]" />
        <button onClick={addHabit} className="bg-[#1B6B6B] text-white rounded-xl px-4 py-3 text-sm font-semibold">Add</button>
      </div>
      <div className="space-y-3">
        {habits.map((h) => (
          <div key={h.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#ede8df] flex items-center gap-3">
            <button onClick={() => toggleHabit(h.id, !h.completedToday)}
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${h.completedToday ? 'bg-[#1B6B6B] border-[#1B6B6B]' : 'border-[#ede8df]'}`}>
              {h.completedToday && <span className="text-white text-sm">✓</span>}
            </button>
            <span className={`flex-1 text-sm ${h.completedToday ? 'line-through text-[#4a5e5e]' : 'text-[#1a2a2a]'}`}>{h.name}</span>
            <button onClick={() => deleteHabit(h.id)} className="text-[#e05555] text-sm">🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Habits;
