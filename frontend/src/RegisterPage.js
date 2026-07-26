import React, { useState } from 'react';
import { Leaf, Lock, User as UserIcon, Mail, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from './AuthContext';
import InputField from './components/InputField';

const RegisterPage = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [localError, setLocalError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const { register, loading } = useAuth();

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!validateForm()) {
      return;
    }

    try {
      await register(formData.email, formData.password, formData.fullName);
    } catch (err) {
      setLocalError(err.message || 'Registration failed. Please try again.');
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
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500">Join the BAIF Translation Platform</p>
        </div>

        {localError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 ml-2">{localError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            name="fullName"
            label="Full Name"
            icon={UserIcon}
            error={validationErrors.fullName}
            disabled={loading}
            value={formData.fullName}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((prev) => ({ ...prev, fullName: value }));
              if (validationErrors.fullName) {
                setValidationErrors((prev) => ({ ...prev, fullName: null }));
              }
            }}
          />
          <InputField
            name="email"
            label="Email"
            type="email"
            icon={Mail}
            error={validationErrors.email}
            disabled={loading}
            value={formData.email}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((prev) => ({ ...prev, email: value }));
              if (validationErrors.email) {
                setValidationErrors((prev) => ({ ...prev, email: null }));
              }
            }}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            icon={Lock}
            error={validationErrors.password}
            disabled={loading}
            value={formData.password}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((prev) => ({ ...prev, password: value }));
              if (validationErrors.password) {
                setValidationErrors((prev) => ({ ...prev, password: null }));
              }
            }}
          />
          <InputField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            icon={Lock}
            error={validationErrors.confirmPassword}
            disabled={loading}
            value={formData.confirmPassword}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((prev) => ({ ...prev, confirmPassword: value }));
              if (validationErrors.confirmPassword) {
                setValidationErrors((prev) => ({ ...prev, confirmPassword: null }));
              }
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-xl transition-all mt-6 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <button onClick={onSwitch} className="text-blue-600 font-semibold hover:underline" disabled={loading}>Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;