/// App-wide Constants
class AppConstants {
  // App Info
  static const String appName = 'NeuralCipher.ai';
  static const String appVersion = '1.0.0';
  
  // Typography (Accessibility for 50+ age group)
  static const double fontSizeBody = 18.0; // Minimum body text
  static const double fontSizeHeading = 24.0; // Minimum heading
  static const double fontSizeLarge = 32.0; // Large text (countdown, etc.)
  
  // Touch Targets (WCAG 2.1 AA)
  static const double minTouchTarget = 48.0; // Minimum touch target size
  static const double recommendedTouchTarget = 56.0; // Recommended size
  
  // Spacing
  static const double spacingXs = 4.0;
  static const double spacingSm = 8.0;
  static const double spacingMd = 16.0;
  static const double spacingLg = 24.0;
  static const double spacingXl = 32.0;
  static const double spacingXxl = 48.0;
  
  // Animation
  static const int waveformFps = 30; // Waveform update frequency
  static const Duration animationDuration = Duration(milliseconds: 300);
  
  // Storage Keys
  static const String keyOnboardingComplete = 'onboarding_complete';
  static const String keyThemeMode = 'theme_mode';
  static const String keyLanguage = 'language';
  static const String keyBiometricEnabled = 'biometric_enabled';
  
  // Risk Levels
  static const double riskLowThreshold = 0.3;
  static const double riskMediumThreshold = 0.7;
  
  // Disclaimer
  static const String disclaimer = 
      'Bu bir teşhis aracı değildir. Sonuçlar sadece bilgilendirme amaçlıdır. '
      'Kesin teşhis için lütfen bir nöroloji uzmanına danışın.';
}
