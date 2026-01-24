import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'api_service.dart';

/// Notification service for push notifications
class NotificationService {
  final ApiService _apiService;
  final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;
  final FlutterLocalNotificationsPlugin _localNotifications = 
      FlutterLocalNotificationsPlugin();
  
  String? _fcmToken;
  
  NotificationService({required ApiService apiService}) 
      : _apiService = apiService;
  
  /// Initialize notification service
  Future<void> init() async {
    // Request permission
    final settings = await _firebaseMessaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );
    
    if (settings.authorizationStatus != AuthorizationStatus.authorized) {
      print('User declined or has not accepted permission');
      return;
    }
    
    // Initialize local notifications
    const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosSettings = DarwinInitializationSettings();
    const initSettings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );
    
    await _localNotifications.initialize(
      initSettings,
      onDidReceiveNotificationResponse: _onNotificationTapped,
    );
    
    // Get FCM token
    _fcmToken = await _firebaseMessaging.getToken();
    print('FCM Token: $_fcmToken');
    
    // Register token with backend
    if (_fcmToken != null && _apiService.isAuthenticated) {
      await _registerToken();
    }
    
    // Listen to token refresh
    _firebaseMessaging.onTokenRefresh.listen((newToken) {
      _fcmToken = newToken;
      _registerToken();
    });
    
    // Handle foreground messages
    FirebaseMessaging.onMessage.listen(_handleForegroundMessage);
    
    // Handle background messages
    FirebaseMessaging.onMessageOpenedApp.listen(_handleBackgroundMessage);
    
    // Handle notification when app is terminated
    final initialMessage = await _firebaseMessaging.getInitialMessage();
    if (initialMessage != null) {
      _handleBackgroundMessage(initialMessage);
    }
  }
  
  /// Register FCM token with backend
  Future<void> _registerToken() async {
    if (_fcmToken == null) return;
    
    try {
      await _apiService.registerDeviceToken(
        token: _fcmToken!,
        deviceType: 'android',  // TODO: Detect platform
      );
      print('Device token registered');
    } catch (e) {
      print('Error registering device token: $e');
    }
  }
  
  /// Handle foreground message
  Future<void> _handleForegroundMessage(RemoteMessage message) async {
    print('Foreground message: ${message.notification?.title}');
    
    // Show local notification
    await _showLocalNotification(message);
  }
  
  /// Handle background message
  void _handleBackgroundMessage(RemoteMessage message) {
    print('Background message: ${message.notification?.title}');
    
    // Navigate based on notification type
    final type = message.data['type'];
    
    switch (type) {
      case 'test_completed':
        // Navigate to test results
        break;
      case 'high_risk_alert':
        // Navigate to test results
        break;
      case 'doctor_message':
        // Navigate to messages
        break;
      case 'reminder':
        // Navigate to home
        break;
    }
  }
  
  /// Show local notification
  Future<void> _showLocalNotification(RemoteMessage message) async {
    const androidDetails = AndroidNotificationDetails(
      'neuralcipher_channel',
      'NeuralCipher Notifications',
      channelDescription: 'Notifications for NeuralCipher.ai',
      importance: Importance.high,
      priority: Priority.high,
    );
    
    const iosDetails = DarwinNotificationDetails();
    
    const details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );
    
    await _localNotifications.show(
      message.hashCode,
      message.notification?.title,
      message.notification?.body,
      details,
      payload: message.data.toString(),
    );
  }
  
  /// Handle notification tap
  void _onNotificationTapped(NotificationResponse response) {
    print('Notification tapped: ${response.payload}');
    // TODO: Navigate based on payload
  }
  
  /// Get FCM token
  String? get fcmToken => _fcmToken;
  
  /// Unregister token
  Future<void> unregister() async {
    if (_fcmToken != null) {
      try {
        await _apiService.unregisterDeviceToken(_fcmToken!);
      } catch (e) {
        print('Error unregistering device token: $e');
      }
    }
  }
}

/// Background message handler (must be top-level function)
@pragma('vm:entry-point')
Future<void> firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  print('Background message: ${message.notification?.title}');
}
