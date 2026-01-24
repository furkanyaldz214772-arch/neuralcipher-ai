import 'package:flutter/material.dart';

class WelcomePage extends StatelessWidget {
  const WelcomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Logo
          Container(
            width: 120,
            height: 120,
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
          
          const SizedBox(height: 48),
          
          // Title
          Text(
            'NeuralCipher\'a\nHoş Geldiniz',
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
              fontWeight: FontWeight.bold,
              height: 1.2,
            ),
          ),
          
          const SizedBox(height: 24),
          
          // Subtitle
          Text(
            'Ses analizi ile nörolojik hastalıkları\nerken teşhis edin',
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: Colors.grey[600],
              height: 1.5,
            ),
          ),
          
          const SizedBox(height: 48),
          
          // Features list
          _buildFeatureItem(
            context,
            Icons.speed,
            '10 Saniyede Analiz',
            'Hızlı ve kolay ses kaydı',
          ),
          
          const SizedBox(height: 16),
          
          _buildFeatureItem(
            context,
            Icons.verified_user,
            '%92.31 Doğruluk',
            'Klinik olarak doğrulanmış',
          ),
          
          const SizedBox(height: 16),
          
          _buildFeatureItem(
            context,
            Icons.security,
            'Güvenli ve Gizli',
            'Verileriniz şifrelenmiştir',
          ),
        ],
      ),
    );
  }

  Widget _buildFeatureItem(
    BuildContext context,
    IconData icon,
    String title,
    String subtitle,
  ) {
    return Row(
      children: [
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: Theme.of(context).primaryColor.withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(
            icon,
            color: Theme.of(context).primaryColor,
            size: 24,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.grey[600],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
