'use client'

import { useState } from 'react'

/**
 * Admin Panel - Advanced Security Management
 * Comprehensive security monitoring and management
 * Updated: 28 Ocak 2026 - Dark Theme + Ultra Advanced Features
 */

export default function AdminSecurityPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedThreat, setSelectedThreat] = useState<any>(null)
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [showThreatDetailModal, setShowThreatDetailModal] = useState(false)
  const [ipToBlock, setIpToBlock] = useState('')
  const [showAddRuleModal, setShowAddRuleModal] = useState(false)
  const [newRule, setNewRule] = useState({ name: '', target: '', action: 'Block' })

  const securityMetrics = {
    threatLevel: 'Medium',
    activeThreats: 3,
    blockedIPs: 47,
    failedLogins: 156,
    suspiciousActivities: 23,
    dataBreachAttempts: 0,
    ddosAttempts: 2,
    malwareDetections: 0
  }

  const recentThreats = [
    { id: 1, type: 'Brute Force', ip: '192.168.1.100', severity: 'High', time: '2 min ago', status: 'Blocked', country: 'Russia' },
    { id: 2, type: 'SQL Injection', ip: '10.0.0.45', severity: 'Critical', time: '15 min ago', status: 'Blocked', country: 'China' },
    { id: 3, type: 'XSS Attempt', ip: '172.16.0.23', severity: 'Medium', time: '1 hour ago', status: 'Monitored', country: 'Unknown' },
    { id: 4, type: 'DDoS Attack', ip: '203.0.113.0', severity: 'High', time: '2 hours ago', status: 'Mitigated', country: 'North Korea' },
    { id: 5, type: 'Port Scanning', ip: '198.51.100.42', severity: 'Low', time: '3 hours ago', status: 'Logged', country: 'USA' },
  ]

  const firewallRules = [
    { id: 1, name: 'Block Suspicious IPs', target: '192.168.1.0/24', action: 'Block', status: 'Active', hits: 1247 },
    { id: 2, name: 'Rate Limiting', target: 'All endpoints', action: 'Limit', status: 'Active', hits: 8934 },
    { id: 3, name: 'Geo-blocking', target: 'High-risk countries', action: 'Block', status: 'Active', hits: 456 },
    { id: 4, name: 'SQL Injection Protection', target: 'Database queries', action: 'Filter', status: 'Active', hits: 23 },
    { id: 5, name: 'XSS Protection', target: 'User inputs', action: 'Sanitize', status: 'Active', hits: 67 },
  ]

  const auditLogs = [
    { id: 1, action: 'Admin Login', user: 'admin@neuralcipher.ai', ip: '192.168.1.1', time: '5 min ago', status: 'Success' },
    { id: 2, action: 'User Deleted', user: 'admin@neuralcipher.ai', ip: '192.168.1.1', time: '10 min ago', status: 'Success' },
    { id: 3, action: 'Settings Changed', user: 'admin@neuralcipher.ai', ip: '192.168.1.1', time: '15 min ago', status: 'Success' },
    { id: 4, action: 'Failed Login', user: 'unknown@test.com', ip: '10.0.0.45', time: '20 min ago', status: 'Failed' },
    { id: 5, action: 'Database Backup', user: 'system', ip: 'localhost', time: '2 hours ago', status: 'Success' },
  ]

  const vulnerabilities = [
    { id: 1, title: 'Outdated SSL Certificate', severity: 'Medium', status: 'Open', discovered: '2026-01-20', description: 'SSL certificate expires in 30 days' },
    { id: 2, title: 'Weak Password Policy', severity: 'Low', status: 'In Progress', discovered: '2026-01-15', description: 'Minimum password length should be 12 characters' },
    { id: 3, title: 'Missing CSRF Token', severity: 'High', status: 'Resolved', discovered: '2026-01-10', description: 'CSRF protection implemented on all forms' },
    { id: 4, title: 'Unencrypted Database Backup', severity: 'Critical', status: 'Open', discovered: '2026-01-28', description: 'Database backups should be encrypted' },
    { id: 5, title: 'Exposed API Keys', severity: 'High', status: 'Open', discovered: '2026-01-27', description: 'API keys found in client-side code' },
  ]

  const securityAlerts = [
    { id: 1, type: 'Critical', message: 'Multiple failed login attempts detected', time: '5 min ago', resolved: false },
    { id: 2, type: 'Warning', message: 'Unusual traffic pattern from Asia', time: '15 min ago', resolved: false },
    { id: 3, type: 'Info', message: 'Security scan completed successfully', time: '1 hour ago', resolved: true },
  ]

  const complianceStatus = [
    { name: 'GDPR', status: 'Compliant', score: 95, lastAudit: '2026-01-20' },
    { name: 'HIPAA', status: 'Compliant', score: 92, lastAudit: '2026-01-18' },
    { name: 'SOC 2', status: 'In Progress', score: 78, lastAudit: '2026-01-15' },
    { name: 'ISO 27001', status: 'Compliant', score: 88, lastAudit: '2026-01-10' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Security Management</h1>
          <p className="text-slate-400 mt-1">Advanced security monitoring and threat management</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Run Security Scan
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-400">Threat Level</p>
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{securityMetrics.threatLevel}</p>
          <p className="text-sm text-slate-500 mt-2">{securityMetrics.activeThreats} active threats</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-400">Blocked IPs</p>
            <span className="text-2xl">🚫</span>
          </div>
          <p className="text-3xl font-bold text-red-400">{securityMetrics.blockedIPs}</p>
          <p className="text-sm text-slate-500 mt-2">Last 24 hours</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-400">Failed Logins</p>
            <span className="text-2xl">🔐</span>
          </div>
          <p className="text-3xl font-bold text-orange-400">{securityMetrics.failedLogins}</p>
          <p className="text-sm text-slate-500 mt-2">Last 24 hours</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-400">Data Breaches</p>
            <span className="text-2xl">🛡️</span>
          </div>
          <p className="text-3xl font-bold text-green-400">{securityMetrics.dataBreachAttempts}</p>
          <p className="text-sm text-slate-500 mt-2">All time</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-2">
        <div className="flex gap-2 overflow-x-auto">
          {['overview', 'threats', 'firewall', 'audit', 'vulnerabilities', 'compliance', 'alerts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real-time Threat Map */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Real-time Threat Map</h3>
            <div className="bg-slate-800 rounded-lg p-8 text-center">
              <p className="text-slate-400 mb-4">🌍 Global Threat Visualization</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Asia</p>
                  <p className="text-red-400 font-bold">23 threats</p>
                </div>
                <div>
                  <p className="text-slate-500">Europe</p>
                  <p className="text-yellow-400 font-bold">12 threats</p>
                </div>
                <div>
                  <p className="text-slate-500">Americas</p>
                  <p className="text-green-400 font-bold">5 threats</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Score */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Security Score</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-slate-800"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${88 * 2 * Math.PI * 0.85} ${88 * 2 * Math.PI}`}
                    className="text-green-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <p className="text-5xl font-bold text-green-400">85</p>
                  <p className="text-sm text-slate-400">Excellent</p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Firewall</span>
                <span className="text-green-400">95%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Encryption</span>
                <span className="text-green-400">90%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Authentication</span>
                <span className="text-yellow-400">75%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'threats' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-200">Recent Threats</h3>
            <button 
              onClick={() => setShowBlockModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
            >
              Block IP Address
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">IP Address</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Country</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Severity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentThreats.map((threat) => (
                  <tr key={threat.id} className="hover:bg-slate-800/50">
                    <td className="px-6 py-4 text-sm text-slate-300">{threat.type}</td>
                    <td className="px-6 py-4 text-sm font-mono text-slate-400">{threat.ip}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{threat.country}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        threat.severity === 'Critical' ? 'bg-red-900/50 text-red-300 border border-red-700' :
                        threat.severity === 'High' ? 'bg-orange-900/50 text-orange-300 border border-orange-700' :
                        threat.severity === 'Medium' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                        'bg-blue-900/50 text-blue-300 border border-blue-700'
                      }`}>
                        {threat.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        threat.status === 'Blocked' ? 'bg-red-900/50 text-red-300 border border-red-700' :
                        threat.status === 'Mitigated' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                        'bg-blue-900/50 text-blue-300 border border-blue-700'
                      }`}>
                        {threat.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{threat.time}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedThreat(threat)
                          setShowThreatDetailModal(true)
                        }}
                        className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'firewall' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-200">Firewall Rules</h3>
            <button 
              onClick={() => setShowAddRuleModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
            >
              + Add Rule
            </button>
          </div>
          <div className="space-y-3">
            {firewallRules.map((rule) => (
              <div key={rule.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-slate-200">{rule.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        rule.status === 'Active' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'
                      }`}>
                        {rule.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">Target: {rule.target}</p>
                    <p className="text-sm text-slate-500 mt-1">Action: {rule.action} • Hits: {rule.hits.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-lg font-semibold text-slate-200">Audit Logs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">IP Address</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/50">
                    <td className="px-6 py-4 text-sm text-slate-300">{log.action}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{log.user}</td>
                    <td className="px-6 py-4 text-sm font-mono text-slate-400">{log.ip}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{log.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        log.status === 'Success' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'vulnerabilities' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-200">Vulnerability Assessment</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Run Scan
            </button>
          </div>
          <div className="space-y-3">
            {vulnerabilities.map((vuln) => (
              <div key={vuln.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-slate-200">{vuln.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        vuln.severity === 'Critical' ? 'bg-red-900/50 text-red-300 border border-red-700' :
                        vuln.severity === 'High' ? 'bg-orange-900/50 text-orange-300 border border-orange-700' :
                        vuln.severity === 'Medium' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                        'bg-blue-900/50 text-blue-300 border border-blue-700'
                      }`}>
                        {vuln.severity}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        vuln.status === 'Resolved' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                        vuln.status === 'In Progress' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                        'bg-red-900/50 text-red-300 border border-red-700'
                      }`}>
                        {vuln.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-1">{vuln.description}</p>
                    <p className="text-sm text-slate-500">Discovered: {vuln.discovered}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                      View Details
                    </button>
                    {vuln.status === 'Open' && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                        Fix Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-6">Compliance Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceStatus.map((compliance) => (
                <div key={compliance.name} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-slate-200">{compliance.name}</h4>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      compliance.status === 'Compliant' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                      'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
                    }`}>
                      {compliance.status}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Compliance Score</span>
                      <span className="text-slate-200 font-semibold">{compliance.score}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          compliance.score >= 90 ? 'bg-green-500' :
                          compliance.score >= 75 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${compliance.score}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">Last Audit: {compliance.lastAudit}</p>
                  <button className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                    View Full Report
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Compliance Checklist</h3>
            <div className="space-y-3">
              {[
                { item: 'Data Encryption at Rest', status: true },
                { item: 'Data Encryption in Transit', status: true },
                { item: 'Regular Security Audits', status: true },
                { item: 'Access Control Policies', status: true },
                { item: 'Incident Response Plan', status: false },
                { item: 'Data Retention Policy', status: true },
                { item: 'Third-party Risk Assessment', status: false },
                { item: 'Employee Security Training', status: true },
              ].map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <span className="text-slate-300">{check.item}</span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    check.status ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'
                  }`}>
                    {check.status ? '✓ Complete' : '✗ Incomplete'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-200">Security Alerts</h3>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                Configure Alerts
              </button>
            </div>
            <div className="space-y-3">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border ${
                  alert.type === 'Critical' ? 'bg-red-900/20 border-red-700' :
                  alert.type === 'Warning' ? 'bg-yellow-900/20 border-yellow-700' :
                  'bg-blue-900/20 border-blue-700'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          alert.type === 'Critical' ? 'bg-red-900/50 text-red-300 border border-red-700' :
                          alert.type === 'Warning' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                          'bg-blue-900/50 text-blue-300 border border-blue-700'
                        }`}>
                          {alert.type}
                        </span>
                        <span className="text-sm text-slate-400">{alert.time}</span>
                      </div>
                      <p className="text-slate-200">{alert.message}</p>
                    </div>
                    {!alert.resolved && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Configuration */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Alert Settings</h3>
            <div className="space-y-4">
              {[
                { name: 'Failed Login Attempts', threshold: '5 attempts in 10 minutes', enabled: true },
                { name: 'Unusual Traffic Patterns', threshold: '100% increase from baseline', enabled: true },
                { name: 'Database Access Anomalies', threshold: 'Any unauthorized access', enabled: true },
                { name: 'API Rate Limit Exceeded', threshold: '1000 requests per minute', enabled: false },
                { name: 'Suspicious File Uploads', threshold: 'Malware detected', enabled: true },
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-200 mb-1">{setting.name}</h4>
                    <p className="text-sm text-slate-400">Threshold: {setting.threshold}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={setting.enabled} className="sr-only peer" readOnly />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Block IP Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-100 mb-4">Block IP Address</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">IP Address</label>
                <input
                  type="text"
                  value={ipToBlock}
                  onChange={(e) => setIpToBlock(e.target.value)}
                  placeholder="192.168.1.100"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Reason</label>
                <textarea
                  rows={3}
                  placeholder="Enter reason for blocking..."
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Duration</label>
                <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>1 Hour</option>
                  <option>24 Hours</option>
                  <option>7 Days</option>
                  <option>30 Days</option>
                  <option>Permanent</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowBlockModal(false)
                  setIpToBlock('')
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Block IP
              </button>
              <button
                onClick={() => {
                  setShowBlockModal(false)
                  setIpToBlock('')
                }}
                className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Threat Detail Modal */}
      {showThreatDetailModal && selectedThreat && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-100">Threat Details</h3>
              <button
                onClick={() => {
                  setShowThreatDetailModal(false)
                  setSelectedThreat(null)
                }}
                className="text-slate-400 hover:text-slate-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Threat Type</label>
                  <p className="text-slate-200 font-semibold">{selectedThreat.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Severity</label>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    selectedThreat.severity === 'Critical' ? 'bg-red-900/50 text-red-300 border border-red-700' :
                    selectedThreat.severity === 'High' ? 'bg-orange-900/50 text-orange-300 border border-orange-700' :
                    selectedThreat.severity === 'Medium' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                    'bg-blue-900/50 text-blue-300 border border-blue-700'
                  }`}>
                    {selectedThreat.severity}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">IP Address</label>
                  <p className="text-slate-200 font-mono">{selectedThreat.ip}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Country</label>
                  <p className="text-slate-200">{selectedThreat.country}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Status</label>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    selectedThreat.status === 'Blocked' ? 'bg-red-900/50 text-red-300 border border-red-700' :
                    selectedThreat.status === 'Mitigated' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                    'bg-blue-900/50 text-blue-300 border border-blue-700'
                  }`}>
                    {selectedThreat.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Time</label>
                  <p className="text-slate-200">{selectedThreat.time}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                <p className="text-slate-300 bg-slate-800 p-4 rounded-lg">
                  This threat was detected attempting to {selectedThreat.type.toLowerCase()} on the system. 
                  The attack originated from {selectedThreat.country} and has been {selectedThreat.status.toLowerCase()}.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Recommended Actions</label>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Block the IP address permanently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Review firewall rules for similar patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Monitor for additional attempts from the same region</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Block IP Permanently
              </button>
              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Add to Watchlist
              </button>
              <button
                onClick={() => {
                  setShowThreatDetailModal(false)
                  setSelectedThreat(null)
                }}
                className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Firewall Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-100 mb-4">Add Firewall Rule</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Rule Name</label>
                <input
                  type="text"
                  value={newRule.name}
                  onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                  placeholder="e.g., Block Suspicious Traffic"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target</label>
                <input
                  type="text"
                  value={newRule.target}
                  onChange={(e) => setNewRule({...newRule, target: e.target.value})}
                  placeholder="e.g., 192.168.1.0/24 or All endpoints"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Action</label>
                <select
                  value={newRule.action}
                  onChange={(e) => setNewRule({...newRule, action: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>Block</option>
                  <option>Allow</option>
                  <option>Limit</option>
                  <option>Filter</option>
                  <option>Sanitize</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the purpose of this rule..."
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddRuleModal(false)
                  setNewRule({ name: '', target: '', action: 'Block' })
                }}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Rule
              </button>
              <button
                onClick={() => {
                  setShowAddRuleModal(false)
                  setNewRule({ name: '', target: '', action: 'Block' })
                }}
                className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
