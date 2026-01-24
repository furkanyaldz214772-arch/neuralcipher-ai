/// API Constants
/// Backend API endpoints and configuration
class ApiConstants {
  // Base URL - Backend API
  static const String baseUrl = 'http://10.0.2.2:8000';
  
  // For Android Emulator use: http://10.0.2.2:8000
  // For iOS Simulator use: http://localhost:8000
  // For Physical Device use your computer's IP: http://192.168.x.x:8000
  
  // Endpoints
  static const String voiceProcessEndpoint = '/api/v1/voice/process';
  static const String modelInfoEndpoint = '/api/v1/voice/model-info';
  static const String healthCheckEndpoint = '/api/v1/voice/health-check';
  static const String statsEndpoint = '/api/v1/voice/stats';
  static const String testEndpoint = '/api/v1/voice/test';
  
  // Timeouts
  static const Duration connectTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);
  
  // Retry
  static const int maxRetries = 3;
  static const List<int> retryDelays = [1000, 2000, 4000]; // milliseconds
}
