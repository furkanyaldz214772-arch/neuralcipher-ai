import 'package:flutter/foundation.dart';
import '../../../../core/services/api_service.dart';
import '../../../../core/errors/failures.dart';
import '../../data/models/analysis_response.dart';

enum AnalysisState {
  idle,
  uploading,
  analyzing,
  completed,
  error,
}

/// Analysis provider for managing voice analysis state
class AnalysisProvider with ChangeNotifier {
  final ApiService _apiService;

  AnalysisProvider({ApiService? apiService})
      : _apiService = apiService ?? ApiService();

  // State
  AnalysisState _state = AnalysisState.idle;
  AnalysisResponse? _result;
  Failure? _failure;
  
  // Upload progress
  double _uploadProgress = 0.0;
  int _uploadedBytes = 0;
  int _totalBytes = 0;

  // Getters
  AnalysisState get state => _state;
  AnalysisResponse? get result => _result;
  Failure? get failure => _failure;
  double get uploadProgress => _uploadProgress;
  int get uploadedBytes => _uploadedBytes;
  int get totalBytes => _totalBytes;

  bool get isUploading => _state == AnalysisState.uploading;
  bool get isAnalyzing => _state == AnalysisState.analyzing;
  bool get isCompleted => _state == AnalysisState.completed;
  bool get hasError => _state == AnalysisState.error;
  bool get isProcessing => isUploading || isAnalyzing;

  /// Upload and analyze voice file
  Future<void> analyzeVoice(String filePath) async {
    try {
      // Reset state
      _state = AnalysisState.uploading;
      _result = null;
      _failure = null;
      _uploadProgress = 0.0;
      _uploadedBytes = 0;
      _totalBytes = 0;
      notifyListeners();

      // Upload with progress tracking
      final response = await _apiService.uploadAndAnalyze(
        audioFile: File(filePath),
        onProgress: (sent, total) {
          _uploadedBytes = sent;
          _totalBytes = total;
          _uploadProgress = sent / total;
          
          // Switch to analyzing when upload completes
          if (sent >= total && _state == AnalysisState.uploading) {
            _state = AnalysisState.analyzing;
          }
          
          notifyListeners();
        },
      );

      // Analysis completed - convert Map to AnalysisResponse
      _result = AnalysisResponse.fromJson(response);
      _state = AnalysisState.completed;
      notifyListeners();
    } catch (e) {
      // Handle errors
      if (e is Failure) {
        _failure = e;
      } else {
        _failure = ServerFailure(e.toString());
      }
      
      _state = AnalysisState.error;
      notifyListeners();
    }
  }

  /// Reset to idle state
  void reset() {
    _state = AnalysisState.idle;
    _result = null;
    _failure = null;
    _uploadProgress = 0.0;
    _uploadedBytes = 0;
    _totalBytes = 0;
    notifyListeners();
  }

  /// Get upload progress percentage
  String getUploadProgressPercentage() {
    return '${(_uploadProgress * 100).toStringAsFixed(0)}%';
  }

  /// Get upload size string
  String getUploadSizeString() {
    final uploadedKB = (_uploadedBytes / 1024).toStringAsFixed(1);
    final totalKB = (_totalBytes / 1024).toStringAsFixed(1);
    return '$uploadedKB KB / $totalKB KB';
  }

  /// Test backend connection
  Future<bool> testConnection() async {
    try {
      await _apiService.testConnection();
      return true;
    } catch (e) {
      return false;
    }
  }

  /// Get model info
  Future<Map<String, dynamic>?> getModelInfo() async {
    try {
      return await _apiService.getModelInfo();
    } catch (e) {
      return null;
    }
  }
}
