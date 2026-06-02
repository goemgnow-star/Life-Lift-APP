import React, { useState } from 'react';

const CrisisCard: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#e05555]/10 rounded-2xl p-4 mb-4 border border-[#e05555]/20">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left">
        <span className="font-semibold text-[#e05555] text-sm">🆘 Crisis Resources — Always Here</span>
        <span className="text-[#e05555]">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="mt-3 space-y-2 text-sm">
          <a href="tel:988" className="block text-[#1a2a2a]">📞 <strong>988</strong> — Suicide & Crisis Lifeline</a>
          <a href="tel:18006624357" className="block text-[#1a2a2a]">📞 <strong>1-800-662-4357</strong> — SAMHSA</a>
          <a href="tel:18007997233" className="block text-[#1a2a2a]">📞 <strong>1-800-799-7233</strong> — Domestic Violence</a>
          <a href="tel:211" className="block text-[#1a2a2a]">📞 <strong>211</strong> — Community Resources</a>
          <a href="tel:911" className="block text-[#1a2a2a]">📞 <strong>911</strong> — Emergency</a>
          <div className="pt-2 border-t border-[#e05555]/20 text-xs text-[#4a5e5e]">
            <p><strong>5-4-3-2-1:</strong> 5 things you see, 4 feel, 3 hear, 2 smell, 1 taste</p>
            <p><strong>Box Breathing:</strong> In 4, hold 4, out 4, hold 4</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrisisCard;
