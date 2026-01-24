# Multi-Language Implementation Guide

## ✅ Completed: German Translation Files

All German translation JSON files have been created in `public/locales/de/`:

- ✅ `common.json` - Navigation, buttons, common UI elements
- ✅ `dashboard.json` - Dashboard-specific translations
- ✅ `auth.json` - Login, register, password reset
- ✅ `test.json` - New test, recording, results, history
- ✅ `profile.json` - User profile page
- ✅ `settings.json` - Settings page (general, notifications, security, privacy)
- ✅ `pricing.json` - Pricing page
- ✅ `admin.json` - Admin panel translations
- ✅ `doctor.json` - Doctor panel translations
- ✅ `hospital.json` - Hospital panel translations

## 📦 Installation

Install required packages:

```bash
cd neuralcipher-ai/frontend
npm install i18next react-i18next i18next-http-backend
```

## 🔧 Implementation Steps

### Step 1: Create i18n Configuration

Create `lib/i18n.ts`:

```typescript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'de', 'tr', 'es', 'fr'],
    ns: [
      'common',
      'dashboard',
      'auth',
      'test',
      'profile',
      'settings',
      'pricing',
      'admin',
      'doctor',
      'hospital'
    ],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  })

export default i18n
```

### Step 2: Initialize in _app.tsx

Update `src/app/_app.tsx`:

```typescript
import '../lib/i18n'
import { I18nextProvider } from 'react-i18next'
import i18n from '../lib/i18n'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nextProvider>
  )
}

export default MyApp
```

### Step 3: Create Language Switcher Component

Create `components/LanguageSwitcher.tsx`:

```typescript
'use client'

import { useTranslation } from 'react-i18next'
import { FiGlobe } from 'react-icons/fi'
import { useState } from 'react'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
    setIsOpen(false)
  }

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-electric-cyan transition-colors"
      >
        <FiGlobe className="text-electric-cyan" />
        <span className="text-sm text-white">{currentLanguage.flag} {currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 rounded-lg bg-gray-800 border border-gray-700 shadow-xl z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
                i18n.language === lang.code ? 'bg-gray-700' : ''
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-sm text-white">{lang.name}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto text-electric-cyan">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

### Step 4: Update Navigation Component

Update `components/layout/Sidebar.tsx` or navigation:

```typescript
import { useTranslation } from 'react-i18next'

export default function Sidebar() {
  const { t } = useTranslation('common')

  const patientLinks = [
    { href: '/dashboard', label: t('nav.dashboard'), icon: '🏠' },
    { href: '/test/new', label: t('test.newTest.title'), icon: '🎤' },
    { href: '/history', label: t('test.history.title'), icon: '📊' },
    { href: '/profile', label: t('profile.title'), icon: '👤' },
    { href: '/settings', label: t('settings.title'), icon: '⚙️' },
  ]

  // ... rest of component
}
```

### Step 5: Update Page Components

Example for Dashboard:

```typescript
import { useTranslation } from 'react-i18next'

export default function DashboardPage() {
  const { t } = useTranslation(['dashboard', 'common'])

  return (
    <DashboardLayout>
      <h1>{t('dashboard:welcome')}</h1>
      <div>
        <h2>{t('dashboard:latestTest')}</h2>
        <p>{t('dashboard:riskScore')}</p>
      </div>
      <button>{t('common:buttons.save')}</button>
    </DashboardLayout>
  )
}
```

## 🎨 Usage Examples

### Basic Translation
```typescript
const { t } = useTranslation('common')
<h1>{t('nav.home')}</h1>
```

### With Interpolation
```typescript
const { t } = useTranslation('dashboard')
<p>{t('welcome', { name: user.name })}</p>
```

### Multiple Namespaces
```typescript
const { t } = useTranslation(['dashboard', 'common'])
<h1>{t('dashboard:title')}</h1>
<button>{t('common:buttons.save')}</button>
```

### With Count (Pluralization)
```typescript
const { t } = useTranslation('test')
<p>{t('test.history.subtitle', { count: tests.length })}</p>
```

## 📝 Translation Key Structure

### Common Pattern
```
namespace:section.subsection.key
```

### Examples
```typescript
t('common:nav.home')                    // Navigation
t('dashboard:quickActions.newTest')     // Dashboard quick actions
t('auth:login.title')                   // Auth pages
t('test:newTest.levels.quick.name')     // Nested objects
t('settings:general.languageRegion.title') // Deep nesting
```

## 🌍 Adding More Languages

To add Spanish (es):

1. Create `public/locales/es/` directory
2. Copy all JSON files from `de/` to `es/`
3. Translate all values to Spanish
4. Add to supported languages in `i18n.ts`:
   ```typescript
   supportedLngs: ['en', 'de', 'tr', 'es', 'fr']
   ```
5. Add to language switcher:
   ```typescript
   { code: 'es', name: 'Español', flag: '🇪🇸' }
   ```

## ✅ Testing

Test translations:

```bash
# Start development server
npm run dev

# Test language switching
# 1. Open browser
# 2. Click language switcher
# 3. Select German
# 4. Verify all text is translated
# 5. Check localStorage for 'language' key
```

## 🚀 Deployment

Before deploying:

1. ✅ Verify all translation files are in `public/locales/`
2. ✅ Test all pages in German
3. ✅ Check console for missing translation warnings
4. ✅ Verify language persistence (localStorage)
5. ✅ Test language switcher on all pages

## 📊 Translation Coverage

Current coverage:
- ✅ Navigation (100%)
- ✅ Dashboard (100%)
- ✅ Authentication (100%)
- ✅ Test Flow (100%)
- ✅ Profile (100%)
- ✅ Settings (100%)
- ✅ Pricing (100%)
- ✅ Admin Panel (100%)
- ✅ Doctor Panel (100%)
- ✅ Hospital Panel (100%)

## 🔄 Next Steps

1. Install i18next packages
2. Create i18n configuration
3. Update components to use translations
4. Add language switcher to navigation
5. Test thoroughly
6. Deploy to production

## 📚 Resources

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [Translation Best Practices](https://www.i18next.com/principles/fallback)

## 🎯 Priority Implementation Order

1. **High Priority** (User-facing):
   - Navigation
   - Dashboard
   - Test flow
   - Authentication

2. **Medium Priority**:
   - Profile
   - Settings
   - Pricing

3. **Low Priority** (Admin):
   - Admin panel
   - Doctor panel
   - Hospital panel

Start with high priority pages and gradually add translations to other pages.
