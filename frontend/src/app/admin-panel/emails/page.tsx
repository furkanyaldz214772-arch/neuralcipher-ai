'use client'

export default function AdminEmailsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Email Management</h1>
        <p className="text-slate-600 mt-1">Send and manage emails</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Email */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Send Email</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Recipients</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>All Users</option>
                <option>Patients Only</option>
                <option>Doctors Only</option>
                <option>Hospitals Only</option>
                <option>Custom List</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Template</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Welcome Email</option>
                <option>Password Reset</option>
                <option>Test Results</option>
                <option>Payment Confirmation</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
              <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Email subject..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea rows={6} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Email message..."></textarea>
            </div>
            <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Send Email
            </button>
          </div>
        </div>

        {/* Email History */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Emails</h3>
          <div className="space-y-3">
            {[
              { subject: 'Welcome to NeuralCipher', recipients: 45, sent: '2026-01-28', status: 'Sent' },
              { subject: 'Test Results Available', recipients: 23, sent: '2026-01-27', status: 'Sent' },
              { subject: 'Payment Confirmation', recipients: 12, sent: '2026-01-26', status: 'Sent' },
            ].map((email, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-800">{email.subject}</p>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">{email.status}</span>
                </div>
                <p className="text-sm text-slate-600">{email.recipients} recipients • {email.sent}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
