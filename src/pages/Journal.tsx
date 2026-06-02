import React, { useState, useEffect } from 'react';

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<{ id: number; content: string; created_at: string }[]>([]);
  const [content, setContent] = useState('');
  const token = localStorage.getItem('token');

  const loadEntries = () => {
    window.fetch('/trpc/journal.list', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setEntries(d?.result?.data?.entries || [])).catch(() => {});
  };

  useEffect(() => { loadEntries(); }, []);

  const addEntry = async () => {
    if (!content.trim()) return;
    await window.fetch('/trpc/journal.create', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ content }),
    });
    setContent(''); loadEntries();
  };

  const removeEntry = async (id: number) => {
    await window.fetch('/trpc/journal.delete', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ entry_id: id }),
    });
    loadEntries();
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#1a2a2a] font-serif mb-6">Journal</h1>
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#ede8df]">
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="What's on your mind?" rows={4}
          className="w-full bg-[#F7F3EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B6B] resize-none mb-3" />
        <button onClick={addEntry} disabled={!content.trim()} className="w-full bg-[#1B6B6B] text-white rounded-xl py-3 font-semibold text-sm disabled:opacity-50">Save Entry</button>
      </div>
      <div className="space-y-4">
        {entries.map(e => (
          <div key={e.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#ede8df]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#4a5e5e]">{new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <button onClick={() => removeEntry(e.id)} className="text-[#e05555] text-sm">🗑</button>
            </div>
            <p className="text-sm text-[#1a2a2a] whitespace-pre-wrap">{e.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
