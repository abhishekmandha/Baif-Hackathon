import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    // Mock login logic
    setUser({ name: username || 'Ravi', role: 'Admin' });
  };

  const register = (username, email) => {
    // Mock registration logic
    setUser({ name: username, email: email, role: 'Admin' });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);