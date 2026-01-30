"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { patientAPI } from "@/lib/patient-api";
import { ArrowLeft, Brain, Download, Activity, AlertCircle } from "lucide-react";

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
    // Check authentication before loading
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
      
      // Better error handling based on status code
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.push("/patient/tests")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Tests
        </button>

        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Brain className="h-8 w-8 text-[#0EA5E9]" />
              Test Analysis #{test.id}
            </h1>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0EA5E9]/90 transition-colors"
            >
              <Download className="h-5 w-5" />
              Download Report
            </button>
          </div>

          <div className="space-y-6">
            {/* Risk Score Card */}
            <div className={`border rounded-lg p-6 ${getRiskBgColor(test.risk_level)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Risk Score</p>
                  <p className={`text-5xl font-bold ${getRiskColor(test.risk_level)}`}>
                    {test.risk_score?.toFixed(1) || 'N/A'}%
                  </p>
                  <p className="text-gray-400 mt-2">
                    Risk Level: <span className={`font-semibold ${getRiskColor(test.risk_level)}`}>
                      {test.risk_level?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm mb-1">Confidence</p>
                  <p className="text-2xl font-bold text-white">
                    {test.confidence ? (test.confidence * 100).toFixed(1) : 'N/A'}%
                  </p>
                </div>
              </div>
            </div>

            {/* Test Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0F172A] border border-gray-700/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Test Date</p>
                <p className="text-lg font-semibold text-white">
                  {new Date(test.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(test.created_at).toLocaleTimeString()}
                </p>
              </div>
              <div className="bg-[#0F172A] border border-gray-700/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Test Level</p>
                <p className="text-lg font-semibold text-white capitalize">
                  {test.level}
                </p>
              </div>
              <div className="bg-[#0F172A] border border-gray-700/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Status</p>
                <p className="text-lg font-semibold text-green-500 capitalize">
                  {test.status}
                </p>
              </div>
            </div>

            {/* Biomarkers */}
            {test.biomarkers && (
              <div className="bg-[#0F172A] border border-gray-700/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Activity className="h-6 w-6 text-[#0EA5E9]" />
                  Voice Biomarkers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(test.biomarkers).map(([key, value]: [string, any]) => (
                    <div key={key} className="bg-[#1E293B] border border-gray-700/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1 capitalize">
                        {key.replace(/_/g, ' ')}
                      </p>
                      <p className="text-xl font-bold text-white">
                        {typeof value === 'number' ? value.toFixed(2) : value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Model Info */}
            <div className="bg-[#0F172A] border border-gray-700/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Analysis Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Model Version</p>
                  <p className="text-white font-semibold">{test.model_version || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400">Processing Time</p>
                  <p className="text-white font-semibold">
                    {test.inference_time ? `${(test.inference_time * 1000).toFixed(0)}ms` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Completed At</p>
                  <p className="text-white font-semibold">
                    {test.completed_at ? new Date(test.completed_at).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-[#0F172A] border border-gray-700/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Recommendations</h2>
              <div className="space-y-3">
                {test.risk_level === 'high' && (
                  <>
                    <p className="text-gray-300">• Consult with a neurologist as soon as possible</p>
                    <p className="text-gray-300">• Schedule regular follow-up tests</p>
                    <p className="text-gray-300">• Monitor symptoms closely</p>
                  </>
                )}
                {test.risk_level === 'moderate' && (
                  <>
                    <p className="text-gray-300">• Consider consulting with a healthcare professional</p>
                    <p className="text-gray-300">• Schedule a follow-up test in 3 months</p>
                    <p className="text-gray-300">• Maintain a healthy lifestyle</p>
                  </>
                )}
                {test.risk_level === 'low' && (
                  <>
                    <p className="text-gray-300">• Continue regular health monitoring</p>
                    <p className="text-gray-300">• Schedule annual check-ups</p>
                    <p className="text-gray-300">• Maintain healthy habits</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
