'use client'

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Notification Management</h1>
        <p className="text-slate-400 mt-1">Send and manage notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Notification */}
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Send Notification</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Type</label>
              <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Push Notification</option>
                <option>In-App Notification</option>
                <option>Both</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Recipients</label>
              <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>All Users</option>
                <option>Patients</option>
                <option>Doctors</option>
                <option>Hospitals</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Title</label>
              <input type="text" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Notification title..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Message</label>
              <textarea rows={4} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Notification message..."></textarea>
            </div>
            <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Send Notification
            </button>
          </div>
        </div>

        {/* Notification History */}
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Notifications</h3>
          <div className="space-y-3">
            {[
              { title: 'New Feature Available', recipients: 1247, sent: '2026-01-28', read: 892 },
              { title: 'System Maintenance', recipients: 1247, sent: '2026-01-27', read: 1105 },
              { title: 'Security Update', recipients: 1247, sent: '2026-01-26', read: 1198 },
            ].map((notif, i) => (
              <div key={i} className="p-4 bg-slate-700/50 rounded-lg">
                <p className="font-medium text-white mb-2">{notif.title}</p>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{notif.recipients} sent</span>
                  <span>{notif.read} read ({Math.round((notif.read/notif.recipients)*100)}%)</span>
                  <span>{notif.sent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
