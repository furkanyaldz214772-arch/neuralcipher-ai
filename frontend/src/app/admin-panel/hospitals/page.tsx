'use client'

import { useState } from 'react'

export default function AdminHospitalsPage() {
  const [hospitals, setHospitals] = useState([
    { id: 1, name: 'City Hospital', email: 'info@cityhospital.com', country: 'USA', doctors: 45, patients: 234, tests: 1234, status: 'Active', package: 'Enterprise' },
    { id: 2, name: 'General Medical Center', email: 'contact@gmc.com', country: 'UK', doctors: 32, patients: 189, tests: 892, status: 'Active', package: 'Pro' },
    { id: 3, name: 'University Hospital', email: 'info@unihospital.edu', country: 'Germany', doctors: 67, patients: 456, tests: 2341, status: 'Active', package: 'Enterprise' },
    { id: 4, name: 'Community Clinic', email: 'hello@communityclinic.org', country: 'Canada', doctors: 12, patients: 78, tests: 234, status: 'Inactive', package: 'Basic' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Hospital Management</h1>
          <p className="text-slate-600 mt-1">Manage all hospitals in the system</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
          + Add Hospital
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Hospitals</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">45</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏥</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Doctors</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">189</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Patients</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">957</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Tests</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">4,701</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🧪</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hospitals Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Hospital</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Country</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Doctors</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Patients</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Tests</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Package</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {hospitals.map((hospital) => (
                <tr key={hospital.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-800">{hospital.name}</p>
                      <p className="text-sm text-slate-500">{hospital.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{hospital.country}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{hospital.doctors}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{hospital.patients}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{hospital.tests}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      hospital.package === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                      hospital.package === 'Pro' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {hospital.package}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      hospital.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {hospital.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
