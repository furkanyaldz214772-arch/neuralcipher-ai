import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:provider/provider.dart';
import 'core/services/api_service.dart';
import 'core/theme/app_theme.dart';
import 'features/auth/providers/auth_provider.dart';
import 'features/auth/screens/splash_screen.dart';

/// Main Entry Point
/// 
/// DOKÜMANTASYON:
/// - Provider pattern ile state management
/// - ApiService singleton
/// - Mobil viewport (web için)
/// - Dark theme
/// 
/// ÇALIŞTIRMA:
/// ```bash
/// flutter build web --release
/// cd build/web
/// python -m http.server 8080
/// ```
/// 
/// TEST:
/// http://localhost:8080

void main() {
  runApp(
    MultiProvider(
      providers: [
        // API Service (Singleton)
        Provider<ApiService>(
          create: (_) => ApiService(),
        ),
        // Auth Provider
        ChangeNotifierProvider<AuthProvider>(
          create: (context) => AuthProvider(
            apiService: context.read<ApiService>(),
          ),
        ),
      ],
      child: const NeuralCipherApp(),
    ),
  );
}

class NeuralCipherApp extends StatelessWidget {
  const NeuralCipherApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NeuralCipher',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.theme,
      
      // Web için mobil viewport wrapper
      builder: (context, child) {
        if (kIsWeb) {
          return Material(
            color: const Color(0xFF000000),
            child: Center(
              child: SizedBox(
                width: 428,  // iPhone 14 Pro Max width
                height: 926, // iPhone 14 Pro Max height
                child: Container(
                  decoration: BoxDecoration(
                    color: const Color(0xFF1C1C1E),
                    borderRadius: BorderRadius.circular(55),
                    border: Border.all(
                      color: const Color(0xFF2C2C2E),
                      width: 14,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.8),
                        blurRadius: 40,
                        spreadRadius: 10,
                        offset: const Offset(0, 10),
                      ),
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(42),
                    child: child,
                  ),
                ),
              ),
            ),
          );
        }
        return child!;
      },
      
      home: const SplashScreen(),
    );
  }
}
