'use client'

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Content Management</h1>
          <p className="text-slate-600 mt-1">Manage website content and blog posts</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
          + New Post
        </button>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">🏠</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Landing Page</h3>
          <p className="text-sm text-slate-400 mb-4">Edit hero, features, testimonials</p>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">Edit →</button>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Blog Posts</h3>
          <p className="text-sm text-slate-400 mb-4">Manage blog articles</p>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">Manage →</button>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">📄</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Pages</h3>
          <p className="text-sm text-slate-400 mb-4">About, Contact, Terms, Privacy</p>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">Edit →</button>
        </div>
      </div>

      {/* Recent Blog Posts */}
      <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Blog Posts</h3>
        <div className="space-y-3">
          {[
            { title: 'Understanding Parkinson\'s Disease', author: 'Admin', date: '2026-01-28', status: 'Published' },
            { title: 'AI in Healthcare: The Future', author: 'Admin', date: '2026-01-25', status: 'Published' },
            { title: 'How Voice Analysis Works', author: 'Admin', date: '2026-01-20', status: 'Draft' },
          ].map((post, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
              <div>
                <p className="font-medium text-white">{post.title}</p>
                <p className="text-sm text-slate-300">{post.author} • {post.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {post.status}
                </span>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
