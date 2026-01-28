"use client";

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ProgressData {
  date: string;
  riskScore: number;
  testCount: number;
  complianceScore: number;
}

interface PatientProgressChartProps {
  patientId: number;
  dateRange?: '1month' | '3months' | '6months' | '1year';
}

export default function PatientProgressChart({ patientId, dateRange = '6months' }: PatientProgressChartProps) {
  const [data, setData] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');

  useEffect(() => {
    fetchProgressData();
  }, [patientId, dateRange]);

  const fetchProgressData = async () => {
    try {
      const response = await fetch(
        `/api/v1/doctor/analytics/patient/${patientId}/progress?range=${dateRange}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const result = await response.json();
      setData(result.data);
      calculateTrend(result.data);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTrend = (progressData: ProgressData[]) => {
    if (progressData.length < 2) {
      setTrend('stable');
      return;
    }

    const firstScore = progressData[0].riskScore;
    const lastScore = progressData[progressData.length - 1].riskScore;
    const change = ((lastScore - firstScore) / firstScore) * 100;

    if (change > 10) setTrend('up');
    else if (change < -10) setTrend('down');
    else setTrend('stable');
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Patient Progress
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Risk score trends over time
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {trend === 'up' && (
            <div className="flex items-center gap-1 text-red-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Increasing Risk</span>
            </div>
          )}
          {trend === 'down' && (
            <div className="flex items-center gap-1 text-green-600">
              <TrendingDown className="w-5 h-5" />
              <span className="text-sm font-medium">Improving</span>
            </div>
          )}
          {trend === 'stable' && (
            <div className="flex items-center gap-1 text-gray-600">
              <Minus className="w-5 h-5" />
              <span className="text-sm font-medium">Stable</span>
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis 
            dataKey="date" 
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="riskScore" 
            stroke="#EF4444" 
            strokeWidth={2}
            name="Risk Score"
            dot={{ fill: '#EF4444', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="complianceScore" 
            stroke="#10B981" 
            strokeWidth={2}
            name="Compliance"
            dot={{ fill: '#10B981', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Risk</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data[data.length - 1]?.riskScore.toFixed(1)}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tests Completed</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.reduce((sum, d) => sum + d.testCount, 0)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Compliance</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data[data.length - 1]?.complianceScore.toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
}
