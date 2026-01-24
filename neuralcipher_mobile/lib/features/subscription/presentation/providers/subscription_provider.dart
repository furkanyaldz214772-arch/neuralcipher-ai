import 'package:flutter/foundation.dart';
import '../../../../core/services/api_service.dart';

/// Subscription provider
class SubscriptionProvider extends ChangeNotifier {
  final ApiService _apiService;
  
  Map<String, dynamic>? _subscription;
  bool _isLoading = false;
  String? _errorMessage;
  
  SubscriptionProvider({required ApiService apiService}) 
      : _apiService = apiService;
  
  // Getters
  Map<String, dynamic>? get subscription => _subscription;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  
  /// Load current subscription
  Future<void> loadSubscription() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();
    
    try {
      _subscription = await _apiService.getSubscription();
      
      _isLoading = false;
      notifyListeners();
      
    } catch (e) {
      _isLoading = false;
      _errorMessage = e.toString();
      notifyListeners();
    }
  }
  
  /// Create checkout session
  Future<bool> createCheckout({required String plan}) async {
    try {
      final response = await _apiService.createCheckout(plan: plan);
      
      // TODO: Open checkout URL in browser
      // final checkoutUrl = response['checkout_url'];
      
      return true;
      
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }
  
  /// Cancel subscription
  Future<bool> cancelSubscription() async {
    try {
      await _apiService.cancelSubscription();
      
      // Reload subscription
      await loadSubscription();
      
      return true;
      
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }
  
  /// Check if user has premium
  bool get isPremium {
    return _subscription?['plan'] == 'premium' || 
           _subscription?['plan'] == 'enterprise';
  }
  
  /// Check if subscription is active
  bool get isActive {
    return _subscription?['status'] == 'active';
  }
}
