import 'package:flutter/foundation.dart';
import '../../../../core/services/api_service.dart';

/// Authentication state
enum AuthState {
  initial,
  loading,
  authenticated,
  unauthenticated,
  error,
}

/// Auth provider
class AuthProvider extends ChangeNotifier {
  final ApiService _apiService;
  
  AuthState _state = AuthState.initial;
  Map<String, dynamic>? _user;
  String? _errorMessage;
  
  AuthProvider({required ApiService apiService}) : _apiService = apiService;
  
  // Getters
  AuthState get state => _state;
  Map<String, dynamic>? get user => _user;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _state == AuthState.authenticated;
  
  /// Initialize - check if already logged in
  Future<void> init() async {
    await _apiService.init();
    
    if (_apiService.isAuthenticated) {
      try {
        // Fetch user profile
        _user = await _apiService.getProfile();
        _state = AuthState.authenticated;
        notifyListeners();
      } catch (e) {
        // Token invalid
        _state = AuthState.unauthenticated;
        notifyListeners();
      }
    } else {
      _state = AuthState.unauthenticated;
      notifyListeners();
    }
  }
  
  /// Register
  Future<bool> register({
    required String email,
    required String password,
  }) async {
    _state = AuthState.loading;
    _errorMessage = null;
    notifyListeners();
    
    try {
      await _apiService.register(
        email: email,
        password: password,
      );
      
      // Auto-login after registration
      return await login(email: email, password: password);
      
    } catch (e) {
      _state = AuthState.error;
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }
  
  /// Login
  Future<bool> login({
    required String email,
    required String password,
  }) async {
    _state = AuthState.loading;
    _errorMessage = null;
    notifyListeners();
    
    try {
      final response = await _apiService.login(
        email: email,
        password: password,
      );
      
      // Fetch user profile
      _user = await _apiService.getProfile();
      
      _state = AuthState.authenticated;
      notifyListeners();
      return true;
      
    } catch (e) {
      _state = AuthState.error;
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }
  
  /// Logout
  Future<void> logout() async {
    await _apiService.logout();
    
    _user = null;
    _state = AuthState.unauthenticated;
    notifyListeners();
  }
  
  /// Update profile
  Future<bool> updateProfile({
    String? firstName,
    String? lastName,
    String? phone,
    String? dateOfBirth,
    String? gender,
    String? language,
    String? timezone,
  }) async {
    try {
      _user = await _apiService.updateProfile(
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        dateOfBirth: dateOfBirth,
        gender: gender,
        language: language,
        timezone: timezone,
      );
      
      notifyListeners();
      return true;
      
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }
  
  /// Change password
  Future<bool> changePassword({
    required String currentPassword,
    required String newPassword,
  }) async {
    try {
      await _apiService.changePassword(
        currentPassword: currentPassword,
        newPassword: newPassword,
      );
      
      return true;
      
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }
  
  /// Delete account
  Future<bool> deleteAccount() async {
    try {
      await _apiService.deleteAccount();
      
      _user = null;
      _state = AuthState.unauthenticated;
      notifyListeners();
      return true;
      
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }
}
