'use client'

export default function AdminSecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Security Management</h1>
        <p className="text-slate-600 mt-1">Monitor and manage system security</p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Failed Logins (24h)</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">23</p>
          <p className="text-sm text-yellow-600 mt-2">⚠️ Monitor</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Blocked IPs</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">12</p>
          <p className="text-sm text-red-600 mt-2">🚫 Active blocks</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">SSL Status</p>
          <p className="text-3xl font-bold text-green-600 mt-2">✓</p>
          <p className="text-sm text-green-600 mt-2">Valid until 2027</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Last Backup</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">2h</p>
          <p className="text-sm text-green-600 mt-2">✓ Successful</p>
        </div>
      </div>

      {/* Security Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Security Events</h3>
        <div className="space-y-3">
          {[
            { event: 'Failed Login Attempt', ip: '192.168.1.100', severity: 'Medium', time: '2 minutes ago' },
            { event: 'Suspicious Activity Detected', ip: '10.0.0.45', severity: 'High', time: '15 minutes ago' },
            { event: 'IP Blocked', ip: '172.16.0.23', severity: 'High', time: '1 hour ago' },
            { event: 'Password Changed', ip: '192.168.1.50', severity: 'Low', time: '2 hours ago' },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-4">
                <span className={`w-3 h-3 rounded-full ${
                  log.severity === 'High' ? 'bg-red-500' :
                  log.severity === 'Medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></span>
                <div>
                  <p className="font-medium text-slate-800">{log.event}</p>
                  <p className="text-sm text-slate-600">IP: {log.ip} • {log.time}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                log.severity === 'High' ? 'bg-red-100 text-red-700' :
                log.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {log.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Firewall Rules */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Firewall Rules</h3>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">+ Add Rule</button>
        </div>
        <div className="space-y-3">
          {[
            { rule: 'Block IP Range', target: '192.168.1.0/24', status: 'Active' },
            { rule: 'Rate Limiting', target: '100 req/min', status: 'Active' },
            { rule: 'Geo-blocking', target: 'Suspicious countries', status: 'Active' },
          ].map((rule, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div>
                <p className="font-medium text-slate-800">{rule.rule}</p>
                <p className="text-sm text-slate-600">{rule.target}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">{rule.status}</span>
                <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Backup Management */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Backup Management</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Create Backup</button>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Full Backup', size: '2.4 GB', date: '2026-01-28 14:00', status: 'Success' },
            { name: 'Database Backup', size: '456 MB', date: '2026-01-28 12:00', status: 'Success' },
            { name: 'Files Backup', size: '1.8 GB', date: '2026-01-28 10:00', status: 'Success' },
          ].map((backup, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">💾</span>
                </div>
                <div>
                  <p className="font-medium text-slate-800">{backup.name}</p>
                  <p className="text-sm text-slate-600">{backup.size} • {backup.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">{backup.status}</span>
                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm">Restore</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
