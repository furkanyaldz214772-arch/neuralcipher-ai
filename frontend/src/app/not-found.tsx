'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiHome } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neural-blue px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          className="text-9xl font-bold gradient-text mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          404
        </motion.div>
        <h1 className="font-heading text-4xl font-bold mb-4">
          Sayfa Bulunamadı
        </h1>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center space-x-2">
          <FiHome />
          <span>Ana Sayfaya Dön</span>
        </Link>
      </motion.div>
    </div>
  )
}
