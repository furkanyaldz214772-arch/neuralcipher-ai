'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function TestDetailPage() {
  const router = useRouter();
  const params = useParams();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8">
      <button
        onClick={() => router.push('/patient/tests')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Tests
      </button>
      
      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-4">Test Analysis</h1>
        <p className="text-gray-400">Test ID: {params?.id}</p>
        <p className="text-gray-400 mt-4">Detailed test results will be displayed here.</p>
      </div>
    </div>
  );
}
