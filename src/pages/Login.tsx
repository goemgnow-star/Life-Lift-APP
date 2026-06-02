import React from 'react';

const Login: React.FC = () => (
  <div className="min-h-screen bg-[#F7F3EB] flex flex-col items-center justify-center px-6">
    <div className="text-center mb-10">
      <h1 className="text-3xl font-bold text-[#1B6B6B] font-serif mb-2">LifeLift</h1>
      <p className="text-[#4a5e5e] text-sm">One step at a time. You are not alone.</p>
    </div>
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#ede8df] w-full max-w-sm">
      <h2 className="text-xl font-semibold text-[#1a2a2a] mb-4">Welcome</h2>
      <p className="text-[#4a5e5e] text-sm mb-6">Sign in to continue your journey.</p>
      <button onClick={() => window.location.href = '/api/auth/login'} className="w-full bg-[#1B6B6B] text-white rounded-xl py-3.5 font-semibold text-sm">
        Sign In with OAuth
      </button>
    </div>
    <div className="mt-6 text-center">
      <p className="text-[#4a5e5e] text-xs">In crisis? <span className="text-[#e05555] font-semibold">Call or text 988</span></p>
    </div>
  </div>
);

export default Login;
