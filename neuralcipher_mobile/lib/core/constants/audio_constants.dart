/// Audio Recording Constants
/// Medical-grade audio specifications
class AudioConstants {
  // Audio Format Specifications (Medical-Grade)
  static const int sampleRate = 44100; // 44.1 kHz
  static const int bitDepth = 16; // 16-bit
  static const int numChannels = 1; // Mono
  static const String audioFormat = 'wav'; // WAV (Linear PCM)
  
  // Recording Duration
  static const int recordingDurationSeconds = 5; // Exactly 5 seconds
  
  // Pre-Flight Checks
  static const double maxAmbientNoiseDb = 40.0; // Maximum ambient noise level
  static const int minBatteryLevel = 20; // Minimum battery percentage
  static const int minStorageSpaceMb = 50; // Minimum storage space in MB
  
  // File Naming
  static const String filePrefix = 'neuralcipher_recording_';
  static const String fileExtension = '.wav';
  
  // Audio Quality
  static const double minRecordingQuality = 0.7; // Minimum quality threshold
  
  // Waveform Visualization
  static const int waveformFps = 30; // Update frequency for waveform
}

