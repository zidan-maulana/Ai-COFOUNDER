import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  Globe,
  Shield,
  Smartphone,
  Save,
  Camera
} from 'lucide-react';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form states
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+62 812-3456-7890',
    company: 'PT. Example Indonesia',
    bio: 'Full-stack developer passionate about AI and automation'
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    workflowAlerts: true,
    securityAlerts: true,
    marketingEmails: false
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Password changed successfully!');
      setSecurityData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const handleNotificationUpdate = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Notification settings updated!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Palette }
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <div className="bg-dark-lighter border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Kelola akun dan preferensi Anda</p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-green-500/20 border border-green-500/50 text-green-500 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-dark-lighter border border-dark-border rounded-lg p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-400 hover:text-white hover:bg-dark'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                  
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-dark-border">
                    <div className="relative">
                      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        JD
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-dark border-2 border-dark-lighter rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                        <Camera size={16} className="text-white" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{profileData.fullName}</h3>
                      <p className="text-gray-400 text-sm mb-3">{profileData.email}</p>
                      <button className="text-primary text-sm font-medium hover:text-primary-light transition">
                        Change Photo
                      </button>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          className="w-full bg-dark border border-dark-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full bg-dark border border-dark-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="w-full bg-dark border border-dark-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={profileData.company}
                          onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                          className="w-full bg-dark border border-dark-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                          Bio
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          rows="4"
                          className="w-full bg-dark border border-dark-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
                      >
                        <Save size={18} />
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>
                  
                  <form onSubmit={handlePasswordChange}>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={securityData.currentPassword}
                          onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                          className="w-full bg-dark border border-dark-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition"
                          placeholder="Enter current password"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={securityData.newPassword}
                          onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                          className="w-full bg-dark border border-dark-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition"
                          placeholder="Enter new password"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={securityData.confirmPassword}
                          onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                          className="w-full bg-dark border border-dark-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
                      >
                        <Lock size={18} />
                        {loading ? 'Updating...' : 'Update Password'}
                      </button>
                    </div>
                  </form>

                  {/* Two-Factor Authentication */}
                  <div className="mt-8 pt-8 border-t border-dark-border">
                    <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 bg-dark rounded-lg border border-dark-border">
                      <div className="flex items-center gap-3">
                        <Shield className="text-primary" size={24} />
                        <div>
                          <p className="text-white font-medium">Enable 2FA</p>
                          <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                        </div>
                      </div>
                      <button className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {Object.entries({
                      emailNotifications: 'Email Notifications',
                      pushNotifications: 'Push Notifications',
                      smsNotifications: 'SMS Notifications',
                      workflowAlerts: 'Workflow Alerts',
                      securityAlerts: 'Security Alerts',
                      marketingEmails: 'Marketing Emails'
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-dark rounded-lg border border-dark-border">
                        <div>
                          <p className="text-white font-medium">{label}</p>
                          <p className="text-gray-400 text-sm">
                            Receive {label.toLowerCase()} about your account
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[key]}
                            onChange={(e) => setNotificationSettings({
                              ...notificationSettings,
                              [key]: e.target.checked
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleNotificationUpdate}
                      disabled={loading}
                      className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
                    >
                      <Save size={18} />
                      {loading ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">App Preferences</h2>
                  
                  <div className="space-y-6">
                    {/* Language */}
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        <Globe size={16} className="inline mr-2" />
                        Language
                      </label>
                      <select className="w-full bg-dark border border-dark-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition">
                        <option>English</option>
                        <option>Bahasa Indonesia</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>

                    {/* Theme */}
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        <Palette size={16} className="inline mr-2" />
                        Theme
                      </label>
                      <select className="w-full bg-dark border border-dark-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition">
                        <option>Dark Mode</option>
                        <option>Light Mode</option>
                        <option>Auto (System)</option>
                      </select>
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        <Globe size={16} className="inline mr-2" />
                        Timezone
                      </label>
                      <select className="w-full bg-dark border border-dark-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition">
                        <option>Asia/Jakarta (GMT+7)</option>
                        <option>Asia/Singapore (GMT+8)</option>
                        <option>UTC (GMT+0)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-medium transition">
                      <Save size={18} />
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;