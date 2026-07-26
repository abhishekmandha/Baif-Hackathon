import React, { useState } from 'react';
import { Leaf, Lock, User as UserIcon, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from './AuthContext';
import InputField from './components/InputField';

const LoginPage = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [localError, setLocalError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!formData.email || !formData.password) {
      setValidationErrors({ form: 'Please fill in all fields' });
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setLocalError(err.message || 'Login failed. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationErrors.form) {
      setValidationErrors({});
    }
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
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500">Sign in to BAIF Translation Platform</p>
        </div>

        {localError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 ml-2">{localError}</p>
          </div>
        )}
        {validationErrors.form && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 ml-2">{validationErrors.form}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            name="email"
            label="Email"
            type="email"
            icon={UserIcon}
            value={formData.email}
            onChange={handleInputChange}
            disabled={loading}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            icon={Lock}
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-xl transition-all mt-6 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account? <button onClick={onSwitch} className="text-blue-600 font-semibold hover:underline" disabled={loading}>Register</button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;