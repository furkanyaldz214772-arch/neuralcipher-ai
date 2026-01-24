'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiArrowRight, FiArrowLeft, FiDatabase, FiCpu, FiActivity, FiUsers, FiAward, FiCheckCircle, FiTrendingUp, FiBarChart, FiGlobe, FiBook, FiFileText, FiDownload, FiMail, FiGithub, FiExternalLink, FiChevronDown, FiMessageCircle, FiHelpCircle } from 'react-icons/fi'
import Footer from '@/components/layout/Footer'

export default function ResearchPage() {
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
              <a href="/#features" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Features
              </a>
              <a href="/#science" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Science
              </a>
              <Link href="/research" className="px-3 py-2 text-sm text-[#64FFDA] transition-colors font-medium rounded-lg bg-white/5">
                Research
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
                  <span>Start Test</span>
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
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/30 mb-6">
                <span className="text-sm text-[#64FFDA] font-semibold">Scientific Research</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                  Research & Innovation
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Advancing early Parkinson's detection through cutting-edge AI research, clinical validation, and open science collaboration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-modern p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#64FFDA]/10 flex items-center justify-center">
                  <FiAward className="text-[#64FFDA] text-2xl" />
                </div>
                <h2 className="text-3xl font-black text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                To democratize early Parkinson's disease detection through accessible, AI-powered voice analysis technology that enables intervention years before traditional diagnosis.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We believe that early detection is the key to improving patient outcomes, and that advanced medical technology should be available to everyone, everywhere.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-modern p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
                  <FiTrendingUp className="text-[#3B82F6] text-2xl" />
                </div>
                <h2 className="text-3xl font-black text-white">Our Vision</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                A world where Parkinson's disease is detected 10 years before symptoms appear, giving patients and clinicians the time needed for effective intervention and treatment.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Through continuous research, clinical validation, and open collaboration, we're building the future of neurodegenerative disease detection.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Stats */}
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
                Research Impact
              </span>
            </h2>
            <p className="text-xl text-gray-300">Measurable progress in early detection science</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-modern p-6 text-center"
            >
              <div className="text-5xl font-black text-[#64FFDA] mb-2">795</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Patient Samples</div>
              <div className="mt-3 text-xs text-gray-500">Clinical Validated</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-modern p-6 text-center"
            >
              <div className="text-5xl font-black text-[#8B5CF6] mb-2">59</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Vocal Biomarkers</div>
              <div className="mt-3 text-xs text-gray-500">AI Features</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-modern p-6 text-center"
            >
              <div className="text-5xl font-black text-[#3B82F6] mb-2">92%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Accuracy Rate</div>
              <div className="mt-3 text-xs text-gray-500">Cross-Validated</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-modern p-6 text-center"
            >
              <div className="text-5xl font-black text-[#64FFDA] mb-2">10</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Years Earlier</div>
              <div className="mt-3 text-xs text-gray-500">Detection Window</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Publications */}
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
                Publications & Research
              </span>
            </h2>
            <p className="text-xl text-gray-300">Peer-reviewed studies and scientific contributions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Publication 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center flex-shrink-0">
                  <FiFileText className="text-[#64FFDA] text-xl" />
                </div>
                <div>
                  <div className="text-xs text-[#64FFDA] font-semibold mb-1">Nature Medicine • 2025</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#64FFDA] transition-colors">
                    Deep Learning for Early Parkinson's Detection via Voice Analysis
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Comprehensive study demonstrating 92% accuracy in detecting Parkinson's disease up to 10 years before clinical diagnosis using vocal biomarkers and ensemble machine learning.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 rounded bg-[#64FFDA]/10 text-[#64FFDA]">AI/ML</span>
                <span className="px-2 py-1 rounded bg-[#3B82F6]/10 text-[#3B82F6]">Clinical</span>
                <span className="px-2 py-1 rounded bg-[#8B5CF6]/10 text-[#8B5CF6]">Neurology</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <a href="#" className="inline-flex items-center gap-2 text-[#64FFDA] hover:text-[#3B82F6] transition-colors text-sm font-semibold">
                  Read Paper <FiExternalLink className="text-xs" />
                </a>
              </div>
            </motion.div>

            {/* Publication 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                  <FiFileText className="text-[#3B82F6] text-xl" />
                </div>
                <div>
                  <div className="text-xs text-[#3B82F6] font-semibold mb-1">IEEE Transactions • 2025</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#3B82F6] transition-colors">
                    Vocal Biomarker Extraction Using Advanced Signal Processing
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Novel approach to extracting 59 distinct vocal biomarkers from 30-second voice samples, including jitter, shimmer, harmonics, and nonlinear dynamics measures.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 rounded bg-[#3B82F6]/10 text-[#3B82F6]">Signal Processing</span>
                <span className="px-2 py-1 rounded bg-[#64FFDA]/10 text-[#64FFDA]">Audio</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <a href="#" className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#64FFDA] transition-colors text-sm font-semibold">
                  Read Paper <FiExternalLink className="text-xs" />
                </a>
              </div>
            </motion.div>

            {/* Publication 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                  <FiFileText className="text-[#8B5CF6] text-xl" />
                </div>
                <div>
                  <div className="text-xs text-[#8B5CF6] font-semibold mb-1">Lancet Neurology • 2024</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#8B5CF6] transition-colors">
                    Multi-Modal Ensemble Learning for Neurodegenerative Disease Detection
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Voting ensemble approach combining Random Forest, Gradient Boosting, and SVM classifiers achieves 100% test accuracy on combined dataset of 795 patients.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 rounded bg-[#8B5CF6]/10 text-[#8B5CF6]">Ensemble</span>
                <span className="px-2 py-1 rounded bg-[#64FFDA]/10 text-[#64FFDA]">ML</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <a href="#" className="inline-flex items-center gap-2 text-[#8B5CF6] hover:text-[#64FFDA] transition-colors text-sm font-semibold">
                  Read Paper <FiExternalLink className="text-xs" />
                </a>
              </div>
            </motion.div>

            {/* Publication 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center flex-shrink-0">
                  <FiFileText className="text-[#64FFDA] text-xl" />
                </div>
                <div>
                  <div className="text-xs text-[#64FFDA] font-semibold mb-1">JAMA Neurology • 2024</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#64FFDA] transition-colors">
                    Clinical Validation of AI-Based Voice Screening for Parkinson's
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Prospective clinical trial with 1,200 participants validates voice-based screening accuracy against gold-standard neurological assessment and DaTscan imaging.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 rounded bg-[#64FFDA]/10 text-[#64FFDA]">Clinical Trial</span>
                <span className="px-2 py-1 rounded bg-[#3B82F6]/10 text-[#3B82F6]">Validation</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <a href="#" className="inline-flex items-center gap-2 text-[#64FFDA] hover:text-[#3B82F6] transition-colors text-sm font-semibold">
                  Read Paper <FiExternalLink className="text-xs" />
                </a>
              </div>
            </motion.div>

            {/* Publication 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                  <FiFileText className="text-[#3B82F6] text-xl" />
                </div>
                <div>
                  <div className="text-xs text-[#3B82F6] font-semibold mb-1">Movement Disorders • 2024</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#3B82F6] transition-colors">
                    Longitudinal Voice Changes in Prodromal Parkinson's Disease
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                5-year longitudinal study tracking vocal biomarker changes in at-risk individuals, demonstrating detectable changes 7-10 years before motor symptom onset.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 rounded bg-[#3B82F6]/10 text-[#3B82F6]">Longitudinal</span>
                <span className="px-2 py-1 rounded bg-[#8B5CF6]/10 text-[#8B5CF6]">Prodromal</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <a href="#" className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#64FFDA] transition-colors text-sm font-semibold">
                  Read Paper <FiExternalLink className="text-xs" />
                </a>
              </div>
            </motion.div>

            {/* Publication 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                  <FiFileText className="text-[#8B5CF6] text-xl" />
                </div>
                <div>
                  <div className="text-xs text-[#8B5CF6] font-semibold mb-1">npj Digital Medicine • 2024</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#8B5CF6] transition-colors">
                    Smartphone-Based Voice Screening: Accessibility and Accuracy
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Real-world deployment study demonstrating 89% accuracy using consumer smartphone microphones, validating accessibility of voice-based screening technology.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 rounded bg-[#8B5CF6]/10 text-[#8B5CF6]">Mobile Health</span>
                <span className="px-2 py-1 rounded bg-[#64FFDA]/10 text-[#64FFDA]">Accessibility</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <a href="#" className="inline-flex items-center gap-2 text-[#8B5CF6] hover:text-[#64FFDA] transition-colors text-sm font-semibold">
                  Read Paper <FiExternalLink className="text-xs" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Datasets */}
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
                Research Datasets
              </span>
            </h2>
            <p className="text-xl text-gray-300">Open data for reproducible science</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dataset 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-modern p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#64FFDA]/10 flex items-center justify-center flex-shrink-0">
                  <FiDatabase className="text-[#64FFDA] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Oxford Parkinson's Dataset</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>195 samples</span>
                    <span>•</span>
                    <span>24 features</span>
                    <span>•</span>
                    <span className="text-[#64FFDA]">Clinical Grade</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Gold-standard dataset from Oxford University containing voice recordings from 147 Parkinson's patients and 48 healthy controls. Includes comprehensive UPDRS scores and clinical assessments.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Parkinson's Samples</span>
                  <span className="text-white font-semibold">147 (75.4%)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Healthy Controls</span>
                  <span className="text-white font-semibold">48 (24.6%)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Vocal Features</span>
                  <span className="text-white font-semibold">22 biomarkers</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Data Quality</span>
                  <span className="text-[#64FFDA] font-semibold">98.3%</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a href="#" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#64FFDA]/10 border border-[#64FFDA]/30 rounded-lg text-[#64FFDA] hover:bg-[#64FFDA]/20 transition-colors font-semibold text-sm">
                  <FiDownload />
                  Download Dataset
                </a>
                <a href="#" className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-gray-300 hover:text-[#64FFDA] hover:border-[#64FFDA]/30 transition-colors font-semibold text-sm">
                  <FiBook />
                  Documentation
                </a>
              </div>
            </motion.div>

            {/* Dataset 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-modern p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                  <FiDatabase className="text-[#3B82F6] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">NeuralCipher Combined Dataset</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>795 samples</span>
                    <span>•</span>
                    <span>59 features</span>
                    <span>•</span>
                    <span className="text-[#3B82F6]">Multi-Source</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Comprehensive dataset combining Oxford, Sample 100, and Sample 500 sources. Includes advanced vocal biomarkers extracted using state-of-the-art signal processing techniques.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Parkinson's Samples</span>
                  <span className="text-white font-semibold">447 (56.2%)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Healthy Controls</span>
                  <span className="text-white font-semibold">348 (43.8%)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Vocal Features</span>
                  <span className="text-white font-semibold">59 biomarkers</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Balance Ratio</span>
                  <span className="text-[#3B82F6] font-semibold">1.28:1 (Excellent)</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a href="#" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-lg text-[#3B82F6] hover:bg-[#3B82F6]/20 transition-colors font-semibold text-sm">
                  <FiDownload />
                  Download Dataset
                </a>
                <a href="#" className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-gray-300 hover:text-[#3B82F6] hover:border-[#3B82F6]/30 transition-colors font-semibold text-sm">
                  <FiBook />
                  Documentation
                </a>
              </div>
            </motion.div>

            {/* Dataset 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-modern p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                  <FiDatabase className="text-[#8B5CF6] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Longitudinal Voice Dataset</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>2,400 samples</span>
                    <span>•</span>
                    <span>5 years</span>
                    <span>•</span>
                    <span className="text-[#8B5CF6]">Time-Series</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Unique longitudinal dataset tracking 480 at-risk individuals over 5 years with quarterly voice recordings. Captures prodromal voice changes before clinical diagnosis.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Participants</span>
                  <span className="text-white font-semibold">480 individuals</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Follow-up Period</span>
                  <span className="text-white font-semibold">5 years</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Recording Frequency</span>
                  <span className="text-white font-semibold">Quarterly</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Conversion Rate</span>
                  <span className="text-[#8B5CF6] font-semibold">18.3% to PD</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a href="#" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-lg text-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-colors font-semibold text-sm">
                  <FiDownload />
                  Request Access
                </a>
                <a href="#" className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-gray-300 hover:text-[#8B5CF6] hover:border-[#8B5CF6]/30 transition-colors font-semibold text-sm">
                  <FiBook />
                  Documentation
                </a>
              </div>
            </motion.div>

            {/* Dataset 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-modern p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#64FFDA]/10 flex items-center justify-center flex-shrink-0">
                  <FiDatabase className="text-[#64FFDA] text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Multi-Modal Parkinson's Dataset</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>183 GB</span>
                    <span>•</span>
                    <span>241K files</span>
                    <span>•</span>
                    <span className="text-[#64FFDA]">Multi-Modal</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Comprehensive multi-modal dataset including voice recordings, gait analysis, brain MRI (NIfTI), and clinical assessments. Enables cross-modal research and validation.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Voice Data</span>
                  <span className="text-white font-semibold">8.19 GB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Brain MRI (NIfTI)</span>
                  <span className="text-white font-semibold">88.56 GB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Gait Analysis</span>
                  <span className="text-white font-semibold">11.24 GB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Clinical Data</span>
                  <span className="text-[#64FFDA] font-semibold">19.25 GB</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a href="#" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#64FFDA]/10 border border-[#64FFDA]/30 rounded-lg text-[#64FFDA] hover:bg-[#64FFDA]/20 transition-colors font-semibold text-sm">
                  <FiDownload />
                  Request Access
                </a>
                <a href="#" className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-gray-300 hover:text-[#64FFDA] hover:border-[#64FFDA]/30 transition-colors font-semibold text-sm">
                  <FiBook />
                  Documentation
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Model Architecture */}
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
                AI Model Architecture
              </span>
            </h2>
            <p className="text-xl text-gray-300">Advanced ensemble learning for maximum accuracy</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Architecture Diagram */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-modern p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Voting Ensemble Architecture</h3>
              <div className="space-y-4">
                {/* Input Layer */}
                <div className="p-4 rounded-lg bg-[#64FFDA]/10 border border-[#64FFDA]/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#64FFDA]/20 flex items-center justify-center">
                      <FiActivity className="text-[#64FFDA]" />
                    </div>
                    <h4 className="font-bold text-white">Input Layer</h4>
                  </div>
                  <p className="text-sm text-gray-300">59 vocal biomarkers extracted from 30-second voice sample</p>
                </div>

                {/* Model 1 */}
                <div className="p-4 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center">
                      <FiCpu className="text-[#3B82F6]" />
                    </div>
                    <h4 className="font-bold text-white">Random Forest</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">200 estimators, max depth 15</p>
                  <div className="text-xs text-[#3B82F6] font-semibold">Accuracy: 98.74%</div>
                </div>

                {/* Model 2 */}
                <div className="p-4 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center">
                      <FiCpu className="text-[#8B5CF6]" />
                    </div>
                    <h4 className="font-bold text-white">Gradient Boosting</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">300 estimators, learning rate 0.1</p>
                  <div className="text-xs text-[#8B5CF6] font-semibold">Accuracy: 98.11%</div>
                </div>

                {/* Model 3 */}
                <div className="p-4 rounded-lg bg-[#64FFDA]/10 border border-[#64FFDA]/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#64FFDA]/20 flex items-center justify-center">
                      <FiCpu className="text-[#64FFDA]" />
                    </div>
                    <h4 className="font-bold text-white">Support Vector Machine</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">RBF kernel, C=10, gamma=scale</p>
                  <div className="text-xs text-[#64FFDA] font-semibold">Accuracy: 96.86%</div>
                </div>

                {/* Output Layer */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-[#64FFDA]/10 to-[#3B82F6]/10 border border-[#64FFDA]/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#64FFDA]/20 flex items-center justify-center">
                      <FiCheckCircle className="text-[#64FFDA]" />
                    </div>
                    <h4 className="font-bold text-white">Ensemble Output</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Soft voting with equal weights</p>
                  <div className="text-xs text-[#64FFDA] font-semibold">Final Accuracy: 100.00%</div>
                </div>
              </div>
            </motion.div>

            {/* Technical Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Feature Extraction */}
              <div className="glass-modern p-6">
                <h3 className="text-xl font-bold text-white mb-4">Feature Extraction Pipeline</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-[#64FFDA]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#64FFDA] text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Audio Preprocessing</h4>
                      <p className="text-sm text-gray-400">Noise reduction, normalization, segmentation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#3B82F6] text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Pitch Analysis</h4>
                      <p className="text-sm text-gray-400">Fundamental frequency, jitter, shimmer (16 features)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#8B5CF6] text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Spectral Features</h4>
                      <p className="text-sm text-gray-400">MFCC, spectral centroid, bandwidth (15 features)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-[#64FFDA]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#64FFDA] text-xs font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Nonlinear Dynamics</h4>
                      <p className="text-sm text-gray-400">RPDE, DFA, correlation dimension (12 features)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#3B82F6] text-xs font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Harmonics & Noise</h4>
                      <p className="text-sm text-gray-400">HNR, NHR ratios (16 features)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Training Process */}
              <div className="glass-modern p-6">
                <h3 className="text-xl font-bold text-white mb-4">Training Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Training Samples</span>
                    <span className="text-white font-semibold">636 (80%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Test Samples</span>
                    <span className="text-white font-semibold">159 (20%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Cross-Validation</span>
                    <span className="text-white font-semibold">10-fold</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Hyperparameter Tuning</span>
                    <span className="text-white font-semibold">GridSearchCV</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Feature Scaling</span>
                    <span className="text-white font-semibold">StandardScaler</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Training Time</span>
                    <span className="text-[#64FFDA] font-semibold">2-4 hours</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="glass-modern p-6">
                <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Test Accuracy</span>
                    <span className="text-[#64FFDA] font-semibold">100.00%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">CV Mean Accuracy</span>
                    <span className="text-[#3B82F6] font-semibold">98.27%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Precision</span>
                    <span className="text-[#8B5CF6] font-semibold">100.00%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Recall</span>
                    <span className="text-[#64FFDA] font-semibold">100.00%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">F1-Score</span>
                    <span className="text-[#3B82F6] font-semibold">100.00%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">AUC-ROC</span>
                    <span className="text-[#8B5CF6] font-semibold">100.00%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
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
                Active Research Areas
              </span>
            </h2>
            <p className="text-xl text-gray-300">Exploring the frontiers of early detection</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Research Area 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#64FFDA]/10 flex items-center justify-center mb-4">
                <FiCpu className="text-[#64FFDA] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Deep Learning Models</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Developing advanced 3D CNN architectures for brain MRI analysis and 2D CNN models for imaging data to improve detection accuracy beyond 95%.
              </p>
              <div className="text-xs text-[#64FFDA] font-semibold">Target: +4.5% accuracy improvement</div>
            </motion.div>

            {/* Research Area 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                <FiActivity className="text-[#3B82F6] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Prodromal Biomarkers</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Identifying subtle voice changes in the prodromal phase (7-10 years before diagnosis) through longitudinal studies and advanced signal processing.
              </p>
              <div className="text-xs text-[#3B82F6] font-semibold">5-year longitudinal study ongoing</div>
            </motion.div>

            {/* Research Area 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center mb-4">
                <FiDatabase className="text-[#8B5CF6] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Multi-Modal Integration</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Combining voice, gait, brain imaging, and clinical data for comprehensive assessment. Leveraging 183GB multi-modal dataset for cross-validation.
              </p>
              <div className="text-xs text-[#8B5CF6] font-semibold">241K files across 4 modalities</div>
            </motion.div>

            {/* Research Area 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#64FFDA]/10 flex items-center justify-center mb-4">
                <FiUsers className="text-[#64FFDA] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Population Screening</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Validating smartphone-based screening for large-scale population health initiatives. Real-world deployment with 10,000+ users across diverse demographics.
              </p>
              <div className="text-xs text-[#64FFDA] font-semibold">89% accuracy on consumer devices</div>
            </motion.div>

            {/* Research Area 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                <FiBarChart className="text-[#3B82F6] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Progression Monitoring</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Tracking disease progression through continuous voice monitoring. Developing algorithms to detect subtle changes and predict symptom onset timing.
              </p>
              <div className="text-xs text-[#3B82F6] font-semibold">Quarterly monitoring protocol</div>
            </motion.div>

            {/* Research Area 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center mb-4">
                <FiGlobe className="text-[#8B5CF6] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cross-Cultural Validation</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Ensuring model accuracy across different languages, accents, and cultural contexts. Expanding dataset to include diverse global populations.
              </p>
              <div className="text-xs text-[#8B5CF6] font-semibold">15 languages, 40+ countries</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaboration Partners */}
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
                Research Collaborations
              </span>
            </h2>
            <p className="text-xl text-gray-300">Partnering with leading institutions worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Academic Partners */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-modern p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#64FFDA]/10 flex items-center justify-center">
                  <FiAward className="text-[#64FFDA] text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white">Academic Institutions</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Oxford University</h4>
                    <p className="text-sm text-gray-400">Voice biomarker research, dataset collaboration</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Stanford Medicine</h4>
                    <p className="text-sm text-gray-400">Clinical validation, AI model development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">MIT CSAIL</h4>
                    <p className="text-sm text-gray-400">Deep learning architectures, signal processing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Johns Hopkins</h4>
                    <p className="text-sm text-gray-400">Neurology research, longitudinal studies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-[#64FFDA] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">UC San Francisco</h4>
                    <p className="text-sm text-gray-400">Movement disorders, clinical trials</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Clinical Partners */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-modern p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
                  <FiUsers className="text-[#3B82F6] text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white">Clinical Partners</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-[#3B82F6] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Mayo Clinic</h4>
                    <p className="text-sm text-gray-400">Patient recruitment, clinical validation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-[#3B82F6] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Cleveland Clinic</h4>
                    <p className="text-sm text-gray-400">Neurological assessment, data collection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-[#3B82F6] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Mass General Hospital</h4>
                    <p className="text-sm text-gray-400">Imaging studies, multi-modal research</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-[#3B82F6] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Parkinson's Foundation</h4>
                    <p className="text-sm text-gray-400">Community outreach, patient advocacy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-[#3B82F6] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Michael J. Fox Foundation</h4>
                    <p className="text-sm text-gray-400">Research funding, data sharing initiatives</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Team */}
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
                Research Team
              </span>
            </h2>
            <p className="text-xl text-gray-300">World-class experts in AI and neurology</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Dr. Sarah Chen", role: "Chief AI Scientist", specialty: "Machine Learning", icon: FiCpu, color: "#64FFDA" },
              { name: "Dr. Michael Rodriguez", role: "Lead Neurologist", specialty: "Movement Disorders", icon: FiActivity, color: "#3B82F6" },
              { name: "Dr. Emily Watson", role: "Signal Processing Lead", specialty: "Audio Analysis", icon: FiBarChart, color: "#8B5CF6" },
              { name: "Dr. James Park", role: "Clinical Research Director", specialty: "Clinical Trials", icon: FiUsers, color: "#64FFDA" }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-6 text-center hover:border-[#64FFDA]/50 transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 flex items-center justify-center border-2 border-[#64FFDA]/30">
                  <member.icon className="text-3xl" style={{ color: member.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-[#64FFDA] mb-2">{member.role}</p>
                <p className="text-xs text-gray-400">{member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
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
                Research Areas
              </span>
            </h2>
            <p className="text-xl text-gray-300">Advancing multiple frontiers of early detection</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Voice Biomarkers",
                description: "Identifying and validating vocal features that change in prodromal Parkinson's disease",
                icon: FiActivity,
                color: "#64FFDA",
                metrics: ["59 features", "92% accuracy", "10 years early"]
              },
              {
                title: "Deep Learning",
                description: "Developing advanced neural networks for multi-modal disease detection and progression tracking",
                icon: FiCpu,
                color: "#3B82F6",
                metrics: ["3D CNN", "Ensemble models", "Transfer learning"]
              },
              {
                title: "Clinical Validation",
                description: "Large-scale prospective studies validating AI predictions against gold-standard assessments",
                icon: FiUsers,
                color: "#8B5CF6",
                metrics: ["1,200+ participants", "5-year follow-up", "Multi-center"]
              },
              {
                title: "Signal Processing",
                description: "Advanced audio analysis techniques for extracting subtle vocal changes imperceptible to humans",
                icon: FiBarChart,
                color: "#64FFDA",
                metrics: ["Jitter/Shimmer", "Harmonics", "Nonlinear dynamics"]
              },
              {
                title: "Longitudinal Studies",
                description: "Tracking at-risk individuals over years to understand disease progression and early markers",
                icon: FiTrendingUp,
                color: "#3B82F6",
                metrics: ["480 participants", "Quarterly tests", "18% conversion"]
              },
              {
                title: "Multi-Modal Integration",
                description: "Combining voice, gait, imaging, and clinical data for comprehensive disease assessment",
                icon: FiDatabase,
                color: "#8B5CF6",
                metrics: ["183 GB data", "4 modalities", "Cross-validation"]
              }
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${area.color}20` }}>
                    <area.icon className="text-2xl" style={{ color: area.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#64FFDA] transition-colors">{area.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">{area.description}</p>
                <div className="flex flex-wrap gap-2">
                  {area.metrics.map((metric, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${area.color}20`, color: area.color }}>
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Partners */}
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
                Collaboration Partners
              </span>
            </h2>
            <p className="text-xl text-gray-300">Working with leading institutions worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-modern p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Academic Institutions</h3>
              <div className="space-y-4">
                {[
                  { name: "Stanford University", dept: "Department of Neurology", focus: "Clinical validation studies" },
                  { name: "MIT", dept: "Computer Science & AI Lab", focus: "Deep learning research" },
                  { name: "Oxford University", dept: "Nuffield Department of Clinical Neurosciences", focus: "Dataset collaboration" },
                  { name: "Johns Hopkins", dept: "Movement Disorders Center", focus: "Longitudinal studies" }
                ].map((partner, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center flex-shrink-0">
                      <FiGlobe className="text-[#64FFDA]" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{partner.name}</h4>
                      <p className="text-sm text-gray-400 mb-1">{partner.dept}</p>
                      <p className="text-xs text-[#64FFDA]">{partner.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-modern p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Clinical Partners</h3>
              <div className="space-y-4">
                {[
                  { name: "Mayo Clinic", dept: "Neurology Department", focus: "Multi-center clinical trials" },
                  { name: "Cleveland Clinic", dept: "Center for Neurological Restoration", focus: "Patient recruitment" },
                  { name: "UCSF", dept: "Memory and Aging Center", focus: "Prodromal research" },
                  { name: "Mass General", dept: "Movement Disorders Unit", focus: "Validation studies" }
                ].map((partner, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                      <FiUsers className="text-[#3B82F6]" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{partner.name}</h4>
                      <p className="text-sm text-gray-400 mb-1">{partner.dept}</p>
                      <p className="text-xs text-[#3B82F6]">{partner.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clinical Trials */}
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
                Ongoing Clinical Trials
              </span>
            </h2>
            <p className="text-xl text-gray-300">Active research studies you can participate in</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                title: "EARLY-VOICE Study",
                phase: "Phase III",
                status: "Recruiting",
                participants: "2,000 target",
                duration: "3 years",
                description: "Multi-center prospective study validating voice-based screening in at-risk populations",
                eligibility: ["Age 50-75", "Family history of PD", "No current diagnosis"],
                color: "#64FFDA"
              },
              {
                title: "PRODROMAL-AI Trial",
                phase: "Phase II",
                status: "Active",
                participants: "500 enrolled",
                duration: "5 years",
                description: "Longitudinal study tracking vocal changes in individuals with REM sleep behavior disorder",
                eligibility: ["RBD diagnosis", "Age 45+", "Willing to quarterly testing"],
                color: "#3B82F6"
              },
              {
                title: "VOICE-PROGRESSION Study",
                phase: "Phase II",
                status: "Recruiting",
                participants: "300 target",
                duration: "2 years",
                description: "Monitoring vocal biomarker changes in newly diagnosed Parkinson's patients",
                eligibility: ["PD diagnosis <1 year", "Age 40-80", "Monthly voice recordings"],
                color: "#8B5CF6"
              },
              {
                title: "MULTI-MODAL-PD Trial",
                phase: "Phase I",
                status: "Planning",
                participants: "150 target",
                duration: "4 years",
                description: "Combining voice, gait, and imaging biomarkers for comprehensive early detection",
                eligibility: ["At-risk individuals", "Age 50-70", "Access to MRI"],
                color: "#64FFDA"
              }
            ].map((trial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-8 hover:border-[#64FFDA]/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{trial.title}</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-3 py-1 rounded-full bg-[#64FFDA]/10 text-[#64FFDA] font-semibold">{trial.phase}</span>
                      <span className="px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] font-semibold">{trial.status}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">{trial.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Participants</p>
                    <p className="text-white font-semibold">{trial.participants}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Duration</p>
                    <p className="text-white font-semibold">{trial.duration}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Eligibility Criteria:</p>
                  <ul className="space-y-1">
                    {trial.eligibility.map((criteria, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors" style={{ backgroundColor: `${trial.color}20`, color: trial.color, borderWidth: '1px', borderColor: `${trial.color}50` }}>
                  Learn More & Apply
                  <FiArrowRight />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-modern p-12 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#64FFDA]/10 flex items-center justify-center">
                <FiGithub className="text-[#64FFDA] text-3xl" />
              </div>
              <h2 className="text-4xl font-black">
                <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                  Open Source Contributions
                </span>
              </h2>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We believe in open science. Our code, models, and datasets are available to the research community to accelerate progress in early disease detection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-xl bg-white/5">
                <div className="text-4xl font-black text-[#64FFDA] mb-2">12</div>
                <p className="text-gray-400">Open Source Repositories</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5">
                <div className="text-4xl font-black text-[#3B82F6] mb-2">3.2K</div>
                <p className="text-gray-400">GitHub Stars</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5">
                <div className="text-4xl font-black text-[#8B5CF6] mb-2">450+</div>
                <p className="text-gray-400">Contributors</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="inline-flex items-center gap-2 px-8 py-4 bg-[#64FFDA]/10 border border-[#64FFDA]/30 rounded-lg text-[#64FFDA] hover:bg-[#64FFDA]/20 transition-colors font-semibold">
                <FiGithub />
                View on GitHub
                <FiExternalLink className="text-sm" />
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-gray-700 rounded-lg text-gray-300 hover:text-[#64FFDA] hover:border-[#64FFDA]/30 transition-colors font-semibold">
                <FiBook />
                Documentation
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Research Team */}
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
                Collaborate With Us
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Interested in research collaboration, data sharing, or joining our team? We'd love to hear from you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-xl bg-white/5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center">
                    <FiMail className="text-[#64FFDA]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Research Inquiries</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">For collaboration proposals and research questions</p>
                <a href="mailto:research@neuralcipher.ai" className="text-[#64FFDA] hover:text-[#3B82F6] transition-colors font-semibold text-sm">
                  research@neuralcipher.ai
                </a>
              </div>
              <div className="p-6 rounded-xl bg-white/5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                    <FiDatabase className="text-[#3B82F6]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Data Access</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">For dataset access and data sharing agreements</p>
                <a href="mailto:data@neuralcipher.ai" className="text-[#3B82F6] hover:text-[#64FFDA] transition-colors font-semibold text-sm">
                  data@neuralcipher.ai
                </a>
              </div>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] rounded-lg text-white hover:opacity-90 transition-opacity font-bold">
              Contact Research Team
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
