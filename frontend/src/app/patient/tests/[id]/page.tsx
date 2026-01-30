"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { patientApi } from "@/lib/patient-api";

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
}

export default function TestResultPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  
  const [test, setTest] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTestResult();
  }, [testId]);

  const loadTestResult = async () => {
    try {
      setLoading(true);
      const result = await patientApi.getTestDetail(parseInt(testId));
      setTest(result);
    } catch (err: any) {
      console.error("Failed to load test:", err);
      setError(err.message || "Failed to load test result");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading test result...</p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">Error</h1>
          <p className="text-gray-300 mb-6">{error || "Test not found"}</p>
          <button
            onClick={() => router.push("/patient/dashboard")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Dashboard
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
        return "text-gray-500";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/patient/dashboard")}
            className="text-purple-400 hover:text-purple-300 mb-4 flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Test Results</h1>
          <p className="text-gray-400">
            Test ID: {test.id} • {new Date(test.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Status */}
        {test.status === "completed" ? (
          <>
            {/* Risk Score Card */}
            <div className={`border rounded-lg p-8 mb-6 ${getRiskBgColor(test.risk_level)}`}>
              <div className="text-center">
                <h2 className="text-xl text-gray-300 mb-4">Risk Score</h2>
                <div className={`text-6xl font-bold mb-2 ${getRiskColor(test.risk_level)}`}>
                  {test.risk_score?.toFixed(1)}%
                </div>
                <div className={`text-2xl font-semibold ${getRiskColor(test.risk_level)}`}>
                  {test.risk_level?.toUpperCase()} RISK
                </div>
                {test.confidence && (
                  <p className="text-gray-400 mt-4">
                    Confidence: {(test.confidence * 100).toFixed(1)}%
                  </p>
                )}
              </div>
            </div>

            {/* Biomarkers */}
            {test.biomarkers && (
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Biomarkers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(test.biomarkers).map(([key, value]) => (
                    <div key={key} className="bg-slate-900/50 rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">
                        {key.replace(/_/g, " ").toUpperCase()}
                      </div>
                      <div className="text-white text-lg font-semibold">
                        {typeof value === "number" ? value.toFixed(2) : value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Test Info */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Test Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Test Level:</span>
                  <span className="text-white font-medium">{test.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Model Version:</span>
                  <span className="text-white font-medium">{test.model_version || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Completed:</span>
                  <span className="text-white font-medium">
                    {test.completed_at ? new Date(test.completed_at).toLocaleString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-yellow-500/10 border border-yellow-500 rounded-lg p-8 text-center">
            <div className="text-yellow-500 text-5xl mb-4">⏳</div>
            <h2 className="text-2xl font-bold text-white mb-2">Test {test.status}</h2>
            <p className="text-gray-300">
              Your test is currently being processed. Please check back in a few moments.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
