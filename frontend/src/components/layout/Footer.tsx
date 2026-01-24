'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiMail, FiGlobe } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* Neural Network Logo Icon */}
              <motion.div 
                className="relative w-10 h-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {/* Outer Glow Ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#64FFDA] to-[#8B5CF6] opacity-20 blur-xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Main Logo Container */}
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0A0E27] to-[#1a1f3a] flex items-center justify-center border border-[#64FFDA]/40 overflow-hidden">
                  {/* Animated Background Grid */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(#64FFDA 1px, transparent 1px), linear-gradient(90deg, #64FFDA 1px, transparent 1px)',
                      backgroundSize: '8px 8px'
                    }}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* Neural Network Icon - Custom Design */}
                  <div className="relative z-10 w-6 h-6">
                    {/* Center Node */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-[#64FFDA] shadow-lg shadow-[#64FFDA]/50"
                      style={{ transform: 'translate(-50%, -50%)' }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Outer Nodes */}
                    {[0, 72, 144, 216, 288].map((angle, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-[#64FFDA] to-[#3B82F6]"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-10px)`
                        }}
                        animate={{ 
                          scale: [0.8, 1.2, 0.8],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                    
                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full" style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}>
                      {[0, 72, 144, 216, 288].map((angle, i) => (
                        <motion.line
                          key={i}
                          x1="12"
                          y1="12"
                          x2={12 + Math.cos((angle * Math.PI) / 180) * 10}
                          y2={12 + Math.sin((angle * Math.PI) / 180) * 10}
                          stroke="url(#gradient-footer)"
                          strokeWidth="0.8"
                          opacity="0.7"
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                      <defs>
                        <linearGradient id="gradient-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#64FFDA" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold text-gradient">NeuralCipher.ai</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              AI-powered voice analysis for early Parkinson's detection. Empowering individuals and healthcare professionals with cutting-edge technology.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:info@neuralcipher.ai" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                <FiMail className="text-gray-400" />
              </a>
              <Link href="/" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                <FiGlobe className="text-gray-400" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/#features" className="hover:text-[#64FFDA] transition-colors">Features</Link></li>
              <li><Link href="/#science" className="hover:text-[#64FFDA] transition-colors">Science</Link></li>
              <li><Link href="/pricing" className="hover:text-[#64FFDA] transition-colors">Pricing</Link></li>
              <li><Link href="/auth/register" className="hover:text-[#64FFDA] transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">For Professionals</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/#doctors" className="hover:text-[#64FFDA] transition-colors">For Doctors</Link></li>
              <li><Link href="/auth/login" className="hover:text-[#64FFDA] transition-colors">Doctor Portal</Link></li>
              <li><Link href="/research" className="hover:text-[#64FFDA] transition-colors">Research</Link></li>
              <li><Link href="/trials" className="hover:text-[#64FFDA] transition-colors">Clinical Trials</Link></li>
              <li><Link href="/api-docs" className="hover:text-[#64FFDA] transition-colors">API Access</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/about" className="hover:text-[#64FFDA] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#64FFDA] transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-[#64FFDA] transition-colors">Careers</Link></li>
              <li><Link href="/#blog" className="hover:text-[#64FFDA] transition-colors">Blog</Link></li>
              <li><Link href="/press" className="hover:text-[#64FFDA] transition-colors">Press Kit</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; 2026 NeuralCipher.ai - All rights reserved.</p>
              <p className="mt-1">Not a medical device. For screening purposes only. Consult a healthcare provider for diagnosis.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-[#64FFDA] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#64FFDA] transition-colors">Terms of Service</Link>
              <Link href="/hipaa" className="hover:text-[#64FFDA] transition-colors">HIPAA Compliance</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
