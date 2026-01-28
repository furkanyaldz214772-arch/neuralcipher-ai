"use client";

import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Activity, FileText, Brain } from 'lucide-react';
import PatientProgressChart from '@/components/doctor/PatientProgressChart';
import CriticalAlertsPanel from '@/components/doctor/CriticalAlertsPanel';

export default function AdvancedAnalyticsPage() {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<'1month' | '3months' | '6months' | '1year'>('6months');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Advanced Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive patient insights and trends
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                +12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              156
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Patients
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                +8%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              89%
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Avg Compliance
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                +3
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              12
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              High Risk Patients
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                +24
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              342
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tests This Month
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Progress Chart */}
            {selectedPatient ? (
              <PatientProgressChart 
                patientId={selectedPatient}
                dateRange={dateRange}
              />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a Patient
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose a patient to view detailed progress analytics
                  </p>
                </div>
              </div>
            )}

            {/* Group Comparison */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Patient Group Comparison
                </h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Generate Report
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Early Stage (0-30% risk)
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      78 patients
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Moderate (30-60% risk)
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      56 patients
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '36%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Advanced (60%+ risk)
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      22 patients
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '14%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6" />
                <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm font-medium mb-1">Trend Alert</p>
                  <p className="text-sm opacity-90">
                    3 patients showing declining compliance scores this week. Consider follow-up calls.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm font-medium mb-1">Recommendation</p>
                  <p className="text-sm opacity-90">
                    Patients with morning test schedules show 23% better compliance rates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Alerts & Actions */}
          <div className="space-y-6">
            <CriticalAlertsPanel />

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left font-medium">
                  Generate Monthly Report
                </button>
                
                <button className="w-full px-4 py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-left font-medium">
                  Export Research Data
                </button>
                
                <button className="w-full px-4 py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-left font-medium">
                  Schedule Bulk Reminders
                </button>
                
                <button className="w-full px-4 py-3 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors text-left font-medium">
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
