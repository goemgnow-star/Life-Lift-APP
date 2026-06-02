import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Message { role: string; content: string; }

const Hope: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [tier, setTier] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    if (user) {
      setTier(user.stability_tier || 1);
    }
  }, [user]);

  const send = async () => {
    if (!input.trim() || sending) return;
    const msg = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setSending(true);
    try {
      const res = await fetch('/api/hope/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ message: msg, user_id: user?.userId, tier: tier || 1, faith_mode: user?.faith_mode || false }),
      });
      const data = await res.json();
      const reply = data?.reply || data?.result?.data?.reply || 'I hear you. Tell me more.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'I had trouble responding. Can you try again?' }]);
    } finally {
      setSending(false);
    }
  };

  const tierLabel = ['', 'Crisis / Survival', 'Unstable / Fragile', 'Stabilizing', 'Functional Growth'];

  return (
    <div className="flex flex-col h-[calc(100vh-64px-env(safe-area-inset-bottom))]">
      <div className="py-4 border-b border-[#ede8df] px-4">
        <h1 className="text-2xl font-bold text-[#1a2a2a] font-serif">Hope</h1>
        {tier && <p className="text-xs text-[#4a5e5e] mt-1">Tier {tier}: {tierLabel[tier]}</p>}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">💛</p>
            <p className="text-[#4a5e5e] text-sm">Hi{user?.name ? `, ${user.name}` : ''}. How are you doing today?</p>
            <p className="text-[#4a5e5e] text-xs mt-1">You can tell me anything. No judgment.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${m.role === 'user' ? 'bg-[#1B6B6B] text-white rounded-br-md' : 'bg-white text-[#1a2a2a] rounded-bl-md shadow-sm border border-[#ede8df]'}`}>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="text-center py-2 px-4">
        <p className="text-xs text-[#4a5e5e]">In crisis? <span className="text-[#e05555] font-semibold">Call or text 988</span> — 24/7</p>
      </div>

      <div className="py-3 px-4 border-t border-[#ede8df]">
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Type your message..." disabled={sending}
            className="flex-1 bg-[#F7F3EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B6B] disabled:opacity-50" />
          <button onClick={send} disabled={!input.trim() || sending}
            className="bg-[#1B6B6B] text-white rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-50">{sending ? '...' : 'Send'}</button>
        </div>
      </div>
    </div>
  );
};

export default Hope;
