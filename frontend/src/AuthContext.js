import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, APIError } from './services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse stored user:', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Implement password validation in backend
      // For now, we're using a simplified login that fetches user by email
      const userData = await authAPI.login(email);
      const userWithEmail = { ...userData, email };
      setUser(userWithEmail);
      localStorage.setItem('user', JSON.stringify(userWithEmail));
      return userWithEmail;
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, fullName) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authAPI.register(email, password, fullName);
      const userWithEmail = { ...userData, email };
      setUser(userWithEmail);
      localStorage.setItem('user', JSON.stringify(userWithEmail));
      return userWithEmail;
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);