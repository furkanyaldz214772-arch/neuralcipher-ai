import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../core/constants/app_constants.dart';
import '../providers/history_provider.dart';
import '../../data/models/test_history.dart';
import '../widgets/risk_score_bar.dart';

/// History detail screen showing full test results
class HistoryDetailScreen extends StatelessWidget {
  final int testId;

  const HistoryDetailScreen({
    super.key,
    required this.testId,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Test Detayları'),
        centerTitle: true,
      ),
      body: FutureBuilder<TestHistory?>(
        future: context.read<HistoryProvider>().getTestById(testId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError || snapshot.data == null) {
            return _buildError(context);
          }

          final test = snapshot.data!;
          return _buildContent(context, test);
        },
      ),
    );
  }

  Widget _buildContent(BuildContext context, TestHistory test) {
    final riskColor = _getRiskColor(test.getRiskColor());

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppConstants.spacingLg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Date card
          Card(
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.spacingMd),
              child: Row(
                children: [
                  Icon(Icons.calendar_today, color: Colors.grey[600]),
                  const SizedBox(width: AppConstants.spacingSm),
                  Text(
                    test.getFormattedDate(),
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: AppConstants.spacingLg),

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

                  // Risk score bar (no animation for history)
                  RiskScoreBar(
                    riskScore: test.riskScore,
                    animationDuration: Duration.zero, // No animation
                  ),

                  const SizedBox(height: AppConstants.spacingLg),

                  // Risk score value
                  AnimatedPercentage(
                    value: test.riskScore,
                    animationDuration: Duration.zero, // No animation
                    textStyle:
                        Theme.of(context).textTheme.displayLarge?.copyWith(
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
                      test.getRiskLevelText(),
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

          // Confidence scores
          Card(
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.spacingLg),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Güven Skorları',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: AppConstants.spacingMd),
                  _buildConfidenceBar(
                    context,
                    'Sağlıklı',
                    test.healthyConfidence,
                    Colors.green,
                  ),
                  const SizedBox(height: AppConstants.spacingMd),
                  _buildConfidenceBar(
                    context,
                    'Parkinson',
                    test.parkinsonsConfidence,
                    Colors.red,
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
                    test.interpretation,
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: AppConstants.spacingLg),

          // Recommendations
          if (test.recommendations.isNotEmpty)
            Card(
              child: Padding(
                padding: const EdgeInsets.all(AppConstants.spacingLg),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.lightbulb_outline,
                            color: Colors.orange[700]),
                        const SizedBox(width: AppConstants.spacingSm),
                        Text(
                          'Öneriler',
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                      ],
                    ),
                    const SizedBox(height: AppConstants.spacingMd),
                    ...test.recommendations.map((rec) => Padding(
                          padding: const EdgeInsets.only(
                            bottom: AppConstants.spacingSm,
                          ),
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

          // Processing time
          Card(
            color: Colors.grey[100],
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.spacingMd),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.timer, size: 16, color: Colors.grey[600]),
                  const SizedBox(width: 4),
                  Text(
                    'İşlem Süresi: ${test.processingTimeMs.toStringAsFixed(0)}ms',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildConfidenceBar(
    BuildContext context,
    String label,
    double value,
    Color color,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            Text(
              '${(value * 100).toStringAsFixed(1)}%',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: color,
                  ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        LinearProgressIndicator(
          value: value,
          backgroundColor: Colors.grey[200],
          valueColor: AlwaysStoppedAnimation<Color>(color),
          minHeight: 8,
        ),
      ],
    );
  }

  Widget _buildError(BuildContext context) {
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
              'Test Bulunamadı',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: AppConstants.spacingMd),
            Text(
              'Bu test silinmiş olabilir',
              style: Theme.of(context).textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: AppConstants.spacingXxl),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Geri Dön'),
            ),
          ],
        ),
      ),
    );
  }

  Color _getRiskColor(String colorName) {
    switch (colorName) {
      case 'green':
        return Colors.green;
      case 'orange':
        return Colors.orange;
      case 'red':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }
}
