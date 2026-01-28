'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'

interface Note {
  id: string
  patient_id: string
  content: string
  category: 'diagnosis' | 'treatment' | 'follow-up' | 'general'
  is_private: boolean
  created_at: string
  updated_at: string
}

interface PatientNotesProps {
  patientId: string
}

export default function PatientNotes({ patientId }: PatientNotesProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showNewNote, setShowNewNote] = useState(false)
  const [newNote, setNewNote] = useState({
    content: '',
    category: 'general' as Note['category'],
    is_private: false
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [patientId])

  const fetchNotes = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await api.get(`/api/v1/doctor/notes/${patientId}`)
      setNotes(response.data.notes || [])
    } catch (err: any) {
      console.error('Error fetching notes:', err)
      setError(err.response?.data?.detail || 'Failed to load notes')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNote = async () => {
    if (!newNote.content.trim()) {
      setError('Note content is required')
      return
    }

    try {
      setSaving(true)
      setError('')
      await api.post(`/api/v1/doctor/notes/${patientId}`, newNote)
      setNewNote({ content: '', category: 'general', is_private: false })
      setShowNewNote(false)
      fetchNotes()
    } catch (err: any) {
      console.error('Error saving note:', err)
      setError(err.response?.data?.detail || 'Failed to save note')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return

    try {
      await api.delete(`/api/v1/doctor/notes/${noteId}`)
      fetchNotes()
    } catch (err: any) {
      console.error('Error deleting note:', err)
      setError(err.response?.data?.detail || 'Failed to delete note')
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'diagnosis': return 'text-red-400 bg-red-400/10'
      case 'treatment': return 'text-green-400 bg-green-400/10'
      case 'follow-up': return 'text-blue-400 bg-blue-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'diagnosis': return '🔍'
      case 'treatment': return '💊'
      case 'follow-up': return '🔄'
      default: return '📝'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* New Note Button */}
      {!showNewNote && (
        <button
          onClick={() => setShowNewNote(true)}
          className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          ➕ Add New Note
        </button>
      )}

      {/* New Note Form */}
      {showNewNote && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">New Note</h3>
          
          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {(['general', 'diagnosis', 'treatment', 'follow-up'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setNewNote({ ...newNote, category: cat })}
                  className={`px-3 py-2 rounded-lg capitalize text-sm transition-all ${
                    newNote.category === cat
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {getCategoryIcon(cat)} {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Note Content</label>
            <textarea
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              placeholder="Enter your note here..."
              rows={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Private Checkbox */}
          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newNote.is_private}
                onChange={(e) => setNewNote({ ...newNote, is_private: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-400">🔒 Private note (only visible to you)</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSaveNote}
              disabled={saving}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : '💾 Save Note'}
            </button>
            <button
              onClick={() => {
                setShowNewNote(false)
                setNewNote({ content: '', category: 'general', is_private: false })
              }}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-white mb-2">No notes yet</h3>
          <p className="text-gray-400">Add your first note to start tracking patient information</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(note.category)}`}>
                    {getCategoryIcon(note.category)} {note.category}
                  </span>
                  {note.is_private && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium text-yellow-400 bg-yellow-400/10">
                      🔒 Private
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  🗑️
                </button>
              </div>
              
              <p className="text-white whitespace-pre-wrap mb-3">{note.content}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>📅 {new Date(note.created_at).toLocaleDateString()}</span>
                <span>🕐 {new Date(note.created_at).toLocaleTimeString()}</span>
                {note.updated_at !== note.created_at && (
                  <span>✏️ Updated {new Date(note.updated_at).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
