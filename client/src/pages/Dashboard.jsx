import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/analytics/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 text-sm md:text-base">Selamat datang kembali! Berikut ringkasan aktivitas Anda.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Total Chats */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-primary/50 transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <span className="text-green-400 text-sm font-medium">+12%</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Chats</h3>
          <p className="text-3xl font-bold text-white">{stats?.totalChats || 0}</p>
        </div>

        {/* Total Messages */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-primary/50 transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✉️</span>
            </div>
            <span className="text-green-400 text-sm font-medium">+8%</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Messages</h3>
          <p className="text-3xl font-bold text-white">{stats?.totalMessages || 0}</p>
        </div>

        {/* Active Workflows */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-primary/50 transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <span className="text-green-400 text-sm font-medium">Active</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Active Workflows</h3>
          <p className="text-3xl font-bold text-white">{stats?.activeWorkflows || 0}</p>
        </div>

        {/* Success Rate */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-primary/50 transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <span className="text-green-400 text-sm font-medium">+5%</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Success Rate</h3>
          <p className="text-3xl font-bold text-white">{stats?.successRate || 0}%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Activity Chart */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Aktivitas Terakhir</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart akan ditampilkan di sini
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary">💬</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">New chat created</p>
                <p className="text-gray-400 text-sm">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-400">⚡</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">Workflow executed successfully</p>
                <p className="text-gray-400 text-sm">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400">📊</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">Analytics report generated</p>
                <p className="text-gray-400 text-sm">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-400">⚠️</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">Workflow failed to execute</p>
                <p className="text-gray-400 text-sm">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-primary/20 to-purple-900/20 border border-primary/30 rounded-xl p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-semibold transition">
            🚀 Start New Chat
          </button>
          <button className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-semibold transition">
            ⚡ Create Workflow
          </button>
          <button className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-semibold transition">
            📊 View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;