/// Base Exception class
class AppException implements Exception {
  final String message;
  
  const AppException(this.message);
  
  @override
  String toString() => message;
}

/// Network exceptions
class NetworkException extends AppException {
  const NetworkException(String message) : super(message);
}

/// Server exceptions
class ServerException extends AppException {
  const ServerException(String message) : super(message);
}

/// Cache exceptions
class CacheException extends AppException {
  const CacheException(String message) : super(message);
}

/// Permission exceptions
class PermissionException extends AppException {
  const PermissionException(String message) : super(message);
}

/// Audio recording exceptions
class AudioRecordingException extends AppException {
  const AudioRecordingException(String message) : super(message);
}

/// File exceptions
class FileException extends AppException {
  const FileException(String message) : super(message);
}

/// Validation exceptions
class ValidationException extends AppException {
  const ValidationException(String message) : super(message);
}
