/// Test history model for local storage
class TestHistory {
  final int? id;
  final String fileId;
  final DateTime testDate;
  final double riskScore;
  final String riskLevel;
  final double healthyConfidence;
  final double parkinsonsConfidence;
  final String interpretation;
  final List<String> recommendations;
  final double processingTimeMs;

  TestHistory({
    this.id,
    required this.fileId,
    required this.testDate,
    required this.riskScore,
    required this.riskLevel,
    required this.healthyConfidence,
    required this.parkinsonsConfidence,
    required this.interpretation,
    required this.recommendations,
    required this.processingTimeMs,
  });

  /// Convert to Map for database
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'file_id': fileId,
      'test_date': testDate.toIso8601String(),
      'risk_score': riskScore,
      'risk_level': riskLevel,
      'healthy_confidence': healthyConfidence,
      'parkinsons_confidence': parkinsonsConfidence,
      'interpretation': interpretation,
      'recommendations': recommendations.join('|||'), // Use delimiter
      'processing_time_ms': processingTimeMs,
    };
  }

  /// Create from Map (database)
  factory TestHistory.fromMap(Map<String, dynamic> map) {
    return TestHistory(
      id: map['id'] as int?,
      fileId: map['file_id'] as String,
      testDate: DateTime.parse(map['test_date'] as String),
      riskScore: map['risk_score'] as double,
      riskLevel: map['risk_level'] as String,
      healthyConfidence: map['healthy_confidence'] as double,
      parkinsonsConfidence: map['parkinsons_confidence'] as double,
      interpretation: map['interpretation'] as String,
      recommendations: (map['recommendations'] as String)
          .split('|||')
          .where((s) => s.isNotEmpty)
          .toList(),
      processingTimeMs: map['processing_time_ms'] as double,
    );
  }

  /// Create from AnalysisResponse
  factory TestHistory.fromAnalysisResponse(
    String fileId,
    DateTime testDate,
    dynamic analysisResponse,
  ) {
    final analysis = analysisResponse.analysis;
    return TestHistory(
      fileId: fileId,
      testDate: testDate,
      riskScore: analysis.riskScore,
      riskLevel: analysis.riskLevel,
      healthyConfidence: analysis.confidence.healthy,
      parkinsonsConfidence: analysis.confidence.parkinsons,
      interpretation: analysis.interpretation,
      recommendations: analysis.recommendations,
      processingTimeMs: analysisResponse.processingTimeMs,
    );
  }

  /// Get formatted date string
  String getFormattedDate() {
    final now = DateTime.now();
    final difference = now.difference(testDate);

    if (difference.inDays == 0) {
      return 'Bugün ${testDate.hour.toString().padLeft(2, '0')}:${testDate.minute.toString().padLeft(2, '0')}';
    } else if (difference.inDays == 1) {
      return 'Dün ${testDate.hour.toString().padLeft(2, '0')}:${testDate.minute.toString().padLeft(2, '0')}';
    } else if (difference.inDays < 7) {
      return '${difference.inDays} gün önce';
    } else {
      return '${testDate.day}/${testDate.month}/${testDate.year}';
    }
  }

  /// Get risk color
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

  /// Get risk level text in Turkish
  String getRiskLevelText() {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'Düşük Risk';
      case 'moderate':
        return 'Orta Risk';
      case 'high':
        return 'Yüksek Risk';
      default:
        return 'Bilinmeyen';
    }
  }
}
