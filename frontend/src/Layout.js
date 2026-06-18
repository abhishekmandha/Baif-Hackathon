import React from 'react';
import { Video, User, LogOut, PlusCircle, LayoutGrid, Database, Settings, Sun, Moon } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';

const Layout = ({ children, activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { id: 'new', label: 'New translation', icon: PlusCircle },
    { id: 'jobs', label: 'My jobs', icon: LayoutGrid },
    { id: 'repo', label: 'Repository', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1.5 rounded-lg">
              <Video className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">BAIF Translation Platform</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 hover:bg-blue-600 rounded-lg transition-colors" title="Toggle Theme">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3 bg-blue-800 px-4 py-1.5 rounded-full border border-blue-600">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Welcome, {user?.name}</span>
            </div>
            <button onClick={logout} className="p-2 hover:bg-red-600 rounded-lg transition-colors" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id 
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;