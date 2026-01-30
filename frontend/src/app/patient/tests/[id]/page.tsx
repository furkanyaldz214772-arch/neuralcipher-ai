"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { patientAPI } from "@/lib/patient-api";
import { ArrowLeft, Brain, Download, Activity, AlertCircle, BarChart2, FileText, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

interface TestResult {
  id: number;
  created_at: string;
  completed_at: string | null;
  level: string;
  status: string;
  risk_score: number | null;
  risk_level: string | null;
  confidence: number | null;
  biomarkers: any;
  model_version: string | null;
  inference_time: number | null;
}

export default function TestResultPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  
  const [test, setTest] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError("Please login to view test results");
        setLoading(false);
        setTimeout(() => router.push('/auth/login'), 2000);
        return;
      }
    }
    
    loadTestResult();
  }, [testId]);

  const loadTestResult = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await patientAPI.tests.getTestDetails(testId.toString());
      setTest(result);
    } catch (err: any) {
      console.error("Failed to load test:", err);
      
      if (err.response?.status === 401) {
        setError("Authentication required. Redirecting to login...");
        setTimeout(() => router.push('/auth/login'), 2000);
      } else if (err.response?.status === 404) {
        setError("Test not found. It may have been deleted.");
      } else if (err.response?.status === 403) {
        setError("Access denied. This test belongs to another user.");
      } else {
        setError(err.response?.data?.detail || err.message || "Failed to load test result");
      }
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string | null) => {
    switch (level) {
      case "low":
        return "text-green-500";
      case "moderate":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const getRiskBgColor = (level: string | null) => {
    switch (level) {
      case "low":
        return "bg-green-500/10 border-green-500";
      case "moderate":
        return "bg-yellow-500/10 border-yellow-500";
      case "high":
        return "bg-red-500/10 border-red-500";
      default:
        return "bg-gray-500/10 border-gray-500";
    }
  };

  const getBiomarkerChartData = () => {
    if (!test?.biomarkers) return [];
    
    const biomarkerRanges: { [key: string]: { normal: [number, number], unit: string } } = {
      'HNR': { normal: [20, 30], unit: 'dB' },
      'jitterLocal': { normal: [0, 0.01], unit: '%' },
      'shimmerLocal': { normal: [0, 0.05], unit: '%' },
      'CPP': { normal: [10, 20], unit: 'dB' }
    };

    return Object.entries(test.biomarkers)
      .filter(([key]) => biomarkerRanges[key])
      .map(([key, value]: [string, any]) => {
        const range = biomarkerRanges[key];
        const numValue = typeof value === 'number' ? value : parseFloat(value);
        const isNormal = numValue >= range.normal[0] && numValue <= range.normal[1];
        
        return {
          name: key.replace(/([A-Z])/g, ' $1').trim(),
          value: numValue,
          normalMin: range.normal[0],
          normalMax: range.normal[1],
          unit: range.unit,
          fill: isNormal ? '#10B981' : '#EF4444',
          status: isNormal ? 'Normal' : 'Abnormal'
        };
      });
  };

  const getRiskScoreData = () => {
    if (!test?.risk_score) return [];
    
    return [{
      name: 'Risk Score',
      value: test.risk_score,
      fill: test.risk_level === 'low' ? '#10B981' : test.risk_level === 'moderate' ? '#F59E0B' : '#EF4444'
    }];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0EA5E9] mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading test result...</p>
          <p className="text-gray-400 text-sm mt-2">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-400 mb-6">{error || "Test not found"}</p>
          <button
            onClick={() => router.push("/patient/tests")}
            className="px-6 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0EA5E9]/90 transition-colors"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/patient/tests")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Tests
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-xl p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] rounded-xl">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                Detailed Test Analysis
              </h1>
              <p className="text-gray-400">Test ID: #{test.id} • {new Date(test.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white rounded-xl font-semibold shadow-lg shadow-[#0EA5E9]/30 hover:shadow-[#0EA5E9]/50 transition-all"
              >
                <Download className="h-5 w-5" />
                Download Report
              </motion.button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Risk Score Overview with Radial Chart */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className={`border rounded-xl p-6 ${getRiskBgColor(test.risk_level)}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="h-6 w-6 text-[#0EA5E9]" />
                    Risk Assessment
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Overall Risk Score</p>
                      <p className={`text-6xl font-bold ${getRiskColor(test.risk_level)}`}>
                        {test.risk_score?.toFixed(1) || 'N/A'}%
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Risk Level</p>
                        <p className={`text-2xl font-bold ${getRiskColor(test.risk_level)}`}>
                          {test.risk_level?.toUpperCase() || 'UNKNOWN'}
                        </p>
                      </div>
                      <div className="h-12 w-px bg-gray-600"></div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Confidence</p>
                        <p className="text-2xl font-bold text-white">
                          {test.confidence ? (test.confidence * 100).toFixed(1) : 'N/A'}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Radial Chart */}
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <RadialBarChart 
                      cx="50%" 
                      cy="50%" 
                      innerRadius="60%" 
                      outerRadius="100%" 
                      data={getRiskScoreData()}
                      startAngle={180}
                      endAngle={0}
                    >
                      <RadialBar
                        minAngle={15}
                        background
                        clockWise
                        dataKey="value"
                        cornerRadius={10}
                      />
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-4xl font-bold fill-white"
                      >
                        {test.risk_score?.toFixed(0)}%
                      </text>
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Test Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-5"
              >
                <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Test Date & Time
                </p>
                <p className="text-xl font-bold text-white">
                  {new Date(test.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(test.created_at).toLocaleTimeString()}
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-5"
              >
                <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  Test Level
                </p>
                <p className="text-xl font-bold text-white capitalize">
                  {test.level}
                </p>
                <p className="text-gray-400 text-sm mt-1">Analysis Depth</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-5"
              >
                <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Status
                </p>
                <p className="text-xl font-bold text-green-500 capitalize">
                  {test.status}
                </p>
                <p className="text-gray-400 text-sm mt-1">Processing Complete</p>
              </motion.div>
            </div>

            {/* Biomarkers Visualization */}
            {test.biomarkers && getBiomarkerChartData().length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Activity className="h-6 w-6 text-[#0EA5E9]" />
                  Voice Biomarkers Analysis
                </h2>
                
                {/* Biomarker Bar Chart */}
                <div className="mb-8">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getBiomarkerChartData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#9CA3AF"
                        fontSize={12}
                      />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E293B', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                        labelStyle={{ color: '#F3F4F6' }}
                        formatter={(value: any, name: string, props: any) => [
                          `${value.toFixed(3)} ${props.payload.unit}`,
                          props.payload.status
                        ]}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {getBiomarkerChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Detailed Biomarker Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {getBiomarkerChartData().map((biomarker, index) => (
                    <motion.div 
                      key={biomarker.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="bg-[#1E293B] border border-gray-700/50 rounded-xl p-5"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">{biomarker.name}</p>
                          <p className="text-2xl font-bold text-white">
                            {biomarker.value.toFixed(3)}
                            <span className="text-sm text-gray-400 ml-1">{biomarker.unit}</span>
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          biomarker.status === 'Normal' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {biomarker.status}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Normal Range</span>
                          <span>{biomarker.normalMin} - {biomarker.normalMax} {biomarker.unit}</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${biomarker.status === 'Normal' ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ 
                              width: `${Math.min(100, (biomarker.value / biomarker.normalMax) * 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* All Biomarkers Table */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Complete Biomarker Data</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(test.biomarkers).map(([key, value]: [string, any]) => (
                      <div key={key} className="bg-[#1E293B] border border-gray-700/50 rounded-lg p-4">
                        <p className="text-gray-400 text-xs mb-1 capitalize">
                          {key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-lg font-bold text-white">
                          {typeof value === 'number' ? value.toFixed(4) : value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Model Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Brain className="h-6 w-6 text-[#0EA5E9]" />
                Analysis Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1E293B] border border-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-2">Model Version</p>
                  <p className="text-lg font-bold text-white">{test.model_version || 'v1.0.0'}</p>
                  <p className="text-xs text-gray-500 mt-1">AI Engine</p>
                </div>
                <div className="bg-[#1E293B] border border-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-2">Processing Time</p>
                  <p className="text-lg font-bold text-white">
                    {test.inference_time ? `${(test.inference_time * 1000).toFixed(0)}ms` : '< 1s'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Analysis Speed</p>
                </div>
                <div className="bg-[#1E293B] border border-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-2">Completed At</p>
                  <p className="text-lg font-bold text-white">
                    {test.completed_at ? new Date(test.completed_at).toLocaleTimeString() : 'Just now'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {test.completed_at ? new Date(test.completed_at).toLocaleDateString() : 'Today'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-[#0EA5E9]" />
                Clinical Recommendations
              </h2>
              <div className="space-y-3">
                {test.risk_level === 'high' && (
                  <>
                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold mb-1">Immediate Action Required</p>
                        <p className="text-gray-300 text-sm">Consult with a neurologist as soon as possible for comprehensive evaluation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-[#1E293B] border border-gray-700/50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">Schedule regular follow-up tests to monitor progression</p>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-[#1E293B] border border-gray-700/50 rounded-lg">
                      <Activity className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">Monitor symptoms closely and maintain detailed health records</p>
                    </div>
                  </>
                )}
                {test.risk_level === 'moderate' && (
                  <>
                    <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold mb-1">Medical Consultation Recommended</p>
                        <p className="text-gray-300 text-sm">Consider consulting with a healthcare professional for further evaluation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-[#1E293B] border border-gray-700/50 rounded-lg">
                      <TrendingDown className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">Schedule a follow-up test in 3 months to track changes</p>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-[#1E293B] border border-gray-700/50 rounded-lg">
                      <Activity className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">Maintain a healthy lifestyle with regular exercise and balanced nutrition</p>
                    </div>
                  </>
                )}
                {test.risk_level === 'low' && (
                  <>
                    <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <Activity className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold mb-1">Healthy Status</p>
                        <p className="text-gray-300 text-sm">Your results indicate low risk. Continue your current health practices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-[#1E293B] border border-gray-700/50 rounded-lg">
                      <Minus className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">Continue regular health monitoring and annual check-ups</p>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-[#1E293B] border border-gray-700/50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">Maintain healthy habits including regular exercise, balanced diet, and adequate sleep</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
            >
              <p className="text-sm text-gray-300 text-center">
                <span className="font-semibold text-blue-400">Medical Disclaimer:</span> This analysis is for informational purposes only and should not replace professional medical advice. 
                Always consult with qualified healthcare providers for diagnosis and treatment decisions.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
