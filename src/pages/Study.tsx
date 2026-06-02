import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Course {
  id: number; pillar: string; title: string; description: string | null;
  estimated_hours: number | null; tier_suggestion: number | null;
}

const Study: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [showBible, setShowBible] = useState(false);
  const [verse, setVerse] = useState<{ reference: string; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/academy/courses', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(r => r.json()).then(d => setCourses(d?.courses || [])).catch(() => {});
  }, []);

  const fetchDailyVerse = () => {
    fetch('/api/bible/daily?pillar=mental', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(r => r.json()).then(d => setVerse(d)).catch(() => {});
    setShowBible(true);
  };

  const filtered = activePillar ? courses.filter(c => c.pillar === activePillar) : courses;

  const PILLAR_COLORS: Record<string, string> = {
    mental: 'bg-purple-100 text-purple-700 border-purple-200',
    physical: 'bg-green-100 text-green-700 border-green-200',
    spiritual: 'bg-amber-100 text-amber-700 border-amber-200',
    financial: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#1a2a2a] font-serif mb-6">Study</h1>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {['all','mental','physical','spiritual','financial'].map(p => (
          <button key={p} onClick={() => setActivePillar(p === 'all' ? null : p)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${(p === 'all' && !activePillar) || p === activePillar ? 'bg-[#1B6B6B] text-white' : 'bg-[#ede8df] text-[#4a5e5e]'}`}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {user?.faith_mode && (
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#ede8df]">
          <button onClick={() => showBible ? setShowBible(false) : fetchDailyVerse()} className="w-full flex items-center justify-between">
            <span className="font-semibold text-[#1a2a2a] text-sm">📖 Daily Verse</span>
            <span className="text-[#4a5e5e]">{showBible ? '−' : '+'}</span>
          </button>
          {showBible && verse && (
            <div className="mt-3 pt-3 border-t border-[#ede8df]">
              <p className="text-xs font-semibold text-[#F4A836] mb-1">{verse.reference}</p>
              <p className="text-sm text-[#1a2a2a] leading-relaxed">{verse.text}</p>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {filtered.length === 0 && <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[#ede8df]"><p className="text-[#4a5e5e] text-sm">No courses yet. Check back soon.</p></div>}
        {filtered.map(c => (
          <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#ede8df]">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${PILLAR_COLORS[c.pillar] || 'bg-gray-100'}`}>{c.pillar}</span>
              {c.tier_suggestion && <span className="text-xs text-[#4a5e5e]">Tier {c.tier_suggestion}+</span>}
            </div>
            <h3 className="font-semibold text-[#1a2a2a] text-sm">{c.title}</h3>
            {c.description && <p className="text-xs text-[#4a5e5e] mt-1 line-clamp-2">{c.description}</p>}
            {c.estimated_hours && <p className="text-xs text-[#4a5e5e] mt-2">{c.estimated_hours} hours</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Study;
