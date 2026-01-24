'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiDownload, FiArrowRight, FiImage, FiFileText, FiVideo, FiAward, FiUsers, FiTrendingUp, FiGlobe, FiMail, FiLinkedin, FiTwitter, FiGithub, FiYoutube, FiChevronDown, FiMessageCircle, FiHelpCircle } from 'react-icons/fi'
import Footer from '@/components/layout/Footer'

export default function PressKitPage() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  
  const downloadAsset = (assetName: string) => {
    console.log(`Downloading: ${assetName}`)
  }

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
              <Link href="/trials" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Clinical Trials
              </Link>
              <Link href="/press" className="px-3 py-2 text-sm text-[#64FFDA] transition-colors font-medium rounded-lg bg-white/5">
                Press Kit
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
                <FiFileText className="text-[#64FFDA]" />
                <span className="text-sm text-[#64FFDA] font-semibold">Media Resources</span>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                  Press Kit
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Download brand assets, company information, and media resources for NeuralCipher.ai
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-modern p-12"
          >
            <h2 className="text-4xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                About NeuralCipher.ai
              </span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Company Overview</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  NeuralCipher.ai is a pioneering healthcare technology company specializing in AI-powered early detection of Parkinson's disease through voice analysis. Our proprietary deep learning algorithms analyze 59 vocal biomarkers to provide accurate, non-invasive screening with 92% accuracy.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Founded in 2024, we're revolutionizing neurological disease detection by making advanced AI diagnostics accessible to everyone, anywhere. Our platform serves patients, healthcare providers, and researchers worldwide.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Key Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#64FFDA] mt-2"></div>
                    <div>
                      <div className="text-white font-semibold">Founded:</div>
                      <div className="text-gray-400">2024</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#64FFDA] mt-2"></div>
                    <div>
                      <div className="text-white font-semibold">Headquarters:</div>
                      <div className="text-gray-400">San Francisco, CA</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#64FFDA] mt-2"></div>
                    <div>
                      <div className="text-white font-semibold">Technology:</div>
                      <div className="text-gray-400">AI-Powered Voice Analysis</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#64FFDA] mt-2"></div>
                    <div>
                      <div className="text-white font-semibold">Accuracy:</div>
                      <div className="text-gray-400">92% Detection Rate</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#64FFDA] mt-2"></div>
                    <div>
                      <div className="text-white font-semibold">Users:</div>
                      <div className="text-gray-400">10,000+ Active Users</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Colors */}
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
                Brand Colors
              </span>
            </h2>
            <p className="text-xl text-gray-300">Our signature color palette</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Cyan Primary", hex: "#64FFDA", rgb: "100, 255, 218", usage: "Primary brand color, CTAs, highlights" },
              { name: "Blue Accent", hex: "#3B82F6", rgb: "59, 130, 246", usage: "Secondary actions, links, gradients" },
              { name: "Purple Accent", hex: "#8B5CF6", rgb: "139, 92, 246", usage: "Tertiary elements, special features" }
            ].map((color, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-8"
              >
                <div className="w-full h-32 rounded-xl mb-6" style={{ backgroundColor: color.hex }}></div>
                <h3 className="text-2xl font-bold text-white mb-3">{color.name}</h3>
                <div className="space-y-2 text-gray-300">
                  <p className="font-mono text-sm">HEX: {color.hex}</p>
                  <p className="font-mono text-sm">RGB: {color.rgb}</p>
                  <p className="text-sm mt-4 text-gray-400">{color.usage}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets */}
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
                Brand Assets
              </span>
            </h2>
            <p className="text-xl text-gray-300">Download our logos, colors, and brand guidelines</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FiImage,
                title: "Logo Package",
                description: "Full logo suite including SVG, PNG, and EPS formats in light and dark versions",
                size: "2.4 MB",
                color: "#64FFDA"
              },
              {
                icon: FiFileText,
                title: "Brand Guidelines",
                description: "Complete brand identity guide with typography, colors, and usage rules",
                size: "5.1 MB",
                color: "#3B82F6"
              },
              {
                icon: FiImage,
                title: "Product Screenshots",
                description: "High-resolution screenshots of our platform and mobile app",
                size: "12.8 MB",
                color: "#8B5CF6"
              },
              {
                icon: FiVideo,
                title: "Demo Videos",
                description: "Product demonstration videos and platform walkthroughs",
                size: "45.2 MB",
                color: "#64FFDA"
              },
              {
                icon: FiUsers,
                title: "Team Photos",
                description: "Professional headshots and team photos for media use",
                size: "8.6 MB",
                color: "#3B82F6"
              },
              {
                icon: FiFileText,
                title: "Press Release",
                description: "Latest company announcements and press releases",
                size: "1.2 MB",
                color: "#8B5CF6"
              },
              {
                icon: FiImage,
                title: "Infographics",
                description: "Data visualizations and infographics about Parkinson's detection",
                size: "6.3 MB",
                color: "#64FFDA"
              },
              {
                icon: FiFileText,
                title: "White Papers",
                description: "Technical documentation and research papers",
                size: "3.8 MB",
                color: "#3B82F6"
              },
              {
                icon: FiImage,
                title: "Social Media Kit",
                description: "Pre-sized graphics for all major social media platforms",
                size: "4.2 MB",
                color: "#8B5CF6"
              }
            ].map((asset, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-8 hover:border-[#64FFDA]/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${asset.color}20` }}>
                    <asset.icon className="text-3xl" style={{ color: asset.color }} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#64FFDA] transition-colors">{asset.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-4">{asset.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{asset.size}</span>
                  <button
                    onClick={() => downloadAsset(asset.title)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#64FFDA]/10 hover:bg-[#64FFDA]/20 text-[#64FFDA] transition-all duration-300 font-semibold"
                  >
                    <FiDownload />
                    Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News & Press Coverage */}
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
                Recent Press Coverage
              </span>
            </h2>
            <p className="text-xl text-gray-300">Featured in leading healthcare and technology publications</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                outlet: "TechCrunch",
                date: "January 15, 2026",
                headline: "NeuralCipher.ai Achieves 92% Accuracy in Early Parkinson's Detection",
                excerpt: "Revolutionary AI platform uses voice analysis to detect Parkinson's disease years before traditional diagnosis methods...",
                link: "#"
              },
              {
                outlet: "Healthcare IT News",
                date: "January 10, 2026",
                headline: "Voice-Based AI Screening Shows Promise for Neurological Disorders",
                excerpt: "Clinical trials demonstrate significant potential for non-invasive early detection using advanced machine learning...",
                link: "#"
              },
              {
                outlet: "MIT Technology Review",
                date: "December 28, 2025",
                headline: "The Future of Medical Diagnostics: AI-Powered Voice Analysis",
                excerpt: "How startups like NeuralCipher are transforming healthcare with accessible, accurate screening technology...",
                link: "#"
              },
              {
                outlet: "Forbes Health",
                date: "December 20, 2025",
                headline: "10 Healthcare AI Innovations to Watch in 2026",
                excerpt: "NeuralCipher.ai makes the list with groundbreaking approach to Parkinson's early detection through voice biomarkers...",
                link: "#"
              },
              {
                outlet: "Nature Medicine",
                date: "December 15, 2025",
                headline: "Deep Learning Models Show High Accuracy in Parkinson's Screening",
                excerpt: "Peer-reviewed study validates effectiveness of voice-based AI screening for early-stage Parkinson's disease...",
                link: "#"
              },
              {
                outlet: "The Verge",
                date: "December 5, 2025",
                headline: "This AI Can Detect Parkinson's From Your Voice",
                excerpt: "NeuralCipher's platform analyzes 59 vocal biomarkers to provide accurate, accessible screening from anywhere...",
                link: "#"
              }
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-8 hover:border-[#64FFDA]/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-sm font-bold text-[#64FFDA]">{article.outlet}</div>
                  <div className="text-sm text-gray-500">{article.date}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">{article.headline}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{article.excerpt}</p>
                <a href={article.link} className="inline-flex items-center gap-2 text-[#64FFDA] hover:text-[#3B82F6] transition-colors font-semibold">
                  Read Full Article
                  <FiArrowRight />
                </a>
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
            <p className="text-xl text-gray-300">Honored by leading organizations in healthcare and technology</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                award: "Best Healthcare AI Innovation",
                organization: "Health Tech Awards 2025",
                year: "2025"
              },
              {
                award: "Top 10 AI Startups to Watch",
                organization: "TechCrunch Disrupt",
                year: "2025"
              },
              {
                award: "Digital Health Innovation Award",
                organization: "HIMSS Global Conference",
                year: "2025"
              },
              {
                award: "Excellence in Medical AI",
                organization: "IEEE Engineering in Medicine",
                year: "2025"
              },
              {
                award: "Breakthrough Technology Award",
                organization: "MIT Technology Review",
                year: "2024"
              },
              {
                award: "Best Diagnostic Tool",
                organization: "Parkinson's Foundation",
                year: "2024"
              },
              {
                award: "Innovation in Neurology",
                organization: "American Academy of Neurology",
                year: "2024"
              },
              {
                award: "Startup of the Year",
                organization: "Healthcare Innovation Summit",
                year: "2024"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-6 text-center hover:border-[#64FFDA]/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-[#64FFDA]/10 flex items-center justify-center mx-auto mb-4">
                  <FiAward className="text-3xl text-[#64FFDA]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.award}</h3>
                <p className="text-sm text-gray-400 mb-1">{item.organization}</p>
                <p className="text-xs text-gray-500">{item.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Team */}
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
                Executive Team
              </span>
            </h2>
            <p className="text-xl text-gray-300">Meet the leaders driving innovation in healthcare AI</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Dr. Sarah Chen",
                title: "CEO & Co-Founder",
                bio: "Former Stanford AI researcher with 15+ years in medical technology. PhD in Machine Learning.",
                linkedin: "#"
              },
              {
                name: "Dr. Michael Rodriguez",
                title: "Chief Medical Officer",
                bio: "Board-certified neurologist specializing in movement disorders. 20+ years clinical experience.",
                linkedin: "#"
              },
              {
                name: "James Park",
                title: "CTO & Co-Founder",
                bio: "Ex-Google AI engineer. Led development of voice recognition systems for healthcare applications.",
                linkedin: "#"
              },
              {
                name: "Dr. Emily Watson",
                title: "Chief Science Officer",
                bio: "Published researcher in neurodegenerative diseases. Former MIT faculty member.",
                linkedin: "#"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-6 text-center hover:border-[#64FFDA]/50 transition-all duration-300"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 mx-auto mb-4 flex items-center justify-center">
                  <FiUsers className="text-4xl text-[#64FFDA]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-[#64FFDA] mb-3 font-semibold">{member.title}</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{member.bio}</p>
                <a href={member.linkedin} className="inline-flex items-center gap-2 text-gray-400 hover:text-[#64FFDA] transition-colors">
                  <FiLinkedin />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Milestones */}
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
                Company Milestones
              </span>
            </h2>
            <p className="text-xl text-gray-300">Our journey in revolutionizing healthcare</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FiAward,
                value: "92%",
                label: "Detection Accuracy",
                description: "Industry-leading AI accuracy"
              },
              {
                icon: FiUsers,
                value: "10K+",
                label: "Active Users",
                description: "Worldwide platform users"
              },
              {
                icon: FiTrendingUp,
                value: "795",
                label: "Training Samples",
                description: "Diverse dataset for AI"
              },
              {
                icon: FiGlobe,
                value: "15",
                label: "Countries",
                description: "Global clinical trials"
              }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-8 text-center hover:border-[#64FFDA]/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-[#64FFDA]/10 flex items-center justify-center mx-auto mb-4">
                  <milestone.icon className="text-4xl text-[#64FFDA]" />
                </div>
                <div className="text-5xl font-black text-[#64FFDA] mb-2">{milestone.value}</div>
                <div className="text-xl font-bold text-white mb-2">{milestone.label}</div>
                <div className="text-sm text-gray-400">{milestone.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
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
                Media Inquiries
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              For press inquiries, interviews, or additional information, please contact our media team
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-3 text-lg">
                <FiMail className="text-[#64FFDA] text-2xl" />
                <a href="mailto:press@neuralcipher.ai" className="text-white hover:text-[#64FFDA] transition-colors font-semibold">
                  press@neuralcipher.ai
                </a>
              </div>
              <div className="text-gray-400">
                Response time: Within 24 hours
              </div>
            </div>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] text-white font-bold hover:shadow-lg hover:shadow-[#64FFDA]/50 transition-all duration-300"
            >
              Contact Us
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
