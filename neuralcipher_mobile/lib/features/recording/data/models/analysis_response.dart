/// Analysis response from backend API
class AnalysisResponse {
  final bool success;
  final String fileId;
  final String filename;
  final AnalysisResult analysis;
  final double processingTimeMs;
  final String message;

  AnalysisResponse({
    required this.success,
    required this.fileId,
    required this.filename,
    required this.analysis,
    required this.processingTimeMs,
    required this.message,
  });

  factory AnalysisResponse.fromJson(Map<String, dynamic> json) {
    return AnalysisResponse(
      success: json['success'] as bool,
      fileId: json['file_id'] as String,
      filename: json['filename'] as String,
      analysis: AnalysisResult.fromJson(json['analysis'] as Map<String, dynamic>),
      processingTimeMs: (json['processing_time_ms'] as num).toDouble(),
      message: json['message'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': success,
      'file_id': fileId,
      'filename': filename,
      'analysis': analysis.toJson(),
      'processing_time_ms': processingTimeMs,
      'message': message,
    };
  }
}

/// Analysis result containing risk score and details
class AnalysisResult {
  final double riskScore;
  final String riskLevel;
  final Confidence confidence;
  final String interpretation;
  final List<String> recommendations;

  AnalysisResult({
    required this.riskScore,
    required this.riskLevel,
    required this.confidence,
    required this.interpretation,
    required this.recommendations,
  });

  factory AnalysisResult.fromJson(Map<String, dynamic> json) {
    return AnalysisResult(
      riskScore: (json['risk_score'] as num).toDouble(),
      riskLevel: json['risk_level'] as String,
      confidence: Confidence.fromJson(json['confidence'] as Map<String, dynamic>),
      interpretation: json['interpretation'] as String,
      recommendations: (json['recommendations'] as List<dynamic>)
          .map((e) => e as String)
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'risk_score': riskScore,
      'risk_level': riskLevel,
      'confidence': confidence.toJson(),
      'interpretation': interpretation,
      'recommendations': recommendations,
    };
  }

  /// Get risk level color
  String getRiskColor() {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'green';
      case 'moderate':
        return 'orange';
      case 'high':
        return 'red';
      default:
        return 'grey';
    }
  }

  /// Get risk level icon
  String getRiskIcon() {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return '✓';
      case 'moderate':
        return '⚠';
      case 'high':
        return '⚠';
      default:
        return '?';
    }
  }
}

/// Confidence scores for healthy vs parkinsons
class Confidence {
  final double healthy;
  final double parkinsons;

  Confidence({
    required this.healthy,
    required this.parkinsons,
  });

  factory Confidence.fromJson(Map<String, dynamic> json) {
    return Confidence(
      healthy: (json['healthy'] as num).toDouble(),
      parkinsons: (json['parkinsons'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'healthy': healthy,
      'parkinsons': parkinsons,
    };
  }

  /// Get percentage string for healthy
  String getHealthyPercentage() {
    return '${(healthy * 100).toStringAsFixed(1)}%';
  }

  /// Get percentage string for parkinsons
  String getParkinsonsPercentage() {
    return '${(parkinsons * 100).toStringAsFixed(1)}%';
  }
}
