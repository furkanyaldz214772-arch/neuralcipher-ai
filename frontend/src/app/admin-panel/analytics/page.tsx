'use client'

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Analytics & Insights</h1>
        <p className="text-slate-600 mt-1">Track user behavior and system performance</p>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Active Users</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">342</p>
          <p className="text-sm text-green-600 mt-2">↑ 12% vs yesterday</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Page Views</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">8,234</p>
          <p className="text-sm text-green-600 mt-2">↑ 8% vs yesterday</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Avg Session</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">4:32</p>
          <p className="text-sm text-green-600 mt-2">↑ 15% vs yesterday</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Bounce Rate</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">32.4%</p>
          <p className="text-sm text-red-600 mt-2">↓ 5% vs yesterday</p>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            {[
              { source: 'Direct', visitors: 3245, percentage: 45 },
              { source: 'Organic Search', visitors: 2156, percentage: 30 },
              { source: 'Social Media', visitors: 1078, percentage: 15 },
              { source: 'Referral', visitors: 719, percentage: 10 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{item.source}</span>
                  <span className="text-sm text-slate-600">{item.visitors} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Pages</h3>
          <div className="space-y-3">
            {[
              { page: '/dashboard', views: 2345, time: '5:23' },
              { page: '/tests/new', views: 1892, time: '4:12' },
              { page: '/pricing', views: 1456, time: '3:45' },
              { page: '/about', views: 892, time: '2:34' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">{item.page}</p>
                  <p className="text-sm text-slate-500">Avg time: {item.time}</p>
                </div>
                <span className="text-sm font-semibold text-slate-800">{item.views} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Behavior */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">User Behavior Flow</h3>
        <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
          <p className="text-slate-500">Behavior flow visualization would go here</p>
        </div>
      </div>
    </div>
  )
}
