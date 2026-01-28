'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Camera, Loader2, Trash2, Check } from 'lucide-react'
import Image from 'next/image'

interface ProfilePhotoUploadProps {
  currentPhotoUrl: string | null
  onUpload: (file: File) => Promise<void>
  onDelete: () => Promise<void>
  isUploading: boolean
}

export default function ProfilePhotoUpload({
  currentPhotoUrl,
  onUpload,
  onDelete,
  isUploading
}: ProfilePhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Validate file
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file format. Allowed formats: JPG, PNG, WebP'
      }
    }

    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size exceeds 5MB limit'
      }
    }

    return { valid: true }
  }

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    setError(null)
    
    const validation = validateFile(file)
    if (!validation.valid) {
      setError(validation.error!)
      return
    }

    setSelectedFile(file)
    
    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      setError(null)
      await onUpload(selectedFile)
      
      // Show success message
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      
      // Clear preview
      setPreviewUrl(null)
      setSelectedFile(null)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to upload photo')
    }
  }

  // Handle delete
  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      setError(null)
      await onDelete()
      
      // Show success message
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete photo')
    } finally {
      setIsDeleting(false)
    }
  }

  // Cancel preview
  const handleCancel = () => {
    setPreviewUrl(null)
    setSelectedFile(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {/* Current Photo Display */}
      {currentPhotoUrl && !previewUrl && (
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#0EA5E9]">
            <Image
              src={currentPhotoUrl}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-white font-medium mb-2">Current Profile Photo</p>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete Photo
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Preview */}
      {previewUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="flex items-center gap-4 p-4 bg-[#0F172A] border border-gray-700 rounded-xl">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#0EA5E9]">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Preview</p>
              <p className="text-gray-400 text-sm">{selectedFile?.name}</p>
              <p className="text-gray-500 text-xs">
                {selectedFile && (selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          
          {/* Upload Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full mt-4 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                Upload Photo
              </>
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Upload Area */}
      {!previewUrl && (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#0EA5E9] bg-[#0EA5E9]/10'
              : 'border-gray-700 hover:border-gray-600 bg-[#0F172A]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileInputChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-full ${
              isDragging ? 'bg-[#0EA5E9]/20' : 'bg-gray-700/50'
            }`}>
              <Camera className={`h-8 w-8 ${
                isDragging ? 'text-[#0EA5E9]' : 'text-gray-400'
              }`} />
            </div>
            
            <div>
              <p className="text-white font-medium mb-1">
                {isDragging ? 'Drop your photo here' : 'Upload Profile Photo'}
              </p>
              <p className="text-gray-400 text-sm">
                Drag and drop or click to browse
              </p>
              <p className="text-gray-500 text-xs mt-2">
                JPG, PNG, WebP • Max 5MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
          >
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-2"
          >
            <Check className="h-5 w-5 text-green-400" />
            <p className="text-green-400 text-sm">Success! Photo updated.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
