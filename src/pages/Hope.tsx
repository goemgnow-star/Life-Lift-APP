import React, { useState, useRef, useEffect } from 'react';

const Hope: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    if (!input.trim() || sending) return;
    const msg = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setSending(true);
    try {
      const res = await fetch('/trpc/hope.chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data?.result?.data?.reply || 'I hear you.' }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I had trouble responding. Try again.' }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px-env(safe-area-inset-bottom))]">
      <div className="py-4 border-b border-[#ede8df]">
        <h1 className="text-2xl font-bold text-[#1a2a2a] font-serif">Hope</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">💛</p>
            <p className="text-[#4a5e5e] text-sm">How are you doing today?</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${m.role === 'user' ? 'bg-[#1B6B6B] text-white' : 'bg-white text-[#1a2a2a] border border-[#ede8df]'}`}>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="py-3 border-t border-[#ede8df]">
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Type your message..." disabled={sending}
            className="flex-1 bg-[#F7F3EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6B6B]" />
          <button onClick={send} disabled={!input.trim() || sending}
            className="bg-[#1B6B6B] text-white rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-50">Send</button>
        </div>
      </div>
      <p className="text-center text-xs text-[#4a5e5e] py-2">In crisis? <span className="text-[#e05555] font-semibold">Call or text 988</span></p>
    </div>
  );
};

export default Hope;
