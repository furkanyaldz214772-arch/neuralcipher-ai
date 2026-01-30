/**
 * NeuralCipher.ai - Modern Register Page with Personal Information
 * Brand Identity: Deep Navy + Electric Cyan + Neon Glow
 */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiZap, FiArrowRight, FiMail, FiGlobe, FiUsers, FiActivity, 
  FiTrendingUp, FiStar, FiAward, FiShield, FiCheck, FiPhone
} from 'react-icons/fi'
import { useAuthStore } from '@/lib/auth-store'

export default function RegisterPage() {
  const router = useRouter()
  const { register, login, isLoading } = useAuthStore()
  
  // Personal Information Fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<'patient' | 'doctor' | 'hospital'>('patient')
  const [error, setError] = useState('')
  const [selectedCountry, setSelectedCountry] = useState({ code: '+1', flag: '🇺🇸', name: 'United States' })
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')

  // Doctor-specific fields
  const [medicalLicense, setMedicalLicense] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [hospitalClinic, setHospitalClinic] = useState('')
  const [yearsExperience, setYearsExperience] = useState('')

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
    { code: '+670', flag: '🇹🇱', name: 'Timor-Leste' },
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
    { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' }
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

    // Validate required fields
    if (!firstName.trim()) {
      setError('First name is required')
      return
    }

    if (!lastName.trim()) {
      setError('Last name is required')
      return
    }

    // Validate doctor-specific fields
    if (role === 'doctor') {
      if (!medicalLicense.trim()) {
        setError('Medical license number is required for doctors')
        return
      }
      if (!specialization) {
        setError('Specialization is required for doctors')
        return
      }
      if (!hospitalClinic.trim()) {
        setError('Hospital/Clinic name is required for doctors')
        return
      }
      if (!yearsExperience || parseInt(yearsExperience) < 0) {
        setError('Years of experience is required for doctors')
        return
      }
    }

    // Validate password
    if (password.length < 12) {
      setError('Password must be at least 12 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      // Prepare additional registration data
      const additionalData = {
        firstName,
        lastName,
        phone: `${selectedCountry.code}${phone}`,
        dateOfBirth,
        ...(role === 'doctor' && {
          medicalLicense,
          specialization,
          hospitalClinic,
          yearsExperience: parseInt(yearsExperience)
        })
      }

      await register(email, password, role, additionalData)
      
      // Automatically login with same credentials
      const user = await login(email, password)
      
      // Redirect based on role
      if (user) {
        switch (user.role) {
          case 'admin':
            router.push('/neural-control-center/dashboard')
            break
          case 'doctor':
            router.push('/doctor/dashboard')
            break
          case 'hospital':
            router.push('/hospital/dashboard')
            break
          default:
            router.push('/patient/dashboard')
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen modern-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
            className="absolute w-1 h-1 bg-[#64FFDA] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
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
                          stroke="url(#gradient-register)"
                          strokeWidth="0.8"
                          opacity="0.7"
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                      <defs>
                        <linearGradient id="gradient-register" x1="0%" y1="0%" x2="100%" y2="100%">
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
      <div className="relative z-10 min-h-screen flex items-start pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Marketing Content - SECOND ON MOBILE, FIRST ON DESKTOP */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 lg:sticky lg:top-24 order-2 lg:order-1"
            >
              {/* Hero Section */}
              <div>
                <h1 className="text-5xl font-black text-white mb-4 leading-tight">
                  <span className="gradient-text-modern">Join the Future</span>
                  <br />
                  <span className="text-white">of Early Detection</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Start your journey with AI-powered voice analysis for Parkinson's screening
                </p>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-modern p-6 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#64FFDA]/10 flex items-center justify-center">
                      <FiUsers className="text-[#64FFDA] text-xl" />
                    </div>
                    <motion.div
                      className="text-3xl font-black text-white"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      50K+
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-400">Active Users</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-modern p-6 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
                      <FiActivity className="text-[#3B82F6] text-xl" />
                    </div>
                    <motion.div
                      className="text-3xl font-black text-white"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      1M+
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-400">Tests Completed</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-modern p-6 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                      <FiTrendingUp className="text-[#8B5CF6] text-xl" />
                    </div>
                    <motion.div
                      className="text-3xl font-black text-white"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      94%
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-400">Accuracy Rate</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-modern p-6 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <FiAward className="text-green-400 text-xl" />
                    </div>
                    <motion.div
                      className="text-3xl font-black text-white"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    >
                      4.9
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-400">User Rating</p>
                </motion.div>
              </div>

              {/* Trust Badges */}
              <div className="glass-modern p-6 rounded-2xl">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#64FFDA]/10 flex items-center justify-center mx-auto mb-2">
                      <FiShield className="text-[#64FFDA] text-xl" />
                    </div>
                    <p className="text-xs text-gray-400 font-semibold">HIPAA Compliant</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mx-auto mb-2">
                      <FiCheck className="text-[#3B82F6] text-xl" />
                    </div>
                    <p className="text-xs text-gray-400 font-semibold">ISO 27001</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-2">
                      <FiAward className="text-[#8B5CF6] text-xl" />
                    </div>
                    <p className="text-xs text-gray-400 font-semibold">FDA Registered</p>
                  </div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">What You Get:</h3>
                <div className="space-y-3">
                  {[
                    'AI-powered voice analysis in 60 seconds',
                    'Instant risk assessment & detailed reports',
                    'Track your health trends over time',
                    'Secure, HIPAA-compliant data storage'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#64FFDA]/20 flex items-center justify-center flex-shrink-0">
                        <FiCheck className="text-[#64FFDA] text-sm" />
                      </div>
                      <p className="text-gray-300">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass-modern p-6 rounded-2xl"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-yellow-400 text-sm" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "NeuralCipher helped me catch early signs that my doctor confirmed. The peace of mind is invaluable."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#64FFDA] to-[#3B82F6]" />
                  <div>
                    <p className="text-white font-semibold text-sm">Sarah M.</p>
                    <p className="text-gray-400 text-xs">Patient, Age 58</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Registration Form - FIRST ON MOBILE, SECOND ON DESKTOP */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-modern p-8 md:p-10 order-1 lg:order-2"
            >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white mb-3">
              <span className="gradient-text-modern">Create Account</span>
            </h1>
            <p className="text-gray-300 text-lg">Join NeuralCipher.ai today</p>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Account Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('patient')}
                  className={`group p-4 rounded-xl text-center transition-all duration-300 ${
                    role === 'patient'
                      ? 'bg-[#64FFDA]/10 border-2 border-[#64FFDA]/50'
                      : 'bg-[#0A0E27]/50 border-2 border-[#64FFDA]/20 hover:border-[#64FFDA]/40'
                  }`}
                >
                  <svg className={`w-8 h-8 mx-auto mb-2 ${role === 'patient' ? 'text-[#64FFDA]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div className={`font-bold ${role === 'patient' ? 'text-[#64FFDA]' : 'text-white'}`}>
                    Patient
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Take tests & view results</div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('doctor')}
                  className={`group p-4 rounded-xl text-center transition-all duration-300 ${
                    role === 'doctor'
                      ? 'bg-[#64FFDA]/10 border-2 border-[#64FFDA]/50'
                      : 'bg-[#0A0E27]/50 border-2 border-[#64FFDA]/20 hover:border-[#64FFDA]/40'
                  }`}
                >
                  <svg className={`w-8 h-8 mx-auto mb-2 ${role === 'doctor' ? 'text-[#64FFDA]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className={`font-bold ${role === 'doctor' ? 'text-[#64FFDA]' : 'text-white'}`}>
                    Doctor
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Manage patients</div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('hospital')}
                  className={`group p-4 rounded-xl text-center transition-all duration-300 ${
                    role === 'hospital'
                      ? 'bg-[#64FFDA]/10 border-2 border-[#64FFDA]/50'
                      : 'bg-[#0A0E27]/50 border-2 border-[#64FFDA]/20 hover:border-[#64FFDA]/40'
                  }`}
                >
                  <svg className={`w-8 h-8 mx-auto mb-2 ${role === 'hospital' ? 'text-[#64FFDA]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div className={`font-bold ${role === 'hospital' ? 'text-[#64FFDA]' : 'text-white'}`}>
                    Hospital
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Institution account</div>
                </button>
              </div>
            </div>

            {/* Personal Information Fields - Conditional based on role */}
            {role === 'hospital' ? (
              // Hospital/Institution Fields
              <>
                <div>
                  <label htmlFor="institutionName" className="block text-sm font-semibold text-gray-300 mb-2">
                    Institution Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="institutionName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 transition-colors"
                    placeholder="City General Hospital"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-300 mb-2">
                      Contact Person <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contactPerson"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 transition-colors"
                      placeholder="Dr. John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="department" className="block text-sm font-semibold text-gray-300 mb-2">
                      Department
                    </label>
                    <input
                      id="department"
                      type="text"
                      className="w-full px-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 transition-colors"
                      placeholder="Neurology Department"
                    />
                  </div>
                </div>
              </>
            ) : (
              // Patient/Doctor Fields
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-300 mb-2">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 transition-colors"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-300 mb-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
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
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      setPhone(value)
                    }}
                    className="w-full pl-24 pr-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 transition-colors"
                    placeholder="555 123 4567"
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth - Hidden for Hospital role */}
            {role !== 'hospital' && (
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 transition-colors"
                  />
                </div>
              )}

              {/* Doctor-Specific Fields - Wide Professional Section */}
              {role === 'doctor' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative mt-5 col-span-full"
                >
                  {/* Glassmorphism Container - Extra Wide & Compact */}
                  <div className="relative rounded-xl bg-gradient-to-br from-[#0A0E27]/80 via-[#1a1f3a]/60 to-[#0A0E27]/80 backdrop-blur-xl border border-[#64FFDA]/30 p-4 shadow-2xl overflow-hidden">
                    {/* Animated Background Gradient */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, #64FFDA 0%, transparent 70%)'
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-3">
                      {/* Ultra Compact Header */}
                      <div className="flex items-center gap-2 pb-2.5 border-b border-[#64FFDA]/10">
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 rounded-lg flex items-center justify-center border border-[#64FFDA]/40">
                            <FiAward className="text-[#64FFDA] text-sm" />
                          </div>
                        </motion.div>
                        <div>
                          <h3 className="text-[13px] font-bold bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] bg-clip-text text-transparent">
                            Professional Information
                          </h3>
                          <p className="text-[9px] text-gray-400">Required for medical professionals</p>
                        </div>
                      </div>

                      {/* Extra Wide Form Fields - 2x2 Grid with Reduced Gaps */}
                      <div className="grid grid-cols-2 gap-2.5">
                        {/* Medical License */}
                        <div>
                          <label htmlFor="medicalLicense" className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-300 mb-1">
                            <FiShield className="text-[#64FFDA] text-[10px]" />
                            Medical License
                            <span className="text-[#FF6B6B]">*</span>
                          </label>
                          <input
                            id="medicalLicense"
                            type="text"
                            value={medicalLicense}
                            onChange={(e) => setMedicalLicense(e.target.value)}
                            required={role === 'doctor'}
                            className="w-full px-2.5 py-1.5 bg-[#0A0E27]/60 border border-[#64FFDA]/30 rounded-lg text-white text-[13px] placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/60 focus:ring-1 focus:ring-[#64FFDA]/20 transition-all"
                            placeholder="e.g., MD123456"
                          />
                        </div>

                        {/* Specialization */}
                        <div>
                          <label htmlFor="specialization" className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-300 mb-1">
                            <FiActivity className="text-[#3B82F6] text-[10px]" />
                            Specialization
                            <span className="text-[#FF6B6B]">*</span>
                          </label>
                          <select
                            id="specialization"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            required={role === 'doctor'}
                            className="w-full px-2.5 py-1.5 bg-[#0A0E27]/60 border border-[#3B82F6]/30 rounded-lg text-white text-[13px] focus:outline-none focus:border-[#3B82F6]/60 focus:ring-1 focus:ring-[#3B82F6]/20 transition-all appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-[#0A0E27]">Select Specialization</option>
                            <option value="neurology" className="bg-[#0A0E27]">🧠 Neurology</option>
                            <option value="movement-disorders" className="bg-[#0A0E27]">🏃 Movement Disorders</option>
                            <option value="geriatrics" className="bg-[#0A0E27]">👴 Geriatrics</option>
                            <option value="internal-medicine" className="bg-[#0A0E27]">⚕️ Internal Medicine</option>
                            <option value="family-medicine" className="bg-[#0A0E27]">👨‍👩‍👧‍👦 Family Medicine</option>
                            <option value="psychiatry" className="bg-[#0A0E27]">🧘 Psychiatry</option>
                            <option value="rehabilitation" className="bg-[#0A0E27]">♿ Rehabilitation</option>
                            <option value="other" className="bg-[#0A0E27]">📋 Other</option>
                          </select>
                        </div>

                        {/* Hospital/Clinic */}
                        <div>
                          <label htmlFor="hospitalClinic" className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-300 mb-1">
                            <FiGlobe className="text-[#8B5CF6] text-[10px]" />
                            Hospital/Clinic
                            <span className="text-[#FF6B6B]">*</span>
                          </label>
                          <input
                            id="hospitalClinic"
                            type="text"
                            value={hospitalClinic}
                            onChange={(e) => setHospitalClinic(e.target.value)}
                            required={role === 'doctor'}
                            className="w-full px-2.5 py-1.5 bg-[#0A0E27]/60 border border-[#8B5CF6]/30 rounded-lg text-white text-[13px] placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6]/60 focus:ring-1 focus:ring-[#8B5CF6]/20 transition-all"
                            placeholder="e.g., City Hospital"
                          />
                        </div>

                        {/* Years of Experience */}
                        <div>
                          <label htmlFor="yearsExperience" className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-300 mb-1">
                            <FiStar className="text-[#FFD700] text-[10px]" />
                            Years of Experience
                            <span className="text-[#FF6B6B]">*</span>
                          </label>
                          <input
                            id="yearsExperience"
                            type="number"
                            min="0"
                            max="60"
                            value={yearsExperience}
                            onChange={(e) => setYearsExperience(e.target.value)}
                            required={role === 'doctor'}
                            className="w-full px-2.5 py-1.5 bg-[#0A0E27]/60 border border-[#FFD700]/30 rounded-lg text-white text-[13px] placeholder-gray-500 focus:outline-none focus:border-[#FFD700]/60 focus:ring-1 focus:ring-[#FFD700]/20 transition-all"
                            placeholder="e.g., 10"
                          />
                        </div>
                      </div>

                      {/* Ultra Compact Info Badge */}
                      <div className="flex items-start gap-1.5 p-2 bg-[#64FFDA]/5 border border-[#64FFDA]/20 rounded-lg">
                        <FiUsers className="text-[#64FFDA] flex-shrink-0 mt-0.5 text-[10px]" />
                        <p className="text-[9px] text-gray-300 leading-relaxed">
                          <span className="font-semibold text-[#64FFDA]">Verification:</span> Credentials will be verified before activation.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 transition-colors"
                placeholder="At least 12 characters"
              />
              <p className="text-xs text-gray-400 mt-2">
                Must include uppercase, lowercase, numbers, and special characters
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#0A0E27]/50 border border-[#64FFDA]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA]/50 transition-colors"
                placeholder="Re-enter your password"
              />
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-600 bg-[#0A0E27] text-[#64FFDA] focus:ring-[#64FFDA] mt-1"
              />
              <label htmlFor="terms" className="ml-3 block text-sm text-gray-300">
                I agree to the{' '}
                <Link href="/terms" className="text-[#64FFDA] hover:text-[#3B82F6] transition-colors">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[#64FFDA] hover:text-[#3B82F6] transition-colors">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-modern w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#64FFDA] hover:text-[#3B82F6] font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Footer - Complete 5-Column Structure */}
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
                            stroke="url(#gradient-footer-register-main)"
                            strokeWidth="0.8"
                            opacity="0.7"
                            animate={{ opacity: [0.4, 0.9, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                        <defs>
                          <linearGradient id="gradient-footer-register-main" x1="0%" y1="0%" x2="100%" y2="100%">
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
    </div>
  )
}
