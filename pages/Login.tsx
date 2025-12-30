
import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userExists = MOCK_USERS.some(u => u.email === email);
    if (userExists) {
      onLogin(email);
    } else {
      setError('Email not found in simulation database. Use alex@org.com');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/20">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AI Document Engine</h1>
          <p className="text-slate-400 mt-2">Sign in to manage your secure archives</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700/50 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Corporate Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-slate-600"
              placeholder="name@company.com"
              required
            />
            <p className="mt-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">Demo accounts: alex@org.com (Admin), jordan@org.com (Editor)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Security Key</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-slate-600"
              placeholder="••••••••"
              disabled
            />
            <p className="mt-2 text-[10px] text-blue-500 font-bold uppercase tracking-widest">SSO Enabled</p>
          </div>

          {error && <p className="text-red-400 text-sm font-medium bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            Access Vault
          </button>
        </form>

        <p className="text-center text-slate-500 mt-8 text-sm">
          Need access? Contact your systems administrator.
        </p>
      </div>
    </div>
  );
};

export default Login;
