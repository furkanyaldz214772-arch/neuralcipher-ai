import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'app/theme.dart';
import 'core/constants/app_constants.dart';
import 'core/services/audio_service.dart';
import 'core/services/permission_service.dart';
import 'core/services/api_service.dart';
import 'core/services/sync_service.dart';
import 'core/services/notification_service.dart';
import 'core/services/database_service.dart';
import 'features/recording/presentation/providers/recording_provider.dart';
import 'features/recording/presentation/providers/pre_flight_provider.dart';
import 'features/recording/presentation/providers/analysis_provider.dart';
import 'features/recording/presentation/providers/history_provider.dart';
import 'features/recording/presentation/providers/multi_test_provider.dart';
import 'features/auth/presentation/providers/auth_provider.dart';
import 'features/messaging/presentation/providers/messaging_provider.dart';
import 'features/subscription/presentation/providers/subscription_provider.dart';
import 'features/recording/presentation/screens/history_screen.dart';
import 'features/recording/presentation/screens/test_level_selection_screen.dart';
import 'features/onboarding/presentation/screens/onboarding_screen.dart';
import 'features/auth/presentation/screens/login_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const NeuralCipherApp());
}

class NeuralCipherApp extends StatelessWidget {
  const NeuralCipherApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Initialize services
    final apiService = ApiService();
    final databaseService = DatabaseService();
    final syncService = SyncService(
      apiService: apiService,
      databaseService: databaseService,
    );
    final notificationService = NotificationService(apiService: apiService);
    
    return MultiProvider(
      providers: [
        // Services
        Provider<ApiService>.value(value: apiService),
        Provider<DatabaseService>.value(value: databaseService),
        Provider<SyncService>.value(value: syncService),
        Provider<NotificationService>.value(value: notificationService),
        
        // Auth provider
        ChangeNotifierProvider(
          create: (_) => AuthProvider(apiService: apiService)..init(),
        ),
        
        // Recording providers
        ChangeNotifierProvider(
          create: (_) => RecordingProvider(
            audioService: AudioService(),
            permissionService: PermissionService(),
          ),
        ),
        ChangeNotifierProvider(
          create: (_) => PreFlightProvider(),
        ),
        ChangeNotifierProvider(
          create: (_) => AnalysisProvider(),
        ),
        ChangeNotifierProvider(
          create: (_) => HistoryProvider(),
        ),
        ChangeNotifierProvider(
          create: (_) => MultiTestProvider(),
        ),
        
        // Messaging provider
        ChangeNotifierProvider(
          create: (_) => MessagingProvider(apiService: apiService),
        ),
        
        // Subscription provider
        ChangeNotifierProvider(
          create: (_) => SubscriptionProvider(apiService: apiService),
        ),
      ],
      child: MaterialApp(
        title: AppConstants.appName,
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        darkTheme: AppTheme.darkTheme,
        themeMode: ThemeMode.light,
        home: const SplashScreen(),
        routes: {
          '/home': (context) => const HomeScreen(),
          '/login': (context) => const LoginScreen(),
          '/onboarding': (context) => const OnboardingScreen(),
        },
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(AppConstants.appName),
      ),
      body: Center(
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
                'Hoş Geldiniz!',
                style: Theme.of(context).textTheme.displayLarge,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: AppConstants.spacingMd),
              Text(
                'NeuralCipher.ai ile sesinizi analiz ederek nörolojik sağlığınızı takip edin.',
                style: Theme.of(context).textTheme.bodyLarge,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: AppConstants.spacingXxl),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_) => const TestLevelSelectionScreen(),
                    ),
                  );
                },
                child: const Text('Ses Testi Başlat'),
              ),
              const SizedBox(height: AppConstants.spacingMd),
              OutlinedButton(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_) => const HistoryScreen(),
                    ),
                  );
                },
                child: const Text('Test Geçmişi'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}


// Splash Screen - Onboarding ve Auth kontrolü yapar
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _initialize();
  }

  Future<void> _initialize() async {
    // Kısa bir splash delay
    await Future.delayed(const Duration(seconds: 2));
    
    if (!mounted) return;
    
    // Check auth status
    final authProvider = context.read<AuthProvider>();
    
    if (authProvider.isAuthenticated) {
      // Initialize services
      final syncService = context.read<SyncService>();
      final notificationService = context.read<NotificationService>();
      
      await syncService.init();
      await notificationService.init();
      
      // Navigate to home
      Navigator.of(context).pushReplacementNamed('/home');
    } else {
      // Navigate to login
      Navigator.of(context).pushReplacementNamed('/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.primary,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Logo
            Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                color: Colors.white,
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.mic,
                size: 60,
                color: Theme.of(context).colorScheme.primary,
              ),
            ),
            const SizedBox(height: 24),
            // App name
            Text(
              AppConstants.appName,
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            // Tagline
            Text(
              'Nörolojik Sağlık Asistanınız',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.white70,
              ),
            ),
            const SizedBox(height: 48),
            // Loading indicator
            const CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}
