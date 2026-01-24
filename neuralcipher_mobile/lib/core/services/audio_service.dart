import 'dart:async';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:record/record.dart';
import 'package:uuid/uuid.dart';
import '../constants/audio_constants.dart';
import '../errors/exceptions.dart';

/// Audio Recording Service
/// Medical-grade audio recording: 44.1kHz, 16-bit, WAV, Mono
class AudioService {
  final AudioRecorder _recorder = AudioRecorder();
  final Uuid _uuid = const Uuid();
  
  bool _isRecording = false;
  String? _currentFilePath;
  Timer? _recordingTimer;
  StreamController<double>? _amplitudeController;
  
  bool get isRecording => _isRecording;
  String? get currentFilePath => _currentFilePath;
  
  /// Initialize audio service
  Future<void> initialize() async {
    try {
      // Check if recorder is available
      final hasPermission = await _recorder.hasPermission();
      if (!hasPermission) {
        throw const AudioRecordingException(
          'Mikrofon izni verilmedi',
        );
      }
    } catch (e) {
      throw AudioRecordingException('Audio service başlatılamadı: $e');
    }
  }
  
  /// Start recording
  /// Returns the file path where audio is being recorded
  Future<String> startRecording() async {
    if (_isRecording) {
      throw const AudioRecordingException('Kayıt zaten devam ediyor');
    }
    
    try {
      // Generate unique file path
      final directory = await getTemporaryDirectory();
      final fileName = '${AudioConstants.filePrefix}${_uuid.v4()}${AudioConstants.fileExtension}';
      _currentFilePath = '${directory.path}/$fileName';
      
      // Configure recording settings (Medical-Grade)
      await _recorder.start(
        const RecordConfig(
          encoder: AudioEncoder.wav, // WAV format (Linear PCM)
          sampleRate: AudioConstants.sampleRate, // 44.1 kHz
          bitRate: AudioConstants.bitDepth * AudioConstants.sampleRate, // 16-bit
          numChannels: AudioConstants.numChannels, // Mono
        ),
        path: _currentFilePath!,
      );
      
      _isRecording = true;
      
      // Start amplitude monitoring
      _startAmplitudeMonitoring();
      
      // Auto-stop after 5 seconds
      _recordingTimer = Timer(
        const Duration(seconds: AudioConstants.recordingDurationSeconds),
        () => stopRecording(),
      );
      
      return _currentFilePath!;
    } catch (e) {
      _isRecording = false;
      throw AudioRecordingException('Kayıt başlatılamadı: $e');
    }
  }
  
  /// Stop recording
  /// Returns the file path of the recorded audio
  Future<String?> stopRecording() async {
    if (!_isRecording) {
      return null;
    }
    
    try {
      // Stop recording
      final path = await _recorder.stop();
      
      _isRecording = false;
      _recordingTimer?.cancel();
      _recordingTimer = null;
      
      // Stop amplitude monitoring
      await _amplitudeController?.close();
      _amplitudeController = null;
      
      // Validate file
      if (path != null && await _validateRecording(path)) {
        return path;
      } else {
        throw const AudioRecordingException('Kayıt dosyası geçersiz');
      }
    } catch (e) {
      _isRecording = false;
      throw AudioRecordingException('Kayıt durdurulamadı: $e');
    }
  }
  
  /// Get amplitude stream (for waveform visualization)
  Stream<double> getAmplitudeStream() {
    _amplitudeController ??= StreamController<double>.broadcast();
    return _amplitudeController!.stream;
  }
  
  /// Start monitoring amplitude
  void _startAmplitudeMonitoring() {
    _amplitudeController = StreamController<double>.broadcast();
    
    // Update amplitude at 30 FPS
    Timer.periodic(
      Duration(milliseconds: 1000 ~/ AudioConstants.waveformFps),
      (timer) async {
        if (!_isRecording) {
          timer.cancel();
          return;
        }
        
        try {
          final amplitude = await _recorder.getAmplitude();
          final normalizedAmplitude = _normalizeAmplitude(amplitude.current);
          _amplitudeController?.add(normalizedAmplitude);
        } catch (e) {
          // Ignore amplitude errors
        }
      },
    );
  }
  
  /// Normalize amplitude to 0.0-1.0 range
  double _normalizeAmplitude(double amplitude) {
    // Amplitude is typically in dB (-160 to 0)
    // Normalize to 0.0-1.0 range
    const minDb = -60.0;
    const maxDb = 0.0;
    
    if (amplitude < minDb) return 0.0;
    if (amplitude > maxDb) return 1.0;
    
    return (amplitude - minDb) / (maxDb - minDb);
  }
  
  /// Validate recorded file
  Future<bool> _validateRecording(String path) async {
    try {
      final file = File(path);
      
      // Check if file exists
      if (!await file.exists()) {
        return false;
      }
      
      // Check file size (should be > 0)
      final size = await file.length();
      if (size == 0) {
        return false;
      }
      
      // Check file extension
      if (!path.endsWith(AudioConstants.fileExtension)) {
        return false;
      }
      
      return true;
    } catch (e) {
      return false;
    }
  }
  
  /// Cancel recording and delete file
  Future<void> cancelRecording() async {
    if (_isRecording) {
      await stopRecording();
    }
    
    // Delete file if exists
    if (_currentFilePath != null) {
      try {
        final file = File(_currentFilePath!);
        if (await file.exists()) {
          await file.delete();
        }
      } catch (e) {
        // Ignore deletion errors
      }
      _currentFilePath = null;
    }
  }
  
  /// Dispose resources
  Future<void> dispose() async {
    await cancelRecording();
    await _amplitudeController?.close();
    _amplitudeController = null;
    _recorder.dispose();
  }
}
