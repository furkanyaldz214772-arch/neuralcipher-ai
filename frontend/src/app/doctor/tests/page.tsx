'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, TrendingUp, Search, Filter, Eye, Download, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Test {
  id: string;
  patientName: string;
  patientId: string;
  createdAt: string;
  riskScore: number;
  status: 'completed' | 'pending' | 'processing';
  testType: string;
}

export default function DoctorTestsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState<Test[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchTests();
  }, [filterStatus]);

  const fetchTests = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/api/v1/doctor/tests?page=${1}&limit=${20}&status=${filterStatus}`)
      setTests(response.data.tests || [])
    } catch (error) {
      console.error('Failed to fetch tests:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-400 bg-red-500/10 border-red-500/30';
    if (score >= 40) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case 'processing': return <Clock className="h-5 w-5 text-amber-400 animate-pulse" />;
      case 'pending': return <AlertCircle className="h-5 w-5 text-gray-400" />;
      default: return null;
    }
  };

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || test.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#0EA5E9] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Loading tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
              <div className="p-3 bg-[#0EA5E9]/10 rounded-xl">
                <FileText className="h-8 w-8 text-[#0EA5E9]" />
              </div>
              Patient Tests
            </h1>
            <p className="text-gray-400">Review and analyze patient test results</p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patients..."
                className="w-full sm:w-64 bg-[#1E293B] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#0EA5E9] transition-colors"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#1E293B] border border-gray-700 text-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0EA5E9] transition-colors"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Tests</p>
                <p className="text-3xl font-bold text-white">{tests.length}</p>
              </div>
              <div className="p-3 bg-[#0EA5E9]/10 rounded-lg">
                <FileText className="h-6 w-6 text-[#0EA5E9]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">High Risk</p>
                <p className="text-3xl font-bold text-red-400">
                  {tests.filter(t => t.riskScore >= 70).length}
                </p>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">This Month</p>
                <p className="text-3xl font-bold text-emerald-400">
                  {tests.filter(t => new Date(t.createdAt).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tests List */}
        <div className="space-y-3">
          {filteredTests.length === 0 ? (
            <div className="text-center py-16 bg-[#1E293B] border border-gray-700 rounded-2xl">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-gray-700/50 rounded-full">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">No tests found</h3>
                  <p className="text-gray-400">
                    {searchQuery ? 'Try adjusting your search' : 'Tests will appear here once patients complete them'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            filteredTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#1E293B] border border-gray-700 rounded-xl p-6 hover:border-[#0EA5E9] transition-all cursor-pointer group"
                onClick={() => router.push(`/doctor/tests/${test.id}`)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-[#0EA5E9]/10 rounded-lg group-hover:bg-[#0EA5E9]/20 transition-colors">
                      {getStatusIcon(test.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-white font-semibold text-lg">{test.patientName}</p>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs font-medium">
                          {test.testType || 'Voice Analysis'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(test.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                        <span className="capitalize">{test.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-lg border font-semibold ${getRiskColor(test.riskScore)}`}>
                      {test.riskScore}% Risk
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/doctor/tests/${test.id}`);
                      }}
                      className="p-3 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-lg hover:bg-[#0EA5E9]/20 transition-all"
                    >
                      <Eye className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Download test:', test.id);
                      }}
                      className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-all"
                    >
                      <Download className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
