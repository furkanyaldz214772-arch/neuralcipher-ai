import 'dart:async';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'api_service.dart';
import 'database_service.dart';

/// Sync service for offline support
class SyncService {
  final ApiService _apiService;
  final DatabaseService _databaseService;
  final Connectivity _connectivity = Connectivity();
  
  StreamSubscription? _connectivitySubscription;
  bool _isSyncing = false;
  
  SyncService({
    required ApiService apiService,
    required DatabaseService databaseService,
  })  : _apiService = apiService,
        _databaseService = databaseService;
  
  /// Initialize sync service
  Future<void> init() async {
    // Listen to connectivity changes
    _connectivitySubscription = _connectivity.onConnectivityChanged.listen(
      (ConnectivityResult result) {
        if (result != ConnectivityResult.none) {
          // Connected - trigger sync
          syncAll();
        }
      },
    );
    
    // Initial sync if online
    final result = await _connectivity.checkConnectivity();
    if (result != ConnectivityResult.none) {
      syncAll();
    }
  }
  
  /// Dispose
  void dispose() {
    _connectivitySubscription?.cancel();
  }
  
  /// Check if online
  Future<bool> isOnline() async {
    final result = await _connectivity.checkConnectivity();
    return result != ConnectivityResult.none;
  }
  
  /// Sync all data
  Future<void> syncAll() async {
    if (_isSyncing) return;
    
    _isSyncing = true;
    
    try {
      // Check if authenticated
      if (!_apiService.isAuthenticated) {
        return;
      }
      
      // Sync profile
      await syncProfile();
      
      // Sync tests
      await syncTests();
      
      // Upload pending tests
      await uploadPendingTests();
      
      // Update last sync time
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('last_sync', DateTime.now().toIso8601String());
      
    } catch (e) {
      print('Sync error: $e');
    } finally {
      _isSyncing = false;
    }
  }
  
  /// Sync profile from server
  Future<void> syncProfile() async {
    try {
      final profile = await _apiService.getProfile();
      
      // Store in local database
      await _databaseService.saveProfile(profile);
      
    } catch (e) {
      print('Profile sync error: $e');
    }
  }
  
  /// Sync tests from server
  Future<void> syncTests() async {
    try {
      final response = await _apiService.listTests(pageSize: 100);
      final tests = response['tests'] as List;
      
      // Store in local database
      for (final test in tests) {
        await _databaseService.saveTest(test);
      }
      
    } catch (e) {
      print('Tests sync error: $e');
    }
  }
  
  /// Upload pending tests
  Future<void> uploadPendingTests() async {
    try {
      // Get pending tests from local database
      final pendingTests = await _databaseService.getPendingTests();
      
      for (final test in pendingTests) {
        try {
          // Create test on server
          final response = await _apiService.createTest(
            level: test['level'],
          );
          
          final testId = response['test_id'];
          
          // Upload audio file
          // TODO: Implement audio file upload
          
          // Update local test with server ID
          await _databaseService.updateTestServerId(
            test['id'],
            testId,
          );
          
        } catch (e) {
          print('Upload test error: $e');
          // Continue with next test
        }
      }
      
    } catch (e) {
      print('Upload pending tests error: $e');
    }
  }
  
  /// Get last sync time
  Future<DateTime?> getLastSyncTime() async {
    final prefs = await SharedPreferences.getInstance();
    final lastSyncStr = prefs.getString('last_sync');
    
    if (lastSyncStr != null) {
      return DateTime.parse(lastSyncStr);
    }
    
    return null;
  }
  
  /// Force sync
  Future<void> forceSync() async {
    _isSyncing = false;
    await syncAll();
  }
}
