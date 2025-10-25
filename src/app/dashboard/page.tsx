'use client';

import { useEffect, useState } from 'react';
import { getWordPressAPI } from '@/lib/wordpress-api';

interface DashboardStats {
  total_reviews: number;
  pending_reviews: number;
  average_rating: number;
  reviews_this_month: number;
  reviews_today: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const api = getWordPressAPI();
      const result = await api.getDashboardStats();

      if (result.success) {
        setStats(result.stats);
      } else {
        setError('Failed to load stats');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to WordPress');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold mb-2">Connection Error</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadStats}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">ReviewFlow Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Reviews"
            value={stats?.total_reviews || 0}
            icon="📊"
            color="blue"
          />
          <StatCard
            title="Pending"
            value={stats?.pending_reviews || 0}
            icon="⏳"
            color="yellow"
          />
          <StatCard
            title="Avg Rating"
            value={(stats?.average_rating || 0).toFixed(1)}
            icon="⭐"
            color="green"
          />
          <StatCard
            title="This Month"
            value={stats?.reviews_this_month || 0}
            icon="📈"
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickAction
            title="Review Moderation"
            description="Approve or reject pending reviews"
            href="/dashboard/reviews"
            icon="✅"
            badge={stats?.pending_reviews}
          />
          <QuickAction
            title="Security Monitor"
            description="View rate limit violations and security events"
            href="/dashboard/security"
            icon="🔒"
          />
          <QuickAction
            title="Analytics"
            description="Review trends and conversion data"
            href="/dashboard/analytics"
            icon="📊"
          />
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    yellow: 'from-yellow-500 to-yellow-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`text-4xl bg-gradient-to-br ${colorClasses[color]} text-white rounded-lg w-16 h-16 flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ title, description, href, icon, badge }: any) {
  return (
    <a
      href={href}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 relative"
    >
      {badge > 0 && (
        <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  );
}
