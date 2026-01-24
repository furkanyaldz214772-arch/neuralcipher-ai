'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiArrowRight, FiArrowLeft, FiUsers, FiCalendar, FiMapPin, FiCheckCircle, FiClock, FiActivity, FiTrendingUp, FiAward, FiShield, FiHeart, FiMail, FiPhone, FiFileText, FiDownload, FiAlertCircle, FiInfo, FiTarget, FiBarChart, FiDatabase, FiGlobe, FiZap, FiChevronDown, FiMessageCircle, FiHelpCircle } from 'react-icons/fi'
import Footer from '@/components/layout/Footer'

export default function ClinicalTrialsPage() {
  const [selectedPhase, setSelectedPhase] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <main className="min-h-screen modern-bg">
      {/* Navigation Header */}
      <nav className="navbar-modern fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#0A0E27]/90 border-b border-[#64FFDA]/20">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-8">
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <motion.div 
                className="relative w-10 h-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#64FFDA] to-[#8B5CF6] opacity-20 blur-xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0A0E27] to-[#1a1f3a] flex items-center justify-center border border-[#64FFDA]/40 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(#64FFDA 1px, transparent 1px), linear-gradient(90deg, #64FFDA 1px, transparent 1px)',
                      backgroundSize: '8px 8px'
                    }}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="relative z-10 w-6 h-6">
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-[#64FFDA] shadow-lg shadow-[#64FFDA]/50"
                      style={{ transform: 'translate(-50%, -50%)' }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
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
                  </div>
                </div>
              </motion.div>
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
            
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              <Link href="/" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Home
              </Link>
              <Link href="/research" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Research
              </Link>
              <Link href="/trials" className="px-3 py-2 text-sm text-[#64FFDA] transition-colors font-medium rounded-lg bg-white/5">
                Clinical Trials
              </Link>
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
                    <Link 
                      href="/contact#reviews" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-[#64FFDA] hover:bg-white/5 transition-colors"
                      onClick={() => setIsContactOpen(false)}
                    >
                      <FiMessageCircle className="text-[#3B82F6]" />
                      Reviews
                    </Link>
                    <Link 
                      href="/contact#faq" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-[#64FFDA] hover:bg-white/5 transition-colors"
                      onClick={() => setIsContactOpen(false)}
                    >
                      <FiHelpCircle className="text-[#8B5CF6]" />
                      FAQ
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
            
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
                <div className="absolute inset-0 bg-gradient-to-r from-[#64FFDA] via-[#3B82F6] to-[#8B5CF6] rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#64FFDA] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center gap-1.5 px-5 py-2 text-white font-bold rounded-lg text-sm">
                  <span>Join Trial</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight className="text-sm" />
                  </motion.div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
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
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/30 mb-6">
                <FiUsers className="text-[#64FFDA]" />
                <span className="text-sm text-[#64FFDA] font-semibold">Recruiting Now</span>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                  Clinical Trials
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join groundbreaking research to advance early Parkinson's detection. Your participation helps millions worldwide.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <a href="#active-trials" className="btn-modern text-lg px-8 py-4 flex items-center gap-3">
                  <FiUsers className="text-xl" />
                  View Active Trials
                  <FiArrowRight className="text-xl" />
                </a>
                <a href="#eligibility" className="btn-secondary-modern text-lg px-8 py-4 flex items-center gap-3">
                  <FiCheckCircle className="text-xl" />
                  Check Eligibility
                </a>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-modern p-6 text-center">
                <div className="text-5xl font-black text-[#64FFDA] mb-2">8</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Active Trials</div>
              </div>
              <div className="glass-modern p-6 text-center">
                <div className="text-5xl font-black text-[#8B5CF6] mb-2">3,500+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Participants</div>
              </div>
              <div className="glass-modern p-6 text-center">
                <div className="text-5xl font-black text-[#3B82F6] mb-2">15</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Countries</div>
              </div>
              <div className="glass-modern p-6 text-center">
                <div className="text-5xl font-black text-[#64FFDA] mb-2">92%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Participate */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                Why Participate?
              </span>
            </h2>
            <p className="text-xl text-gray-300">Make a difference while receiving world-class care</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FiHeart,
                title: "Help Others",
                description: "Your participation directly contributes to developing better early detection methods that could help millions of people worldwide.",
                color: "#64FFDA"
              },
              {
                icon: FiShield,
                title: "Expert Care",
                description: "Receive comprehensive monitoring and care from leading neurologists and movement disorder specialists throughout the study.",
                color: "#3B82F6"
              },
              {
                icon: FiActivity,
                title: "Early Detection",
                description: "Get access to cutting-edge screening technology that can detect Parkinson's up to 10 years before traditional diagnosis.",
                color: "#8B5CF6"
              },
              {
                icon: FiAward,
                title: "No Cost",
                description: "All study-related tests, assessments, and monitoring are provided at no cost to participants. Travel compensation available.",
                color: "#64FFDA"
              },
              {
                icon: FiTrendingUp,
                title: "Track Progress",
                description: "Receive detailed reports on your vocal biomarkers and health metrics throughout the study period with quarterly updates.",
                color: "#3B82F6"
              },
              {
                icon: FiUsers,
                title: "Community",
                description: "Join a supportive community of participants and researchers dedicated to advancing Parkinson's research and care.",
                color: "#8B5CF6"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-8 hover:border-[#64FFDA]/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${benefit.color}20` }}>
                    <benefit.icon className="text-3xl" style={{ color: benefit.color }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#64FFDA] transition-colors">{benefit.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section id="active-trials" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                Active Clinical Trials
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">Find the right study for you</p>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Phase:</span>
                {['all', 'Phase I', 'Phase II', 'Phase III', 'Phase IV'].map((phase) => (
                  <button
                    key={phase}
                    onClick={() => setSelectedPhase(phase)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedPhase === phase
                        ? 'bg-[#64FFDA]/20 text-[#64FFDA] border border-[#64FFDA]/50'
                        : 'bg-white/5 text-gray-400 border border-gray-700 hover:border-[#64FFDA]/30'
                    }`}
                  >
                    {phase === 'all' ? 'All Phases' : phase}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Status:</span>
                {['all', 'Recruiting', 'Active', 'Enrolling'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedStatus === status
                        ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/50'
                        : 'bg-white/5 text-gray-400 border border-gray-700 hover:border-[#3B82F6]/30'
                    }`}
                  >
                    {status === 'all' ? 'All Status' : status}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Trial Cards - ULTRA DETAILED */}
          <div className="space-y-8">
            {/* Trial 1: EARLY-VOICE Study */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-modern p-8 hover:border-[#64FFDA]/50 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Main Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-[#64FFDA]/10 text-[#64FFDA] text-xs font-bold">Phase III</span>
                        <span className="px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-bold">Recruiting</span>
                        <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs font-bold">Multi-Center</span>
                      </div>
                      <h3 className="text-3xl font-black text-white mb-2">EARLY-VOICE Study</h3>
                      <p className="text-sm text-gray-400">NCT ID: NCT05847392 | Protocol: EV-2025-001</p>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    A comprehensive multi-center prospective study validating AI-powered voice-based screening for early Parkinson's disease detection in at-risk populations. This landmark study aims to establish voice analysis as a standard screening tool for prodromal Parkinson's disease.
                  </p>

                  {/* Key Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <FiUsers className="text-[#64FFDA]" />
                        <span className="text-xs text-gray-400">Target</span>
                      </div>
                      <p className="text-white font-bold">2,000</p>
                      <p className="text-xs text-gray-500">Participants</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <FiClock className="text-[#3B82F6]" />
                        <span className="text-xs text-gray-400">Duration</span>
                      </div>
                      <p className="text-white font-bold">3 Years</p>
                      <p className="text-xs text-gray-500">Follow-up</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <FiMapPin className="text-[#8B5CF6]" />
                        <span className="text-xs text-gray-400">Sites</span>
                      </div>
                      <p className="text-white font-bold">25</p>
                      <p className="text-xs text-gray-500">Locations</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <FiCalendar className="text-[#64FFDA]" />
                        <span className="text-xs text-gray-400">Started</span>
                      </div>
                      <p className="text-white font-bold">Jan 2025</p>
                      <p className="text-xs text-gray-500">Ongoing</p>
                    </div>
                  </div>

                  {/* Eligibility Criteria */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <FiCheckCircle className="text-[#64FFDA]" />
                      Eligibility Criteria
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">Age 50-75 years</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">Family history of Parkinson's disease</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">No current Parkinson's diagnosis</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">Willing to quarterly voice recordings</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">Access to smartphone or computer</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">English or Spanish speaking</span>
                      </div>
                    </div>
                  </div>

                  {/* Study Procedures */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <FiActivity className="text-[#3B82F6]" />
                      Study Procedures
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                        <div className="w-8 h-8 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#64FFDA] font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h5 className="text-white font-semibold mb-1">Baseline Assessment</h5>
                          <p className="text-sm text-gray-400">Comprehensive neurological exam, voice recording, medical history review (2-3 hours)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                        <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#3B82F6] font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h5 className="text-white font-semibold mb-1">Quarterly Voice Tests</h5>
                          <p className="text-sm text-gray-400">30-second voice recordings every 3 months via smartphone app (5 minutes)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                        <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#8B5CF6] font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h5 className="text-white font-semibold mb-1">Annual Clinical Visits</h5>
                          <p className="text-sm text-gray-400">Detailed neurological assessment, DaTscan imaging (if indicated), cognitive testing (4-5 hours)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                        <div className="w-8 h-8 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#64FFDA] font-bold text-sm">4</span>
                        </div>
                        <div>
                          <h5 className="text-white font-semibold mb-1">Continuous Monitoring</h5>
                          <p className="text-sm text-gray-400">AI analysis of voice patterns, early warning alerts, personalized reports</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Additional Info */}
                <div className="lg:w-80 space-y-6">
                  {/* Principal Investigator */}
                  <div className="glass-card p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Principal Investigator</h4>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center">
                        <FiUsers className="text-[#64FFDA] text-xl" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Dr. Sarah Chen, MD, PhD</p>
                        <p className="text-sm text-gray-400">Stanford University</p>
                        <p className="text-xs text-gray-500 mt-1">Movement Disorders Specialist</p>
                      </div>
                    </div>
                  </div>

                  {/* Compensation */}
                  <div className="glass-card p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Compensation</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Per Visit</span>
                        <span className="text-white font-bold">$150</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Travel Reimbursement</span>
                        <span className="text-white font-bold">Up to $100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Total (3 years)</span>
                        <span className="text-[#64FFDA] font-bold">~$2,400</span>
                      </div>
                    </div>
                  </div>

                  {/* Study Sites */}
                  <div className="glass-card p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Study Sites</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-300">Stanford, CA</p>
                      <p className="text-gray-300">Boston, MA</p>
                      <p className="text-gray-300">New York, NY</p>
                      <p className="text-gray-300">Chicago, IL</p>
                      <p className="text-gray-300">Los Angeles, CA</p>
                      <p className="text-[#64FFDA] font-semibold cursor-pointer hover:text-[#3B82F6] transition-colors">
                        + 20 more locations
                      </p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <button className="w-full px-6 py-4 bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] rounded-lg text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <FiUsers />
                      Apply Now
                      <FiArrowRight />
                    </button>
                    <button className="w-full px-6 py-3 bg-white/5 border border-gray-700 rounded-lg text-gray-300 hover:text-[#64FFDA] hover:border-[#64FFDA]/30 transition-colors flex items-center justify-center gap-2">
                      <FiDownload />
                      Download Info Sheet
                    </button>
                    <button className="w-full px-6 py-3 bg-white/5 border border-gray-700 rounded-lg text-gray-300 hover:text-[#3B82F6] hover:border-[#3B82F6]/30 transition-colors flex items-center justify-center gap-2">
                      <FiMail />
                      Contact Study Team
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trial 2: PRODROMAL-AI Trial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-modern p-8 hover:border-[#3B82F6]/50 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-bold">Phase II</span>
                        <span className="px-3 py-1 rounded-full bg-[#64FFDA]/10 text-[#64FFDA] text-xs font-bold">Active</span>
                        <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs font-bold">Longitudinal</span>
                      </div>
                      <h3 className="text-3xl font-black text-white mb-2">PRODROMAL-AI Trial</h3>
                      <p className="text-sm text-gray-400">NCT ID: NCT05923847 | Protocol: PA-2024-003</p>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    Longitudinal study tracking vocal biomarker changes in individuals with REM sleep behavior disorder (RBD), a known prodromal marker of Parkinson's disease. This study aims to identify the earliest detectable voice changes that predict conversion to clinical Parkinson's.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <FiUsers className="text-[#3B82F6]" />
                        <span className="text-xs text-gray-400">Enrolled</span>
                      </div>
                      <p className="text-white font-bold">500</p>
                      <p className="text-xs text-gray-500">of 500 target</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <FiClock className="text-[#64FFDA]" />
                        <span className="text-xs text-gray-400">Duration</span>
                      </div>
                      <p className="text-white font-bold">5 Years</p>
                      <p className="text-xs text-gray-500">Follow-up</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <FiMapPin className="text-[#8B5CF6]" />
                        <span className="text-xs text-gray-400">Sites</span>
                      </div>
                      <p className="text-white font-bold">12</p>
                      <p className="text-xs text-gray-500">Sleep Centers</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <FiTrendingUp className="text-[#3B82F6]" />
                        <span className="text-xs text-gray-400">Conversion</span>
                      </div>
                      <p className="text-white font-bold">18%</p>
                      <p className="text-xs text-gray-500">Expected</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <FiCheckCircle className="text-[#3B82F6]" />
                      Eligibility Criteria
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#3B82F6] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">Confirmed RBD diagnosis</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#3B82F6] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">Age 45 years or older</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#3B82F6] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">No current Parkinson's diagnosis</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#3B82F6] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">Willing to quarterly testing</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-80 space-y-6">
                  <div className="glass-card p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Principal Investigator</h4>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                        <FiActivity className="text-[#3B82F6] text-xl" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Dr. Michael Rodriguez, MD</p>
                        <p className="text-sm text-gray-400">Johns Hopkins University</p>
                        <p className="text-xs text-gray-500 mt-1">Sleep & Movement Disorders</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Compensation</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Per Visit</span>
                        <span className="text-white font-bold">$200</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Total (5 years)</span>
                        <span className="text-[#3B82F6] font-bold">~$4,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full px-6 py-4 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-lg text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <FiUsers />
                      Join Waitlist
                      <FiArrowRight />
                    </button>
                    <button className="w-full px-6 py-3 bg-white/5 border border-gray-700 rounded-lg text-gray-300 hover:text-[#3B82F6] hover:border-[#3B82F6]/30 transition-colors flex items-center justify-center gap-2">
                      <FiFileText />
                      Study Protocol
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trial 3: VOICE-PROGRESSION Study */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-modern p-8 hover:border-[#8B5CF6]/50 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs font-bold">Phase II</span>
                        <span className="px-3 py-1 rounded-full bg-[#64FFDA]/10 text-[#64FFDA] text-xs font-bold">Recruiting</span>
                        <span className="px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-bold">Observational</span>
                      </div>
                      <h3 className="text-3xl font-black text-white mb-2">VOICE-PROGRESSION Study</h3>
                      <p className="text-sm text-gray-400">NCT ID: NCT06012394 | Protocol: VP-2025-002</p>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    Monitoring vocal biomarker changes in newly diagnosed Parkinson's patients to understand disease progression patterns and validate voice analysis as a progression tracking tool. This study will establish baseline voice signatures for different disease stages.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <FiUsers className="text-[#8B5CF6]" />
                        <span className="text-xs text-gray-400">Target</span>
                      </div>
                      <p className="text-white font-bold">300</p>
                      <p className="text-xs text-gray-500">Participants</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <FiClock className="text-[#64FFDA]" />
                        <span className="text-xs text-gray-400">Duration</span>
                      </div>
                      <p className="text-white font-bold">2 Years</p>
                      <p className="text-xs text-gray-500">Follow-up</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <FiMapPin className="text-[#3B82F6]" />
                        <span className="text-xs text-gray-400">Sites</span>
                      </div>
                      <p className="text-white font-bold">18</p>
                      <p className="text-xs text-gray-500">Clinics</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <FiCalendar className="text-[#8B5CF6]" />
                        <span className="text-xs text-gray-400">Started</span>
                      </div>
                      <p className="text-white font-bold">Mar 2025</p>
                      <p className="text-xs text-gray-500">Recruiting</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <FiCheckCircle className="text-[#8B5CF6]" />
                      Eligibility Criteria
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#8B5CF6] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">PD diagnosis within last 12 months</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#8B5CF6] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">Age 40-80 years</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#8B5CF6] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">Hoehn & Yahr stage 1-2</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#8B5CF6] flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">Monthly voice recordings</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-80 space-y-6">
                  <div className="glass-card p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Principal Investigator</h4>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6]/20 to-[#64FFDA]/20 flex items-center justify-center">
                        <FiTrendingUp className="text-[#8B5CF6] text-xl" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Dr. Emily Watson, PhD</p>
                        <p className="text-sm text-gray-400">Mayo Clinic</p>
                        <p className="text-xs text-gray-500 mt-1">Neurology Research</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Compensation</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Per Visit</span>
                        <span className="text-white font-bold">$100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Total (2 years)</span>
                        <span className="text-[#8B5CF6] font-bold">~$1,200</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full px-6 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#64FFDA] rounded-lg text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <FiUsers />
                      Apply Now
                      <FiArrowRight />
                    </button>
                    <button className="w-full px-6 py-3 bg-white/5 border border-gray-700 rounded-lg text-gray-300 hover:text-[#8B5CF6] hover:border-[#8B5CF6]/30 transition-colors flex items-center justify-center gap-2">
                      <FiMail />
                      Contact Team
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eligibility Checker */}
      <section id="eligibility" className="py-16 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-modern p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                  Check Your Eligibility
                </span>
              </h2>
              <p className="text-xl text-gray-300">Quick assessment to find suitable trials</p>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white/5 border border-gray-700">
                <label className="block text-white font-semibold mb-3">What is your age?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Under 40', '40-50', '50-65', '65+'].map((age) => (
                    <button key={age} className="px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-gray-300 hover:border-[#64FFDA]/50 hover:text-[#64FFDA] transition-all">
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-gray-700">
                <label className="block text-white font-semibold mb-3">Do you have a Parkinson's diagnosis?</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Yes', 'No', 'Not Sure'].map((option) => (
                    <button key={option} className="px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-gray-300 hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-all">
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-gray-700">
                <label className="block text-white font-semibold mb-3">Do you have a family history of Parkinson's?</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Yes', 'No'].map((option) => (
                    <button key={option} className="px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-gray-300 hover:border-[#8B5CF6]/50 hover:text-[#8B5CF6] transition-all">
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full px-8 py-4 bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] rounded-lg text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-lg">
                <FiCheckCircle />
                Find Matching Trials
                <FiArrowRight />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Participant Testimonials */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                Participant Stories
              </span>
            </h2>
            <p className="text-xl text-gray-300">Hear from those making a difference</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Robert M.",
                age: 62,
                trial: "EARLY-VOICE Study",
                quote: "Participating in this study gave me peace of mind. The early detection technology is incredible, and I feel like I'm contributing to something bigger than myself.",
                duration: "18 months",
                color: "#64FFDA"
              },
              {
                name: "Linda S.",
                age: 58,
                trial: "PRODROMAL-AI Trial",
                quote: "As someone with RBD, I was worried about my future. This study not only monitors my health but also gives me hope that we can catch Parkinson's early.",
                duration: "2 years",
                color: "#3B82F6"
              },
              {
                name: "James K.",
                age: 71,
                trial: "VOICE-PROGRESSION",
                quote: "Being diagnosed with Parkinson's was scary, but this study helps me track my progression and gives my doctors valuable data to adjust my treatment.",
                duration: "14 months",
                color: "#8B5CF6"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center border-2" style={{ borderColor: testimonial.color }}>
                    <FiUsers className="text-2xl" style={{ color: testimonial.color }} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">Age {testimonial.age} • {testimonial.duration}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4 italic">"{testimonial.quote}"</p>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm font-semibold" style={{ color: testimonial.color }}>{testimonial.trial}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-xl text-gray-300">Everything you need to know about participating</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "How much time will I need to commit?",
                answer: "Time commitment varies by study. Most trials require 2-4 hours for initial assessment, then quarterly 30-second voice recordings (5 minutes) and annual clinical visits (4-5 hours). Total time commitment is typically 10-15 hours per year."
              },
              {
                question: "Will I be compensated for my participation?",
                answer: "Yes! All participants receive compensation for their time and travel. Rates vary by study but typically range from $100-$200 per visit, plus travel reimbursement up to $100. Total compensation over the study period can reach $2,000-$4,000."
              },
              {
                question: "Is participation safe?",
                answer: "Absolutely. All studies are approved by institutional review boards (IRBs) and follow strict safety protocols. Voice recording is completely non-invasive. Any additional tests (like DaTscan) are only performed when medically indicated and with your consent."
              },
              {
                question: "Can I withdraw from a study?",
                answer: "Yes, participation is completely voluntary. You can withdraw at any time for any reason without penalty or loss of benefits. Your decision will not affect your regular medical care."
              },
              {
                question: "Will my insurance cover study-related costs?",
                answer: "All study-related procedures, tests, and assessments are provided at no cost to you. You will not be billed, and your insurance will not be charged for any study activities."
              },
              {
                question: "How will my data be protected?",
                answer: "We take data privacy seriously. All data is encrypted, de-identified, and stored securely in HIPAA-compliant systems. Your personal information is never shared without your explicit consent. You can request data deletion at any time."
              },
              {
                question: "What if I'm diagnosed with Parkinson's during the study?",
                answer: "If you're diagnosed during the study, you'll receive immediate referral to appropriate specialists and continue to receive study benefits. Your participation helps us understand disease progression and improve early detection methods."
              },
              {
                question: "Can I participate in multiple studies?",
                answer: "It depends on the specific studies. Some trials allow concurrent participation while others require exclusivity. Our study coordinators will help you determine which combinations are possible."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-modern p-6"
              >
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <FiInfo className="text-[#64FFDA]" />
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed pl-7">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Ethics */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                Safety & Ethics
              </span>
            </h2>
            <p className="text-xl text-gray-300">Your safety and rights are our top priority</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FiShield,
                title: "IRB Approved",
                description: "All studies reviewed and approved by independent ethics committees",
                color: "#64FFDA"
              },
              {
                icon: FiCheckCircle,
                title: "Informed Consent",
                description: "Comprehensive consent process ensuring you understand all aspects",
                color: "#3B82F6"
              },
              {
                icon: FiHeart,
                title: "Participant Rights",
                description: "Full protection of your rights, privacy, and wellbeing",
                color: "#8B5CF6"
              },
              {
                icon: FiAward,
                title: "FDA Compliant",
                description: "Following all FDA guidelines for clinical research",
                color: "#64FFDA"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                  <item.icon className="text-3xl" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-modern p-12 text-center"
          >
            <h2 className="text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                Ready to Participate?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of participants making a difference in Parkinson's research
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-xl bg-white/5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center">
                    <FiMail className="text-[#64FFDA]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Email Us</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">Get answers to your questions</p>
                <a href="mailto:trials@neuralcipher.ai" className="text-[#64FFDA] hover:text-[#3B82F6] transition-colors font-semibold text-sm">
                  trials@neuralcipher.ai
                </a>
              </div>
              <div className="p-6 rounded-xl bg-white/5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                    <FiPhone className="text-[#3B82F6]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Call Us</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">Speak with a study coordinator</p>
                <a href="tel:+18005551234" className="text-[#3B82F6] hover:text-[#64FFDA] transition-colors font-semibold text-sm">
                  1-800-555-1234
                </a>
              </div>
            </div>
            <Link href="/auth/register" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] rounded-lg text-white hover:opacity-90 transition-opacity font-bold text-lg">
              <FiUsers />
              Apply for Clinical Trial
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
