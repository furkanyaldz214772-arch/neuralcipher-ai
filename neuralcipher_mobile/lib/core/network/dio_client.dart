import 'package:dio/dio.dart';
import '../constants/api_constants.dart';

class DioClient {
  late final Dio _dio;
  
  DioClient() {
    _dio = Dio(
      BaseOptions(
        baseUrl: ApiConstants.baseUrl,
        connectTimeout: ApiConstants.connectTimeout,
        receiveTimeout: ApiConstants.receiveTimeout,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );
    
    // Add interceptors
    _dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
      error: true,
      logPrint: (obj) => print('[DIO] $obj'),
    ));
    
    // Add retry interceptor
    _dio.interceptors.add(
      InterceptorsWrapper(
        onError: (error, handler) async {
          if (_shouldRetry(error)) {
            try {
              final response = await _retry(error.requestOptions);
              handler.resolve(response);
            } catch (e) {
              handler.next(error);
            }
          } else {
            handler.next(error);
          }
        },
      ),
    );
  }
  
  Dio get dio => _dio;
  
  bool _shouldRetry(DioException error) {
    // Don't retry FormData requests (file uploads) as FormData can't be reused
    if (error.requestOptions.data is FormData) {
      return false;
    }
    
    return error.type == DioExceptionType.connectionTimeout ||
        error.type == DioExceptionType.sendTimeout ||
        error.type == DioExceptionType.receiveTimeout ||
        (error.response?.statusCode ?? 0) >= 500;
  }
  
  Future<Response> _retry(RequestOptions requestOptions) async {
    // Exponential backoff retry
    for (int i = 0; i < ApiConstants.maxRetries; i++) {
      try {
        await Future.delayed(
          Duration(milliseconds: ApiConstants.retryDelays[i]),
        );
        
        print('[DIO] Retry attempt ${i + 1}/${ApiConstants.maxRetries}');
        
        return await _dio.request(
          requestOptions.path,
          data: requestOptions.data,
          queryParameters: requestOptions.queryParameters,
          options: Options(
            method: requestOptions.method,
            headers: requestOptions.headers,
          ),
        );
      } catch (e) {
        if (i == ApiConstants.maxRetries - 1) {
          rethrow;
        }
      }
    }
    
    throw Exception('Max retries exceeded');
  }
}
