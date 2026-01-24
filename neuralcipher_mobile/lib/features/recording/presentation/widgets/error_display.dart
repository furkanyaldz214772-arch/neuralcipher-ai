import 'package:flutter/material.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../core/errors/failures.dart';

/// Enhanced error display widget with troubleshooting tips
class ErrorDisplay extends StatelessWidget {
  final Failure failure;
  final VoidCallback onRetry;
  final String? customMessage;

  const ErrorDisplay({
    super.key,
    required this.failure,
    required this.onRetry,
    this.customMessage,
  });

  @override
  Widget build(BuildContext context) {
    final errorInfo = _getErrorInfo(failure);

    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(AppConstants.spacingLg),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Error icon
            Icon(
              errorInfo.icon,
              size: 80,
              color: errorInfo.color,
            ),
            const SizedBox(height: AppConstants.spacingXl),

            // Error title
            Text(
              errorInfo.title,
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: AppConstants.spacingMd),

            // Error message
            Text(
              customMessage ?? failure.message,
              style: Theme.of(context).textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),

            // Troubleshooting tips
            if (errorInfo.tips.isNotEmpty) ...[
              const SizedBox(height: AppConstants.spacingXl),
              Card(
                color: Colors.blue[50],
                child: Padding(
                  padding: const EdgeInsets.all(AppConstants.spacingLg),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.lightbulb_outline, color: Colors.blue[700]),
                          const SizedBox(width: AppConstants.spacingSm),
                          Text(
                            'Çözüm Önerileri',
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: Colors.blue[900],
                                ),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppConstants.spacingMd),
                      ...errorInfo.tips.map((tip) => Padding(
                            padding: const EdgeInsets.only(
                              bottom: AppConstants.spacingSm,
                            ),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  '• ',
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Colors.blue[700],
                                  ),
                                ),
                                Expanded(
                                  child: Text(
                                    tip,
                                    style: Theme.of(context).textTheme.bodyMedium,
                                  ),
                                ),
                              ],
                            ),
                          )),
                    ],
                  ),
                ),
              ),
            ],

            const SizedBox(height: AppConstants.spacingXxl),

            // Retry button
            ElevatedButton.icon(
              onPressed: onRetry,
              icon: const Icon(Icons.refresh),
              label: const Text('Tekrar Dene'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppConstants.spacingXl,
                  vertical: AppConstants.spacingMd,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  ErrorInfo _getErrorInfo(Failure failure) {
    if (failure is NetworkFailure) {
      return ErrorInfo(
        icon: Icons.wifi_off,
        color: Colors.orange,
        title: 'Bağlantı Hatası',
        tips: [
          'İnternet bağlantınızı kontrol edin',
          'Wi-Fi veya mobil verinin açık olduğundan emin olun',
          'Uçak modunun kapalı olduğunu kontrol edin',
          'Birkaç saniye bekleyip tekrar deneyin',
        ],
      );
    } else if (failure is ServerFailure) {
      if (failure.message.contains('503') ||
          failure.message.contains('unavailable')) {
        return ErrorInfo(
          icon: Icons.cloud_off,
          color: Colors.red,
          title: 'Sunucu Kullanılamıyor',
          tips: [
            'Backend sunucusunun çalıştığından emin olun',
            'Sunucu adresi: http://localhost:8000',
            'Android emulator için: http://10.0.2.2:8000',
            'Fiziksel cihaz için bilgisayarınızın IP adresini kullanın',
          ],
        );
      }
      return ErrorInfo(
        icon: Icons.error_outline,
        color: Colors.red,
        title: 'Sunucu Hatası',
        tips: [
          'Sunucu geçici olarak yanıt vermiyor olabilir',
          'Birkaç dakika bekleyip tekrar deneyin',
          'Sorun devam ederse destek ekibiyle iletişime geçin',
        ],
      );
    } else if (failure is ValidationFailure) {
      return ErrorInfo(
        icon: Icons.warning_amber,
        color: Colors.orange,
        title: 'Geçersiz Dosya',
        tips: [
          'Ses kaydının doğru formatta olduğundan emin olun',
          'Kayıt süresi 5 saniye olmalıdır',
          'Yeni bir kayıt yapmayı deneyin',
        ],
      );
    } else if (failure is PermissionFailure) {
      return ErrorInfo(
        icon: Icons.mic_off,
        color: Colors.red,
        title: 'İzin Gerekli',
        tips: [
          'Mikrofon iznini verin',
          'Ayarlar > Uygulamalar > NeuralCipher.ai > İzinler',
          'Mikrofon iznini açın',
        ],
      );
    } else {
      return ErrorInfo(
        icon: Icons.error,
        color: Colors.grey,
        title: 'Beklenmeyen Hata',
        tips: [
          'Uygulamayı yeniden başlatmayı deneyin',
          'Cihazınızı yeniden başlatın',
          'Sorun devam ederse destek ekibiyle iletişime geçin',
        ],
      );
    }
  }
}

/// Error information model
class ErrorInfo {
  final IconData icon;
  final Color color;
  final String title;
  final List<String> tips;

  ErrorInfo({
    required this.icon,
    required this.color,
    required this.title,
    required this.tips,
  });
}
