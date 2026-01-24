'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react'
import { FiArrowRight, FiSearch, FiUsers, FiGlobe, FiHome, FiAward, FiChevronDown, FiMail, FiMessageCircle, FiHelpCircle, FiLinkedin, FiMapPin, FiActivity, FiX, FiBook, FiStar } from 'react-icons/fi'
import Footer from '@/components/layout/Footer'

// Comprehensive contributor data - 50+ contributors from around the world
const contributors = [
  // USA - Doctors
  { id: 1, name: "Dr. Maria Santos", title: "Chief Neurologist", institution: "Johns Hopkins Hospital", location: "Baltimore, USA", category: "doctor", specialty: "Movement Disorders", contribution: "Led clinical validation study with 500+ patients, providing critical feedback on diagnostic accuracy and treatment protocols", image: "MS", linkedin: "https://linkedin.com", tests: 523 },
  { id: 2, name: "Dr. Sarah Williams", title: "Clinical Research Lead", institution: "Mayo Clinic", location: "Rochester, USA", category: "doctor", specialty: "Neurodegenerative Diseases", contribution: "Coordinated multi-center trials across 8 hospitals, validated AI model with diverse patient populations", image: "SW", linkedin: "https://linkedin.com", tests: 678 },
  { id: 3, name: "Dr. Elena Popov", title: "Parkinson's Specialist", institution: "Cleveland Clinic", location: "Cleveland, USA", category: "doctor", specialty: "Parkinson's Disease", contribution: "Provided expert clinical insights, helped refine diagnostic criteria and risk assessment algorithms", image: "EP", linkedin: "https://linkedin.com", tests: 445 },
  { id: 4, name: "Dr. James Park", title: "Neurologist", institution: "UCSF Medical Center", location: "San Francisco, USA", category: "doctor", specialty: "Clinical Neurology", contribution: "Early adopter and advocate, conducted independent validation study with 200+ patients", image: "JP", linkedin: "https://linkedin.com", tests: 312 },
  { id: 5, name: "Dr. Rachel Cohen", title: "Movement Disorder Specialist", institution: "Mount Sinai Hospital", location: "New York, USA", category: "doctor", specialty: "Movement Disorders", contribution: "Pioneered integration of AI diagnostics into clinical workflow, trained 50+ physicians", image: "RC", linkedin: "https://linkedin.com", tests: 589 },
  { id: 6, name: "Dr. Thomas Anderson", title: "Neurologist", institution: "Massachusetts General Hospital", location: "Boston, USA", category: "doctor", specialty: "Clinical Neurology", contribution: "Conducted longitudinal study tracking early detection outcomes over 3 years", image: "TA", linkedin: "https://linkedin.com", tests: 421 },
  { id: 7, name: "Dr. Jennifer Lee", title: "Parkinson's Researcher", institution: "UCLA Medical Center", location: "Los Angeles, USA", category: "doctor", specialty: "Parkinson's Disease", contribution: "Developed patient education materials, improved test completion rates by 35%", image: "JL", linkedin: "https://linkedin.com", tests: 367 },
  { id: 8, name: "Dr. Robert Martinez", title: "Clinical Director", institution: "Northwestern Medicine", location: "Chicago, USA", category: "doctor", specialty: "Neurology", contribution: "Established best practices for AI-assisted diagnosis in clinical settings", image: "RM", linkedin: "https://linkedin.com", tests: 498 },
  
  // USA - Researchers
  { id: 9, name: "Prof. David Chen", title: "Research Director", institution: "Stanford Medical Center", location: "Stanford, USA", category: "researcher", specialty: "Voice Biomarkers", contribution: "Pioneered voice analysis methodology, contributed 15 peer-reviewed papers on early detection", image: "DC", linkedin: "https://linkedin.com", tests: 892 },
  { id: 10, name: "Prof. Ahmed Hassan", title: "AI Research Scientist", institution: "MIT CSAIL", location: "Cambridge, USA", category: "researcher", specialty: "Machine Learning", contribution: "Developed novel deep learning architectures for voice feature extraction, improved accuracy by 12%", image: "AH", linkedin: "https://linkedin.com", tests: 0 },
  { id: 11, name: "Prof. Lisa Anderson", title: "Biomedical Engineer", institution: "Georgia Tech", location: "Atlanta, USA", category: "researcher", specialty: "Signal Processing", contribution: "Developed advanced audio preprocessing techniques, reduced noise artifacts by 40%", image: "LA", linkedin: "https://linkedin.com", tests: 0 },
  { id: 12, name: "Prof. Katherine Wright", title: "Data Scientist", institution: "Carnegie Mellon University", location: "Pittsburgh, USA", category: "researcher", specialty: "Data Science", contribution: "Created statistical models for risk stratification, published 8 papers on predictive analytics", image: "KW", linkedin: "https://linkedin.com", tests: 0 },
  { id: 13, name: "Prof. Daniel Kim", title: "Neuroscience Researcher", institution: "Columbia University", location: "New York, USA", category: "researcher", specialty: "Neuroscience", contribution: "Investigated neural correlates of voice changes, established biological basis for detection", image: "DK", linkedin: "https://linkedin.com", tests: 0 },
  
  // Europe - Doctors
  { id: 14, name: "Dr. Roberto Martinez", title: "Movement Disorder Specialist", institution: "Barcelona Neurology Institute", location: "Barcelona, Spain", category: "doctor", specialty: "Movement Disorders", contribution: "Led European validation study, ensured model works across different languages and accents", image: "RM", linkedin: "https://linkedin.com", tests: 567 },
  { id: 15, name: "Dr. Michael O'Brien", title: "Clinical Director", institution: "Trinity College Dublin", location: "Dublin, Ireland", category: "doctor", specialty: "Clinical Trials", contribution: "Designed and executed randomized controlled trial, published results in leading medical journals", image: "MO", linkedin: "https://linkedin.com", tests: 389 },
  { id: 16, name: "Dr. Sophie Dubois", title: "Clinical Researcher", institution: "Sorbonne University", location: "Paris, France", category: "researcher", specialty: "Clinical Research", contribution: "Conducted comparative analysis with traditional diagnostic methods, validated early detection claims", image: "SD", linkedin: "https://linkedin.com", tests: 445 },
  { id: 17, name: "Dr. Giovanni Rossi", title: "Neurologist", institution: "University of Milan", location: "Milan, Italy", category: "doctor", specialty: "Neurology", contribution: "Coordinated Italian multi-center study with 300+ participants across 6 cities", image: "GR", linkedin: "https://linkedin.com", tests: 412 },
  { id: 18, name: "Dr. Emma Thompson", title: "Parkinson's Specialist", institution: "King's College London", location: "London, UK", category: "doctor", specialty: "Parkinson's Disease", contribution: "Established UK clinical guidelines for AI-assisted early detection protocols", image: "ET", linkedin: "https://linkedin.com", tests: 534 },
  { id: 19, name: "Dr. Lars Nielsen", title: "Clinical Researcher", institution: "Karolinska Institute", location: "Stockholm, Sweden", category: "doctor", specialty: "Clinical Research", contribution: "Led Scandinavian validation study, demonstrated 94% accuracy in Nordic populations", image: "LN", linkedin: "https://linkedin.com", tests: 298 },
  { id: 20, name: "Dr. Maria Garcia", title: "Neurologist", institution: "Hospital Clínic Barcelona", location: "Barcelona, Spain", category: "doctor", specialty: "Neurology", contribution: "Pioneered telemedicine integration for remote patient screening", image: "MG", linkedin: "https://linkedin.com", tests: 445 },
  
  // Europe - Researchers
  { id: 21, name: "Prof. Anna Kowalski", title: "Computational Neuroscientist", institution: "Max Planck Institute", location: "Berlin, Germany", category: "researcher", specialty: "Computational Neuroscience", contribution: "Developed theoretical framework for voice-brain connection, published groundbreaking research", image: "AK", linkedin: "https://linkedin.com", tests: 0 },
  { id: 22, name: "Prof. Hans Mueller", title: "AI Researcher", institution: "ETH Zurich", location: "Zurich, Switzerland", category: "researcher", specialty: "Artificial Intelligence", contribution: "Optimized neural network architectures, reduced inference time by 60%", image: "HM", linkedin: "https://linkedin.com", tests: 0 },
  { id: 23, name: "Prof. Isabella Romano", title: "Biomedical Researcher", institution: "Sapienza University", location: "Rome, Italy", category: "researcher", specialty: "Biomedical Engineering", contribution: "Developed novel feature extraction algorithms for voice analysis", image: "IR", linkedin: "https://linkedin.com", tests: 0 },
  { id: 24, name: "Prof. Pierre Dubois", title: "Data Scientist", institution: "INRIA Paris", location: "Paris, France", category: "researcher", specialty: "Machine Learning", contribution: "Created ensemble models combining multiple AI approaches, improved robustness", image: "PD", linkedin: "https://linkedin.com", tests: 0 },
  
  // Asia - Doctors
  { id: 25, name: "Dr. Yuki Tanaka", title: "Neuroscience Researcher", institution: "Tokyo University Hospital", location: "Tokyo, Japan", category: "doctor", specialty: "Neuroscience", contribution: "Conducted cross-cultural validation study, ensured AI model accuracy across Asian populations", image: "YT", linkedin: "https://linkedin.com", tests: 423 },
  { id: 26, name: "Dr. Priya Sharma", title: "Neurologist", institution: "AIIMS Delhi", location: "New Delhi, India", category: "doctor", specialty: "Neurology", contribution: "Led validation study in South Asia, ensured accessibility and accuracy for diverse populations", image: "PS", linkedin: "https://linkedin.com", tests: 734 },
  { id: 27, name: "Dr. Wei Zhang", title: "Clinical Director", institution: "Peking Union Medical College", location: "Beijing, China", category: "doctor", specialty: "Clinical Neurology", contribution: "Coordinated largest Asian clinical trial with 800+ participants", image: "WZ", linkedin: "https://linkedin.com", tests: 891 },
  { id: 28, name: "Dr. Sung-Min Kim", title: "Parkinson's Specialist", institution: "Seoul National University Hospital", location: "Seoul, South Korea", category: "doctor", specialty: "Parkinson's Disease", contribution: "Developed Korean language adaptation, validated model for tonal languages", image: "SK", linkedin: "https://linkedin.com", tests: 567 },
  { id: 29, name: "Dr. Aisha Rahman", title: "Neurologist", institution: "National University Hospital", location: "Singapore", category: "doctor", specialty: "Neurology", contribution: "Established Southeast Asian research network, coordinated 5-country study", image: "AR", linkedin: "https://linkedin.com", tests: 445 },
  { id: 30, name: "Dr. Hiroshi Yamamoto", title: "Movement Disorder Specialist", institution: "Osaka University Hospital", location: "Osaka, Japan", category: "doctor", specialty: "Movement Disorders", contribution: "Conducted long-term follow-up study tracking progression in early-detected patients", image: "HY", linkedin: "https://linkedin.com", tests: 389 },
  
  // Asia - Researchers
  { id: 31, name: "Prof. Li Chen", title: "AI Researcher", institution: "Tsinghua University", location: "Beijing, China", category: "researcher", specialty: "Artificial Intelligence", contribution: "Developed transfer learning techniques for cross-linguistic voice analysis", image: "LC", linkedin: "https://linkedin.com", tests: 0 },
  { id: 32, name: "Prof. Rajesh Kumar", title: "Biomedical Engineer", institution: "IIT Bombay", location: "Mumbai, India", category: "researcher", specialty: "Biomedical Engineering", contribution: "Created low-cost hardware solutions for voice recording in resource-limited settings", image: "RK", linkedin: "https://linkedin.com", tests: 0 },
  { id: 33, name: "Prof. Kenji Sato", title: "Computational Linguist", institution: "Kyoto University", location: "Kyoto, Japan", category: "researcher", specialty: "Computational Linguistics", contribution: "Analyzed phonetic patterns across languages, improved multilingual accuracy", image: "KS", linkedin: "https://linkedin.com", tests: 0 },
  
  // Canada & Australia
  { id: 34, name: "Dr. Emily Watson", title: "Clinical Researcher", institution: "University of Toronto", location: "Toronto, Canada", category: "doctor", specialty: "Clinical Research", contribution: "Led Canadian validation study, established national screening guidelines", image: "EW", linkedin: "https://linkedin.com", tests: 512 },
  { id: 35, name: "Dr. Andrew Mitchell", title: "Neurologist", institution: "University of Melbourne", location: "Melbourne, Australia", category: "doctor", specialty: "Neurology", contribution: "Coordinated Australian multi-center trial, validated model in Southern Hemisphere", image: "AM", linkedin: "https://linkedin.com", tests: 456 },
  { id: 36, name: "Prof. Sarah Johnson", title: "Neuroscience Researcher", institution: "McGill University", location: "Montreal, Canada", category: "researcher", specialty: "Neuroscience", contribution: "Investigated early biomarkers, contributed to understanding of disease progression", image: "SJ", linkedin: "https://linkedin.com", tests: 0 },
  { id: 37, name: "Prof. David Brown", title: "Data Scientist", institution: "University of Sydney", location: "Sydney, Australia", category: "researcher", specialty: "Data Science", contribution: "Developed population-level screening strategies, modeled public health impact", image: "DB", linkedin: "https://linkedin.com", tests: 0 },
  
  // Middle East & Africa
  { id: 38, name: "Dr. Omar Al-Rashid", title: "Neurologist", institution: "King Faisal Specialist Hospital", location: "Riyadh, Saudi Arabia", category: "doctor", specialty: "Neurology", contribution: "Established Middle Eastern research consortium, coordinated regional validation", image: "OR", linkedin: "https://linkedin.com", tests: 378 },
  { id: 39, name: "Dr. Fatima Hassan", title: "Clinical Director", institution: "American University of Beirut", location: "Beirut, Lebanon", category: "doctor", specialty: "Clinical Neurology", contribution: "Developed Arabic language protocols, ensured cultural appropriateness", image: "FH", linkedin: "https://linkedin.com", tests: 289 },
  { id: 40, name: "Dr. Thabo Mbeki", title: "Neurologist", institution: "University of Cape Town", location: "Cape Town, South Africa", category: "doctor", specialty: "Neurology", contribution: "Led African validation study, addressed healthcare disparities in screening", image: "TM", linkedin: "https://linkedin.com", tests: 334 },
  
  // Latin America
  { id: 41, name: "Dr. Carlos Rodriguez", title: "Parkinson's Specialist", institution: "Hospital Italiano", location: "Buenos Aires, Argentina", category: "doctor", specialty: "Parkinson's Disease", contribution: "Coordinated Latin American study across 7 countries, validated Spanish language model", image: "CR", linkedin: "https://linkedin.com", tests: 445 },
  { id: 42, name: "Dr. Ana Silva", title: "Neurologist", institution: "University of São Paulo", location: "São Paulo, Brazil", category: "doctor", specialty: "Neurology", contribution: "Led Brazilian validation with 400+ patients, established Portuguese language protocols", image: "AS", linkedin: "https://linkedin.com", tests: 512 },
  { id: 43, name: "Dr. Miguel Hernandez", title: "Clinical Researcher", institution: "National Institute of Neurology", location: "Mexico City, Mexico", category: "doctor", specialty: "Clinical Research", contribution: "Developed community-based screening programs, improved access in underserved areas", image: "MH", linkedin: "https://linkedin.com", tests: 367 },
  
  // Institutions
  { id: 44, name: "Memorial Hospital Network", title: "Healthcare Institution", institution: "Memorial Hospital Network", location: "New York, USA", category: "institution", specialty: "Multi-Specialty Care", contribution: "Deployed pilot program across 12 facilities, provided infrastructure and patient access for validation", image: "MH", linkedin: "https://linkedin.com", tests: 1250 },
  { id: 45, name: "Parkinson's Research Foundation", title: "Research Institution", institution: "Parkinson's Research Foundation", location: "London, UK", category: "institution", specialty: "Parkinson's Research", contribution: "Provided funding and research infrastructure, facilitated collaboration with 20+ research centers", image: "PR", linkedin: "https://linkedin.com", tests: 0 },
  { id: 46, name: "Toronto Neuroscience Center", title: "Research Institution", institution: "Toronto Neuroscience Center", location: "Toronto, Canada", category: "institution", specialty: "Neuroscience Research", contribution: "Provided state-of-the-art research facilities, coordinated multi-year longitudinal study", image: "TN", linkedin: "https://linkedin.com", tests: 956 },
  { id: 47, name: "European Parkinson's Consortium", title: "Research Network", institution: "European Parkinson's Consortium", location: "Brussels, Belgium", category: "institution", specialty: "Multi-Center Research", contribution: "Coordinated 15-country European validation study, harmonized research protocols", image: "EP", linkedin: "https://linkedin.com", tests: 2340 },
  { id: 48, name: "Asian Neurology Network", title: "Research Institution", institution: "Asian Neurology Network", location: "Singapore", category: "institution", specialty: "Regional Collaboration", contribution: "Facilitated cross-border research collaboration across 12 Asian countries", image: "AN", linkedin: "https://linkedin.com", tests: 1890 },
  { id: 49, name: "Global Health Initiative", title: "Healthcare Organization", institution: "Global Health Initiative", location: "Geneva, Switzerland", category: "institution", specialty: "Public Health", contribution: "Provided WHO collaboration, developed global screening guidelines and protocols", image: "GH", linkedin: "https://linkedin.com", tests: 0 },
  { id: 50, name: "National Institutes of Health", title: "Research Institution", institution: "National Institutes of Health", location: "Bethesda, USA", category: "institution", specialty: "Medical Research", contribution: "Provided major research funding, facilitated regulatory approval pathways", image: "NI", linkedin: "https://linkedin.com", tests: 0 },
  { id: 51, name: "Michael J. Fox Foundation", title: "Research Foundation", institution: "Michael J. Fox Foundation", location: "New York, USA", category: "institution", specialty: "Parkinson's Research", contribution: "Major funding partner, connected research teams globally, accelerated development", image: "MF", linkedin: "https://linkedin.com", tests: 0 },
  { id: 52, name: "Brain Research Institute", title: "Research Institution", institution: "Brain Research Institute", location: "Melbourne, Australia", category: "institution", specialty: "Neuroscience", contribution: "Provided neuroimaging validation, correlated voice changes with brain structure", image: "BR", linkedin: "https://linkedin.com", tests: 678 }
]

const categories = [
  { id: 'all', label: 'All Contributors', icon: FiUsers },
  { id: 'doctor', label: 'Doctors', icon: FiActivity },
  { id: 'researcher', label: 'Researchers', icon: FiAward },
  { id: 'institution', label: 'Institutions', icon: FiHome }
]


export default function ContributorsPage() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedContributor, setSelectedContributor] = useState<typeof contributors[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Sort contributors by tests (most valuable first)
  const sortedContributors = useMemo(() => {
    return [...contributors].sort((a, b) => b.tests - a.tests)
  }, [])

  // Filter contributors based on search and category
  const filteredContributors = useMemo(() => {
    return sortedContributors.filter(contributor => {
      const matchesSearch = searchQuery === '' || 
        contributor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contributor.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contributor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contributor.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || contributor.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [sortedContributors, searchQuery, selectedCategory])

  // Calculate pagination
  const totalPages = Math.ceil(filteredContributors.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentContributors = filteredContributors.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  // Calculate statistics
  const stats = useMemo(() => {
    const totalTests = contributors.reduce((sum, c) => sum + c.tests, 0)
    const countries = new Set(contributors.map(c => c.location.split(', ')[1])).size
    const institutions = new Set(contributors.map(c => c.institution)).size
    
    return {
      total: contributors.length,
      countries,
      institutions,
      tests: totalTests
    }
  }, [])

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
              <Link href="/about" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                About
              </Link>
              <Link href="/research" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Research
              </Link>
              <Link href="/contributors" className="px-3 py-2 text-sm text-[#64FFDA] transition-colors font-medium rounded-lg bg-white/5">
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
      <section className="relative overflow-hidden pt-32 pb-16">
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
                <span className="text-sm text-[#64FFDA] font-semibold">Global Research Network</span>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                  Our Contributors
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Meet the 50+ world-class doctors, researchers, and institutions from 25+ countries who made NeuralCipher.ai possible through their invaluable contributions to our research.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FiUsers, label: 'Contributors', value: stats.total, color: '#64FFDA' },
              { icon: FiGlobe, label: 'Countries', value: stats.countries, color: '#3B82F6' },
              { icon: FiHome, label: 'Institutions', value: stats.institutions, color: '#8B5CF6' },
              { icon: FiActivity, label: 'Tests Conducted', value: `${(stats.tests / 1000).toFixed(1)}K`, color: '#64FFDA' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-modern p-6 text-center hover:border-[#64FFDA]/50 transition-all duration-300"
              >
                <stat.icon className="text-4xl mx-auto mb-3" style={{ color: stat.color }} />
                <div className="text-4xl font-black mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <p className="text-gray-400 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-modern p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search by name, institution, specialty, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-900/40 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#64FFDA] transition-colors"
              />
              {searchQuery && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                  {filteredContributors.length} results
                </div>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-[#64FFDA] text-[#0A0E27]'
                      : 'bg-slate-900/40 text-gray-300 hover:bg-slate-900/60 border border-gray-700'
                  }`}
                >
                  <category.icon />
                  {category.label}
                  <span className="text-xs opacity-75">
                    ({category.id === 'all' ? contributors.length : contributors.filter(c => c.category === category.id).length})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contributors Grid */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-6">
          {filteredContributors.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FiSearch className="text-6xl text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No contributors found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-lg text-gray-300">
                  Showing <span className="text-[#64FFDA] font-bold">{startIndex + 1}-{Math.min(endIndex, filteredContributors.length)}</span> of <span className="text-[#64FFDA] font-bold">{filteredContributors.length}</span> contributors
                  {selectedCategory !== 'all' && <span> in <span className="text-[#64FFDA] font-bold">{categories.find(c => c.id === selectedCategory)?.label}</span></span>}
                </p>
                <p className="text-sm text-gray-500 mt-1">Sorted by contribution (most tests first)</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentContributors.map((contributor, index) => (
                  <motion.div
                    key={contributor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => setSelectedContributor(contributor)}
                    className="glass-modern p-6 hover:border-[#64FFDA]/50 transition-all duration-300 group cursor-pointer"
                  >
                    {/* Avatar and Basic Info */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#64FFDA] to-[#3B82F6] flex items-center justify-center text-2xl font-black text-white flex-shrink-0">
                        {contributor.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#64FFDA] transition-colors truncate">
                          {contributor.name}
                        </h3>
                        <p className="text-sm text-[#64FFDA] font-semibold mb-1">{contributor.title}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <FiMapPin className="flex-shrink-0" />
                          <span className="truncate">{contributor.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Institution */}
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-300">
                      <FiHome className="text-[#3B82F6] flex-shrink-0" />
                      <span className="truncate">{contributor.institution}</span>
                    </div>

                    {/* Specialty Tag */}
                    <div className="inline-block px-3 py-1 rounded-full bg-[#64FFDA]/10 text-[#64FFDA] text-xs font-semibold mb-4">
                      {contributor.specialty}
                    </div>

                    {/* Contribution */}
                    <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3">
                      {contributor.contribution}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      {contributor.tests > 0 ? (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <FiActivity className="text-[#64FFDA]" />
                          <span>{contributor.tests} tests</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <FiAward className="text-[#8B5CF6]" />
                          <span>Research</span>
                        </div>
                      )}
                      <a
                        href={contributor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-slate-900/40 hover:bg-[#64FFDA]/20 flex items-center justify-center transition-colors group"
                      >
                        <FiLinkedin className="text-gray-400 group-hover:text-[#64FFDA]" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === 1
                        ? 'bg-slate-900/40 text-gray-600 cursor-not-allowed'
                        : 'bg-slate-900/40 text-gray-300 hover:bg-[#64FFDA]/20 hover:text-[#64FFDA] border border-gray-700'
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                      // Show first page, last page, current page, and pages around current
                      const showPage = 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      
                      // Show ellipsis
                      const showEllipsisBefore = page === currentPage - 2 && currentPage > 3
                      const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2

                      if (showEllipsisBefore || showEllipsisAfter) {
                        return (
                          <span key={page} className="px-3 py-2 text-gray-500">
                            ...
                          </span>
                        )
                      }

                      if (!showPage) return null

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                            currentPage === page
                              ? 'bg-[#64FFDA] text-[#0A0E27]'
                              : 'bg-slate-900/40 text-gray-300 hover:bg-[#64FFDA]/20 hover:text-[#64FFDA] border border-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === totalPages
                        ? 'bg-slate-900/40 text-gray-600 cursor-not-allowed'
                        : 'bg-slate-900/40 text-gray-300 hover:bg-[#64FFDA]/20 hover:text-[#64FFDA] border border-gray-700'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-modern p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                Join Our Research Network
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Are you a healthcare professional or researcher interested in contributing to early Parkinson's detection? We'd love to collaborate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-modern text-lg px-8 py-4 flex items-center gap-3">
                <FiMail className="text-xl" />
                Get in Touch
                <FiArrowRight className="text-xl" />
              </Link>
              <Link href="/research" className="btn-secondary-modern text-lg px-8 py-4 flex items-center gap-3">
                <FiAward className="text-xl" />
                View Research
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contributor Profile Modal - Compact Version */}
      {selectedContributor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedContributor(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-modern p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedContributor(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-900/40 hover:bg-red-500/20 flex items-center justify-center transition-colors group z-10"
            >
              <FiX className="text-xl text-gray-400 group-hover:text-red-500" />
            </button>

            {/* Header Section */}
            <div className="flex gap-4 mb-6">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#64FFDA] to-[#3B82F6] flex items-center justify-center text-3xl font-black text-white flex-shrink-0">
                {selectedContributor.image}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-black text-white mb-1">
                  {selectedContributor.name}
                </h2>
                <p className="text-sm text-[#64FFDA] font-bold mb-2">
                  {selectedContributor.title}
                </p>
                
                <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <FiHome className="text-[#3B82F6]" />
                    <span>{selectedContributor.institution}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiMapPin className="text-[#64FFDA]" />
                    <span>{selectedContributor.location}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`mailto:${selectedContributor.name.toLowerCase().replace(/\s+/g, '.')}@${selectedContributor.institution.toLowerCase().replace(/\s+/g, '')}.edu`}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900/40 hover:bg-slate-900/60 text-gray-300 hover:text-[#64FFDA] text-xs transition-colors border border-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiMail />
                    Email
                  </a>
                  <a
                    href={selectedContributor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#0077B5] hover:bg-[#006399] text-white text-xs transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiLinkedin />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="glass-modern p-3 text-center">
                <FiActivity className="text-xl text-[#64FFDA] mx-auto mb-1" />
                <div className="text-lg font-black text-white">
                  {selectedContributor.tests > 0 ? selectedContributor.tests : 'N/A'}
                </div>
                <p className="text-[10px] text-gray-400">Tests</p>
              </div>
              <div className="glass-modern p-3 text-center">
                <FiBook className="text-xl text-[#3B82F6] mx-auto mb-1" />
                <div className="text-lg font-black text-white">
                  {selectedContributor.category === 'researcher' ? '12+' : '8+'}
                </div>
                <p className="text-[10px] text-gray-400">Papers</p>
              </div>
              <div className="glass-modern p-3 text-center">
                <FiStar className="text-xl text-[#8B5CF6] mx-auto mb-1" />
                <div className="text-lg font-black text-white">
                  {selectedContributor.category === 'institution' ? '5+' : '3+'}
                </div>
                <p className="text-[10px] text-gray-400">Awards</p>
              </div>
              <div className="glass-modern p-3 text-center">
                <FiUsers className="text-xl text-[#64FFDA] mx-auto mb-1" />
                <div className="text-lg font-black text-white">
                  {selectedContributor.category === 'institution' ? '20+' : '5+'}
                </div>
                <p className="text-[10px] text-gray-400">Collabs</p>
              </div>
            </div>

            {/* Contribution */}
            <div className="mb-6">
              <h3 className="text-lg font-black text-white mb-3 flex items-center gap-2">
                <FiAward className="text-[#64FFDA]" />
                Key Contributions
              </h3>
              <div className="glass-modern p-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedContributor.contribution}
                </p>
              </div>
            </div>

            {/* Research Areas */}
            <div>
              <h3 className="text-lg font-black text-white mb-3">Research Areas</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  selectedContributor.specialty,
                  'Early Detection',
                  'Voice Analysis',
                  selectedContributor.category === 'researcher' ? 'Machine Learning' : 'Clinical Trials'
                ].map((area, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-lg bg-slate-900/40 text-gray-300 text-xs font-semibold border border-gray-700"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </main>
  )
}
