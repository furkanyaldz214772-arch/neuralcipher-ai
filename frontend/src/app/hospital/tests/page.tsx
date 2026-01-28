'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiFilter, FiDownload, FiEye, FiCalendar, FiUser, FiActivity } from 'react-icons/fi';

interface Test {
  id: string;
  patient_name: string;
  patient_id: string;
  test_date: string;
  test_type: string;
  risk_score: number;
  status: 'completed' | 'pending' | 'processing';
  doctor_name?: string;
}

export default function HospitalTestsPage() {
  const router = useRouter();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      // Demo data
      const demoTests: Test[] = [
        {
          id: '1',
          patient_name: 'John Doe',
          patient_id: 'P001',
          test_date: '2026-01-28T10:30:00',
          test_type: 'Voice Analysis',
          risk_score: 75,
          status: 'completed',
          doctor_name: 'Dr. Smith'
        },
        {
          id: '2',
          patient_name: 'Jane Smith',
          patient_id: 'P002',
          test_date: '2026-01-28T14:15:00',
          test_type: 'Comprehensive',
          risk_score: 45,
          status: 'completed',
          doctor_name: 'Dr. Johnson'
        },
        {
          id: '3',
          patient_name: 'Bob Wilson',
          patient_id: 'P003',
          test_date: '2026-01-28T16:00:00',
          test_type: 'Voice Analysis',
          risk_score: 0,
          status: 'processing',
          doctor_name: 'Dr. Smith'
        }
      ];
      
      setTests(demoTests);
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.patient_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus;
    const matchesRisk = filterRisk === 'all' || 
                       (filterRisk === 'high' && test.risk_score >= 70) ||
                       (filterRisk === 'medium' && test.risk_score >= 40 && test.risk_score < 70) ||
                       (filterRisk === 'low' && test.risk_score < 40);
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Tests</h1>
        <p className="text-gray-600">View and manage all patient tests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiActivity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {tests.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FiActivity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Processing</p>
              <p className="text-2xl font-bold text-blue-600">
                {tests.filter(t => t.status === 'processing').length}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiActivity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">High Risk</p>
              <p className="text-2xl font-bold text-red-600">
                {tests.filter(t => t.risk_score >= 70).length}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <FiActivity className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Risk Filter */}
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk (≥70)</option>
              <option value="medium">Medium Risk (40-69)</option>
              <option value="low">Low Risk (&lt;40)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Test Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Test Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No tests found
                  </td>
                </tr>
              ) : (
                filteredTests.map((test) => (
                  <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiUser className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{test.patient_name}</div>
                          <div className="text-sm text-gray-500">ID: {test.patient_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <FiCalendar className="mr-2 text-gray-400" />
                        {new Date(test.test_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{test.test_type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{test.doctor_name || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4">
                      {test.status === 'completed' ? (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(test.risk_score)}`}>
                          {test.risk_score}%
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                        {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => router.push(`/hospital/tests/${test.id}`)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View Details"
                        >
                          <FiEye className="w-5 h-5" />
                        </button>
                        {test.status === 'completed' && (
                          <button
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Download Report"
                          >
                            <FiDownload className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
