'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDoctorsPage() {
  const router = useRouter()
  const [doctors, setDoctors] = useState([
    { id: 2, name: 'Dr. Sarah Smith', email: 'sarah@hospital.com', status: 'Active', country: 'UK', patients: 45, tests: 234, specialty: 'Neurology' },
    { id: 5, name: 'Dr. Michael Brown', email: 'michael@clinic.com', status: 'Active', country: 'USA', patients: 67, tests: 456, specialty: 'Cardiology' },
    { id: 8, name: 'Dr. Emma Davis', email: 'emma@medical.com', status: 'Active', country: 'Germany', patients: 32, tests: 189, specialty: 'Neurology' },
    { id: 9, name: 'Dr. James Wilson', email: 'james@clinic.com', status: 'Inactive', country: 'Canada', patients: 12, tests: 78, specialty: 'General' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [selectedDoctors, setSelectedDoctors] = useState<number[]>([])

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || doctor.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const toggleDoctorSelection = (doctorId: number) => {
    setSelectedDoctors(prev =>
      prev.includes(doctorId)
        ? prev.filter(id => id !== doctorId)
        : [...prev, doctorId]
    )
  }

  const handleViewDoctor = (doctorId: number) => {
    router.push(`/admin-panel/users/${doctorId}`)
  }

  const handleDeleteDoctor = (doctorId: number) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(d => d.id !== doctorId))
    }
  }

  const handleDownloadData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Status,Country,Patients,Tests,Specialty\n" +
      filteredDoctors.map(d => `${d.name},${d.email},${d.status},${d.country},${d.patients},${d.tests},${d.specialty}`).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "doctors_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Doctors Management</h1>
          <p className="text-slate-400 mt-1">Manage all doctor accounts</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDownloadData}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg">
            + Add Doctor
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Specialty</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Country</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Patients</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Tests</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedDoctors.includes(doctor.id)}
                      onChange={() => toggleDoctorSelection(doctor.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{doctor.name[4]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">{doctor.name}</p>
                        <p className="text-sm text-slate-400">{doctor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{doctor.specialty}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      doctor.status === 'Active' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'
                    }`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{doctor.country}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{doctor.patients}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{doctor.tests}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDoctor(doctor.id)}
                        className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        className="p-2 text-green-400 hover:bg-green-900/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteDoctor(doctor.id)}
                        className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Delete"
                      >
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
