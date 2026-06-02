import React, { useState, useEffect } from 'react';

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<{ id: number; content: string; created_at: string }[]>([]);
  const [content, setContent] = useState('');

  const fetchEntries = async () => {
    const res = await fetch('/trpc/journal.list', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    setEntries(data?.result?.data?.entries || []);
  };

  useEffect(() => { fetchEntries(); }, []);

  const addEntry = async () => {
    if (!content.trim()) return;
    await fetch('/trpc/journal.create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ content }),
    });
    setContent('');
    fetchEntries();
  };

  const deleteEntry = async (id: number) => {
    await fetch('/trpc/journal.delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ entry_id: id }),
    });
    fetchEntries();
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-[#1a2a2a] font-serif mb-6">Journal</h1>
      <div className="mb-4">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?"
          rows={4} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-[#ede8df] focus:outline-none focus:ring-2 focus:ring-[#1B6B6B] resize-none" />
        <button onClick={addEntry} disabled={!content.trim()} className="mt-2 bg-[#1B6B6B] text-white rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-50">Save</button>
      </div>
      <div className="space-y-4">
        {entries.map((e) => (
          <div key={e.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#ede8df]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-[#4a5e5e]">{new Date(e.created_at).toLocaleDateString()}</span>
              <button onClick={() => deleteEntry(e.id)} className="text-[#e05555] text-sm">🗑</button>
            </div>
            <p className="text-sm text-[#1a2a2a] whitespace-pre-wrap">{e.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
