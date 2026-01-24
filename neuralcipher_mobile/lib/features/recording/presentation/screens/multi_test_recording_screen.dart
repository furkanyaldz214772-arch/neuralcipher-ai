import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../core/constants/voice_test_constants.dart';
import '../providers/multi_test_provider.dart';
import '../providers/recording_provider.dart';
import '../providers/analysis_provider.dart';
import '../widgets/waveform_visualizer.dart';
import 'results_screen.dart';

class MultiTestRecordingScreen extends StatefulWidget {
  final String level;

  const MultiTestRecordingScreen({
    Key? key,
    required this.level,
  }) : super(key: key);

  @override
  State<MultiTestRecordingScreen> createState() =>
      _MultiTestRecordingScreenState();
}

class _MultiTestRecordingScreenState extends State<MultiTestRecordingScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<MultiTestProvider>().initialize(widget.level);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<MultiTestProvider>(
      builder: (context, multiTestProvider, child) {
        if (multiTestProvider.tests.isEmpty) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        if (multiTestProvider.isCompleted) {
          return _buildCompletedScreen(context, multiTestProvider);
        }

        return _buildTestScreen(context, multiTestProvider);
      },
    );
  }

  Widget _buildTestScreen(
    BuildContext context,
    MultiTestProvider multiTestProvider,
  ) {
    final currentTest = multiTestProvider.currentTest;
    final progress = multiTestProvider.progress;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Test ${multiTestProvider.currentTestIndex + 1}/${multiTestProvider.totalTests}',
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(4),
          child: LinearProgressIndicator(
            value: progress,
            backgroundColor: Colors.grey[300],
          ),
        ),
      ),
      body: Consumer<RecordingProvider>(
        builder: (context, recordingProvider, child) {
          return _buildRecordingBody(
            context,
            multiTestProvider,
            recordingProvider,
            currentTest,
          );
        },
      ),
    );
  }

  Widget _buildRecordingBody(
    BuildContext context,
    MultiTestProvider multiTestProvider,
    RecordingProvider recordingProvider,
    VoiceTest currentTest,
  ) {
    switch (recordingProvider.state) {
      case RecordingState.idle:
      case RecordingState.ready:
        return _buildReady(context, multiTestProvider, recordingProvider, currentTest);
      case RecordingState.recording:
        return _buildRecording(context, recordingProvider, currentTest);
      case RecordingState.completed:
        return _buildTestCompleted(context, multiTestProvider, recordingProvider);
      default:
        return const Center(child: CircularProgressIndicator());
    }
  }

  Widget _buildReady(
    BuildContext context,
    MultiTestProvider multiTestProvider,
    RecordingProvider recordingProvider,
    VoiceTest currentTest,
  ) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Test icon
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Theme.of(context).primaryColor.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.mic,
                size: 60,
                color: Theme.of(context).primaryColor,
              ),
            ),
            const SizedBox(height: 32),
            
            // Test title
            Text(
              currentTest.title,
              style: Theme.of(context).textTheme.headlineMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            
            // Instructions
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.blue[50],
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                children: [
                  Text(
                    currentTest.instruction,
                    style: const TextStyle(fontSize: 16),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Örnek: ${currentTest.example}',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey[600],
                      fontStyle: FontStyle.italic,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            
            // Start button
            ElevatedButton(
              onPressed: () async {
                await recordingProvider.initialize();
                await recordingProvider.startRecording();
              },
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: 48,
                  vertical: 16,
                ),
              ),
              child: const Text(
                'Kayda Başla',
                style: TextStyle(fontSize: 18),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecording(
    BuildContext context,
    RecordingProvider recordingProvider,
    VoiceTest currentTest,
  ) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Countdown
            Text(
              '${recordingProvider.countdown}',
              style: TextStyle(
                fontSize: 80,
                fontWeight: FontWeight.bold,
                color: Theme.of(context).primaryColor,
              ),
            ),
            const SizedBox(height: 16),
            
            // Instruction
            Text(
              currentTest.example,
              style: Theme.of(context).textTheme.headlineMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            
            // Waveform
            Container(
              height: 150,
              decoration: BoxDecoration(
                color: Colors.grey[100],
                borderRadius: BorderRadius.circular(12),
              ),
              child: WaveformVisualizer(
                amplitude: recordingProvider.amplitude,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTestCompleted(
    BuildContext context,
    MultiTestProvider multiTestProvider,
    RecordingProvider recordingProvider,
  ) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Success icon
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.green.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.check_circle,
                size: 60,
                color: Colors.green,
              ),
            ),
            const SizedBox(height: 24),
            
            Text(
              'Test Tamamlandı!',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 16),
            
            Text(
              '${multiTestProvider.completedTests + 1}/${multiTestProvider.totalTests}',
              style: TextStyle(
                fontSize: 24,
                color: Colors.grey[600],
              ),
            ),
            const SizedBox(height: 32),
            
            // Next button
            ElevatedButton(
              onPressed: () {
                // Save file path
                if (recordingProvider.recordedFilePath != null) {
                  multiTestProvider.completeCurrentTest(
                    recordingProvider.recordedFilePath!,
                  );
                }
                
                // Move to next test
                multiTestProvider.nextTest();
                
                // Reset recording provider
                recordingProvider.reset();
              },
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: 48,
                  vertical: 16,
                ),
              ),
              child: Text(
                multiTestProvider.hasMoreTests
                    ? 'Sonraki Test'
                    : 'Analiz Et',
                style: const TextStyle(fontSize: 18),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCompletedScreen(
    BuildContext context,
    MultiTestProvider multiTestProvider,
  ) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tüm Testler Tamamlandı'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.celebration,
                size: 80,
                color: Colors.green,
              ),
              const SizedBox(height: 24),
              Text(
                'Tebrikler!',
                style: Theme.of(context).textTheme.headlineLarge,
              ),
              const SizedBox(height: 16),
              Text(
                '${multiTestProvider.totalTests} test tamamlandı',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: () {
                  // Analyze all tests
                  _analyzeTests(context, multiTestProvider);
                },
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 48,
                    vertical: 16,
                  ),
                ),
                child: const Text(
                  'Sonuçları Gör',
                  style: TextStyle(fontSize: 18),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _analyzeTests(
    BuildContext context,
    MultiTestProvider multiTestProvider,
  ) async {
    // For now, just analyze the first file
    // In production, send all files to backend
    if (multiTestProvider.recordedFiles.isEmpty) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Kayıtlı dosya bulunamadı')),
        );
      }
      return;
    }
    
    final analysisProvider = context.read<AnalysisProvider>();
    
    // Show loading
    if (context.mounted) {
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (context) => const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }
    
    try {
      // Analyze first file (demo)
      await analysisProvider.analyzeVoice(
        multiTestProvider.recordedFiles.first,
      );
      
      // Close loading
      if (context.mounted) {
        Navigator.of(context).pop();
        
        // Show results
        if (analysisProvider.result != null) {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(
              builder: (_) => const ResultsScreen(),
            ),
          );
        } else if (analysisProvider.failure != null) {
          // Show error
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Hata: ${analysisProvider.failure!.message}'),
              backgroundColor: Colors.red,
            ),
          );
        }
      }
    } catch (e) {
      // Close loading
      if (context.mounted) {
        Navigator.of(context).pop();
        
        // Show error
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Analiz hatası: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
}
