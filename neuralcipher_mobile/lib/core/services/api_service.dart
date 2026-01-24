import 'dart:io';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// API Service for backend communication
class ApiService {
  static const String baseUrl = 'http://localhost:8000/api/v1';
  
  late final Dio _dio;
  String? _accessToken;
  
  ApiService() {
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
      },
    ));
    
    // Add interceptors
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        // Add auth token
        if (_accessToken != null) {
          options.headers['Authorization'] = 'Bearer $_accessToken';
        }
        return handler.next(options);
      },
      onError: (error, handler) async {
        // Handle 401 - refresh token
        if (error.response?.statusCode == 401) {
          // TODO: Implement token refresh
          await _clearToken();
        }
        return handler.next(error);
      },
    ));
  }
  
  /// Initialize with stored token
  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _accessToken = prefs.getString('access_token');
  }
  
  /// Set access token
  Future<void> setToken(String token) async {
    _accessToken = token;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('access_token', token);
  }
  
  /// Clear token
  Future<void> _clearToken() async {
    _accessToken = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('access_token');
  }
  
  /// Check if authenticated
  bool get isAuthenticated => _accessToken != null;
  
  // ==================== AUTH ENDPOINTS ====================
  
  /// Register new user
  Future<Map<String, dynamic>> register({
    required String email,
    required String password,
    String role = 'patient',
  }) async {
    final response = await _dio.post('/auth/register', data: {
      'email': email,
      'password': password,
      'role': role,
    });
    return response.data;
  }
  
  /// Login
  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    final response = await _dio.post('/auth/login', data: {
      'email': email,
      'password': password,
    });
    
    // Store token
    if (response.data['access_token'] != null) {
      await setToken(response.data['access_token']);
    }
    
    return response.data;
  }
  
  /// Logout
  Future<void> logout() async {
    await _clearToken();
  }
  
  // ==================== VOICE ANALYSIS ENDPOINTS ====================
  
  /// Upload and analyze voice recording
  Future<Map<String, dynamic>> uploadAndAnalyze({
    required File audioFile,
    Function(int, int)? onProgress,
  }) async {
    final formData = FormData.fromMap({
      'file': await MultipartFile.fromFile(
        audioFile.path,
        filename: 'recording.wav',
      ),
    });
    
    final response = await _dio.post(
      '/voice/process',
      data: formData,
      onSendProgress: (sent, total) {
        if (onProgress != null) {
          onProgress(sent, total);
        }
      },
    );
    return response.data;
  }
  
  /// Test connection to backend
  Future<Map<String, dynamic>> testConnection() async {
    final response = await _dio.post('/voice/test');
    return response.data;
  }
  
  /// Get model information
  Future<Map<String, dynamic>> getModelInfo() async {
    final response = await _dio.get('/voice/model-info');
    return response.data;
  }
  
  /// Health check
  Future<Map<String, dynamic>> healthCheck() async {
    final response = await _dio.get('/voice/health-check');
    return response.data;
  }
  
  // ==================== TEST ENDPOINTS ====================
  
  /// Create new test
  Future<Map<String, dynamic>> createTest({
    required String level,
  }) async {
    final response = await _dio.post('/tests/', data: {
      'level': level,
    });
    return response.data;
  }
  
  /// Upload audio file
  Future<Map<String, dynamic>> uploadAudio({
    required int testId,
    required File audioFile,
  }) async {
    final formData = FormData.fromMap({
      'audio_file': await MultipartFile.fromFile(
        audioFile.path,
        filename: 'audio.wav',
      ),
    });
    
    final response = await _dio.post(
      '/tests/$testId/upload',
      data: formData,
    );
    return response.data;
  }
  
  /// Get test by ID
  Future<Map<String, dynamic>> getTest(int testId) async {
    final response = await _dio.get('/tests/$testId');
    return response.data;
  }
  
  /// List tests
  Future<Map<String, dynamic>> listTests({
    int page = 1,
    int pageSize = 20,
    String? level,
    String? status,
  }) async {
    final response = await _dio.get('/tests/', queryParameters: {
      'page': page,
      'page_size': pageSize,
      if (level != null) 'level': level,
      if (status != null) 'status': status,
    });
    return response.data;
  }
  
  /// Delete test
  Future<void> deleteTest(int testId) async {
    await _dio.delete('/tests/$testId');
  }
  
  // ==================== PROFILE ENDPOINTS ====================
  
  /// Get current user profile
  Future<Map<String, dynamic>> getProfile() async {
    final response = await _dio.get('/profile/me');
    return response.data;
  }
  
  /// Update profile
  Future<Map<String, dynamic>> updateProfile({
    String? firstName,
    String? lastName,
    String? phone,
    String? dateOfBirth,
    String? gender,
    String? language,
    String? timezone,
  }) async {
    final response = await _dio.put('/profile/me', data: {
      if (firstName != null) 'first_name': firstName,
      if (lastName != null) 'last_name': lastName,
      if (phone != null) 'phone': phone,
      if (dateOfBirth != null) 'date_of_birth': dateOfBirth,
      if (gender != null) 'gender': gender,
      if (language != null) 'language': language,
      if (timezone != null) 'timezone': timezone,
    });
    return response.data;
  }
  
  /// Change password
  Future<void> changePassword({
    required String currentPassword,
    required String newPassword,
  }) async {
    await _dio.post('/profile/change-password', data: {
      'current_password': currentPassword,
      'new_password': newPassword,
    });
  }
  
  /// Delete account
  Future<void> deleteAccount() async {
    await _dio.delete('/profile/me');
    await _clearToken();
  }
  
  // ==================== SUBSCRIPTION ENDPOINTS ====================
  
  /// Get current subscription
  Future<Map<String, dynamic>> getSubscription() async {
    final response = await _dio.get('/subscriptions/current');
    return response.data;
  }
  
  /// Create checkout session
  Future<Map<String, dynamic>> createCheckout({
    required String plan,
  }) async {
    final response = await _dio.post('/subscriptions/create-checkout', data: {
      'plan': plan,
    });
    return response.data;
  }
  
  /// Cancel subscription
  Future<void> cancelSubscription() async {
    await _dio.post('/subscriptions/cancel');
  }
  
  /// Register FCM device token
  Future<void> registerDeviceToken({
    required String token,
    required String deviceType,
  }) async {
    await _dio.post('/messages/device-token', queryParameters: {
      'token': token,
      'device_type': deviceType,
    });
  }
  
  /// Unregister FCM device token
  Future<void> unregisterDeviceToken(String token) async {
    await _dio.delete('/messages/device-token/$token');
  }
  
  // ==================== MESSAGING ENDPOINTS ====================
  
  /// Send message
  Future<Map<String, dynamic>> sendMessage({
    required int receiverId,
    String? subject,
    required String body,
  }) async {
    final response = await _dio.post('/messages/', data: {
      'receiver_id': receiverId,
      if (subject != null) 'subject': subject,
      'body': body,
    });
    return response.data;
  }
  
  /// List messages
  Future<List<dynamic>> listMessages({
    int? conversationWith,
    int page = 1,
    int pageSize = 50,
  }) async {
    final response = await _dio.get('/messages/', queryParameters: {
      if (conversationWith != null) 'conversation_with': conversationWith,
      'page': page,
      'page_size': pageSize,
    });
    return response.data;
  }
  
  /// List conversations
  Future<List<dynamic>> listConversations() async {
    final response = await _dio.get('/messages/conversations');
    return response.data;
  }
  
  /// Mark message as read
  Future<void> markMessageAsRead(int messageId) async {
    await _dio.put('/messages/$messageId/read');
  }
  
  /// Delete message
  Future<void> deleteMessage(int messageId) async {
    await _dio.delete('/messages/$messageId');
  }
  
  /// List patients (doctor only)
  Future<List<dynamic>> listPatients({
    int page = 1,
    int pageSize = 20,
    String? search,
  }) async {
    final response = await _dio.get('/doctor/patients', queryParameters: {
      'page': page,
      'page_size': pageSize,
      if (search != null) 'search': search,
    });
    return response.data;
  }
  
  /// Get patient detail (doctor only)
  Future<Map<String, dynamic>> getPatient(int patientId) async {
    final response = await _dio.get('/doctor/patients/$patientId');
    return response.data;
  }
  
  /// Get analytics overview (doctor only)
  Future<Map<String, dynamic>> getAnalyticsOverview() async {
    final response = await _dio.get('/doctor/analytics/overview');
    return response.data;
  }
  
  /// Get trends (doctor only)
  Future<Map<String, dynamic>> getTrends({
    int? patientId,
    int days = 30,
  }) async {
    final response = await _dio.get('/doctor/analytics/trends', queryParameters: {
      if (patientId != null) 'patient_id': patientId,
      'days': days,
    });
    return response.data;
  }
}
