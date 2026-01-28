'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, TrendingUp, Search, Filter, Eye, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function DoctorTestsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState<any[]>([]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/doctor/tests');
      setTests(response.data.tests || []);
    } catch (error) {
      console.error('Failed to fetch tests:', error);
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
          <p className="text-gray-400">Loading tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="h-8 w-8 text-[#0EA5E9]" />
            Patient Tests
          </h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-[#1E293B] border border-gray-700 text-gray-300 rounded-lg hover:border-[#0EA5E9] transition-all flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter
            </button>
            <button className="px-4 py-2 bg-[#1E293B] border border-gray-700 text-gray-300 rounded-lg hover:border-[#0EA5E9] transition-all flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {tests.length === 0 ? (
            <div className="text-center py-16 bg-[#1E293B] border border-gray-700 rounded-xl">
              <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No tests found</p>
            </div>
          ) : (
            tests.map((test) => (
              <div
                key={test.id}
                className="bg-[#1E293B] border border-gray-700 rounded-xl p-6 hover:border-[#0EA5E9] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Calendar className="h-6 w-6 text-[#0EA5E9]" />
                    <div>
                      <p className="text-white font-semibold">{test.patientName}</p>
                      <p className="text-gray-400 text-sm">{new Date(test.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#0EA5E9]/20 text-[#0EA5E9] rounded-lg text-sm font-medium">
                      {test.riskScore}% Risk
                    </span>
                    <button className="p-2 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-lg hover:bg-[#0EA5E9]/20 transition-all">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-all">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
