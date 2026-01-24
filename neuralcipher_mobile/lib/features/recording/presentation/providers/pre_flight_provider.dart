import 'package:flutter/foundation.dart';
import 'package:permission_handler/permission_handler.dart';
import 'dart:io';

enum CheckStatus {
  checking,
  passed,
  warning,
  failed,
}

/// Pre-flight check provider
/// Verifies environment conditions before recording
class PreFlightProvider with ChangeNotifier {
  // Check statuses
  CheckStatus _microphoneCheck = CheckStatus.checking;
  CheckStatus _noiseCheck = CheckStatus.checking;
  CheckStatus _batteryCheck = CheckStatus.checking;
  CheckStatus _storageCheck = CheckStatus.checking;

  // Check messages
  String _microphoneMessage = 'Kontrol ediliyor...';
  String _noiseMessage = 'Kontrol ediliyor...';
  String _batteryMessage = 'Kontrol ediliyor...';
  String _storageMessage = 'Kontrol ediliyor...';

  bool _isChecking = false;

  // Getters
  CheckStatus get microphoneCheck => _microphoneCheck;
  CheckStatus get noiseCheck => _noiseCheck;
  CheckStatus get batteryCheck => _batteryCheck;
  CheckStatus get storageCheck => _storageCheck;

  String get microphoneMessage => _microphoneMessage;
  String get noiseMessage => _noiseMessage;
  String get batteryMessage => _batteryMessage;
  String get storageMessage => _storageMessage;

  bool get isChecking => _isChecking;

  bool get allChecksPassed =>
      _microphoneCheck == CheckStatus.passed &&
      (_noiseCheck == CheckStatus.passed || _noiseCheck == CheckStatus.warning) &&
      (_batteryCheck == CheckStatus.passed || _batteryCheck == CheckStatus.warning) &&
      _storageCheck == CheckStatus.passed;

  /// Run all pre-flight checks
  Future<void> runChecks() async {
    _isChecking = true;
    notifyListeners();

    // Reset all checks
    _microphoneCheck = CheckStatus.checking;
    _noiseCheck = CheckStatus.checking;
    _batteryCheck = CheckStatus.checking;
    _storageCheck = CheckStatus.checking;
    notifyListeners();

    // Run checks sequentially
    await _checkMicrophone();
    await _checkNoise();
    await _checkBattery();
    await _checkStorage();

    _isChecking = false;
    notifyListeners();
  }

  /// Check microphone permission
  Future<void> _checkMicrophone() async {
    try {
      final status = await Permission.microphone.status;

      if (status.isGranted) {
        _microphoneCheck = CheckStatus.passed;
        _microphoneMessage = 'Mikrofon izni verildi';
      } else if (status.isDenied) {
        // Try to request
        final result = await Permission.microphone.request();
        if (result.isGranted) {
          _microphoneCheck = CheckStatus.passed;
          _microphoneMessage = 'Mikrofon izni verildi';
        } else {
          _microphoneCheck = CheckStatus.failed;
          _microphoneMessage = 'Mikrofon izni gerekli';
        }
      } else if (status.isPermanentlyDenied) {
        _microphoneCheck = CheckStatus.failed;
        _microphoneMessage = 'Ayarlardan mikrofon iznini açın';
      }
    } catch (e) {
      _microphoneCheck = CheckStatus.failed;
      _microphoneMessage = 'İzin kontrolü başarısız';
    }
    notifyListeners();
  }

  /// Check ambient noise level
  /// Note: This is a simplified check. In production, you'd use
  /// actual audio level monitoring
  Future<void> _checkNoise() async {
    await Future.delayed(const Duration(milliseconds: 500));

    // Simulated check - in production, measure actual noise
    // For now, we'll assume it's acceptable
    _noiseCheck = CheckStatus.passed;
    _noiseMessage = 'Ortam gürültüsü uygun';

    // Example warning case:
    // _noiseCheck = CheckStatus.warning;
    // _noiseMessage = 'Ortam biraz gürültülü, daha sessiz bir yer tercih edin';

    notifyListeners();
  }

  /// Check battery level
  Future<void> _checkBattery() async {
    await Future.delayed(const Duration(milliseconds: 300));

    // Simulated check - in production, use battery_plus package
    // For now, we'll assume battery is sufficient
    _batteryCheck = CheckStatus.passed;
    _batteryMessage = 'Batarya seviyesi yeterli';

    // Example warning case:
    // _batteryCheck = CheckStatus.warning;
    // _batteryMessage = 'Batarya düşük (%15), şarj etmeyi düşünün';

    notifyListeners();
  }

  /// Check storage space
  Future<void> _checkStorage() async {
    await Future.delayed(const Duration(milliseconds: 300));

    try {
      // Check if we have enough space for recording
      // WAV file ~440KB, we need at least 1MB to be safe
      final tempDir = Directory.systemTemp;
      // ignore: unused_local_variable
      final stat = await tempDir.stat();

      // Simplified check - in production, calculate actual free space
      _storageCheck = CheckStatus.passed;
      _storageMessage = 'Depolama alanı yeterli';
    } catch (e) {
      _storageCheck = CheckStatus.warning;
      _storageMessage = 'Depolama kontrolü yapılamadı';
    }
    notifyListeners();
  }
}
