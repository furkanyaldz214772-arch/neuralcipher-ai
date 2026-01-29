'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Brain, Activity } from 'lucide-react';
import api from '@/lib/api';

export default function TestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState<any>(null);

  useEffect(() => {
    if (params.id) {
      fetchTestDetails();
    }
  }, [params.id]);

  const fetchTestDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/v1/tests/${params.id}`);
      setTest(response.data);
    } catch (error) {
      console.error('Failed to fetch test:', error);
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
          <p className="text-gray-400">Loading test details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Tests
        </button>

        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Brain className="h-8 w-8 text-[#0EA5E9]" />
              Test Analysis
            </h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0EA5E9]/90 transition-colors">
              <Download className="h-5 w-5" />
              Download Report
            </button>
          </div>

          {test ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0F172A] border border-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Risk Score</p>
                  <p className="text-2xl font-bold text-white">{test.riskScore || 'N/A'}%</p>
                </div>
                <div className="bg-[#0F172A] border border-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  <p className="text-2xl font-bold text-white">{test.status || 'Analyzed'}</p>
                </div>
                <div className="bg-[#0F172A] border border-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Date</p>
                  <p className="text-2xl font-bold text-white">
                    {test.createdAt ? new Date(test.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="bg-[#0F172A] border border-gray-700/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Activity className="h-6 w-6 text-[#0EA5E9]" />
                  Analysis Details
                </h2>
                <p className="text-gray-400">
                  Detailed analysis information will be displayed here.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">Test not found</p>
          )}
        </div>
      </div>
    </div>
  );
}
