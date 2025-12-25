import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Activity,
  Calendar,
  Download,
  Filter
} from 'lucide-react';

// StatCard Component - Moved outside to prevent re-creation
const StatCard = ({ title, value, change, icon, prefix = '', suffix = '' }) => {
  const isPositive = change >= 0;
  const Icon = icon; // Assign to Icon for JSX usage
  
  return (
    <div className="bg-dark-lighter border border-dark-border rounded-lg p-6 hover:border-primary/50 transition">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <div className={`p-2 rounded-lg ${
          isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
        }`}>
          <Icon className={isPositive ? 'text-green-500' : 'text-red-500'} size={20} />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-3xl font-bold text-white mb-1">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </h3>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp size={16} className="text-green-500" />
            ) : (
              <TrendingDown size={16} className="text-red-500" />
            )}
            <span className={`text-sm font-medium ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}>
              {Math.abs(change)}%
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last period</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function Analytics() {
  const [timeRange, setTimeRange] = useState('7days');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  // Dummy data untuk demo
  useEffect(() => {
    setTimeout(() => {
      setAnalyticsData({
        revenue: {
          current: 45280,
          previous: 38950,
          change: 16.2
        },
        users: {
          current: 2847,
          previous: 2456,
          change: 15.9
        },
        orders: {
          current: 456,
          previous: 389,
          change: 17.2
        },
        conversion: {
          current: 3.2,
          previous: 2.8,
          change: 14.3
        },
        topProducts: [
          { name: 'Product A', sales: 1250, revenue: 25000 },
          { name: 'Product B', sales: 980, revenue: 19600 },
          { name: 'Product C', sales: 756, revenue: 15120 },
          { name: 'Product D', sales: 623, revenue: 12460 },
          { name: 'Product E', sales: 445, revenue: 8900 }
        ],
        recentActivities: [
          { type: 'order', user: 'John Doe', action: 'Placed an order', time: '5 mins ago', amount: '$125' },
          { type: 'user', user: 'Jane Smith', action: 'Signed up', time: '12 mins ago', amount: null },
          { type: 'order', user: 'Mike Johnson', action: 'Placed an order', time: '28 mins ago', amount: '$340' },
          { type: 'refund', user: 'Sarah Williams', action: 'Requested refund', time: '1 hour ago', amount: '$89' },
          { type: 'user', user: 'David Brown', action: 'Signed up', time: '2 hours ago', amount: null }
        ],
        chartData: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          revenue: [3200, 4100, 3800, 5200, 4800, 6100, 5900],
          orders: [45, 52, 48, 68, 61, 78, 72]
        }
      });
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <div className="bg-dark-lighter border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-gray-400 mt-1">Monitor performa bisnis Anda secara real-time</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Time Range Filter */}
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-dark border border-dark-border text-white px-4 py-2 rounded-lg focus:outline-none focus:border-primary transition"
              >
                <option value="24hours">Last 24 Hours</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
              
              <button className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg font-medium transition">
                <Download size={18} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Revenue"
            value={analyticsData.revenue.current}
            change={analyticsData.revenue.change}
            icon={DollarSign}
            prefix="Rp "
          />
          <StatCard
            title="Total Users"
            value={analyticsData.users.current}
            change={analyticsData.users.change}
            icon={Users}
          />
          <StatCard
            title="Total Orders"
            value={analyticsData.orders.current}
            change={analyticsData.orders.change}
            icon={ShoppingCart}
          />
          <StatCard
            title="Conversion Rate"
            value={analyticsData.conversion.current}
            change={analyticsData.conversion.change}
            icon={Activity}
            suffix="%"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
            <div className="space-y-3">
              {analyticsData.chartData.labels.map((label, index) => (
                <div key={label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white font-medium">
                      {formatCurrency(analyticsData.chartData.revenue[index])}
                    </span>
                  </div>
                  <div className="w-full bg-dark rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all"
                      style={{ 
                        width: `${(analyticsData.chartData.revenue[index] / 7000) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Orders Chart */}
          <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Orders Overview</h3>
            <div className="space-y-3">
              {analyticsData.chartData.labels.map((label, index) => (
                <div key={label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white font-medium">
                      {analyticsData.chartData.orders[index]} orders
                    </span>
                  </div>
                  <div className="w-full bg-dark rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all"
                      style={{ 
                        width: `${(analyticsData.chartData.orders[index] / 80) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Top Products</h3>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-gray-400 text-sm">{product.sales} sales</p>
                    </div>
                  </div>
                  <p className="text-white font-semibold">{formatCurrency(product.revenue)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {analyticsData.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'order' ? 'bg-green-500/20' :
                    activity.type === 'user' ? 'bg-blue-500/20' :
                    'bg-red-500/20'
                  }`}>
                    {activity.type === 'order' && <ShoppingCart size={16} className="text-green-500" />}
                    {activity.type === 'user' && <Users size={16} className="text-blue-500" />}
                    {activity.type === 'refund' && <TrendingDown size={16} className="text-red-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{activity.user}</p>
                    <p className="text-gray-400 text-sm">{activity.action}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {activity.amount && (
                      <p className="text-white text-sm font-semibold mb-1">{activity.amount}</p>
                    )}
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;