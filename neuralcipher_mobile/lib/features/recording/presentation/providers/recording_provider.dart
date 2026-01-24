import 'dart:async';
import 'package:flutter/foundation.dart';
import '../../../../core/services/audio_service.dart';
import '../../../../core/services/permission_service.dart';
import '../../../../core/constants/audio_constants.dart';
import '../../../../core/errors/failures.dart';

enum RecordingState {
  idle,
  checkingPermission,
  ready,
  recording,
  processing,
  completed,
  error,
}

class RecordingProvider extends ChangeNotifier {
  final AudioService _audioService;
  final PermissionService _permissionService;
  
  RecordingState _state = RecordingState.idle;
  double _amplitude = 0.0;
  int _countdown = AudioConstants.recordingDurationSeconds;
  String? _recordedFilePath;
  Failure? _failure;
  
  StreamSubscription? _amplitudeSubscription;
  Timer? _countdownTimer;
  
  RecordingProvider({
    required AudioService audioService,
    required PermissionService permissionService,
  })  : _audioService = audioService,
        _permissionService = permissionService;
  
  // Getters
  RecordingState get state => _state;
  double get amplitude => _amplitude;
  int get countdown => _countdown;
  String? get recordedFilePath => _recordedFilePath;
  String? get recordingPath => _recordedFilePath; // Alias for compatibility
  Failure? get failure => _failure;
  bool get isRecording => _state == RecordingState.recording;
  
  /// Initialize and check permissions
  Future<void> initialize() async {
    _setState(RecordingState.checkingPermission);
    
    try {
      // Check microphone permission
      final hasPermission = await _permissionService.hasMicrophonePermission();
      
      if (!hasPermission) {
        // Request permission
        final granted = await _permissionService.requestMicrophonePermission();
        
        if (!granted) {
          _setError(const PermissionFailure(
            'Mikrofon izni gerekli. Lütfen uygulama ayarlarından izin verin.',
          ));
          return;
        }
      }
      
      // Initialize audio service
      await _audioService.initialize();
      
      _setState(RecordingState.ready);
    } catch (e) {
      _setError(PermissionFailure('İzin kontrolü başarısız: $e'));
    }
  }
  
  /// Start recording
  Future<void> startRecording() async {
    if (_state != RecordingState.ready) {
      return;
    }
    
    try {
      _setState(RecordingState.recording);
      _countdown = AudioConstants.recordingDurationSeconds;
      _recordedFilePath = null;
      _failure = null;
      
      // Start recording
      await _audioService.startRecording();
      
      // Start amplitude monitoring
      _amplitudeSubscription = _audioService.getAmplitudeStream().listen(
        (amplitude) {
          _amplitude = amplitude;
          notifyListeners();
        },
      );
      
      // Start countdown
      _startCountdown();
    } catch (e) {
      _setError(AudioRecordingFailure('Kayıt başlatılamadı: $e'));
    }
  }
  
  /// Stop recording
  Future<void> stopRecording() async {
    if (_state != RecordingState.recording) {
      return;
    }
    
    try {
      _setState(RecordingState.processing);
      
      // Stop countdown
      _countdownTimer?.cancel();
      _countdownTimer = null;
      
      // Stop amplitude monitoring
      await _amplitudeSubscription?.cancel();
      _amplitudeSubscription = null;
      
      // Stop recording
      final filePath = await _audioService.stopRecording();
      
      if (filePath != null) {
        _recordedFilePath = filePath;
        _setState(RecordingState.completed);
      } else {
        _setError(const AudioRecordingFailure('Kayıt dosyası oluşturulamadı'));
      }
    } catch (e) {
      _setError(AudioRecordingFailure('Kayıt durdurulamadı: $e'));
    }
  }
  
  /// Cancel recording
  Future<void> cancelRecording() async {
    if (_state != RecordingState.recording) {
      return;
    }
    
    try {
      // Stop countdown
      _countdownTimer?.cancel();
      _countdownTimer = null;
      
      // Stop amplitude monitoring
      await _amplitudeSubscription?.cancel();
      _amplitudeSubscription = null;
      
      // Cancel recording
      await _audioService.cancelRecording();
      
      _setState(RecordingState.ready);
      _recordedFilePath = null;
    } catch (e) {
      _setError(AudioRecordingFailure('Kayıt iptal edilemedi: $e'));
    }
  }
  
  /// Reset to ready state
  void reset() {
    _setState(RecordingState.ready);
    _amplitude = 0.0;
    _countdown = AudioConstants.recordingDurationSeconds;
    _recordedFilePath = null;
    _failure = null;
  }
  
  /// Start countdown timer
  void _startCountdown() {
    _countdownTimer = Timer.periodic(
      const Duration(seconds: 1),
      (timer) {
        _countdown--;
        notifyListeners();
        
        if (_countdown <= 0) {
          timer.cancel();
          stopRecording();
        }
      },
    );
  }
  
  /// Set state
  void _setState(RecordingState newState) {
    _state = newState;
    notifyListeners();
  }
  
  /// Set error
  void _setError(Failure failure) {
    _failure = failure;
    _state = RecordingState.error;
    notifyListeners();
  }
  
  @override
  void dispose() {
    _countdownTimer?.cancel();
    _amplitudeSubscription?.cancel();
    _audioService.dispose();
    super.dispose();
  }
}
