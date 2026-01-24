import 'package:shared_preferences/shared_preferences.dart';
import '../constants/app_constants.dart';

class StorageService {
  static StorageService? _instance;
  static SharedPreferences? _preferences;
  
  StorageService._();
  
  static Future<StorageService> getInstance() async {
    _instance ??= StorageService._();
    _preferences ??= await SharedPreferences.getInstance();
    return _instance!;
  }
  
  // Onboarding
  Future<bool> setOnboardingComplete(bool value) async {
    return await _preferences!.setBool(
      AppConstants.keyOnboardingComplete,
      value,
    );
  }
  
  bool isOnboardingComplete() {
    return _preferences!.getBool(AppConstants.keyOnboardingComplete) ?? false;
  }
  
  // Theme Mode
  Future<bool> setThemeMode(String mode) async {
    return await _preferences!.setString(AppConstants.keyThemeMode, mode);
  }
  
  String getThemeMode() {
    return _preferences!.getString(AppConstants.keyThemeMode) ?? 'light';
  }
  
  // Language
  Future<bool> setLanguage(String language) async {
    return await _preferences!.setString(AppConstants.keyLanguage, language);
  }
  
  String getLanguage() {
    return _preferences!.getString(AppConstants.keyLanguage) ?? 'tr';
  }
  
  // Biometric
  Future<bool> setBiometricEnabled(bool value) async {
    return await _preferences!.setBool(
      AppConstants.keyBiometricEnabled,
      value,
    );
  }
  
  bool isBiometricEnabled() {
    return _preferences!.getBool(AppConstants.keyBiometricEnabled) ?? false;
  }
  
  // Clear all data
  Future<bool> clearAll() async {
    return await _preferences!.clear();
  }
}
