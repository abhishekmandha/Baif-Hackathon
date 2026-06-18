import React, { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import Layout from './Layout';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import NewTranslation from './NewTranslation';
import JobsDashboard from './JobsDashboard';
import Repository from './Repository';
import Settings from './Settings';

// Note: You would normally move these to their own files in src/pages/
const PlaceholderPage = ({ title }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <p className="text-slate-500">This module is currently under development.</p>
  </div>
);

const AuthenticatedApp = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [authMode, setAuthMode] = useState('login');
  const { user } = useAuth();

  if (!user) {
    return authMode === 'login' 
      ? <LoginPage onSwitch={() => setAuthMode('register')} /> 
      : <RegisterPage onSwitch={() => setAuthMode('login')} />;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'new' && <NewTranslation onStart={() => setActiveTab('jobs')} />}
      {activeTab === 'jobs' && <JobsDashboard />}
      {activeTab === 'repo' && <Repository />}
      {activeTab === 'settings' && <Settings />}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AuthenticatedApp />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
