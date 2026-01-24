# NeuralCipher.ai - Deutsche Übersetzungen

Dieses Verzeichnis enthält alle deutschen Übersetzungen für die NeuralCipher.ai-Plattform.

## Dateistruktur

```
de/
├── common.json          # Gemeinsame UI-Elemente (Navigation, Buttons, Nachrichten)
├── dashboard.json       # Dashboard-spezifische Übersetzungen
├── auth.json           # Authentifizierung (Login, Registrierung, Passwort zurücksetzen)
├── test.json           # Test-bezogene Übersetzungen (Neuer Test, Aufnahme, Ergebnisse, Verlauf)
├── profile.json        # Benutzerprofilseite
├── settings.json       # Einstellungsseite (Allgemein, Benachrichtigungen, Sicherheit, Datenschutz)
├── pricing.json        # Preisseite
├── admin.json          # Admin-Panel-Übersetzungen
├── doctor.json         # Ärzte-Panel-Übersetzungen
└── hospital.json       # Krankenhaus-Panel-Übersetzungen
```

## Verwendung mit i18next

### Installation

```bash
npm install i18next react-i18next i18next-http-backend
```

### Konfiguration

```typescript
// lib/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en', // Standardsprache
    fallbackLng: 'en',
    ns: ['common', 'dashboard', 'auth', 'test', 'profile', 'settings', 'pricing', 'admin', 'doctor', 'hospital'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
```

### Verwendung in Komponenten

```typescript
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation('common')
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <button>{t('buttons.save')}</button>
    </div>
  )
}
```

### Sprache wechseln

```typescript
import { useTranslation } from 'react-i18next'

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  
  return (
    <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
      <option value="tr">Türkçe</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  )
}
```

## Übersetzungsschlüssel-Beispiele

### Navigation
```typescript
t('nav.home')           // "Startseite"
t('nav.features')       // "Funktionen"
t('nav.pricing')        // "Preise"
```

### Dashboard
```typescript
t('dashboard.welcome')              // "Willkommen zurück"
t('dashboard.latestTest')           // "Letzter Test"
t('dashboard.riskScore')            // "Risikobewertung"
```

### Authentifizierung
```typescript
t('auth.login.title')               // "Anmelden"
t('auth.register.createAccount')    // "Konto erstellen"
t('auth.forgotPassword.title')      // "Passwort zurücksetzen"
```

### Tests
```typescript
t('test.newTest.title')             // "Neuen Test starten"
t('test.results.riskScore')         // "Risikobewertung"
t('test.history.title')             // "Testverlauf"
```

## Interpolation

Für dynamische Werte verwenden Sie Interpolation:

```json
{
  "welcome": "Willkommen zurück, {{name}}"
}
```

```typescript
t('welcome', { name: 'John' })  // "Willkommen zurück, John"
```

## Pluralisierung

```json
{
  "items": "{{count}} Element",
  "items_plural": "{{count}} Elemente"
}
```

```typescript
t('items', { count: 1 })   // "1 Element"
t('items', { count: 5 })   // "5 Elemente"
```

## Beitragen

Wenn Sie Übersetzungen hinzufügen oder verbessern möchten:

1. Bearbeiten Sie die entsprechende JSON-Datei
2. Stellen Sie sicher, dass die Schlüsselstruktur mit anderen Sprachen übereinstimmt
3. Verwenden Sie professionelle medizinische Terminologie
4. Testen Sie die Übersetzungen in der Anwendung

## Qualitätssicherung

- ✅ Alle Übersetzungen sind professionell und medizinisch korrekt
- ✅ Konsistente Terminologie in allen Dateien
- ✅ Formale "Sie"-Form verwendet (nicht "du")
- ✅ Medizinische Fachbegriffe korrekt übersetzt
- ✅ UI-Elemente kurz und prägnant

## Nächste Schritte

Nach Deutsch können weitere Sprachen hinzugefügt werden:
- Spanisch (es/)
- Französisch (fr/)
- Italienisch (it/)
- Niederländisch (nl/)
- Portugiesisch (pt/)

Jede Sprache sollte die gleiche Dateistruktur und Schlüssel wie Deutsch haben.
