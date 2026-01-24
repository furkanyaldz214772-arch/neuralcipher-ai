/// Base Failure class for error handling
abstract class Failure {
  final String message;
  
  const Failure(this.message);
  
  @override
  String toString() => message;
}

/// Network-related failures
class NetworkFailure extends Failure {
  const NetworkFailure(String message) : super(message);
}

/// Server-related failures
class ServerFailure extends Failure {
  const ServerFailure(String message) : super(message);
}

/// Cache/Storage failures
class CacheFailure extends Failure {
  const CacheFailure(String message) : super(message);
}

/// Permission-related failures
class PermissionFailure extends Failure {
  const PermissionFailure(String message) : super(message);
}

/// Audio recording failures
class AudioRecordingFailure extends Failure {
  const AudioRecordingFailure(String message) : super(message);
}

/// Validation failures
class ValidationFailure extends Failure {
  const ValidationFailure(String message) : super(message);
}

/// Unknown/Unexpected failures
class UnknownFailure extends Failure {
  const UnknownFailure(String message) : super(message);
}
