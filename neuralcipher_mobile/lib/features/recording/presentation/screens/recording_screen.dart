import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../../../../core/constants/app_constants.dart';
import '../providers/recording_provider.dart';
import '../providers/analysis_provider.dart';
import '../widgets/waveform_visualizer.dart';
import 'results_screen.dart';

class RecordingScreen extends StatefulWidget {
  const RecordingScreen({super.key});
  
  @override
  State<RecordingScreen> createState() => _RecordingScreenState();
}

class _RecordingScreenState extends State<RecordingScreen> {
  @override
  void initState() {
    super.initState();
    // Initialize recording provider
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<RecordingProvider>().initialize();
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ses Kaydı'),
      ),
      body: Consumer<RecordingProvider>(
        builder: (context, provider, child) {
          return _buildBody(context, provider);
        },
      ),
    );
  }
  
  Widget _buildBody(BuildContext context, RecordingProvider provider) {
    switch (provider.state) {
      case RecordingState.idle:
      case RecordingState.checkingPermission:
        return _buildLoading();
      
      case RecordingState.ready:
        return _buildReady(context, provider);
      
      case RecordingState.recording:
        return _buildRecording(context, provider);
      
      case RecordingState.processing:
        return _buildProcessing();
      
      case RecordingState.completed:
        return _buildCompleted(context, provider);
      
      case RecordingState.error:
        return _buildError(context, provider);
    }
  }
  
  Widget _buildLoading() {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CircularProgressIndicator(),
          SizedBox(height: AppConstants.spacingLg),
          Text(
            'İzinler kontrol ediliyor...',
            style: TextStyle(fontSize: AppConstants.fontSizeBody),
          ),
        ],
      ),
    );
  }
  
  Widget _buildReady(BuildContext context, RecordingProvider provider) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.spacingLg),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.mic,
              size: 100,
              color: Theme.of(context).colorScheme.primary,
            ),
            const SizedBox(height: AppConstants.spacingXl),
            Text(
              'Hazır',
              style: Theme.of(context).textTheme.displayLarge,
            ),
            const SizedBox(height: AppConstants.spacingMd),
            Text(
              'Telefonu 15-20cm uzakta tutun.\nSabit ve düzgün bir sesle "Aaaa" demeye hazır olun.',
              style: Theme.of(context).textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: AppConstants.spacingXxl),
            ElevatedButton(
              onPressed: () {
                HapticFeedback.mediumImpact();
                provider.startRecording();
              },
              child: const Text('Kayda Başla'),
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildRecording(BuildContext context, RecordingProvider provider) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.spacingLg),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Countdown
            Text(
              '${provider.countdown}',
              style: Theme.of(context).textTheme.displayLarge?.copyWith(
                fontSize: 80,
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.primary,
              ),
            ),
            const SizedBox(height: AppConstants.spacingMd),
            
            // Instruction
            Text(
              'Sabit ve düzgün bir sesle "Aaaa" deyin',
              style: Theme.of(context).textTheme.headlineLarge,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: AppConstants.spacingXl),
            
            // Waveform Visualizer
            Container(
              height: 150,
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: Theme.of(context).colorScheme.primary.withOpacity(0.3),
                  width: 2,
                ),
              ),
              child: WaveformVisualizer(
                amplitude: provider.amplitude,
                color: Theme.of(context).colorScheme.primary,
                height: 150,
              ),
            ),
            const SizedBox(height: AppConstants.spacingXl),
            
            // Recording indicator
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    color: Colors.red,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: AppConstants.spacingSm),
                Text(
                  'Kaydediliyor...',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
              ],
            ),
            const SizedBox(height: AppConstants.spacingXl),
            
            // Cancel button
            OutlinedButton(
              onPressed: () {
                HapticFeedback.lightImpact();
                provider.cancelRecording();
              },
              child: const Text('İptal'),
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildProcessing() {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CircularProgressIndicator(),
          SizedBox(height: AppConstants.spacingLg),
          Text(
            'Kayıt işleniyor...',
            style: TextStyle(fontSize: AppConstants.fontSizeBody),
          ),
        ],
      ),
    );
  }
  
  Widget _buildCompleted(BuildContext context, RecordingProvider provider) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.spacingLg),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.check_circle,
              size: 100,
              color: Theme.of(context).colorScheme.secondary,
            ),
            const SizedBox(height: AppConstants.spacingXl),
            Text(
              'Kayıt Tamamlandı!',
              style: Theme.of(context).textTheme.displayLarge,
            ),
            const SizedBox(height: AppConstants.spacingMd),
            Text(
              'Ses kaydınız başarıyla oluşturuldu.',
              style: Theme.of(context).textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: AppConstants.spacingXxl),
            ElevatedButton(
              onPressed: () async {
                final analysisProvider = context.read<AnalysisProvider>();
                final recordingPath = provider.recordingPath;
                
                if (recordingPath != null) {
                  // Navigate to results screen and start analysis
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const ResultsScreen(),
                    ),
                  );
                  
                  // Start analysis
                  await analysisProvider.analyzeVoice(recordingPath);
                }
              },
              child: const Text('Analiz Et'),
            ),
            const SizedBox(height: AppConstants.spacingMd),
            OutlinedButton(
              onPressed: () {
                provider.reset();
              },
              child: const Text('Yeni Kayıt'),
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildError(BuildContext context, RecordingProvider provider) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.spacingLg),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.error_outline,
              size: 100,
              color: Theme.of(context).colorScheme.error,
            ),
            const SizedBox(height: AppConstants.spacingXl),
            Text(
              'Hata Oluştu',
              style: Theme.of(context).textTheme.displayLarge,
            ),
            const SizedBox(height: AppConstants.spacingMd),
            Text(
              provider.failure?.message ?? 'Bilinmeyen hata',
              style: Theme.of(context).textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: AppConstants.spacingXxl),
            ElevatedButton(
              onPressed: () {
                provider.initialize();
              },
              child: const Text('Tekrar Dene'),
            ),
            const SizedBox(height: AppConstants.spacingMd),
            OutlinedButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Geri Dön'),
            ),
          ],
        ),
      ),
    );
  }
}
