import 'package:permission_handler/permission_handler.dart';
import '../errors/exceptions.dart';

class PermissionService {
  /// Check if microphone permission is granted
  Future<bool> hasMicrophonePermission() async {
    final status = await Permission.microphone.status;
    return status.isGranted;
  }
  
  /// Request microphone permission
  Future<bool> requestMicrophonePermission() async {
    final status = await Permission.microphone.request();
    
    if (status.isGranted) {
      return true;
    } else if (status.isPermanentlyDenied) {
      throw const PermissionException(
        'Mikrofon izni kalıcı olarak reddedildi. '
        'Lütfen uygulama ayarlarından izin verin.',
      );
    } else {
      throw const PermissionException(
        'Mikrofon izni gerekli. '
        'Ses kaydı yapabilmek için izin vermeniz gerekmektedir.',
      );
    }
  }
  
  /// Open app settings
  Future<void> openAppSettings() async {
    await openAppSettings();
  }
  
  /// Check storage permission (Android only)
  Future<bool> hasStoragePermission() async {
    if (await Permission.storage.isGranted) {
      return true;
    }
    return false;
  }
  
  /// Request storage permission (Android only)
  Future<bool> requestStoragePermission() async {
    final status = await Permission.storage.request();
    return status.isGranted;
  }
}
