'use client'

import { useState } from 'react'

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Smith', email: 'sarah@hospital.com', specialty: 'Neurology', hospital: 'City Hospital', patients: 45, tests: 234, status: 'Active', verified: true },
    { id: 2, name: 'Dr. Michael Brown', email: 'michael@clinic.com', specialty: 'Cardiology', hospital: 'General Medical Center', patients: 32, tests: 189, status: 'Active', verified: true },
    { id: 3, name: 'Dr. Emily Davis', email: 'emily@unihospital.edu', specialty: 'Neurology', hospital: 'University Hospital', patients: 67, tests: 456, status: 'Active', verified: true },
    { id: 4, name: 'Dr. James Wilson', email: 'james@clinic.org', specialty: 'General Practice', hospital: 'Community Clinic', patients: 23, tests: 78, status: 'Pending', verified: false },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Doctor Management</h1>
          <p className="text-slate-600 mt-1">Manage all doctors in the system</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
          + Add Doctor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Total Doctors</p>
          <p className="text-3xl font-bold text-white mt-2">189</p>
          <p className="text-sm text-green-600 mt-2">+7 this month</p>
        </div>
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Verified</p>
          <p className="text-3xl font-bold text-white mt-2">176</p>
          <p className="text-sm text-green-600 mt-2">93% verified</p>
        </div>
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Pending Approval</p>
          <p className="text-3xl font-bold text-white mt-2">13</p>
          <p className="text-sm text-yellow-600 mt-2">Needs review</p>
        </div>
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Total Patients</p>
          <p className="text-3xl font-bold text-white mt-2">957</p>
          <p className="text-sm text-green-600 mt-2">+45 this month</p>
        </div>
      </div>

      {/* Doctors Table */}
      <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Specialty</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Hospital</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Patients</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Tests</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Verified</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{doctor.name.split(' ')[1][0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{doctor.name}</p>
                        <p className="text-sm text-slate-300">{doctor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{doctor.specialty}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{doctor.hospital}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{doctor.patients}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{doctor.tests}</td>
                  <td className="px-6 py-4">
                    {doctor.verified ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      doctor.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                      {!doctor.verified && (
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      )}
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
