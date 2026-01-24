'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiArrowRight, FiMapPin, FiClock, FiBriefcase, FiUsers, FiHeart, FiTrendingUp, FiAward, FiCoffee, FiHome, FiDollarSign, FiZap, FiTarget, FiGlobe, FiCode, FiDatabase, FiActivity, FiShield, FiMail, FiChevronDown, FiMessageCircle, FiHelpCircle } from 'react-icons/fi'
import Footer from '@/components/layout/Footer'

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [isContactOpen, setIsContactOpen] = useState(false)

  const jobs = [
    {
      id: 1,
      title: "Senior Machine Learning Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Build and optimize our AI models for voice-based Parkinson's detection. Work with cutting-edge deep learning technologies.",
      requirements: ["5+ years ML experience", "Python, TensorFlow/PyTorch", "Healthcare AI experience preferred"],
      salary: "$180K - $250K"
    },
    {
      id: 2,
      title: "Clinical Research Scientist",
      department: "Research",
      location: "Remote",
      type: "Full-time",
      description: "Lead clinical trials and research studies. Collaborate with top medical institutions worldwide.",
      requirements: ["PhD in Neuroscience or related", "Clinical trial experience", "Published research"],
      salary: "$150K - $200K"
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description: "Build scalable web applications and APIs. Work with React, Next.js, Python, and modern cloud infrastructure.",
      requirements: ["4+ years full-stack experience", "React, TypeScript, Python", "Cloud platforms (AWS/GCP)"],
      salary: "$160K - $220K"
    },
    {
      id: 4,
      title: "Product Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Design intuitive healthcare experiences. Create beautiful, accessible interfaces for patients and doctors.",
      requirements: ["5+ years product design", "Figma, design systems", "Healthcare UX preferred"],
      salary: "$140K - $190K"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and maintain our cloud infrastructure. Ensure 99.9% uptime for our healthcare platform.",
      requirements: ["4+ years DevOps experience", "Kubernetes, Docker, CI/CD", "Security best practices"],
      salary: "$150K - $210K"
    },
    {
      id: 6,
      title: "Medical Affairs Manager",
      department: "Medical",
      location: "Boston, MA",
      type: "Full-time",
      description: "Bridge clinical research and commercial teams. Engage with healthcare providers and key opinion leaders.",
      requirements: ["MD or PhD", "5+ years medical affairs", "Neurology background preferred"],
      salary: "$170K - $230K"
    }
  ]

  const filteredJobs = jobs.filter(job => {
    const matchesDept = selectedDepartment === 'all' || job.department === selectedDepartment
    const matchesLoc = selectedLocation === 'all' || job.location.includes(selectedLocation)
    return matchesDept && matchesLoc
  })

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
              <Link href="/careers" className="px-3 py-2 text-sm text-[#64FFDA] transition-colors font-medium rounded-lg bg-white/5">
                Careers
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
                  <span>Join Us</span>
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
                <FiBriefcase className="text-[#64FFDA]" />
                <span className="text-sm text-[#64FFDA] font-semibold">Join Our Mission</span>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                  Build the Future
                </span>
                <br />
                <span className="text-white">of Healthcare</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join a team of world-class engineers, researchers, and healthcare professionals revolutionizing early disease detection with AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#open-positions" className="btn-modern text-lg px-8 py-4 flex items-center gap-3">
                  <FiBriefcase className="text-xl" />
                  View Open Positions
                  <FiArrowRight className="text-xl" />
                </a>
                <a href="#culture" className="btn-secondary-modern text-lg px-8 py-4 flex items-center gap-3">
                  <FiUsers className="text-xl" />
                  Our Culture
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
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
                Why NeuralCipher?
              </span>
            </h2>
            <p className="text-xl text-gray-300">More than just a job - it's a mission to save lives</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FiTarget,
                title: "Meaningful Impact",
                description: "Your work directly helps detect Parkinson's disease years earlier, improving millions of lives worldwide.",
                color: "#64FFDA"
              },
              {
                icon: FiZap,
                title: "Cutting-Edge Tech",
                description: "Work with the latest AI, machine learning, and cloud technologies. Push the boundaries of what's possible.",
                color: "#3B82F6"
              },
              {
                icon: FiUsers,
                title: "World-Class Team",
                description: "Collaborate with PhDs from Stanford, MIT, and top medical institutions. Learn from the best.",
                color: "#8B5CF6"
              },
              {
                icon: FiTrendingUp,
                title: "Rapid Growth",
                description: "Join a fast-growing startup backed by top VCs. Huge opportunities for career advancement.",
                color: "#64FFDA"
              },
              {
                icon: FiDollarSign,
                title: "Competitive Compensation",
                description: "Top-tier salaries, equity packages, and comprehensive benefits. We value your talent.",
                color: "#3B82F6"
              },
              {
                icon: FiHeart,
                title: "Work-Life Balance",
                description: "Flexible hours, remote options, unlimited PTO. We care about your wellbeing.",
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
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${benefit.color}20` }}>
                  <benefit.icon className="text-3xl" style={{ color: benefit.color }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#64FFDA] transition-colors">{benefit.title}</h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="py-16 relative" id="culture">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                Benefits & Perks
              </span>
            </h2>
            <p className="text-xl text-gray-300">We take care of our team</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FiShield, title: "Health Insurance", desc: "Premium medical, dental, vision" },
              { icon: FiHome, title: "Remote Work", desc: "Work from anywhere" },
              { icon: FiCoffee, title: "Unlimited PTO", desc: "Take time when you need it" },
              { icon: FiDollarSign, title: "Equity", desc: "Competitive stock options" },
              { icon: FiAward, title: "Learning Budget", desc: "$5K/year for courses & conferences" },
              { icon: FiActivity, title: "Wellness", desc: "Gym membership & mental health support" },
              { icon: FiGlobe, title: "Team Retreats", desc: "Annual company offsites" },
              { icon: FiUsers, title: "Parental Leave", desc: "16 weeks paid leave" }
            ].map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-modern p-6 text-center hover:border-[#64FFDA]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center mx-auto mb-3">
                  <perk.icon className="text-2xl text-[#64FFDA]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-400">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 relative" id="open-positions">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                Open Positions
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">Find your perfect role</p>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-[#64FFDA] focus:outline-none"
              >
                <option value="all">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Research">Research</option>
                <option value="Design">Design</option>
                <option value="Medical">Medical</option>
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-[#64FFDA] focus:outline-none"
              >
                <option value="all">All Locations</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Remote">Remote</option>
                <option value="Boston">Boston</option>
              </select>
            </div>
          </motion.div>

          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-8 hover:border-[#64FFDA]/50 transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#64FFDA] transition-colors">{job.title}</h3>
                      <span className="px-3 py-1 rounded-full bg-[#64FFDA]/10 text-[#64FFDA] text-sm font-semibold">{job.department}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-[#64FFDA]" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="text-[#3B82F6]" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiDollarSign className="text-[#8B5CF6]" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 text-sm">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="w-full lg:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      Apply Now
                      <FiArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No positions match your filters. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
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
                Our Hiring Process
              </span>
            </h2>
            <p className="text-xl text-gray-300">Simple, transparent, and respectful of your time</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Apply", desc: "Submit your application and resume" },
              { step: "2", title: "Screen", desc: "30-min intro call with our team" },
              { step: "3", title: "Interview", desc: "Technical/role-specific interviews" },
              { step: "4", title: "Offer", desc: "Receive offer and join the team!" }
            ].map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-8 text-center relative"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#64FFDA] to-[#3B82F6] flex items-center justify-center mx-auto mb-4 text-2xl font-black text-white">
                  {stage.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{stage.title}</h3>
                <p className="text-gray-400">{stage.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#64FFDA] to-[#3B82F6]"></div>
                )}
              </motion.div>
            ))}
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
            className="glass-modern p-12 text-center"
          >
            <h2 className="text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                Don't See Your Role?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We're always looking for exceptional talent. Send us your resume and let's talk!
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <FiMail className="text-[#64FFDA] text-2xl" />
              <a href="mailto:careers@neuralcipher.ai" className="text-white hover:text-[#64FFDA] transition-colors font-semibold text-lg">
                careers@neuralcipher.ai
              </a>
            </div>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] text-white font-bold hover:opacity-90 transition-opacity"
            >
              Get in Touch
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
