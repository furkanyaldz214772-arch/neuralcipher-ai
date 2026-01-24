/**
 * Simple i18n utility for loading translations
 * Supports English (en) and German (de)
 */

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

type Language = 'en' | 'de'

// Cache for loaded translations
const translationCache: Record<string, any> = {}

/**
 * Load translation file for a specific namespace and language
 */
export async function loadTranslation(
  namespace: TranslationNamespace,
  language: Language = 'en'
): Promise<any> {
  const cacheKey = `${language}-${namespace}`
  
  // Return from cache if available
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey]
  }

  try {
    // Load translation file
    const translation = await fetch(`/locales/${language}/${namespace}.json`)
      .then(res => res.json())
    
    // Cache the translation
    translationCache[cacheKey] = translation
    
    return translation
  } catch (error) {
    console.error(`Failed to load translation: ${language}/${namespace}`, error)
    
    // Fallback to English if German fails
    if (language === 'de') {
      return loadTranslation(namespace, 'en')
    }
    
    return {}
  }
}

/**
 * Get nested value from object using dot notation
 * Example: get(obj, 'hero.title') returns obj.hero.title
 */
function get(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

/**
 * Translation function (t)
 * Usage: t('hero.title') or t('hero.title', { name: 'John' })
 */
export function createTranslator(translations: any) {
  return function t(key: string, params?: Record<string, string | number>): string {
    let value = get(translations, key)
    
    // If not found, return the key itself
    if (value === undefined) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    
    // If params provided, replace placeholders
    if (params && typeof value === 'string') {
      Object.keys(params).forEach(paramKey => {
        value = value.replace(`{{${paramKey}}}`, String(params[paramKey]))
      })
    }
    
    return value
  }
}

/**
 * Get current language from localStorage or default to 'en'
 */
export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  
  const saved = localStorage.getItem('language')
  return (saved === 'de' ? 'de' : 'en') as Language
}

/**
 * Set current language
 */
export function setCurrentLanguage(language: Language): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('language', language)
  document.documentElement.lang = language
}
