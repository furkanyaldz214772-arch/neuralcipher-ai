import 'package:flutter/material.dart';
import '../../../../core/constants/voice_test_constants.dart';
import 'multi_test_recording_screen.dart';

class TestLevelSelectionScreen extends StatelessWidget {
  const TestLevelSelectionScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Test Seviyesi Seçin'),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Header
              Text(
                'Hangi seviyede test yapmak istersiniz?',
                style: Theme.of(context).textTheme.headlineSmall,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                'Daha fazla test, daha yüksek doğruluk',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.grey[600],
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32),
              
              // Level Cards
              Expanded(
                child: ListView(
                  children: [
                    _buildLevelCard(
                      context,
                      level: VoiceTestConstants.levelQuick,
                      icon: Icons.flash_on,
                      title: 'Hızlı Tarama',
                      testCount: 1,
                      duration: 5,
                      accuracy: 92,
                      description: 'Tek test ile hızlı değerlendirme',
                      color: Colors.blue,
                    ),
                    const SizedBox(height: 16),
                    _buildLevelCard(
                      context,
                      level: VoiceTestConstants.levelStandard,
                      icon: Icons.star,
                      title: 'Standart Değerlendirme',
                      testCount: 6,
                      duration: 30,
                      accuracy: 95,
                      description: 'Sesli harfler + hızlı tekrar testleri',
                      color: Colors.orange,
                      recommended: true,
                    ),
                    const SizedBox(height: 16),
                    _buildLevelCard(
                      context,
                      level: VoiceTestConstants.levelComprehensive,
                      icon: Icons.science,
                      title: 'Kapsamlı Değerlendirme',
                      testCount: 12,
                      duration: 60,
                      accuracy: 97,
                      description: 'Tüm testler: sesli harfler, sayılar, kelimeler',
                      color: Colors.purple,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLevelCard(
    BuildContext context, {
    required String level,
    required IconData icon,
    required String title,
    required int testCount,
    required int duration,
    required int accuracy,
    required String description,
    required Color color,
    bool recommended = false,
  }) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: recommended
            ? BorderSide(color: color, width: 2)
            : BorderSide.none,
      ),
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => MultiTestRecordingScreen(level: level),
            ),
          );
        },
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: color.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(icon, color: color, size: 28),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        if (recommended)
                          Container(
                            margin: const EdgeInsets.only(top: 4),
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: color,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: const Text(
                              'ÖNERİLEN',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              
              // Stats
              Row(
                children: [
                  _buildStat(context, '$testCount test', Icons.list),
                  const SizedBox(width: 16),
                  _buildStat(context, '$duration saniye', Icons.timer),
                  const SizedBox(width: 16),
                  _buildStat(context, '%$accuracy doğruluk', Icons.check_circle),
                ],
              ),
              const SizedBox(height: 12),
              
              // Description
              Text(
                description,
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.grey[600],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStat(BuildContext context, String text, IconData icon) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 16, color: Colors.grey[600]),
        const SizedBox(width: 4),
        Text(
          text,
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey[600],
          ),
        ),
      ],
    );
  }
}
