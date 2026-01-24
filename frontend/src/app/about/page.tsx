'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiArrowRight, FiTarget, FiHeart, FiZap, FiUsers, FiAward, FiTrendingUp, FiGlobe, FiShield, FiCpu, FiActivity, FiCheckCircle, FiStar, FiCode, FiDatabase, FiLock, FiChevronDown, FiMail, FiMessageCircle, FiHelpCircle } from 'react-icons/fi'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
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
              <Link href="/about" className="px-3 py-2 text-sm text-[#64FFDA] transition-colors font-medium rounded-lg bg-white/5">
                About
              </Link>
              <Link href="/research" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Research
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
                  <span>Get Started</span>
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
                <FiHeart className="text-[#64FFDA]" />
                <span className="text-sm text-[#64FFDA] font-semibold">Our Story</span>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                  Revolutionizing
                </span>
                <br />
                <span className="text-white">Early Detection</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                We're on a mission to detect Parkinson's disease years earlier through AI-powered voice analysis, giving millions of people the chance for better outcomes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/register" className="btn-modern text-lg px-8 py-4 flex items-center gap-3">
                  <FiZap className="text-xl" />
                  Join Our Mission
                  <FiArrowRight className="text-xl" />
                </Link>
                <Link href="/contact" className="btn-secondary-modern text-lg px-8 py-4 flex items-center gap-3">
                  <FiUsers className="text-xl" />
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-modern p-12 hover:border-[#64FFDA]/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#64FFDA]/10 flex items-center justify-center mb-6">
                <FiTarget className="text-4xl text-[#64FFDA]" />
              </div>
              <h2 className="text-4xl font-black mb-4 text-white">Our Mission</h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                To democratize early Parkinson's detection through accessible, AI-powered voice analysis technology that empowers individuals and healthcare providers worldwide.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                We believe everyone deserves the chance for early intervention. By making advanced diagnostic tools accessible through a simple voice test, we're breaking down barriers to early detection.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-modern p-12 hover:border-[#3B82F6]/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center mb-6">
                <FiGlobe className="text-4xl text-[#3B82F6]" />
              </div>
              <h2 className="text-4xl font-black mb-4 text-white">Our Vision</h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                A world where Parkinson's disease is detected years before symptoms appear, enabling proactive treatment and dramatically improving quality of life for millions.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                We envision a future where AI-powered diagnostics are the standard of care, where early detection is accessible to everyone, and where Parkinson's progression can be significantly slowed or even prevented.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
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
                How It Started
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Born from personal experience and powered by cutting-edge AI research
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: "2020",
                title: "The Spark",
                description: "Our founder's father was diagnosed with Parkinson's. By then, 60% of dopamine neurons were already lost. We knew there had to be a better way.",
                icon: FiHeart,
                color: "#64FFDA"
              },
              {
                year: "2021",
                title: "The Research",
                description: "We assembled a team of AI researchers, neurologists, and engineers. Months of research revealed voice biomarkers could detect Parkinson's years earlier.",
                icon: FiCpu,
                color: "#3B82F6"
              },
              {
                year: "2022",
                title: "The Breakthrough",
                description: "Our AI model achieved 92% accuracy in early detection. We knew we had something that could change millions of lives.",
                icon: FiZap,
                color: "#8B5CF6"
              }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-8 hover:border-[#64FFDA]/50 transition-all duration-300 group"
              >
                <div className="text-6xl font-black mb-4" style={{ color: milestone.color }}>
                  {milestone.year}
                </div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${milestone.color}20` }}>
                  <milestone.icon className="text-3xl" style={{ color: milestone.color }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#64FFDA] transition-colors">{milestone.title}</h3>
                <p className="text-gray-300 leading-relaxed">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
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
                Our Core Values
              </span>
            </h2>
            <p className="text-xl text-gray-300">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FiHeart,
                title: "Patient First",
                description: "Every decision we make starts with one question: How does this help patients? Their wellbeing is our north star.",
                color: "#64FFDA"
              },
              {
                icon: FiShield,
                title: "Privacy & Security",
                description: "Healthcare data is sacred. We employ bank-level encryption and never compromise on data protection.",
                color: "#3B82F6"
              },
              {
                icon: FiCheckCircle,
                title: "Scientific Rigor",
                description: "Every claim is backed by peer-reviewed research. We publish our findings and welcome scrutiny.",
                color: "#8B5CF6"
              },
              {
                icon: FiGlobe,
                title: "Accessibility",
                description: "Advanced healthcare shouldn't be a luxury. We're committed to making our technology available to everyone.",
                color: "#64FFDA"
              },
              {
                icon: FiUsers,
                title: "Collaboration",
                description: "We partner with leading medical institutions, researchers, and clinicians to advance the field together.",
                color: "#3B82F6"
              },
              {
                icon: FiTrendingUp,
                title: "Continuous Innovation",
                description: "AI evolves rapidly. We're constantly improving our models with new data and cutting-edge techniques.",
                color: "#8B5CF6"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-modern p-8 hover:border-[#64FFDA]/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${value.color}20` }}>
                  <value.icon className="text-3xl" style={{ color: value.color }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#64FFDA] transition-colors">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
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
                Leadership Team
              </span>
            </h2>
            <p className="text-xl text-gray-300">World-class experts united by a common mission</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "CEO & Co-Founder",
                bio: "Former Stanford AI researcher. PhD in Machine Learning. Lost her father to Parkinson's.",
                expertise: "AI & Deep Learning"
              },
              {
                name: "Dr. Michael Rodriguez",
                role: "Chief Medical Officer",
                bio: "Neurologist with 20+ years experience. Professor at Johns Hopkins. Parkinson's specialist.",
                expertise: "Neurology & Clinical Research"
              },
              {
                name: "James Park",
                role: "CTO & Co-Founder",
                bio: "Ex-Google engineer. Built ML systems serving billions. MIT Computer Science.",
                expertise: "Scalable AI Systems"
              },
              {
                name: "Dr. Emily Watson",
                role: "Chief Science Officer",
                bio: "Published 50+ papers on voice biomarkers. Former NIH researcher. Oxford PhD.",
                expertise: "Voice Analysis & Biomarkers"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-8 text-center hover:border-[#64FFDA]/50 transition-all duration-300 group"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#64FFDA] to-[#3B82F6] mx-auto mb-4 flex items-center justify-center text-4xl font-black text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#64FFDA] transition-colors">{member.name}</h3>
                <p className="text-[#64FFDA] font-semibold mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{member.bio}</p>
                <div className="inline-block px-3 py-1 rounded-full bg-[#64FFDA]/10 text-[#64FFDA] text-xs font-semibold">
                  {member.expertise}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* By The Numbers */}
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
                Impact By The Numbers
              </span>
            </h2>
            <p className="text-xl text-gray-300">Real results, real impact</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "50K+", label: "Tests Completed", icon: FiActivity },
              { number: "92%", label: "Accuracy Rate", icon: FiCheckCircle },
              { number: "15", label: "Countries", icon: FiGlobe },
              { number: "3,500+", label: "Clinical Trial Participants", icon: FiUsers },
              { number: "795", label: "Training Samples", icon: FiDatabase },
              { number: "59", label: "Voice Biomarkers", icon: FiCpu },
              { number: "10+", label: "Years Earlier Detection", icon: FiZap },
              { number: "99.9%", label: "Uptime SLA", icon: FiShield }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-modern p-8 text-center hover:border-[#64FFDA]/50 transition-all duration-300"
              >
                <stat.icon className="text-4xl text-[#64FFDA] mx-auto mb-3" />
                <div className="text-5xl font-black bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-300 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
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
                Awards & Recognition
              </span>
            </h2>
            <p className="text-xl text-gray-300">Recognized by leading organizations worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { award: "Best Healthcare AI Innovation", org: "TechCrunch Disrupt 2024", icon: FiAward },
              { award: "Top 10 AI Startups", org: "Forbes 2024", icon: FiStar },
              { award: "Digital Health Innovation Award", org: "HIMSS 2024", icon: FiTrendingUp },
              { award: "Excellence in Medical AI", org: "MIT Technology Review 2024", icon: FiCpu },
              { award: "Breakthrough Technology", org: "Fast Company 2024", icon: FiZap },
              { award: "Best Diagnostic Tool", org: "MedTech Breakthrough 2024", icon: FiActivity },
              { award: "Innovation in Neurology", org: "American Academy of Neurology 2024", icon: FiCheckCircle },
              { award: "Startup of the Year", org: "Health 2.0 2024", icon: FiTrendingUp }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-modern p-6 text-center hover:border-[#64FFDA]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="text-2xl text-[#64FFDA]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.award}</h3>
                <p className="text-sm text-gray-400">{item.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
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
                Powered By Cutting-Edge Tech
              </span>
            </h2>
            <p className="text-xl text-gray-300">Enterprise-grade infrastructure and AI</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "AI & Machine Learning",
                items: ["TensorFlow & PyTorch", "Deep Neural Networks", "Ensemble Models", "Real-time Inference"],
                icon: FiCpu,
                color: "#64FFDA"
              },
              {
                title: "Security & Compliance",
                items: ["HIPAA Compliant", "SOC 2 Type II", "End-to-End Encryption", "Zero-Trust Architecture"],
                icon: FiLock,
                color: "#3B82F6"
              },
              {
                title: "Cloud Infrastructure",
                items: ["99.9% Uptime SLA", "Auto-Scaling", "Global CDN", "Real-time Monitoring"],
                icon: FiDatabase,
                color: "#8B5CF6"
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-8 hover:border-[#64FFDA]/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${tech.color}20` }}>
                  <tech.icon className="text-3xl" style={{ color: tech.color }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{tech.title}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Collaborators */}
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
                Trusted Partners
              </span>
            </h2>
            <p className="text-xl text-gray-300">Collaborating with world-leading institutions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-modern p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FiUsers className="text-[#64FFDA]" />
                Academic Partners
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {["Stanford University", "MIT", "Oxford University", "Johns Hopkins", "Harvard Medical School", "UCSF"].map((partner, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300">
                    <FiCheckCircle className="text-[#64FFDA] flex-shrink-0" />
                    <span>{partner}</span>
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
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FiActivity className="text-[#3B82F6]" />
                Clinical Partners
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {["Mayo Clinic", "Cleveland Clinic", "Mass General", "UCSF Medical Center", "Johns Hopkins Hospital", "Stanford Health"].map((partner, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300">
                    <FiCheckCircle className="text-[#3B82F6] flex-shrink-0" />
                    <span>{partner}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-modern p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/5 to-[#8B5CF6]/5"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                  Join Us In Our Mission
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Whether you're a patient, healthcare provider, researcher, or investor - there's a place for you in our journey to revolutionize early detection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/auth/register"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] text-white font-bold hover:opacity-90 transition-opacity text-lg"
                >
                  <FiZap />
                  Get Started Free
                  <FiArrowRight />
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white/5 border border-gray-700 text-white font-bold hover:border-[#64FFDA] transition-colors text-lg"
                >
                  <FiUsers />
                  Partner With Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
