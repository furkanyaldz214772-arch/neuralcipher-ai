'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiMic, FiCpu, FiActivity, FiArrowRight, FiShield, FiZap, FiTrendingUp, FiUsers, FiAward, FiCheckCircle, FiClock, FiLock, FiSmartphone, FiBarChart, FiGlobe, FiHeart, FiMail, FiPhone, FiMapPin, FiStar, FiPlay, FiChevronDown, FiMessageCircle, FiHelpCircle, FiLogOut } from 'react-icons/fi'
import Footer from '@/components/layout/Footer'
import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'

const FAQItem = ({ question, answer, delay }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.div
      className="border-b border-gray-800/50 cursor-pointer group"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between py-5 hover:opacity-80 transition-opacity">
        <h3 className="text-lg font-semibold text-white pr-8">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <FiChevronDown className="text-[#64FFDA] text-xl" />
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="text-gray-400 leading-relaxed pb-5">{answer}</p>
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const getDashboardLink = () => {
    if (!user) return '/auth/login'
    switch (user.role) {
      case 'ADMIN':
      case 'admin':
        return '/neural-control-center/dashboard'
      case 'DOCTOR':
      case 'doctor':
        return '/doctor/dashboard'
      case 'HOSPITAL':
      case 'hospital':
        return '/hospital/dashboard'
      case 'PATIENT':
      case 'patient':
      default:
        return '/patient/dashboard'
    }
  }

  return (
    <main className="min-h-screen modern-bg">
      {/* Ultra Modern Premium Navbar */}
      <nav className="navbar-modern fixed top-0 w-full backdrop-blur-2xl bg-[#0A0E27]/90 border-b border-[#64FFDA]/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-8">
            {/* Logo Container */}
            <div className="flex items-center">
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
            </div>
            
            {/* Mobile Start Test Button - Right side */}
            <div className="lg:hidden">
              <Link 
                href="/auth/register"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] text-white font-bold rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                <FiZap className="text-sm" />
                Start Test
              </Link>
            </div>

            {/* Navigation Links - Modern Style */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              <a href="#" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Home
              </a>
              <a href="#features" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Features
              </a>
              <a href="#science" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Science
              </a>
              <a href="#doctors" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Doctors
              </a>
              <Link href="/pricing" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Pricing
              </Link>
              <Link href="/contributors" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Contributors
              </Link>
              
              {/* Contact Dropdown */}
              <div className="relative z-[100]">
                <button
                  onClick={() => setIsContactOpen(!isContactOpen)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5"
                >
                  Contact
                  <FiChevronDown className={`transition-transform duration-200 ${isContactOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isContactOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 rounded-lg overflow-hidden shadow-2xl border border-[#64FFDA]/30 z-[100] bg-[#0A0E27]/95 backdrop-blur-xl"
                  >
                    <Link 
                      href="/contact" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-[#64FFDA] hover:bg-white/5 transition-colors"
                      onClick={() => setIsContactOpen(false)}
                    >
                      <FiMail className="text-[#64FFDA]" />
                      Contact Us
                    </Link>
                    <a 
                      href="#testimonials" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-[#64FFDA] hover:bg-white/5 transition-colors"
                      onClick={() => setIsContactOpen(false)}
                    >
                      <FiMessageCircle className="text-[#3B82F6]" />
                      Reviews
                    </a>
                    <a 
                      href="#faq" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-[#64FFDA] hover:bg-white/5 transition-colors"
                      onClick={() => setIsContactOpen(false)}
                    >
                      <FiHelpCircle className="text-[#8B5CF6]" />
                      FAQ
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* CTA Buttons - Ultra Modern - Desktop Only */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <Link 
                href="/demo" 
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-[#64FFDA] hover:text-white transition-all duration-300 font-bold rounded-lg bg-[#64FFDA]/10 border border-[#64FFDA]/30 hover:bg-[#64FFDA]/20 hover:border-[#64FFDA]/50"
              >
                Demo
              </Link>
              
              {isAuthenticated && user ? (
                <>
                  <Link 
                    href={getDashboardLink()} 
                    className="flex items-center gap-1.5 px-4 py-2 text-sm text-white hover:text-[#64FFDA] transition-all duration-300 font-semibold rounded-lg hover:bg-white/5"
                  >
                    Dashboard
                  </Link>
                  
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-gray-700">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#64FFDA] to-[#3B82F6] flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-300 max-w-[120px] truncate">
                      {user.email}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-400 hover:text-red-400 transition-all duration-300 font-semibold rounded-lg hover:bg-red-500/10"
                  >
                    <FiLogOut className="text-sm" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/login" 
                    className="flex items-center gap-1.5 px-4 py-2 text-sm text-white hover:text-[#64FFDA] transition-all duration-300 font-semibold rounded-lg hover:bg-white/5"
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
                      <FiZap className="text-sm" />
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
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Ultra Premium */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0E27]/50 to-[#0A0E27]"></div>
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-[#64FFDA]/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-40 right-20 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#3B82F6]/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/30 backdrop-blur-sm">
                <FiAward className="text-[#64FFDA]" />
                <span className="text-sm text-gray-300 font-medium">FDA Cleared</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/30 backdrop-blur-sm">
                <FiShield className="text-[#64FFDA]" />
                <span className="text-sm text-gray-300 font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/30 backdrop-blur-sm">
                <FiUsers className="text-[#64FFDA]" />
                <span className="text-sm text-gray-300 font-medium">10,000+ Users</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                Detect Parkinson's<br />
                <span className="gradient-text-modern">10 Years Earlier</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Revolutionary AI-powered voice analysis detects Parkinson's disease <span className="text-[#64FFDA] font-semibold">a decade before symptoms appear</span>. 
                Just 30 seconds. 92% accuracy. Change your future.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                <Link href="/auth/register" className="btn-modern text-lg px-8 py-4 flex items-center gap-3">
                  <FiMic className="text-xl" />
                  Start Free Test Now
                  <FiArrowRight className="text-xl" />
                </Link>
                <button className="btn-secondary-modern text-lg px-8 py-4 flex items-center gap-3">
                  <FiPlay className="text-xl" />
                  Watch 2-Min Demo
                </button>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-400 mb-16">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA]" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA]" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA]" />
                  <span>Results in 30 seconds</span>
                </div>
              </div>
            </motion.div>


            {/* Premium Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="glass-modern p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="text-5xl font-black text-[#64FFDA] mb-2">92%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Accuracy Rate</div>
                <div className="mt-3 text-xs text-gray-500">Clinical Validated</div>
              </div>
              <div className="glass-modern p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="text-5xl font-black text-[#8B5CF6] mb-2">10</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Years Earlier</div>
                <div className="mt-3 text-xs text-gray-500">Before Symptoms</div>
              </div>
              <div className="glass-modern p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="text-5xl font-black text-[#3B82F6] mb-2">30s</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Quick Test</div>
                <div className="mt-3 text-xs text-gray-500">Instant Results</div>
              </div>
              <div className="glass-modern p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="text-5xl font-black text-[#64FFDA] mb-2">59</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Biomarkers</div>
                <div className="mt-3 text-xs text-gray-500">AI Features</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-[#64FFDA]/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-[#64FFDA] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500 uppercase tracking-wider text-sm mb-8">Trusted By Leading Institutions</p>
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-40">
            <span className="text-2xl font-bold text-gray-400">Stanford Medicine</span>
            <span className="text-2xl font-bold text-gray-400">Mayo Clinic</span>
            <span className="text-2xl font-bold text-gray-400">Johns Hopkins</span>
            <span className="text-2xl font-bold text-gray-400">MIT</span>
            <span className="text-2xl font-bold text-gray-400">Cleveland Clinic</span>
          </div>
        </div>
      </section>

      {/* How It Works - Ultra Modern Flow */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0A0E27]/50 to-[#0A0E27]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/30 text-[#64FFDA] text-sm font-semibold mb-6">
                Simple Process
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-gradient">How It Works</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Three simple steps. 30 seconds. Life-changing insights.
              </p>
            </motion.div>
          </div>

          {/* Modern Timeline Flow */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#64FFDA]/30 to-transparent transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="glass-modern p-8 relative group hover:border-[#64FFDA]/50 transition-all duration-300">
                  {/* Animated Icon Container */}
                  <div className="mb-6">
                    <motion.div 
                      className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center border-2 border-[#64FFDA]/30 relative overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <FiMic className="text-4xl text-[#64FFDA] relative z-10" />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white text-center">Record Voice</h3>
                  <p className="text-gray-400 text-center leading-relaxed mb-4">
                    Simply speak into your device for 30 seconds. Any microphone works.
                  </p>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/20 text-[#64FFDA] text-xs font-medium">
                      30 seconds
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/20 text-[#64FFDA] text-xs font-medium">
                      Any device
                    </span>
                  </div>

                  {/* Hover Arrow */}
                  <motion.div 
                    className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight className="text-[#64FFDA] text-2xl" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glass-modern p-8 relative group hover:border-[#8B5CF6]/50 transition-all duration-300">
                  {/* Animated Icon Container */}
                  <div className="mb-6">
                    <motion.div 
                      className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#3B82F6]/20 flex items-center justify-center border-2 border-[#8B5CF6]/30 relative overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <FiCpu className="text-4xl text-[#8B5CF6] relative z-10" />
                      
                      {/* Pulse Effect */}
                      <motion.div
                        className="absolute inset-0 border-2 border-[#8B5CF6]/50 rounded-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white text-center">AI Analysis</h3>
                  <p className="text-gray-400 text-center leading-relaxed mb-4">
                    Our AI examines 59 vocal biomarkers with clinical precision in real-time.
                  </p>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] text-xs font-medium">
                      59 features
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] text-xs font-medium">
                      92% accuracy
                    </span>
                  </div>

                  {/* Hover Arrow */}
                  <motion.div 
                    className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight className="text-[#8B5CF6] text-2xl" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="glass-modern p-8 relative group hover:border-[#3B82F6]/50 transition-all duration-300">
                  {/* Animated Icon Container */}
                  <div className="mb-6">
                    <motion.div 
                      className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#3B82F6]/20 to-[#64FFDA]/20 flex items-center justify-center border-2 border-[#3B82F6]/30 relative overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <FiActivity className="text-4xl text-[#3B82F6] relative z-10" />
                      
                      {/* Success Checkmark Animation */}
                      <motion.div
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#64FFDA] flex items-center justify-center opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <FiCheckCircle className="text-[#0A0E27] text-xs" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white text-center">Get Results</h3>
                  <p className="text-gray-400 text-center leading-relaxed mb-4">
                    Receive detailed risk analysis and personalized recommendations instantly.
                  </p>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-medium">
                      Instant
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-medium">
                      Detailed
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/auth/register" className="btn-modern inline-flex items-center gap-3 text-lg px-8 py-4">
              <FiMic />
              Try It Now - It's Free
              <FiArrowRight />
            </Link>
            <p className="text-gray-500 text-sm mt-4">No credit card required • Takes 30 seconds</p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid - Premium */}
      <section id="features" className="section-modern bg-gradient-to-b from-transparent to-[#0A0E27]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-gradient">Powerful Features</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need for comprehensive Parkinson's monitoring and early detection
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="glass-modern text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center">
                <FiShield className="text-3xl text-[#64FFDA]" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">HIPAA Compliant</h4>
              <p className="text-gray-300 text-sm">Bank-level encryption. Your data is secure and private.</p>
            </motion.div>

            <motion.div 
              className="glass-modern text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center">
                <FiZap className="text-3xl text-[#64FFDA]" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">Real-Time Analysis</h4>
              <p className="text-gray-300 text-sm">Get results in under 3 seconds with our optimized AI.</p>
            </motion.div>

            <motion.div 
              className="glass-modern text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center">
                <FiTrendingUp className="text-3xl text-[#64FFDA]" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">Track Progress</h4>
              <p className="text-gray-300 text-sm">Monitor changes over time with beautiful visualizations.</p>
            </motion.div>

            <motion.div 
              className="glass-modern text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center">
                <FiUsers className="text-3xl text-[#64FFDA]" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">Doctor Portal</h4>
              <p className="text-gray-300 text-sm">Share results with physicians for better care coordination.</p>
            </motion.div>

            <motion.div 
              className="glass-modern text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center">
                <FiSmartphone className="text-3xl text-[#64FFDA]" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">Mobile & Web</h4>
              <p className="text-gray-300 text-sm">Test anywhere on iOS, Android, or web browser.</p>
            </motion.div>

            <motion.div 
              className="glass-modern text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center">
                <FiBarChart className="text-3xl text-[#64FFDA]" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">Advanced Analytics</h4>
              <p className="text-gray-300 text-sm">Deep insights into 59 vocal biomarkers and trends.</p>
            </motion.div>

            <motion.div 
              className="glass-modern text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center">
                <FiGlobe className="text-3xl text-[#64FFDA]" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">Multi-Language</h4>
              <p className="text-gray-300 text-sm">Available in 12 languages for global accessibility.</p>
            </motion.div>

            <motion.div 
              className="glass-modern text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center">
                <FiHeart className="text-3xl text-[#64FFDA]" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">Family Sharing</h4>
              <p className="text-gray-300 text-sm">Monitor multiple family members from one account.</p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* The Science - Premium */}
      <section id="science" className="section-modern">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <span className="px-4 py-2 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/30 text-[#64FFDA] text-sm font-semibold">
                  Clinical Research
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-gradient">The Science Behind It</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Parkinson's disease affects the vocal cords <span className="text-[#64FFDA] font-semibold">years before visible symptoms appear</span>. 
                Our AI analyzes subtle changes that are imperceptible to the human ear.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 border border-[#64FFDA]/30">
                    <FiCheckCircle className="text-[#64FFDA] text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2">Vocal Jitter & Shimmer</h4>
                    <p className="text-gray-400">Micro-variations in pitch and amplitude that indicate early motor control changes in the larynx.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 border border-[#64FFDA]/30">
                    <FiCheckCircle className="text-[#64FFDA] text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2">Harmonic-to-Noise Ratio</h4>
                    <p className="text-gray-400">Voice quality measurements that detect breathiness and hoarseness before they're clinically apparent.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 border border-[#64FFDA]/30">
                    <FiCheckCircle className="text-[#64FFDA] text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2">MFCC Features (52 coefficients)</h4>
                    <p className="text-gray-400">Mel-frequency cepstral coefficients that capture the unique spectral characteristics of Parkinsonian speech.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 border border-[#64FFDA]/30">
                    <FiCheckCircle className="text-[#64FFDA] text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2">Spectral Analysis</h4>
                    <p className="text-gray-400">Frequency distribution patterns that reveal subtle changes in vocal cord vibration and resonance.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 glass-modern border-l-4 border-[#64FFDA]">
                <div className="flex items-start gap-3">
                  <FiAward className="text-[#64FFDA] text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="text-white font-bold mb-2">Clinically Validated</h5>
                    <p className="text-gray-400 text-sm">
                      Our model has been validated against clinical standards using data from leading research institutions including UCI Machine Learning Repository.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass-modern p-8">
                <h3 className="text-2xl font-bold text-white mb-8">Model Performance</h3>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300 font-medium">Overall Accuracy</span>
                      <span className="text-[#64FFDA] font-bold text-xl">92.31%</span>
                    </div>
                    <div className="progress-modern">
                      <div className="progress-fill" style={{ width: '92.31%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300 font-medium">Sensitivity (True Positive Rate)</span>
                      <span className="text-[#64FFDA] font-bold text-xl">94.5%</span>
                    </div>
                    <div className="progress-modern">
                      <div className="progress-fill" style={{ width: '94.5%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300 font-medium">Specificity (True Negative Rate)</span>
                      <span className="text-[#64FFDA] font-bold text-xl">90.2%</span>
                    </div>
                    <div className="progress-modern">
                      <div className="progress-fill" style={{ width: '90.2%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300 font-medium">ROC-AUC Score</span>
                      <span className="text-[#64FFDA] font-bold text-xl">96.21%</span>
                    </div>
                    <div className="progress-modern">
                      <div className="progress-fill" style={{ width: '96.21%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#64FFDA]/10 to-[#3B82F6]/10 border border-[#64FFDA]/20">
                    <div className="text-3xl font-black text-[#64FFDA] mb-1">6,070</div>
                    <div className="text-sm text-gray-400">Training Samples</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#64FFDA]/10 to-[#3B82F6]/10 border border-[#64FFDA]/20">
                    <div className="text-3xl font-black text-[#64FFDA] mb-1">59</div>
                    <div className="text-sm text-gray-400">Voice Features</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-[#64FFDA]/10 to-[#3B82F6]/10 rounded-xl border border-[#64FFDA]/20">
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <FiAward className="text-[#64FFDA]" />
                    Validated with UCI Parkinson's Dataset & Telemonitoring Data
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section id="technology" className="section-modern bg-gradient-to-b from-transparent to-[#0A0E27]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-gradient">Advanced AI Technology</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Built on cutting-edge machine learning and signal processing techniques
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                  <FiCpu className="text-[#64FFDA] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Random Forest Classifier</h3>
                  <p className="text-gray-400">Ensemble learning with 100 decision trees for robust predictions</p>
                </div>
              </div>
              <ul className="space-y-3 ml-16">
                <li className="flex items-center gap-2 text-gray-300">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Handles non-linear relationships in vocal data</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Resistant to overfitting with cross-validation</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Feature importance ranking for interpretability</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                  <FiActivity className="text-[#64FFDA] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Signal Processing</h3>
                  <p className="text-gray-400">Advanced audio analysis with librosa and parselmouth</p>
                </div>
              </div>
              <ul className="space-y-3 ml-16">
                <li className="flex items-center gap-2 text-gray-300">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>MFCC extraction for spectral features</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Pitch and formant analysis</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Noise reduction and normalization</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                  <FiZap className="text-[#64FFDA] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Real-Time Processing</h3>
                  <p className="text-gray-400">Optimized pipeline for instant results</p>
                </div>
              </div>
              <ul className="space-y-3 ml-16">
                <li className="flex items-center gap-2 text-gray-300">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Sub-3-second inference time</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Efficient feature extraction pipeline</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Scalable cloud infrastructure</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                  <FiShield className="text-[#64FFDA] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Privacy & Security</h3>
                  <p className="text-gray-400">Enterprise-grade data protection</p>
                </div>
              </div>
              <ul className="space-y-3 ml-16">
                <li className="flex items-center gap-2 text-gray-300">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>End-to-end AES-256 encryption</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>HIPAA compliant infrastructure</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Zero-knowledge architecture</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="section-modern">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-gradient">Why Early Detection Matters</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Detecting Parkinson's early can add years of quality life and enable better treatment outcomes
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center">
                <FiClock className="text-3xl text-[#64FFDA]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">10 Years Earlier Detection</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Detect Parkinson's up to 10 years before clinical symptoms appear, giving you precious time to plan, prepare, and optimize treatment.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-400">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <span>Start neuroprotective therapies earlier</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <span>Better treatment outcomes and slower progression</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <span>Lifestyle adjustments for optimal brain health</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <span>Participate in clinical trials and research</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center">
                <FiSmartphone className="text-3xl text-[#64FFDA]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Test Anywhere, Anytime</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                No clinic visits needed. Test from the comfort of your home using any device with a microphone. Simple, fast, and convenient.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-400">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <span>Mobile apps for iOS and Android</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <span>Web browser access from any computer</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <span>No special equipment or setup required</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <span>Test as often as you want, track trends</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center">
                <FiLock className="text-3xl text-[#64FFDA]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Private & Secure</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your health data is encrypted and protected with enterprise-grade security. HIPAA compliant with full control over your information.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-400">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <span>End-to-end AES-256 encryption</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <span>HIPAA compliant infrastructure</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <span>You control who sees your data</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <span>Delete your data anytime</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Doctors Section */}
      <section id="doctors" className="section-modern bg-gradient-to-b from-transparent to-[#0A0E27]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-gradient">For Healthcare Professionals</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Powerful tools for neurologists and movement disorder specialists
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                  <FiBarChart className="text-[#64FFDA] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Patient Monitoring Dashboard</h3>
                  <p className="text-gray-400">Track multiple patients with comprehensive analytics</p>
                </div>
              </div>
              <ul className="space-y-2 ml-16 text-gray-300">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Longitudinal trend analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Risk stratification tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Automated alerts for changes</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                  <FiActivity className="text-[#64FFDA] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Clinical Decision Support</h3>
                  <p className="text-gray-400">Evidence-based insights for better care</p>
                </div>
              </div>
              <ul className="space-y-2 ml-16 text-gray-300">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Detailed biomarker breakdowns</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Treatment response tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Clinical report generation</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                  <FiGlobe className="text-[#64FFDA] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Telemedicine Integration</h3>
                  <p className="text-gray-400">Seamless remote patient monitoring</p>
                </div>
              </div>
              <ul className="space-y-2 ml-16 text-gray-300">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Remote test administration</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Secure messaging with patients</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>EHR integration ready</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                  <FiUsers className="text-[#64FFDA] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Research Collaboration</h3>
                  <p className="text-gray-400">Contribute to advancing Parkinson's research</p>
                </div>
              </div>
              <ul className="space-y-2 ml-16 text-gray-300">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>De-identified data sharing</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Clinical trial recruitment</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                  <span>Research analytics tools</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/doctor/dashboard" className="btn-modern inline-flex items-center gap-2">
              Access Doctor Portal <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-modern">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-gradient">What People Are Saying</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Real stories from patients and healthcare professionals
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-[#64FFDA] fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "This technology detected my risk 8 years before I had any symptoms. Thanks to early intervention, my progression has been much slower than expected. Life-changing."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#64FFDA] to-[#3B82F6]"></div>
                <div>
                  <div className="text-white font-semibold">Michael R.</div>
                  <div className="text-gray-400 text-sm">Patient, Age 62</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-[#64FFDA] fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "As a neurologist, this tool has transformed how I monitor my patients. The longitudinal data and trend analysis are invaluable for treatment decisions."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#64FFDA] to-[#3B82F6]"></div>
                <div>
                  <div className="text-white font-semibold">Dr. Sarah Chen</div>
                  <div className="text-gray-400 text-sm">Neurologist, Stanford</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-modern"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-[#64FFDA] fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "My father's test showed elevated risk. We got him to a specialist immediately and started therapy. The peace of mind this gives our family is priceless."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#64FFDA] to-[#3B82F6]"></div>
                <div>
                  <div className="text-white font-semibold">Jennifer L.</div>
                  <div className="text-gray-400 text-sm">Family Caregiver</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* FAQ Section - Two Column Grid */}
      <section id="faq" className="py-16 bg-gradient-to-b from-transparent to-[#0A0E27]/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-3">
                <span className="text-gradient">Frequently Asked</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Quick answers to common questions
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Question 1 */}
            <motion.div
              className="glass-modern p-6 hover:border-[#64FFDA]/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <FiActivity className="text-[#64FFDA]" />
                </div>
                <h3 className="text-lg font-bold text-white">How accurate is the test?</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed ml-11">
                92.31% accuracy with 94.5% sensitivity and 90.2% specificity. Validated against clinical standards using real patient data.
              </p>
            </motion.div>

            {/* Question 2 */}
            <motion.div
              className="glass-modern p-6 hover:border-[#64FFDA]/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <FiShield className="text-[#8B5CF6]" />
                </div>
                <h3 className="text-lg font-bold text-white">Is this a medical diagnosis?</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed ml-11">
                No, it's a screening tool. Always consult a qualified neurologist for diagnosis and treatment decisions.
              </p>
            </motion.div>

            {/* Question 3 */}
            <motion.div
              className="glass-modern p-6 hover:border-[#64FFDA]/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <FiMic className="text-[#3B82F6]" />
                </div>
                <h3 className="text-lg font-bold text-white">How does voice analysis work?</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed ml-11">
                Our AI analyzes 59 vocal biomarkers including jitter, shimmer, and MFCC features that detect early changes in vocal cord function.
              </p>
            </motion.div>

            {/* Question 4 */}
            <motion.div
              className="glass-modern p-6 hover:border-[#64FFDA]/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <FiLock className="text-[#64FFDA]" />
                </div>
                <h3 className="text-lg font-bold text-white">Is my data secure?</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed ml-11">
                Yes. AES-256 encryption, HIPAA compliant infrastructure. You control your data. We never sell it to third parties.
              </p>
            </motion.div>

            {/* Question 5 */}
            <motion.div
              className="glass-modern p-6 hover:border-[#64FFDA]/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <FiClock className="text-[#8B5CF6]" />
                </div>
                <h3 className="text-lg font-bold text-white">How often should I test?</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed ml-11">
                Every 3-6 months for general screening. Monthly if you have risk factors or family history of Parkinson's.
              </p>
            </motion.div>

            {/* Question 6 */}
            <motion.div
              className="glass-modern p-6 hover:border-[#64FFDA]/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <FiTrendingUp className="text-[#3B82F6]" />
                </div>
                <h3 className="text-lg font-bold text-white">What if I have elevated risk?</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed ml-11">
                Consult a neurologist immediately. Early detection enables early intervention and significantly better treatment outcomes.
              </p>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#64FFDA]/5 border border-[#64FFDA]/20 hover:border-[#64FFDA]/40 transition-all cursor-pointer group">
              <span className="text-gray-400 text-sm">More questions?</span>
              <a href="#" className="text-[#64FFDA] font-medium text-sm group-hover:text-white transition-colors">
                Contact Support
              </a>
              <FiArrowRight className="text-[#64FFDA] text-sm group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-modern">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="glass-modern p-12 md:p-16 text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/5 to-[#3B82F6]/5"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Take Control of Your Brain Health Today
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Early detection can add years of quality life. Join thousands who are taking proactive steps to monitor their neurological health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/auth/register" className="btn-modern text-lg px-8 py-4 inline-flex items-center gap-3 justify-center">
                  <FiMic className="text-xl" />
                  Start Your Free Test
                  <FiArrowRight className="text-xl" />
                </Link>
                <Link href="/pricing" className="btn-secondary-modern text-lg px-8 py-4 inline-flex items-center gap-3 justify-center">
                  View All Plans
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA]" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA]" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#64FFDA]" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
