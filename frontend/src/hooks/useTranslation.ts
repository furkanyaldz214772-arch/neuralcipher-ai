/**
 * React hook for using translations
 */

import { useState, useEffect } from 'react'
import { loadTranslation, createTranslator, getCurrentLanguage } from '@/lib/i18n'

type TranslationNamespace = 
  | 'landing'
  | 'dashboard'
  | 'common'
  | 'components'
  | 'pages'
  | 'auth'
  | 'test'
  | 'admin'
  | 'doctor'
  | 'hospital'
  | 'settings'
  | 'pricing'
  | 'profile'

export function useTranslation(namespace: TranslationNamespace = 'common') {
  const [translations, setTranslations] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState(getCurrentLanguage())

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true)
      const lang = getCurrentLanguage()
      setLanguage(lang)
      
      const data = await loadTranslation(namespace, lang)
      setTranslations(data)
      setIsLoading(false)
    }

    loadTranslations()

    // Listen for language changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language') {
        loadTranslations()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [namespace])

  const t = createTranslator(translations)

  return {
    t,
    language,
    isLoading,
    translations
  }
}
