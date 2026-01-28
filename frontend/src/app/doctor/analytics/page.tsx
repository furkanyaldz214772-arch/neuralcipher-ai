'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Activity, Calendar } from 'lucide-react';
import api from '@/lib/api';

export default function DoctorAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>({
    totalPatients: 0,
    totalTests: 0,
    avgRiskScore: 0,
    highRiskPatients: 0
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/doctor/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#0EA5E9] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-8">
          <BarChart3 className="h-8 w-8 text-[#0EA5E9]" />
          Analytics & Insights
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-[#0EA5E9]" />
              <span className="text-emerald-400 text-sm font-medium">+12%</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Patients</p>
            <p className="text-3xl font-bold text-white">{analytics.totalPatients}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-8 w-8 text-purple-400" />
              <span className="text-emerald-400 text-sm font-medium">+8%</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Tests</p>
            <p className="text-3xl font-bold text-white">{analytics.totalTests}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-amber-400" />
              <span className="text-red-400 text-sm font-medium">-3%</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">Avg Risk Score</p>
            <p className="text-3xl font-bold text-white">{analytics.avgRiskScore}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-8 w-8 text-red-400" />
              <span className="text-amber-400 text-sm font-medium">Alert</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">High Risk Patients</p>
            <p className="text-3xl font-bold text-white">{analytics.highRiskPatients}</p>
          </motion.div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Risk Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-400">Chart visualization coming soon</p>
            </div>
          </div>

          <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Tests Over Time</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-400">Chart visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
