'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neural-blue">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-16 h-16 border-4 border-bio-cyan border-t-transparent rounded-full animate-spin mb-4" />
        <motion.p
          className="text-bio-cyan font-semibold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Yükleniyor...
        </motion.p>
      </motion.div>
    </div>
  )
}
