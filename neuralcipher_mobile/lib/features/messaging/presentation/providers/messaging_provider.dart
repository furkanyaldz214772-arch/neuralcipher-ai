import 'package:flutter/foundation.dart';
import '../../../../core/services/api_service.dart';

/// Messaging provider
class MessagingProvider extends ChangeNotifier {
  final ApiService _apiService;
  
  List<Map<String, dynamic>> _conversations = [];
  List<Map<String, dynamic>> _messages = [];
  bool _isLoading = false;
  String? _errorMessage;
  
  MessagingProvider({required ApiService apiService}) 
      : _apiService = apiService;
  
  // Getters
  List<Map<String, dynamic>> get conversations => _conversations;
  List<Map<String, dynamic>> get messages => _messages;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  
  /// Load conversations
  Future<void> loadConversations() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();
    
    try {
      final response = await _apiService.listConversations();
      _conversations = List<Map<String, dynamic>>.from(response);
      
      _isLoading = false;
      notifyListeners();
      
    } catch (e) {
      _isLoading = false;
      _errorMessage = e.toString();
      notifyListeners();
    }
  }
  
  /// Load messages with a specific user
  Future<void> loadMessages(int userId) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();
    
    try {
      final response = await _apiService.listMessages(
        conversationWith: userId,
      );
      _messages = List<Map<String, dynamic>>.from(response);
      
      // Mark messages as read
      for (final message in _messages) {
        if (message['receiver_id'] != userId && !message['is_read']) {
          await _apiService.markMessageAsRead(message['id']);
        }
      }
      
      _isLoading = false;
      notifyListeners();
      
    } catch (e) {
      _isLoading = false;
      _errorMessage = e.toString();
      notifyListeners();
    }
  }
  
  /// Send message
  Future<bool> sendMessage({
    required int receiverId,
    String? subject,
    required String body,
  }) async {
    try {
      final response = await _apiService.sendMessage(
        receiverId: receiverId,
        subject: subject,
        body: body,
      );
      
      // Add to messages list
      _messages.insert(0, response);
      notifyListeners();
      
      return true;
      
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }
  
  /// Delete message
  Future<bool> deleteMessage(int messageId) async {
    try {
      await _apiService.deleteMessage(messageId);
      
      // Remove from list
      _messages.removeWhere((m) => m['id'] == messageId);
      notifyListeners();
      
      return true;
      
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }
  
  /// Get unread count
  int get unreadCount {
    return _conversations.fold(
      0,
      (sum, conv) => sum + (conv['unread_count'] as int),
    );
  }
}
