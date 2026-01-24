import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../core/constants/app_constants.dart';
import '../providers/analysis_provider.dart';
import '../providers/recording_provider.dart';
import '../providers/history_provider.dart';
import '../widgets/risk_score_bar.dart';
import '../widgets/error_display.dart';
import '../../data/models/test_history.dart';

/// Results screen showing analysis results
class ResultsScreen extends StatelessWidget {
  const ResultsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Analiz Sonuçları'),
        centerTitle: true,
      ),
      body: Consumer<AnalysisProvider>(
        builder: (context, provider, child) {
          if (provider.isUploading) {
            return _buildUploading(context, provider);
          } else if (provider.isAnalyzing) {
            return _buildAnalyzing(context);
          } else if (provider.isCompleted && provider.result != null) {
            return _buildResults(context, provider);
          } else if (provider.hasError) {
            return _buildError(context, provider);
          } else {
            return _buildInitial(context);
          }
        },
      ),
    );
  }

  Widget _buildInitial(BuildContext context) {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }

  Widget _buildUploading(BuildContext context, AnalysisProvider provider) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.spacingLg),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const CircularProgressIndicator(),
            const SizedBox(height: AppConstants.spacingXl),
            Text(
              'Yükleniyor...',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: AppConstants.spacingMd),
            Text(
              provider.getUploadProgressPercentage(),
              style: Theme.of(context).textTheme.displayMedium?.copyWith(
                    color: Theme.of(context).colorScheme.primary,
                  ),
            ),
            const SizedBox(height: AppConstants.spacingSm),
            Text(
              provider.getUploadSizeString(),
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.grey[600],
                  ),
            ),
            const SizedBox(height: AppConstants.spacingLg),
            LinearProgressIndicator(
              value: provider.uploadProgress,
              minHeight: 8,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAnalyzing(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.spacingLg),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const CircularProgressIndicator(),
            const SizedBox(height: AppConstants.spacingXl),
            Text(
              'Analiz Ediliyor...',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: AppConstants.spacingMd),
            Text(
              'AI modelimiz sesinizi analiz ediyor',
              style: Theme.of(context).textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildResults(BuildContext context, AnalysisProvider provider) {
    final result = provider.result!.analysis;
    final riskColor = _getRiskColor(result.riskLevel);

    // Save to history (only once)
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final historyProvider = context.read<HistoryProvider>();
      final testHistory = TestHistory.fromAnalysisResponse(
        provider.result!.fileId,
        DateTime.now(),
        provider.result!,
      );
      historyProvider.saveTestResult(testHistory);
    });

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppConstants.spacingLg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Risk Score Card
          Card(
            elevation: 4,
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.spacingLg),
              child: Column(
                children: [
                  Text(
                    'Risk Skoru',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  const SizedBox(height: AppConstants.spacingMd),
                  
                  // Risk score bar with animation
                  RiskScoreBar(riskScore: result.riskScore),
                  
                  const SizedBox(height: AppConstants.spacingLg),
                  
                  // Risk score value with animation
                  AnimatedPercentage(
                    value: result.riskScore,
                    textStyle: Theme.of(context).textTheme.displayLarge?.copyWith(
                          color: riskColor,
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  const SizedBox(height: AppConstants.spacingSm),
                  
                  // Risk level
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppConstants.spacingMd,
                      vertical: AppConstants.spacingSm,
                    ),
                    decoration: BoxDecoration(
                      color: riskColor.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: riskColor),
                    ),
                    child: Text(
                      _getRiskLevelText(result.riskLevel),
                      style: TextStyle(
                        color: riskColor,
                        fontWeight: FontWeight.bold,
                        fontSize: AppConstants.fontSizeBody,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          
          const SizedBox(height: AppConstants.spacingLg),
          
          // Interpretation
          Card(
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.spacingLg),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.info_outline, color: Colors.blue[700]),
                      const SizedBox(width: AppConstants.spacingSm),
                      Text(
                        'Değerlendirme',
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                    ],
                  ),
                  const SizedBox(height: AppConstants.spacingMd),
                  Text(
                    result.interpretation,
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                ],
              ),
            ),
          ),
          
          const SizedBox(height: AppConstants.spacingLg),
          
          // Recommendations
          if (result.recommendations.isNotEmpty)
            Card(
              child: Padding(
                padding: const EdgeInsets.all(AppConstants.spacingLg),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.lightbulb_outline, color: Colors.orange[700]),
                        const SizedBox(width: AppConstants.spacingSm),
                        Text(
                          'Öneriler',
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                      ],
                    ),
                    const SizedBox(height: AppConstants.spacingMd),
                    ...result.recommendations.map((rec) => Padding(
                          padding: const EdgeInsets.only(bottom: AppConstants.spacingSm),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text('• ', style: TextStyle(fontSize: 18)),
                              Expanded(
                                child: Text(
                                  rec,
                                  style: Theme.of(context).textTheme.bodyLarge,
                                ),
                              ),
                            ],
                          ),
                        )),
                  ],
                ),
              ),
            ),
          
          const SizedBox(height: AppConstants.spacingLg),
          
          // Disclaimer
          Card(
            color: Colors.amber[50],
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.spacingLg),
              child: Column(
                children: [
                  Icon(Icons.warning_amber, color: Colors.amber[900], size: 32),
                  const SizedBox(height: AppConstants.spacingMd),
                  Text(
                    'Önemli Uyarı',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  const SizedBox(height: AppConstants.spacingSm),
                  Text(
                    'Bu uygulama tıbbi teşhis koymaz. Sonuçlar sadece bilgilendirme amaçlıdır. '
                    'Herhangi bir endişeniz varsa lütfen bir sağlık uzmanına danışın.',
                    style: Theme.of(context).textTheme.bodyMedium,
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
          
          const SizedBox(height: AppConstants.spacingXl),
          
          // Action buttons
          ElevatedButton(
            onPressed: () {
              // Reset and go back to home
              context.read<RecordingProvider>().reset();
              context.read<AnalysisProvider>().reset();
              Navigator.of(context).popUntil((route) => route.isFirst);
            },
            child: const Text('Yeni Test Yap'),
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
    );
  }

  Widget _buildError(BuildContext context, AnalysisProvider provider) {
    return ErrorDisplay(
      failure: provider.failure!,
      onRetry: () {
        Navigator.of(context).pop();
      },
    );
  }

  Color _getRiskColor(String riskLevel) {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return Colors.green;
      case 'moderate':
        return Colors.orange;
      case 'high':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  String _getRiskLevelText(String riskLevel) {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'Düşük Risk';
      case 'moderate':
        return 'Orta Risk';
      case 'high':
        return 'Yüksek Risk';
      default:
        return 'Bilinmeyen';
    }
  }
}
