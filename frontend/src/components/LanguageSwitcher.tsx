'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGlobe, FiCheck } from 'react-icons/fi'

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    nativeName: 'English'
  },
  {
    code: 'de',
    name: 'German',
    flag: '🇩🇪',
    nativeName: 'Deutsch'
  }
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')

  useEffect(() => {
    // Get saved language from localStorage
    const savedLang = localStorage.getItem('language') || 'en'
    setCurrentLang(savedLang)
    
    // Apply language to document
    document.documentElement.lang = savedLang
  }, [])

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode)
    localStorage.setItem('language', langCode)
    document.documentElement.lang = langCode
    setIsOpen(false)
    
    // Reload page to apply translations
    window.location.reload()
  }

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]

  return (
    <div className="relative z-50">
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-gray-700 hover:border-[#64FFDA]/50 transition-all duration-200 group"
      >
        <span className="text-xl">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm text-gray-300 group-hover:text-white transition-colors">
          {currentLanguage.code.toUpperCase()}
        </span>
        <FiGlobe className="text-gray-400 group-hover:text-[#64FFDA] transition-colors" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 w-48 rounded-lg overflow-hidden shadow-2xl border border-[#64FFDA]/30 z-50 bg-[#0A0E27]/95 backdrop-blur-xl"
            >
              {languages.map((lang, index) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-200
                    ${currentLang === lang.code 
                      ? 'bg-[#64FFDA]/10 text-[#64FFDA]' 
                      : 'text-gray-300 hover:text-[#64FFDA] hover:bg-white/5'
                    }
                    ${index !== languages.length - 1 ? 'border-b border-gray-800/50' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="text-left">
                      <div className="font-medium">{lang.nativeName}</div>
                      <div className="text-xs text-gray-500">{lang.name}</div>
                    </div>
                  </div>
                  {currentLang === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <FiCheck className="text-[#64FFDA]" />
                    </motion.div>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
