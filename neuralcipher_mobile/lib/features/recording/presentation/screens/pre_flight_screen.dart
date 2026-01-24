import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/pre_flight_provider.dart';
import 'recording_screen.dart';

/// Pre-flight check screen
/// Verifies environment conditions before recording
class PreFlightScreen extends StatefulWidget {
  const PreFlightScreen({super.key});

  @override
  State<PreFlightScreen> createState() => _PreFlightScreenState();
}

class _PreFlightScreenState extends State<PreFlightScreen> {
  @override
  void initState() {
    super.initState();
    // Start checks after build
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<PreFlightProvider>().runChecks();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hazırlık Kontrolü'),
        centerTitle: true,
      ),
      body: Consumer<PreFlightProvider>(
        builder: (context, provider, child) {
          return SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Header
                  const Text(
                    'Test Öncesi Kontroller',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'En iyi sonuç için lütfen aşağıdaki koşulları sağlayın',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[600],
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 32),

                  // Checks list
                  Expanded(
                    child: ListView(
                      children: [
                        _buildCheckItem(
                          icon: Icons.mic,
                          title: 'Mikrofon İzni',
                          status: provider.microphoneCheck,
                          message: provider.microphoneMessage,
                        ),
                        _buildCheckItem(
                          icon: Icons.volume_up,
                          title: 'Gürültü Seviyesi',
                          status: provider.noiseCheck,
                          message: provider.noiseMessage,
                        ),
                        _buildCheckItem(
                          icon: Icons.battery_charging_full,
                          title: 'Batarya Seviyesi',
                          status: provider.batteryCheck,
                          message: provider.batteryMessage,
                        ),
                        _buildCheckItem(
                          icon: Icons.storage,
                          title: 'Depolama Alanı',
                          status: provider.storageCheck,
                          message: provider.storageMessage,
                        ),
                      ],
                    ),
                  ),

                  // Visual guide
                  if (provider.allChecksPassed) ...[
                    const SizedBox(height: 16),
                    _buildVisualGuide(),
                    const SizedBox(height: 24),
                  ],

                  // Action button
                  if (provider.isChecking)
                    const Center(
                      child: CircularProgressIndicator(),
                    )
                  else if (provider.allChecksPassed)
                    ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const RecordingScreen(),
                          ),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        backgroundColor: Colors.green,
                        foregroundColor: Colors.white,
                      ),
                      child: const Text(
                        'Teste Başla',
                        style: TextStyle(fontSize: 18),
                      ),
                    )
                  else
                    ElevatedButton(
                      onPressed: () {
                        provider.runChecks();
                      },
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                      ),
                      child: const Text(
                        'Tekrar Kontrol Et',
                        style: TextStyle(fontSize: 18),
                      ),
                    ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildCheckItem({
    required IconData icon,
    required String title,
    required CheckStatus status,
    required String message,
  }) {
    Color statusColor;
    IconData statusIcon;

    switch (status) {
      case CheckStatus.checking:
        statusColor = Colors.grey;
        statusIcon = Icons.hourglass_empty;
        break;
      case CheckStatus.passed:
        statusColor = Colors.green;
        statusIcon = Icons.check_circle;
        break;
      case CheckStatus.warning:
        statusColor = Colors.orange;
        statusIcon = Icons.warning;
        break;
      case CheckStatus.failed:
        statusColor = Colors.red;
        statusIcon = Icons.error;
        break;
    }

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            // Main icon
            Icon(icon, size: 32, color: statusColor),
            const SizedBox(width: 16),
            
            // Content
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    message,
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
            ),
            
            // Status icon
            Icon(statusIcon, color: statusColor, size: 28),
          ],
        ),
      ),
    );
  }

  Widget _buildVisualGuide() {
    return Card(
      color: Colors.blue[50],
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Icon(
              Icons.phone_android,
              size: 48,
              color: Colors.blue,
            ),
            const SizedBox(height: 12),
            const Text(
              'Telefon Pozisyonu',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              '• Telefonu ağzınızdan 10-15 cm uzakta tutun\n'
              '• Sessiz bir ortamda olduğunuzdan emin olun\n'
              '• "Aaaa" sesini 5 saniye boyunca çıkarın\n'
              '• Ses seviyenizi sabit tutmaya çalışın',
              style: TextStyle(
                fontSize: 14,
                color: Colors.grey[700],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
