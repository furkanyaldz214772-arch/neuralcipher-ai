import 'package:flutter/material.dart';
import '../../../../core/constants/voice_test_constants.dart';

class MultiTestProvider extends ChangeNotifier {
  String _selectedLevel = VoiceTestConstants.levelQuick;
  List<VoiceTest> _tests = [];
  int _currentTestIndex = 0;
  List<String> _recordedFiles = [];
  bool _isCompleted = false;

  // Getters
  String get selectedLevel => _selectedLevel;
  List<VoiceTest> get tests => _tests;
  int get currentTestIndex => _currentTestIndex;
  VoiceTest get currentTest => _tests[_currentTestIndex];
  int get totalTests => _tests.length;
  int get completedTests => _currentTestIndex;
  double get progress => _currentTestIndex / _tests.length;
  List<String> get recordedFiles => _recordedFiles;
  bool get isCompleted => _isCompleted;
  bool get hasMoreTests => _currentTestIndex < _tests.length - 1;

  // Initialize with level
  void initialize(String level) {
    _selectedLevel = level;
    _tests = VoiceTests.getTestsByLevel(level);
    _currentTestIndex = 0;
    _recordedFiles = [];
    _isCompleted = false;
    notifyListeners();
  }

  // Complete current test and save file path
  void completeCurrentTest(String filePath) {
    _recordedFiles.add(filePath);
    notifyListeners();
  }

  // Move to next test
  void nextTest() {
    if (hasMoreTests) {
      _currentTestIndex++;
      notifyListeners();
    } else {
      _isCompleted = true;
      notifyListeners();
    }
  }

  // Reset
  void reset() {
    _currentTestIndex = 0;
    _recordedFiles = [];
    _isCompleted = false;
    notifyListeners();
  }

  // Get test by index
  VoiceTest getTestAt(int index) {
    return _tests[index];
  }
}
