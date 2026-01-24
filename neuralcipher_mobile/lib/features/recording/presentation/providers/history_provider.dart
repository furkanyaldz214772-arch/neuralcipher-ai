import 'package:flutter/foundation.dart';
import '../../../../core/services/database_service.dart';
import '../../data/models/test_history.dart';

/// History provider for managing test history
class HistoryProvider with ChangeNotifier {
  final DatabaseService _databaseService;

  List<TestHistory> _history = [];
  bool _isLoading = false;
  String? _error;
  Map<String, dynamic>? _statistics;

  HistoryProvider({DatabaseService? databaseService})
      : _databaseService = databaseService ?? DatabaseService();

  // Getters
  List<TestHistory> get history => _history;
  bool get isLoading => _isLoading;
  String? get error => _error;
  Map<String, dynamic>? get statistics => _statistics;
  bool get hasHistory => _history.isNotEmpty;
  int get historyCount => _history.length;

  /// Load all test history
  Future<void> loadHistory() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _history = await _databaseService.getAllTestHistory();
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = 'Test geçmişi yüklenemedi: ${e.toString()}';
      _isLoading = false;
      notifyListeners();
    }
  }

  /// Load recent history (last N tests)
  Future<void> loadRecentHistory(int limit) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _history = await _databaseService.getRecentTestHistory(limit);
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = 'Test geçmişi yüklenemedi: ${e.toString()}';
      _isLoading = false;
      notifyListeners();
    }
  }

  /// Save test result to history
  Future<void> saveTestResult(TestHistory history) async {
    try {
      await _databaseService.insertTestHistory(history);
      // Reload history to include new test
      await loadHistory();
    } catch (e) {
      _error = 'Test kaydedilemedi: ${e.toString()}';
      notifyListeners();
    }
  }

  /// Delete test by ID
  Future<void> deleteTest(int id) async {
    try {
      await _databaseService.deleteTestHistory(id);
      // Remove from local list
      _history.removeWhere((test) => test.id == id);
      notifyListeners();
    } catch (e) {
      _error = 'Test silinemedi: ${e.toString()}';
      notifyListeners();
    }
  }

  /// Delete all tests
  Future<void> deleteAllTests() async {
    try {
      await _databaseService.deleteAllTestHistory();
      _history.clear();
      _statistics = null;
      notifyListeners();
    } catch (e) {
      _error = 'Testler silinemedi: ${e.toString()}';
      notifyListeners();
    }
  }

  /// Load statistics
  Future<void> loadStatistics() async {
    try {
      _statistics = await _databaseService.getStatistics();
      notifyListeners();
    } catch (e) {
      _error = 'İstatistikler yüklenemedi: ${e.toString()}';
      notifyListeners();
    }
  }

  /// Get test by ID
  Future<TestHistory?> getTestById(int id) async {
    try {
      return await _databaseService.getTestHistoryById(id);
    } catch (e) {
      _error = 'Test bulunamadı: ${e.toString()}';
      notifyListeners();
      return null;
    }
  }

  /// Clear error
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
