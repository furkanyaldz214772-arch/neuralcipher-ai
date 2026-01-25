'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSearch, FiUserPlus } from 'react-icons/fi';

interface Patient {
  id: number;
  full_name: string;
  email: string;
  date_of_birth: string;
}

export default function AddPatientPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter an email to search');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://web-production-c00b0.up.railway.app/api/v1/doctor/patients/search?email=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to search patients');
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError('Failed to search patients. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = async (patientId: number) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'https://web-production-c00b0.up.railway.app/api/v1/doctor/patients',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ patient_id: patientId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add patient');
      }

      setSuccess('Patient added successfully!');
      setTimeout(() => {
        router.push('/doctor/patients');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to add patient. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Patients
          </button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FiUserPlus className="w-8 h-8 text-blue-400" />
            Add New Patient
          </h1>
          <p className="text-slate-400 mt-2">
            Search for a patient by email and add them to your patient list
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter patient email address..."
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center gap-2"
            >
              <FiSearch className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400">
            {success}
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-700/50">
              <h2 className="text-xl font-semibold text-white">
                Search Results ({searchResults.length})
              </h2>
            </div>
            <div className="divide-y divide-slate-700/50">
              {searchResults.map((patient) => (
                <div
                  key={patient.id}
                  className="p-6 hover:bg-slate-700/30 transition-colors flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {patient.full_name}
                    </h3>
                    <p className="text-slate-400 text-sm">{patient.email}</p>
                    <p className="text-slate-500 text-sm mt-1">
                      Born: {new Date(patient.date_of_birth).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddPatient(patient.id)}
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    <FiUserPlus className="w-4 h-4" />
                    Add Patient
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && searchResults.length === 0 && searchQuery && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-12 text-center">
            <FiSearch className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No patients found
            </h3>
            <p className="text-slate-400">
              Try searching with a different email address
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
