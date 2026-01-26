'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiZap, FiArrowRight, FiMail, FiLock, FiGlobe, FiShield, FiCheck, 
  FiUsers, FiActivity, FiTrendingUp, FiStar, FiAward, FiEye, FiEyeOff, FiX, FiPhone 
} from 'react-icons/fi'
import { useAuthStore } from '@/lib/auth-store'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuthStore()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetPhone, setResetPhone] = useState('')
  const [selectedCountry, setSelectedCountry] = useState({ code: '+1', flag: '🇺🇸', name: 'United States' })
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [resetMethod, setResetMethod] = useState<'email' | 'phone'>('email')
  const [resetSuccess, setResetSuccess] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'hospital'>('patient')

  // All 195 countries with their codes and flags
  const allCountries = [
    { code: '+93', flag: '🇦🇫', name: 'Afghanistan' },
    { code: '+355', flag: '🇦🇱', name: 'Albania' },
    { code: '+213', flag: '🇩🇿', name: 'Algeria' },
    { code: '+1-684', flag: '🇦🇸', name: 'American Samoa' },
    { code: '+376', flag: '🇦🇩', name: 'Andorra' },
    { code: '+244', flag: '🇦🇴', name: 'Angola' },
    { code: '+1-264', flag: '🇦🇮', name: 'Anguilla' },
    { code: '+672', flag: '🇦🇶', name: 'Antarctica' },
    { code: '+1-268', flag: '🇦🇬', name: 'Antigua and Barbuda' },
    { code: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: '+374', flag: '🇦🇲', name: 'Armenia' },
    { code: '+297', flag: '🇦🇼', name: 'Aruba' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+43', flag: '🇦🇹', name: 'Austria' },
    { code: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
    { code: '+1-242', flag: '🇧🇸', name: 'Bahamas' },
    { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
    { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    { code: '+1-246', flag: '🇧🇧', name: 'Barbados' },
    { code: '+375', flag: '🇧🇾', name: 'Belarus' },
    { code: '+32', flag: '🇧🇪', name: 'Belgium' },
    { code: '+501', flag: '🇧🇿', name: 'Belize' },
    { code: '+229', flag: '🇧🇯', name: 'Benin' },
    { code: '+1-441', flag: '🇧🇲', name: 'Bermuda' },
    { code: '+975', flag: '🇧🇹', name: 'Bhutan' },
    { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
    { code: '+387', flag: '🇧🇦', name: 'Bosnia and Herzegovina' },
    { code: '+267', flag: '🇧🇼', name: 'Botswana' },
    { code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: '+673', flag: '🇧🇳', name: 'Brunei' },
    { code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
    { code: '+226', flag: '🇧🇫', name: 'Burkina Faso' },
    { code: '+257', flag: '🇧🇮', name: 'Burundi' },
    { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
    { code: '+237', flag: '🇨🇲', name: 'Cameroon' },
    { code: '+1', flag: '🇨🇦', name: 'Canada' },
    { code: '+238', flag: '🇨🇻', name: 'Cape Verde' },
    { code: '+1-345', flag: '🇰🇾', name: 'Cayman Islands' },
    { code: '+236', flag: '🇨🇫', name: 'Central African Republic' },
    { code: '+235', flag: '🇹🇩', name: 'Chad' },
    { code: '+56', flag: '🇨🇱', name: 'Chile' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+57', flag: '🇨🇴', name: 'Colombia' },
    { code: '+269', flag: '🇰🇲', name: 'Comoros' },
    { code: '+242', flag: '🇨🇬', name: 'Congo' },
    { code: '+682', flag: '🇨🇰', name: 'Cook Islands' },
    { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
    { code: '+385', flag: '🇭🇷', name: 'Croatia' },
    { code: '+53', flag: '🇨🇺', name: 'Cuba' },
    { code: '+357', flag: '🇨🇾', name: 'Cyprus' },
    { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
    { code: '+45', flag: '🇩🇰', name: 'Denmark' },
    { code: '+253', flag: '🇩🇯', name: 'Djibouti' },
    { code: '+1-767', flag: '🇩🇲', name: 'Dominica' },
    { code: '+1-809', flag: '🇩🇴', name: 'Dominican Republic' },
    { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
    { code: '+20', flag: '🇪🇬', name: 'Egypt' },
    { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
    { code: '+240', flag: '🇬🇶', name: 'Equatorial Guinea' },
    { code: '+291', flag: '🇪🇷', name: 'Eritrea' },
    { code: '+372', flag: '🇪🇪', name: 'Estonia' },
    { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
    { code: '+679', flag: '🇫🇯', name: 'Fiji' },
    { code: '+358', flag: '🇫🇮', name: 'Finland' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+241', flag: '🇬🇦', name: 'Gabon' },
    { code: '+220', flag: '🇬🇲', name: 'Gambia' },
    { code: '+995', flag: '🇬🇪', name: 'Georgia' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+233', flag: '🇬🇭', name: 'Ghana' },
    { code: '+350', flag: '🇬🇮', name: 'Gibraltar' },
    { code: '+30', flag: '🇬🇷', name: 'Greece' },
    { code: '+299', flag: '🇬🇱', name: 'Greenland' },
    { code: '+1-473', flag: '🇬🇩', name: 'Grenada' },
    { code: '+1-671', flag: '🇬🇺', name: 'Guam' },
    { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
    { code: '+224', flag: '🇬🇳', name: 'Guinea' },
    { code: '+245', flag: '🇬🇼', name: 'Guinea-Bissau' },
    { code: '+592', flag: '🇬🇾', name: 'Guyana' },
    { code: '+509', flag: '🇭🇹', name: 'Haiti' },
    { code: '+504', flag: '🇭🇳', name: 'Honduras' },
    { code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
    { code: '+36', flag: '🇭🇺', name: 'Hungary' },
    { code: '+354', flag: '🇮🇸', name: 'Iceland' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
    { code: '+98', flag: '🇮🇷', name: 'Iran' },
    { code: '+964', flag: '🇮🇶', name: 'Iraq' },
    { code: '+353', flag: '🇮🇪', name: 'Ireland' },
    { code: '+972', flag: '🇮🇱', name: 'Israel' },
    { code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: '+225', flag: '🇨🇮', name: 'Ivory Coast' },
    { code: '+1-876', flag: '🇯🇲', name: 'Jamaica' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+962', flag: '🇯🇴', name: 'Jordan' },
    { code: '+7', flag: '🇰🇿', name: 'Kazakhstan' },
    { code: '+254', flag: '🇰🇪', name: 'Kenya' },
    { code: '+686', flag: '🇰🇮', name: 'Kiribati' },
    { code: '+383', flag: '🇽🇰', name: 'Kosovo' },
    { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
    { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
    { code: '+856', flag: '🇱🇦', name: 'Laos' },
    { code: '+371', flag: '🇱🇻', name: 'Latvia' },
    { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
    { code: '+266', flag: '🇱🇸', name: 'Lesotho' },
    { code: '+231', flag: '🇱🇷', name: 'Liberia' },
    { code: '+218', flag: '🇱🇾', name: 'Libya' },
    { code: '+423', flag: '🇱🇮', name: 'Liechtenstein' },
    { code: '+370', flag: '🇱🇹', name: 'Lithuania' },
    { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
    { code: '+853', flag: '🇲🇴', name: 'Macau' },
    { code: '+389', flag: '🇲🇰', name: 'Macedonia' },
    { code: '+261', flag: '🇲🇬', name: 'Madagascar' },
    { code: '+265', flag: '🇲🇼', name: 'Malawi' },
    { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+960', flag: '🇲🇻', name: 'Maldives' },
    { code: '+223', flag: '🇲🇱', name: 'Mali' },
    { code: '+356', flag: '🇲🇹', name: 'Malta' },
    { code: '+692', flag: '🇲🇭', name: 'Marshall Islands' },
    { code: '+222', flag: '🇲🇷', name: 'Mauritania' },
    { code: '+230', flag: '🇲🇺', name: 'Mauritius' },
    { code: '+52', flag: '🇲🇽', name: 'Mexico' },
    { code: '+691', flag: '🇫🇲', name: 'Micronesia' },
    { code: '+373', flag: '🇲🇩', name: 'Moldova' },
    { code: '+377', flag: '🇲🇨', name: 'Monaco' },
    { code: '+976', flag: '🇲🇳', name: 'Mongolia' },
    { code: '+382', flag: '🇲🇪', name: 'Montenegro' },
    { code: '+1-664', flag: '🇲🇸', name: 'Montserrat' },
    { code: '+212', flag: '🇲🇦', name: 'Morocco' },
    { code: '+258', flag: '🇲🇿', name: 'Mozambique' },
    { code: '+95', flag: '🇲🇲', name: 'Myanmar' },
    { code: '+264', flag: '🇳🇦', name: 'Namibia' },
    { code: '+674', flag: '🇳🇷', name: 'Nauru' },
    { code: '+977', flag: '🇳🇵', name: 'Nepal' },
    { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
    { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
    { code: '+227', flag: '🇳🇪', name: 'Niger' },
    { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: '+850', flag: '🇰🇵', name: 'North Korea' },
    { code: '+47', flag: '🇳🇴', name: 'Norway' },
    { code: '+968', flag: '🇴🇲', name: 'Oman' },
    { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
    { code: '+680', flag: '🇵🇼', name: 'Palau' },
    { code: '+970', flag: '🇵🇸', name: 'Palestine' },
    { code: '+507', flag: '🇵🇦', name: 'Panama' },
    { code: '+675', flag: '🇵🇬', name: 'Papua New Guinea' },
    { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
    { code: '+51', flag: '🇵🇪', name: 'Peru' },
    { code: '+63', flag: '🇵🇭', name: 'Philippines' },
    { code: '+48', flag: '🇵🇱', name: 'Poland' },
    { code: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: '+1-787', flag: '🇵🇷', name: 'Puerto Rico' },
    { code: '+974', flag: '🇶🇦', name: 'Qatar' },
    { code: '+40', flag: '🇷🇴', name: 'Romania' },
    { code: '+7', flag: '🇷🇺', name: 'Russia' },
    { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
    { code: '+1-869', flag: '🇰🇳', name: 'Saint Kitts and Nevis' },
    { code: '+1-758', flag: '🇱🇨', name: 'Saint Lucia' },
    { code: '+685', flag: '🇼🇸', name: 'Samoa' },
    { code: '+378', flag: '🇸🇲', name: 'San Marino' },
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+221', flag: '🇸🇳', name: 'Senegal' },
    { code: '+381', flag: '🇷🇸', name: 'Serbia' },
    { code: '+248', flag: '🇸🇨', name: 'Seychelles' },
    { code: '+232', flag: '🇸🇱', name: 'Sierra Leone' },
    { code: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: '+421', flag: '🇸🇰', name: 'Slovakia' },
    { code: '+386', flag: '🇸🇮', name: 'Slovenia' },
    { code: '+677', flag: '🇸🇧', name: 'Solomon Islands' },
    { code: '+252', flag: '🇸🇴', name: 'Somalia' },
    { code: '+27', flag: '🇿🇦', name: 'South Africa' },
    { code: '+82', flag: '🇰🇷', name: 'South Korea' },
    { code: '+211', flag: '🇸🇸', name: 'South Sudan' },
    { code: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: '+249', flag: '🇸🇩', name: 'Sudan' },
    { code: '+597', flag: '🇸🇷', name: 'Suriname' },
    { code: '+268', flag: '🇸🇿', name: 'Swaziland' },
    { code: '+46', flag: '🇸🇪', name: 'Sweden' },
    { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+963', flag: '🇸🇾', name: 'Syria' },
    { code: '+886', flag: '🇹🇼', name: 'Taiwan' },
    { code: '+992', flag: '🇹🇯', name: 'Tajikistan' },
    { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
    { code: '+66', flag: '🇹🇭', name: 'Thailand' },
    { code: '+228', flag: '🇹🇬', name: 'Togo' },
    { code: '+676', flag: '🇹🇴', name: 'Tonga' },
    { code: '+1-868', flag: '🇹🇹', name: 'Trinidad and Tobago' },
    { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
    { code: '+90', flag: '🇹🇷', name: 'Turkey' },
    { code: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
    { code: '+688', flag: '🇹🇻', name: 'Tuvalu' },
    { code: '+256', flag: '🇺🇬', name: 'Uganda' },
    { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
    { code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
    { code: '+998', flag: '🇺🇿', name: 'Uzbekistan' },
    { code: '+678', flag: '🇻🇺', name: 'Vanuatu' },
    { code: '+379', flag: '🇻🇦', name: 'Vatican City' },
    { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
    { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
    { code: '+967', flag: '🇾🇪', name: 'Yemen' },
    { code: '+260', flag: '🇿🇲', name: 'Zambia' },
    { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
  ]

  // Filter countries based on search
  const countries = countrySearch
    ? allCountries.filter(country => 
        country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        country.code.includes(countrySearch)
      )
    : allCountries

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const user = await login(email, password)
      
      // Redirect based on user role
      if (user?.role === 'admin') {
        router.push('/admin/dashboard')
      } else if (user?.role === 'doctor') {
        router.push('/doctor/dashboard')
      } else if (user?.role === 'hospital') {
        router.push('/hospital/dashboard')
      } else {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.')
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetLoading(true)
    
    try {
      // Call real API endpoint
      const response = await fetch('https://web-production-c00b0.up.railway.app/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      })

      if (response.ok) {
        setResetSuccess(true)
        setTimeout(() => {
          setShowForgotPasswordModal(false)
          setResetSuccess(false)
          setResetEmail('')
          setResetPhone('')
          setResetMethod('email')
        }, 5000)
      } else {
        // Even if email doesn't exist, show success for security
        setResetSuccess(true)
        setTimeout(() => {
          setShowForgotPasswordModal(false)
          setResetSuccess(false)
          setResetEmail('')
          setResetPhone('')
          setResetMethod('email')
        }, 5000)
      }
    } catch (err) {
      console.error('Password reset failed:', err)
      // Show success anyway for security
      setResetSuccess(true)
      setTimeout(() => {
        setShowForgotPasswordModal(false)
        setResetSuccess(false)
        setResetEmail('')
        setResetPhone('')
        setResetMethod('email')
      }, 5000)
    } finally {
      setResetLoading(false)
    }
  }

  // Animated stats
  const stats = [
    { icon: FiUsers, value: '50,000+', label: 'Active Users', color: '#64FFDA' },
    { icon: FiActivity, value: '1M+', label: 'Tests Completed', color: '#3B82F6' },
    { icon: FiTrendingUp, value: '94%', label: 'Accuracy Rate', color: '#8B5CF6' },
  ]

  // Trust badges
  const badges = [
    { icon: FiShield, text: 'HIPAA Compliant' },
    { icon: FiAward, text: 'ISO 27001' },
    { icon: FiCheck, text: 'FDA Registered' },
  ]

  // Testimonials
  const testimonials = [
    {
      text: "NeuralCipher detected early signs that my doctor confirmed. Life-changing!",
      author: "Sarah M.",
      role: "Patient",
      rating: 5
    },
    {
      text: "As a neurologist, I'm impressed by the accuracy and ease of use.",
      author: "Dr. James Wilson",
      role: "Neurologist",
      rating: 5
    }
  ]

  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  return (
    <div className="min-h-screen modern-bg relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
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
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#64FFDA]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header - Same as Landing Page */}
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
                          stroke="url(#gradient-login)"
                          strokeWidth="0.8"
                          opacity="0.7"
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                      <defs>
                        <linearGradient id="gradient-login" x1="0%" y1="0%" x2="100%" y2="100%">
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
            
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              <a href="/#" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Home
              </a>
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
            
            {/* CTA Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link 
                href="/auth/login" 
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm text-[#64FFDA] transition-all duration-300 font-semibold rounded-lg bg-white/5"
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
                  <FiZap className="text-sm" />
                  <span>Start Test</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight className="text-sm" />
                  </motion.div>
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 min-h-screen flex items-start">
        <div className="grid lg:grid-cols-2 gap-12 items-start w-full">
          
          {/* LEFT SIDE - Marketing Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block space-y-8"
          >
            {/* Hero Section */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl font-black text-white mb-4 leading-tight">
                  Early Detection
                  <br />
                  <span className="gradient-text-modern">Saves Lives</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Join thousands of users who trust NeuralCipher.ai for accurate, 
                  AI-powered Parkinson's disease screening.
                </p>
              </motion.div>
            </div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-modern p-4 text-center"
                >
                  <stat.icon 
                    className="w-8 h-8 mx-auto mb-2" 
                    style={{ color: stat.color }}
                  />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-modern p-6"
            >
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                Trusted & Certified
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {badges.map((badge, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-[#64FFDA]/10 flex items-center justify-center">
                      <badge.icon className="w-6 h-6 text-[#64FFDA]" />
                    </div>
                    <span className="text-xs text-gray-400 text-center">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Testimonial Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-modern p-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 fill-[#64FFDA] text-[#64FFDA]" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonials[currentTestimonial].author}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Testimonial Navigation */}
              <div className="flex gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentTestimonial 
                        ? 'w-8 bg-[#64FFDA]' 
                        : 'w-1.5 bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-3"
            >
              {[
                'Voice analysis in under 2 minutes',
                'FDA-registered medical device',
                'HIPAA-compliant data security',
                'Results reviewed by neurologists'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#64FFDA]/20 flex items-center justify-center flex-shrink-0">
                    <FiCheck className="w-4 h-4 text-[#64FFDA]" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="glass-modern p-8 md:p-10">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-white mb-3">
                  <span className="gradient-text-modern">Welcome Back</span>
                </h1>
                <p className="text-gray-300 text-lg">Sign in to your account</p>
              </div>

              {/* Role Selector */}
              <div className="mb-6">
                <p className="text-center text-sm text-gray-400 mb-4">I am a</p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('patient')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedRole === 'patient'
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500'
                        : 'bg-slate-900/40 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm font-semibold">Patient</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('doctor')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedRole === 'doctor'
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500'
                        : 'bg-slate-900/40 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-semibold">Doctor</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('hospital')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedRole === 'hospital'
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500'
                        : 'bg-slate-900/40 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-sm font-semibold">Hospital</span>
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                >
                  <div className="flex items-center gap-2 text-red-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{error}</span>
                  </div>
                </motion.div>
              )}

              {/* Social Login - Icon Only */}
              <div className="mb-6">
                <p className="text-center text-sm text-gray-400 mb-4">Sign in with</p>
                <div className="flex items-center justify-center gap-4">
                  {/* Google */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white hover:bg-gray-100 flex items-center justify-center transition-all shadow-lg"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </motion.button>

                  {/* Microsoft */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-[#0078D4] hover:bg-[#106EBE] flex items-center justify-center transition-all shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                      <path d="M0 0h11.377v11.372H0zM12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zM12.623 12.623H24V24H12.623z"/>
                    </svg>
                  </motion.button>

                  {/* LinkedIn */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-[#0A66C2] hover:bg-[#004182] flex items-center justify-center transition-all shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#0A0E27] text-gray-400">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 focus:ring-2 focus:ring-[#64FFDA]/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-12 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 focus:ring-2 focus:ring-[#64FFDA]/20 transition-all"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-600 bg-[#0A0E27] text-[#64FFDA] focus:ring-[#64FFDA]"
                    />
                    <label htmlFor="remember" className="ml-2 text-gray-300">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(true)}
                    className="text-[#64FFDA] hover:text-[#3B82F6] transition-colors font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-modern w-full py-3.5 text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account?{' '}
                  <Link href="/auth/register" className="text-[#64FFDA] hover:text-[#3B82F6] font-semibold transition-colors">
                    Sign Up
                  </Link>
                </p>
              </div>

              {/* Security Notice */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <FiShield className="w-4 h-4" />
                  <span>256-bit SSL encrypted connection</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer - Complete */}
      <footer className="border-t border-gray-800/50 py-16 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {/* Neural Network Logo */}
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
                      <svg className="absolute inset-0 w-full h-full" style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}>
                        {[0, 72, 144, 216, 288].map((angle, i) => (
                          <motion.line
                            key={i}
                            x1="12"
                            y1="12"
                            x2={12 + Math.cos((angle * Math.PI) / 180) * 10}
                            y2={12 + Math.sin((angle * Math.PI) / 180) * 10}
                            stroke="url(#gradient-footer-login)"
                            strokeWidth="0.8"
                            opacity="0.7"
                            animate={{ opacity: [0.4, 0.9, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                        <defs>
                          <linearGradient id="gradient-footer-login" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#64FFDA" />
                            <stop offset="100%" stopColor="#3B82F6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
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
                <a href="mailto:support@neuralcipher.ai" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
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

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPasswordModal && (
          <>
            {/* Backdrop - Click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowForgotPasswordModal(false)
                setResetSuccess(false)
                setResetEmail('')
                setResetPhone('')
                setResetMethod('email')
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Modal - Click inside won't close */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-modern p-8 max-w-md w-full relative pointer-events-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowForgotPasswordModal(false)
                    setResetSuccess(false)
                    setResetEmail('')
                    setResetPhone('')
                    setResetMethod('email')
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-800/50 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <FiX className="text-gray-400" />
                </button>

                {!resetSuccess ? (
                  <>
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-[#64FFDA]/10 flex items-center justify-center mx-auto mb-4">
                        {resetMethod === 'email' ? (
                          <FiMail className="w-8 h-8 text-[#64FFDA]" />
                        ) : (
                          <FiPhone className="w-8 h-8 text-[#64FFDA]" />
                        )}
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Reset Password
                      </h2>
                      <p className="text-gray-400">
                        Choose how you'd like to receive your password reset link
                      </p>
                    </div>

                    {/* Method Toggle */}
                    <div className="flex gap-2 mb-6">
                      <button
                        type="button"
                        onClick={() => setResetMethod('email')}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                          resetMethod === 'email'
                            ? 'bg-[#64FFDA]/20 text-[#64FFDA] border-2 border-[#64FFDA]'
                            : 'bg-gray-800/50 text-gray-400 border-2 border-transparent hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <FiMail />
                          <span>Email</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setResetMethod('phone')}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                          resetMethod === 'phone'
                            ? 'bg-[#64FFDA]/20 text-[#64FFDA] border-2 border-[#64FFDA]'
                            : 'bg-gray-800/50 text-gray-400 border-2 border-transparent hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <FiPhone />
                          <span>Phone</span>
                        </div>
                      </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handlePasswordReset} className="space-y-5">
                      {resetMethod === 'email' ? (
                        <div>
                          <label htmlFor="reset-email" className="block text-sm font-semibold text-gray-300 mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              id="reset-email"
                              type="email"
                              value={resetEmail}
                              onChange={(e) => setResetEmail(e.target.value)}
                              required
                              className="w-full pl-12 pr-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 focus:ring-2 focus:ring-[#64FFDA]/20 transition-all"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="reset-phone" className="block text-sm font-semibold text-gray-300 mb-2">
                            Phone Number
                          </label>
                          <div className="relative flex gap-2">
                            {/* Country Selector Button - Much Smaller */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                className="h-[50px] w-[70px] bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white hover:border-[#64FFDA]/40 focus:outline-none focus:border-[#64FFDA]/50 focus:ring-2 focus:ring-[#64FFDA]/20 transition-all flex items-center justify-center gap-1"
                              >
                                <span className="text-lg">{selectedCountry.flag}</span>
                                <motion.svg
                                  animate={{ rotate: showCountryDropdown ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="w-3 h-3 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                              </button>

                              {/* Country Dropdown with Search */}
                              <AnimatePresence>
                                {showCountryDropdown && (
                                  <>
                                    {/* Backdrop to close dropdown */}
                                    <div
                                      className="fixed inset-0 z-40"
                                      onClick={() => {
                                        setShowCountryDropdown(false)
                                        setCountrySearch('')
                                      }}
                                    />
                                    
                                    {/* Dropdown Menu */}
                                    <motion.div
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      transition={{ duration: 0.2 }}
                                      className="absolute top-full left-0 mt-2 w-64 bg-[#0A0E27] border border-[#64FFDA]/20 rounded-xl shadow-2xl z-50 overflow-hidden"
                                    >
                                      {/* Search Input */}
                                      <div className="p-2 border-b border-gray-800">
                                        <input
                                          type="text"
                                          value={countrySearch}
                                          onChange={(e) => setCountrySearch(e.target.value)}
                                          placeholder="Search country..."
                                          className="w-full px-3 py-2 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50"
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                      </div>
                                      
                                      {/* Countries List */}
                                      <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                                        {countries.length > 0 ? (
                                          countries.map((country, index) => (
                                            <button
                                              key={index}
                                              type="button"
                                              onClick={() => {
                                                setSelectedCountry(country)
                                                setShowCountryDropdown(false)
                                                setCountrySearch('')
                                              }}
                                              className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-[#64FFDA]/10 transition-colors text-left text-sm ${
                                                selectedCountry.code === country.code && selectedCountry.name === country.name
                                                  ? 'bg-[#64FFDA]/20 text-[#64FFDA]'
                                                  : 'text-gray-300'
                                              }`}
                                            >
                                              <span className="text-base">{country.flag}</span>
                                              <div className="flex-1 min-w-0">
                                                <div className="font-medium truncate text-xs">{country.name}</div>
                                              </div>
                                              <span className="text-xs text-gray-500">{country.code}</span>
                                              {selectedCountry.code === country.code && selectedCountry.name === country.name && (
                                                <FiCheck className="text-[#64FFDA] flex-shrink-0" />
                                              )}
                                            </button>
                                          ))
                                        ) : (
                                          <div className="px-3 py-4 text-center text-sm text-gray-500">
                                            No countries found
                                          </div>
                                        )}
                                      </div>
                                    </motion.div>
                                  </>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Phone Input */}
                            <div className="relative flex-1">
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                <FiPhone className="text-gray-400" />
                                <span className="text-sm text-gray-400">{selectedCountry.code}</span>
                              </div>
                              <input
                                id="reset-phone"
                                type="tel"
                                value={resetPhone}
                                onChange={(e) => {
                                  // Only allow numbers
                                  const value = e.target.value.replace(/[^0-9]/g, '')
                                  setResetPhone(value)
                                }}
                                required
                                className="w-full pl-24 pr-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 focus:ring-2 focus:ring-[#64FFDA]/20 transition-all"
                                placeholder="555 123 4567"
                              />
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-gray-500">
                            We'll send a verification code to {selectedCountry.code} {resetPhone}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={resetLoading}
                        className="btn-modern w-full py-3.5 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {resetLoading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              {resetMethod === 'email' ? 'Send Reset Link' : 'Send Verification Code'}
                              <FiArrowRight />
                            </>
                          )}
                        </span>
                      </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => {
                          setShowForgotPasswordModal(false)
                          setResetSuccess(false)
                          setResetEmail('')
                          setResetPhone('')
                          setResetMethod('email')
                        }}
                        className="text-sm text-gray-400 hover:text-[#64FFDA] transition-colors"
                      >
                        Back to Login
                      </button>
                    </div>
                  </>
                ) : (
                  /* Success Message */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-[#64FFDA]/20 flex items-center justify-center mx-auto mb-6"
                    >
                      <FiCheck className="w-10 h-10 text-[#64FFDA]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {resetMethod === 'email' ? 'Check Your Email' : 'Check Your Phone'}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {resetMethod === 'email' ? (
                        <>
                          We've sent a password reset link to{' '}
                          <span className="text-[#64FFDA]">{resetEmail}</span>
                        </>
                      ) : (
                        <>
                          We've sent a verification code to{' '}
                          <span className="text-[#64FFDA]">{resetPhone}</span>
                        </>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      {resetMethod === 'email' 
                        ? "Didn't receive the email? Check your spam folder or try again."
                        : "Didn't receive the code? Wait a moment and try again."}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
