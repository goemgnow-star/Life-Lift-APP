import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
    const body = isSignup
      ? JSON.stringify({ name, email, password })
      : JSON.stringify({ email, password });

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch {
      setError('Connection failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EB] flex flex-col items-center justify-center px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#1B6B6B] font-serif mb-2">LifeLift</h1>
        <p className="text-[#4a5e5e] text-sm">One step at a time. You are not alone.</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#ede8df] w-full max-w-sm">
        <h2 className="text-xl font-semibold text-[#1a2a2a] mb-4">{isSignup ? 'Create Account' : 'Welcome Back'}</h2>

        {error && <div className="bg-[#e05555]/10 text-[#e05555] rounded-lg p-3 mb-4 text-sm">{error}</div>}

        {isSignup && (
          <input
            type="text" placeholder="Your name" value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#F7F3EB] rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#1B6B6B]"
          />
        )}
        <input
          type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#F7F3EB] rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#1B6B6B]"
        />
        <input
          type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#F7F3EB] rounded-xl px-4 py-3 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-[#1B6B6B]"
        />
        <button onClick={handleSubmit}
          className="w-full bg-[#1B6B6B] text-white rounded-xl py-3.5 font-semibold text-sm mb-3">
          {isSignup ? 'Create Account' : 'Sign In'}
        </button>
        <button onClick={() => { setIsSignup(!isSignup); setError(''); }}
          className="w-full text-[#1B6B6B] text-sm font-semibold">
          {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
      <div className="mt-6 text-center">
        <p className="text-[#4a5e5e] text-xs">In crisis? <span className="text-[#e05555] font-semibold">Call or text 988</span></p>
      </div>
    </div>
  );
};

export default Login;
