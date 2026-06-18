import React, { useState } from 'react';
import { Leaf, Lock, User as UserIcon, Mail } from 'lucide-react';
import { useAuth } from './AuthContext';

const RegisterPage = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    register(formData.username, formData.email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#191970' }}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="inline-flex bg-blue-600 p-3 rounded-xl text-white">
              <Leaf className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-blue-600">BAIF</h2>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500">Join the BAIF Translation Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all mt-4">Sign Up</button>
        </form>
        
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <button onClick={onSwitch} className="text-blue-600 font-semibold hover:underline">Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;