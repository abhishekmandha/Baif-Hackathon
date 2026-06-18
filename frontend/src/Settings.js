import React, { useState } from 'react';
import { User, Shield, Bell, Globe, Save, Loader2, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useAuth } from './AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // State management for form fields
  const [profile, setProfile] = useState({
    username: user?.name || 'Ravi',
    email: `${user?.name?.toLowerCase() || 'user'}@baif.org`,
    autoDetect: true,
    emailNotify: true
  });

  const handleSave = async () => {
    if (!profile.email || !profile.email.includes('@')) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSaving(true);
    
    const templateParams = {
      to_email: profile.email,
      from_name: 'BAIF Translation Platform',
      user_name: profile.username,
      message: `Settings updated for ${profile.email}. Auto-detect: ${profile.autoDetect}, Notifications: ${profile.emailNotify}`,
    };

    try {
      // Note: Replace these strings with your actual EmailJS IDs from their dashboard
      await emailjs.send(
        process.env.EMAILJS_SERVICE_ID, 
        process.env.EMAILJS_TEMPLATE_ID, 
        templateParams, 
        process.env.EMAILJS_PUBLIC_KEY
      );
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Settings saved locally, but email notification failed. Check your EmailJS configuration.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400">Manage your account preferences and platform configuration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          {[
            { label: 'Profile', icon: User, active: true },
            { label: 'Security', icon: Shield },
            { label: 'Notifications', icon: Bell },
            { label: 'Language & Region', icon: Globe },
          ].map((item) => (
            <button 
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b dark:border-slate-700 pb-2">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Public Profile</h3>
                {showSuccess && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium animate-in fade-in slide-in-from-right-2">
                    <CheckCircle className="w-4 h-4" /> Settings Saved!
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Username</label>
                  <input 
                    type="text" 
                    value={profile.username} 
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-slate-900 dark:text-white" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-slate-900 dark:text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b dark:border-slate-700 pb-2 text-slate-800 dark:text-white">Platform Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Auto-detect source language</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Automatically identify audio language on upload.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profile.autoDetect} 
                    onChange={(e) => setProfile({...profile, autoDetect: e.target.checked})}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer" 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Email notifications</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Receive updates when translation jobs are complete.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profile.emailNotify} 
                    onChange={(e) => setProfile({...profile, emailNotify: e.target.checked})}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer" 
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;