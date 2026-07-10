import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Shield, Code, Edit2, ChevronDown, Globe, Bell, Monitor, Check, Lock, Eye, EyeOff, Smartphone, LogOut, MapPin } from 'lucide-react';

/* ─── Helper: read/write settings from localStorage ─── */
const SETTINGS_KEY = 'avenir_general_settings';

const defaultSettings = {
  compactMode: false,
  language: 'English (US)',
  timezone: '(GMT+5:30) India Standard Time',
  emailNotifications: true,
  interviewReminders: true,
  weeklyProgressReport: false,
  marketingEmails: false,
  twoFactorAuth: false,
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : { ...defaultSettings };
  } catch {
    return { ...defaultSettings };
  }
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

/* ─── Toggle Switch Component ─── */
function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <div className="w-11 h-6 bg-[#E5E7EB] peer-focus:ring-2 peer-focus:ring-[#2563EB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#2563EB] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm"></div>
    </label>
  );
}

/* ─── Toast Notification ─── */
function SaveToast({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 px-5 py-3 bg-[#111827] text-white text-sm font-semibold rounded-xl shadow-2xl"
        >
          <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center">
            <Check size={12} strokeWidth={3} />
          </div>
          Preferences saved successfully!
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Security Tab ─── */
function SecurityTab({ settings, updateSetting }) {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState('');

  const handlePasswordSave = () => {
    setPwError('');
    setPwSaved(false);
    if (!currentPw) { setPwError('Please enter your current password.'); return; }
    if (newPw.length < 8) { setPwError('New password must be at least 8 characters.'); return; }
    if (newPw !== confirmPw) { setPwError('Passwords do not match.'); return; }
    setPwSaved(true);
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    setTimeout(() => setPwSaved(false), 3000);
  };

  const sessions = [
    { device: 'Chrome on Windows', location: 'Mumbai, India', time: 'Active now', current: true },
    { device: 'Safari on iPhone 15', location: 'Mumbai, India', time: '2 hours ago', current: false },
    { device: 'Firefox on MacBook', location: 'Delhi, India', time: '3 days ago', current: false },
  ];

  const loginHistory = [
    { date: 'Jul 10, 2024 — 2:30 PM', device: 'Chrome on Windows', location: 'Mumbai, India', status: 'Success' },
    { date: 'Jul 9, 2024 — 11:15 AM', device: 'Safari on iPhone', location: 'Mumbai, India', status: 'Success' },
    { date: 'Jul 8, 2024 — 8:45 PM', device: 'Unknown Device', location: 'Bangalore, India', status: 'Failed' },
    { date: 'Jul 7, 2024 — 3:00 PM', device: 'Chrome on Windows', location: 'Mumbai, India', status: 'Success' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Change Password */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#FEF2F2] flex items-center justify-center">
            <Lock size={18} className="text-[#EF4444]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#111827]">Change Password</h2>
            <p className="text-xs text-[#6B7280]">Update your password to keep your account secure.</p>
          </div>
        </div>

        <div className="space-y-4 max-w-md">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-bold text-[#4B5563] mb-2 tracking-wide">Current Password</label>
            <div className="relative">
              <input type={showCurrent ? 'text' : 'password'} value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="Enter current password"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-[#111827] text-sm font-medium focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all pr-11" />
              <button type="button" onClick={() => setShowCurrent(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer">
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-[#4B5563] mb-2 tracking-wide">New Password</label>
            <div className="relative">
              <input type={showNew ? 'text' : 'password'} value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="Enter new password (min 8 chars)"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-[#111827] text-sm font-medium focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all pr-11" />
              <button type="button" onClick={() => setShowNew(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer">
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-[#4B5563] mb-2 tracking-wide">Confirm New Password</label>
            <div className="relative">
              <input type={showConfirm ? 'text' : 'password'} value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Re-enter new password"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-[#111827] text-sm font-medium focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all pr-11" />
              <button type="button" onClick={() => setShowConfirm(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {pwError && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs font-semibold text-[#EF4444]">{pwError}</motion.p>
            )}
            {pwSaved && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs font-semibold text-[#10B981] flex items-center gap-1.5">
                <Check size={14} /> Password updated successfully!
              </motion.p>
            )}
          </AnimatePresence>

          <button onClick={handlePasswordSave} className="px-5 py-2.5 bg-[#0051C9] hover:bg-[#0042A5] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer">
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#F5F3FF] flex items-center justify-center">
            <Smartphone size={18} className="text-[#7C3AED]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#111827]">Two-Factor Authentication</h2>
            <p className="text-xs text-[#6B7280]">Add an extra layer of security to your account.</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#111827]">Enable 2FA</p>
            <p className="text-xs text-[#6B7280] mt-0.5">
              {settings.twoFactorAuth ? 'Two-factor authentication is enabled. Your account is more secure.' : 'Protect your account with an authenticator app.'}
            </p>
          </div>
          <Toggle checked={settings.twoFactorAuth} onChange={(v) => updateSetting('twoFactorAuth', v)} />
        </div>

        <AnimatePresence>
          {settings.twoFactorAuth && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="mt-5 p-4 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl">
                <p className="text-xs font-semibold text-[#7C3AED] mb-1">✓ 2FA is active</p>
                <p className="text-[11px] text-[#6B7280]">Your account is protected with two-factor authentication. Use your authenticator app to generate codes when signing in.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Sessions */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
            <Monitor size={18} className="text-[#2563EB]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#111827]">Active Sessions</h2>
            <p className="text-xs text-[#6B7280]">Manage devices where you're currently signed in.</p>
          </div>
        </div>

        <div className="space-y-3">
          {sessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-xl hover:bg-[#F8FAFC] transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${s.current ? 'bg-[#10B981]' : 'bg-[#E5E7EB]'}`} />
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{s.device}</p>
                  <p className="text-[11px] text-[#6B7280] flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {s.location} • {s.time}
                  </p>
                </div>
              </div>
              {s.current ? (
                <span className="px-2.5 py-0.5 text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] rounded-full border border-[#A7F3D0]">This device</span>
              ) : (
                <button className="flex items-center gap-1.5 text-xs font-bold text-[#EF4444] hover:underline cursor-pointer">
                  <LogOut size={13} /> Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] flex items-center justify-center">
            <Shield size={18} className="text-[#D97706]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#111827]">Login History</h2>
            <p className="text-xs text-[#6B7280]">Recent sign-in activity on your account.</p>
          </div>
        </div>

        <div className="divide-y divide-[#F3F4F6] border border-[#E5E7EB] rounded-xl overflow-hidden">
          {loginHistory.map((log, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 bg-white hover:bg-[#F8FAFC] transition-colors">
              <div>
                <p className="text-xs font-semibold text-[#111827]">{log.date}</p>
                <p className="text-[11px] text-[#6B7280]">{log.device} • {log.location}</p>
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                log.status === 'Success' ? 'text-[#10B981] bg-[#ECFDF5]' : 'text-[#EF4444] bg-[#FEF2F2]'
              }`}>{log.status}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const SettingsPage = ({ initialTab = 'profile' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [settings, setSettings] = useState(loadSettings);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Apply compact mode to root
  useEffect(() => {
    document.documentElement.classList.toggle('compact-mode', settings.compactMode);
  }, [settings.compactMode]);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      saveSettings(next);
      return next;
    });
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Management', icon: Code },
  ];

  const notificationItems = [
    { key: 'emailNotifications', title: 'Email Notifications', desc: 'Get updates about new job matches and analysis results.' },
    { key: 'interviewReminders', title: 'Interview Reminders', desc: 'Receive reminders before scheduled mock interviews.' },
    { key: 'weeklyProgressReport', title: 'Weekly Progress Report', desc: 'A summary of your improvement sent every Monday.' },
    { key: 'marketingEmails', title: 'Marketing Emails', desc: 'Tips, new features, and promotional offers.' },
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <SaveToast show={showToast} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight mb-2">
          Account & Preferences
        </h1>
        <p className="text-sm font-medium text-[#6B7280]">
          Manage your personal information, AI goals, and security settings.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Inner Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    active 
                      ? 'bg-[#EFF6FF] text-[#2563EB]' 
                      : 'text-[#4B5563] hover:bg-white hover:text-[#111827]'
                  }`}
                >
                  <tab.icon size={18} className={active ? 'text-[#2563EB]' : 'text-[#6B7280]'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8"
            >
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#F8FAFC] shadow-sm bg-[#E0E7FF] flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
                      alt="Alex Rivera" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full flex items-center justify-center text-white shadow-md transition-colors cursor-pointer border-2 border-white">
                    <Edit2 size={14} />
                  </button>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">Alex Rivera</h2>
                  <p className="text-sm font-medium text-[#6B7280] mb-3">alex.rivera@enterprise-ai.com</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#EFF6FF] text-[#2563EB] text-[11px] font-bold rounded-full border border-[#BFDBFE]">
                      Verified User
                    </span>
                    <span className="px-3 py-1 bg-[#F5F3FF] text-[#7C3AED] text-[11px] font-bold rounded-full border border-[#DDD6FE]">
                      Enterprise Tier
                    </span>
                  </div>
                </div>
              </div>

              <hr className="border-[#E5E7EB] mb-8" />

              {/* Form Fields */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#4B5563] mb-2 tracking-wide">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Alex Rivera"
                      className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-[#111827] text-sm font-medium focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4B5563] mb-2 tracking-wide">Current Role</label>
                    <input 
                      type="text" 
                      defaultValue="Senior Product Designer"
                      className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-[#111827] text-sm font-medium focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B5563] mb-2 tracking-wide">Target Role (AI Optimization Goal)</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-[#111827] text-sm font-medium appearance-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all cursor-pointer">
                      <option>Principal Product Designer</option>
                      <option>Lead UI/UX Engineer</option>
                      <option>Design Director</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button className="px-6 py-3 bg-[#0051C9] hover:bg-[#0042A5] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer">
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Appearance */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F3FF] flex items-center justify-center">
                    <Monitor size={18} className="text-[#7C3AED]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#111827]">Appearance</h2>
                    <p className="text-xs text-[#6B7280]">Customize how Avenir AI looks on your device.</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">Compact Mode</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">Reduce spacing for a denser layout.</p>
                    </div>
                    <Toggle checked={settings.compactMode} onChange={(v) => updateSetting('compactMode', v)} />
                  </div>
                </div>
              </div>

              {/* Language & Region */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                    <Globe size={18} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#111827]">Language & Region</h2>
                    <p className="text-xs text-[#6B7280]">Set your preferred language and timezone.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#4B5563] mb-2 tracking-wide">Language</label>
                    <div className="relative">
                      <select
                        value={settings.language}
                        onChange={(e) => updateSetting('language', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-[#111827] text-sm font-medium appearance-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all cursor-pointer"
                      >
                        <option>English (US)</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4B5563] mb-2 tracking-wide">Timezone</label>
                    <div className="relative">
                      <select
                        value={settings.timezone}
                        onChange={(e) => updateSetting('timezone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-[#111827] text-sm font-medium appearance-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all cursor-pointer"
                      >
                        <option>(GMT+5:30) India Standard Time</option>
                        <option>(GMT-8:00) Pacific Time</option>
                        <option>(GMT-5:00) Eastern Time</option>
                        <option>(GMT+0:00) UTC</option>
                        <option>(GMT+1:00) Central European Time</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] flex items-center justify-center">
                    <Bell size={18} className="text-[#D97706]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#111827]">Notifications</h2>
                    <p className="text-xs text-[#6B7280]">Configure how and when you receive alerts.</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {notificationItems.map((item, i) => (
                    <div key={item.key}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-[#111827]">{item.title}</p>
                          <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle checked={settings[item.key]} onChange={(v) => updateSetting(item.key, v)} />
                      </div>
                      {i < notificationItems.length - 1 && <hr className="border-[#F3F4F6] mt-5" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Save */}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-[#0051C9] hover:bg-[#0042A5] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <SecurityTab settings={settings} updateSetting={updateSetting} />
          )}

          {activeTab !== 'profile' && activeTab !== 'general' && activeTab !== 'security' && (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8 flex items-center justify-center h-64">
              <p className="text-[#6B7280] font-medium text-sm">
                This section is under construction.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
