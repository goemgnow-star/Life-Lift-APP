import React from 'react';

const OfflineCrisisKit: React.FC = () => (
  <div className="min-h-screen bg-[#F7F3EB] px-4 py-6">
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <span className="text-4xl">🆘</span>
        <h1 className="text-2xl font-bold text-[#1a2a2a] font-serif mt-3">Crisis Kit</h1>
        <p className="text-sm text-[#4a5e5e] mt-2">Always available, even offline. You are not alone.</p>
      </div>
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#ede8df] space-y-4">
        <a href="tel:988" className="flex items-center gap-3 bg-[#e05555]/10 rounded-xl p-4"><span className="text-2xl font-bold text-[#e05555]">988</span><div><p className="font-semibold text-sm">Suicide & Crisis Lifeline</p><p className="text-xs text-[#4a5e5e]">Call or text · 24/7</p></div></a>
        <a href="tel:18006624357" className="flex items-center gap-3 bg-[#F4A836]/10 rounded-xl p-4"><span className="text-xl font-bold text-[#F4A836]">SAMHSA</span><div><p className="font-semibold text-sm">1-800-662-4357</p><p className="text-xs text-[#4a5e5e]">Substance use & mental health</p></div></a>
        <a href="tel:18007997233" className="flex items-center gap-3 bg-[#1B6B6B]/10 rounded-xl p-4"><span className="text-xl font-bold text-[#1B6B6B]">DV</span><div><p className="font-semibold text-sm">1-800-799-7233</p><p className="text-xs text-[#4a5e5e]">Domestic Violence Hotline</p></div></a>
        <a href="tel:211" className="flex items-center gap-3 bg-[#1B6B6B]/10 rounded-xl p-4"><span className="text-2xl font-bold text-[#1B6B6B]">211</span><div><p className="font-semibold text-sm">Community Resources</p><p className="text-xs text-[#4a5e5e]">Housing · Food · Legal aid</p></div></a>
        <a href="tel:911" className="flex items-center gap-3 bg-[#e05555]/10 rounded-xl p-4"><span className="text-2xl font-bold text-[#e05555]">911</span><div><p className="font-semibold text-sm">Emergency Services</p></div></a>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ede8df]">
        <h2 className="font-semibold text-lg mb-4">Grounding Exercises</h2>
        <div className="space-y-3 text-sm text-[#4a5e5e]">
          <div><p className="font-semibold text-[#1B6B6B] mb-1">5-4-3-2-1 Senses</p><p>5 things you see · 4 things you feel · 3 things you hear · 2 things you smell · 1 thing you taste</p></div>
          <div className="pt-3 border-t border-[#ede8df]"><p className="font-semibold text-[#1B6B6B] mb-1">Box Breathing</p><p>In 4 counts · Hold 4 · Out 4 · Hold 4 · Repeat</p></div>
        </div>
      </div>
    </div>
  </div>
);

export default OfflineCrisisKit;
