/**
 * NeuralCipher.ai - HIPAA Compliance Page
 * Modern, concise, and professional
 */
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiShield, FiLock, FiCheckCircle, FiMail, FiArrowLeft, FiServer, FiUsers, FiArrowRight, FiGlobe, FiHeart } from 'react-icons/fi'

export default function HIPAAPage() {
  return (
    <main className="min-h-screen modern-bg">
      {/* Ultra Modern Premium Navbar - Complete from Landing Page */}
      <nav className="navbar-modern fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#0A0E27]/90 border-b border-[#64FFDA]/20">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-8">
            {/* Modern Logo Section */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
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
                    {/* Center Node - Thicker for better visibility */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-[#64FFDA] shadow-lg shadow-[#64FFDA]/50"
                      style={{ transform: 'translate(-50%, -50%)' }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Outer Nodes - Thicker for better visibility */}
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
                    
                    {/* Connection Lines - Thicker for better visibility */}
                    <svg className="absolute inset-0 w-full h-full" style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}>
                      {[0, 72, 144, 216, 288].map((angle, i) => (
                        <motion.line
                          key={i}
                          x1="12"
                          y1="12"
                          x2={12 + Math.cos((angle * Math.PI) / 180) * 10}
                          y2={12 + Math.sin((angle * Math.PI) / 180) * 10}
                          stroke="url(#gradient)"
                          strokeWidth="0.8"
                          opacity="0.7"
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
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

              {/* Brand Name with Gradient */}
              <div className="flex flex-col">
                <h1 className="text-xl font-black tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-[#64FFDA] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                    Neural
                  </span>
                  <span className="bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#64FFDA] bg-clip-text text-transparent">
                    Cipher
                  </span>
                  <span className="text-[#64FFDA] opacity-60">.ai</span>
                </h1>
                <span className="text-[9px] text-gray-400 tracking-[0.2em] uppercase font-bold leading-none mt-0.5 opacity-90">
                  Early Detection AI
                </span>
              </div>
            </Link>
            
            {/* Navigation Links - Modern Style */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              <Link href="/" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Home
              </Link>
              <a href="/#features" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Features
              </a>
              <a href="/#science" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Science
              </a>
              <a href="/#doctors" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Doctors
              </a>
              <Link href="/pricing" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Pricing
              </Link>
              <a href="/#testimonials" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Reviews
              </a>
              <a href="/#faq" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                FAQ
              </a>
              <Link href="/contact" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Contact
              </Link>
            </div>
            
            {/* CTA Buttons - Ultra Modern */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link 
                href="/auth/login" 
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm text-white hover:text-[#64FFDA] transition-all duration-300 font-semibold rounded-lg hover:bg-white/5"
              >
                Sign In
              </Link>
              
              <Link 
                href="/auth/register" 
                className="relative group overflow-hidden"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#64FFDA] via-[#3B82F6] to-[#8B5CF6] rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#64FFDA] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Button Content */}
                <div className="relative flex items-center gap-1.5 px-5 py-2 text-white font-bold rounded-lg text-sm">
                  <FiShield className="text-sm" />
                  <span>Start Test</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight className="text-sm" />
                  </motion.div>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/30 mb-6">
              <FiShield className="text-[#64FFDA]" />
              <span className="text-sm text-[#64FFDA] font-semibold">Healthcare Compliance</span>
            </div>
            <h1 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                HIPAA Compliance
              </span>
            </h1>
            <p className="text-gray-400">Healthcare Data Protection Standards</p>
          </motion.div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 md:p-12 space-y-8"
          >
            {/* Introduction */}
            <div className="text-center">
              <p className="text-gray-300 leading-relaxed text-lg">
                NeuralCipher.ai maintains the highest standards of healthcare data protection in full 
                compliance with <strong className="text-white">HIPAA</strong> (Health Insurance Portability and Accountability Act).
              </p>
            </div>

            {/* Three Safeguard Categories */}
            <div className="space-y-6">
              {/* Administrative Safeguards */}
              <div className="bg-gradient-to-r from-[#64FFDA]/10 to-[#3B82F6]/10 border border-[#64FFDA]/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <FiUsers className="text-[#64FFDA] text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-[#64FFDA] mb-3">Administrative Safeguards</h3>
                    <ul className="text-gray-300 leading-relaxed space-y-2">
                      <li>• Security management and risk assessment</li>
                      <li>• Workforce security and HIPAA training</li>
                      <li>• Information access management</li>
                      <li>• Security incident procedures</li>
                      <li>• Business Associate Agreements (BAA)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Physical Safeguards */}
              <div className="bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-[#3B82F6]/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <FiServer className="text-[#3B82F6] text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-[#3B82F6] mb-3">Physical Safeguards</h3>
                    <ul className="text-gray-300 leading-relaxed space-y-2">
                      <li>• Secure data centers with restricted access</li>
                      <li>• Facility access controls and monitoring</li>
                      <li>• Workstation security policies</li>
                      <li>• Device and media controls</li>
                      <li>• Physical access restrictions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technical Safeguards */}
              <div className="bg-gradient-to-r from-[#8B5CF6]/10 to-[#64FFDA]/10 border border-[#8B5CF6]/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <FiLock className="text-[#8B5CF6] text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-[#8B5CF6] mb-3">Technical Safeguards</h3>
                    <ul className="text-gray-300 leading-relaxed space-y-2">
                      <li>• <strong>Encryption:</strong> TLS 1.3 in transit, AES-256 at rest</li>
                      <li>• <strong>Access Control:</strong> Unique user IDs, MFA, role-based access</li>
                      <li>• <strong>Audit Controls:</strong> Comprehensive logging and monitoring</li>
                      <li>• <strong>Authentication:</strong> Strong password policies, automatic logoff</li>
                      <li>• <strong>Integrity Controls:</strong> Data validation and checksums</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Protected Health Information */}
            <div className="flex items-start gap-4">
              <FiCheckCircle className="text-[#64FFDA] text-xl flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Protected Health Information (PHI)</h3>
                <p className="text-gray-300 leading-relaxed mb-2">
                  We protect all forms of PHI including:
                </p>
                <ul className="text-gray-300 leading-relaxed space-y-2">
                  <li>• Patient names and contact information</li>
                  <li>• Voice recordings and biometric data</li>
                  <li>• Health condition and diagnosis information</li>
                  <li>• Treatment and analysis results</li>
                  <li>• Medical record numbers</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className="flex items-start gap-4">
              <FiCheckCircle className="text-[#3B82F6] text-xl flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Your Rights Under HIPAA</h3>
                <ul className="text-gray-300 leading-relaxed space-y-2">
                  <li>• Access your Protected Health Information</li>
                  <li>• Request corrections to your PHI</li>
                  <li>• Receive accounting of disclosures</li>
                  <li>• Request restrictions on uses and disclosures</li>
                  <li>• Request confidential communications</li>
                  <li>• File a complaint if rights are violated</li>
                </ul>
              </div>
            </div>

            {/* Breach Notification */}
            <div className="flex items-start gap-4">
              <FiCheckCircle className="text-[#8B5CF6] text-xl flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Breach Notification</h3>
                <p className="text-gray-300 leading-relaxed">
                  In the unlikely event of a data breach, we will notify affected individuals within 
                  60 days and report to the Department of Health and Human Services (HHS) as required.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex items-center gap-3 text-gray-300">
                <FiMail className="text-[#64FFDA] text-xl" />
                <span>HIPAA questions? Contact our Privacy Officer at{' '}
                  <a href="mailto:privacy@neuralcipher.ai" className="text-[#64FFDA] hover:text-[#3B82F6] transition-colors">
                    privacy@neuralcipher.ai
                  </a>
                </span>
              </div>
            </div>

            {/* Related Links */}
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 mb-4">Related Policies:</p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/privacy" 
                  className="px-4 py-2 bg-[#64FFDA]/10 border border-[#64FFDA]/30 rounded-lg text-[#64FFDA] hover:bg-[#64FFDA]/20 transition-colors text-sm font-semibold"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/terms" 
                  className="px-4 py-2 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-lg text-[#3B82F6] hover:bg-[#3B82F6]/20 transition-colors text-sm font-semibold"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            {/* Back Link */}
            <div className="border-t border-gray-800 pt-8">
              <Link 
                href="/auth/register" 
                className="inline-flex items-center gap-2 text-[#64FFDA] hover:text-[#3B82F6] transition-colors font-semibold"
              >
                <FiArrowLeft />
                Back to Registration
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Complete Footer from Landing Page */}
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
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                  <FiMail className="text-gray-400" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                  <FiGlobe className="text-gray-400" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/#features" className="hover:text-[#64FFDA] transition-colors">Features</a></li>
                <li><a href="/#science" className="hover:text-[#64FFDA] transition-colors">Science</a></li>
                <li><Link href="/pricing" className="hover:text-[#64FFDA] transition-colors">Pricing</Link></li>
                <li><Link href="/auth/register" className="hover:text-[#64FFDA] transition-colors">Sign Up</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">For Professionals</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/#doctors" className="hover:text-[#64FFDA] transition-colors">For Doctors</a></li>
                <li><Link href="/auth/login" className="hover:text-[#64FFDA] transition-colors">Doctor Portal</Link></li>
                <li><Link href="/research" className="hover:text-[#64FFDA] transition-colors">Research</Link></li>
                <li><Link href="/trials" className="hover:text-[#64FFDA] transition-colors">Clinical Trials</Link></li>
                <li><Link href="/api-docs" className="hover:text-[#64FFDA] transition-colors">API Access</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-[#64FFDA] transition-colors">About Us</a></li>
                <li><Link href="/contact" className="hover:text-[#64FFDA] transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-[#64FFDA] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#64FFDA] transition-colors">Blog</a></li>
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
    </main>
  )
}
