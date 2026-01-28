'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Users, Activity, Calendar, AlertCircle, CheckCircle, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import api from '@/lib/api';

interface AnalyticsData {
  totalPatients: number;
  totalTests: number;
  avgRiskScore: number;
  highRiskPatients: number;
  trends: {
    patients: number;
    tests: number;
    riskScore: number;
  };
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  monthlyTests: Array<{ month: string; count: number }>;
}

export default function DoctorAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalPatients: 0,
    totalTests: 0,
    avgRiskScore: 0,
    highRiskPatients: 0,
    trends: { patients: 0, tests: 0, riskScore: 0 },
    riskDistribution: { low: 0, medium: 0, high: 0 },
    monthlyTests: []
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

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    trendValue, 
    color, 
    delay 
  }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    trend: 'up' | 'down' | 'neutral'; 
    trendValue: string; 
    color: string; 
    delay: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700 rounded-2xl p-6 hover:border-[#0EA5E9] transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${color} rounded-xl`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
          trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' :
          trend === 'down' ? 'bg-red-500/10 text-red-400' :
          'bg-gray-700 text-gray-400'
        }`}>
          {trend === 'up' ? <ArrowUp className="h-4 w-4" /> : 
           trend === 'down' ? <ArrowDown className="h-4 w-4" /> : null}
          <span className="text-sm font-semibold">{trendValue}</span>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-4xl font-bold text-white">{value}</p>
    </motion.div>
  );

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#0EA5E9]/10 rounded-xl">
              <BarChart3 className="h-8 w-8 text-[#0EA5E9]" />
            </div>
            Analytics & Insights
          </h1>
          <p className="text-gray-400">Track your practice performance and patient outcomes</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Patients"
            value={analytics.totalPatients}
            icon={Users}
            trend="up"
            trendValue="+12%"
            color="bg-[#0EA5E9]/10 text-[#0EA5E9]"
            delay={0}
          />
          <StatCard
            title="Total Tests"
            value={analytics.totalTests}
            icon={Activity}
            trend="up"
            trendValue="+8%"
            color="bg-purple-500/10 text-purple-400"
            delay={0.1}
          />
          <StatCard
            title="Avg Risk Score"
            value={`${analytics.avgRiskScore}%`}
            icon={TrendingUp}
            trend="down"
            trendValue="-3%"
            color="bg-amber-500/10 text-amber-400"
            delay={0.2}
          />
          <StatCard
            title="High Risk Patients"
            value={analytics.highRiskPatients}
            icon={AlertCircle}
            trend="neutral"
            trendValue="Alert"
            color="bg-red-500/10 text-red-400"
            delay={0.3}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-[#0EA5E9]" />
              Risk Distribution
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    Low Risk
                  </span>
                  <span className="text-white font-semibold">{analytics.riskDistribution.low}</span>
                </div>
                <div className="w-full bg-[#0F172A] rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(analytics.riskDistribution.low / analytics.totalPatients) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-400" />
                    Medium Risk
                  </span>
                  <span className="text-white font-semibold">{analytics.riskDistribution.medium}</span>
                </div>
                <div className="w-full bg-[#0F172A] rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(analytics.riskDistribution.medium / analytics.totalPatients) * 100}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    High Risk
                  </span>
                  <span className="text-white font-semibold">{analytics.riskDistribution.high}</span>
                </div>
                <div className="w-full bg-[#0F172A] rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(analytics.riskDistribution.high / analytics.totalPatients) * 100}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Monthly Tests Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-[#0EA5E9]" />
              Tests Over Time
            </h3>
            <div className="space-y-3">
              {analytics.monthlyTests.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No test data available yet</p>
                </div>
              ) : (
                analytics.monthlyTests.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-gray-400 w-16 text-sm">{item.month}</span>
                    <div className="flex-1 bg-[#0F172A] rounded-full h-8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / Math.max(...analytics.monthlyTests.map(m => m.count))) * 100}%` }}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] rounded-full flex items-center justify-end pr-3"
                      >
                        <span className="text-white text-sm font-semibold">{item.count}</span>
                      </motion.div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[#0EA5E9]" />
            Quick Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-2">Most Active Day</p>
              <p className="text-2xl font-bold text-white">Monday</p>
            </div>
            <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-2">Avg Tests per Patient</p>
              <p className="text-2xl font-bold text-white">2.4</p>
            </div>
            <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-2">Response Time</p>
              <p className="text-2xl font-bold text-white">&lt; 2h</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
