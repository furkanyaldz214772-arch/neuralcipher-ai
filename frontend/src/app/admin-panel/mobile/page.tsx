'use client'

export default function AdminMobilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Mobile App Management</h1>
        <p className="text-slate-400 mt-1">Manage mobile app versions and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Version Management */}
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Version Management</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-800">iOS Version</span>
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">Current</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">1.2.3</p>
              <p className="text-sm text-slate-600 mt-2">Released: 2026-01-15</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-800">Android Version</span>
                <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">Current</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">1.2.3</p>
              <p className="text-sm text-slate-600 mt-2">Released: 2026-01-15</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div>
                <p className="font-medium text-white">Force Update</p>
                <p className="text-sm text-slate-400">Require users to update</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Push Notification Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Firebase Server Key</label>
              <input type="password" defaultValue="••••••••••••••••" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Firebase Sender ID</label>
              <input type="text" defaultValue="123456789012" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Test Push Notification
            </button>
          </div>
        </div>
      </div>

      {/* App Store Links */}
      <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">App Store Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">iOS App Store URL</label>
            <input type="text" defaultValue="https://apps.apple.com/app/neuralcipher" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Google Play Store URL</label>
            <input type="text" defaultValue="https://play.google.com/store/apps/neuralcipher" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
