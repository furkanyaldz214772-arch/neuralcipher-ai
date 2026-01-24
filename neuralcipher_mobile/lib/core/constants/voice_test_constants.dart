/// Voice Test Constants
/// Defines all voice test protocols and configurations

class VoiceTestConstants {
  // Test Levels
  static const String levelQuick = 'quick';
  static const String levelStandard = 'standard';
  static const String levelComprehensive = 'comprehensive';
  static const String levelClinical = 'clinical';
  
  // Test Categories
  static const String categorySustainedVowel = 'sustained_vowel';
  static const String categoryDiadochokinetic = 'diadochokinetic';
  static const String categoryNumbers = 'numbers';
  static const String categoryWords = 'words';
  static const String categorySentences = 'sentences';
  
  // Test Durations (seconds)
  static const int durationQuick = 5;
  static const int durationStandard = 30;
  static const int durationComprehensive = 60;
  static const int durationClinical = 90;
}

/// Voice Test Model
class VoiceTest {
  final String id;
  final String category;
  final String level;
  final String title;
  final String instruction;
  final String example;
  final int duration;
  final int order;
  
  const VoiceTest({
    required this.id,
    required this.category,
    required this.level,
    required this.title,
    required this.instruction,
    required this.example,
    required this.duration,
    required this.order,
  });
}

/// All Voice Tests
class VoiceTests {
  // LEVEL 1: QUICK SCREENING (5 seconds)
  static const List<VoiceTest> quickTests = [
    VoiceTest(
      id: 'quick_vowel_a',
      category: VoiceTestConstants.categorySustainedVowel,
      level: VoiceTestConstants.levelQuick,
      title: 'Sesli Harf "A"',
      instruction: 'Lütfen 5 saniye boyunca "Aaaa" deyin.\nSesinizi sabit ve düzgün tutun.',
      example: 'Aaaa...',
      duration: 5,
      order: 1,
    ),
  ];
  
  // LEVEL 2: STANDARD ASSESSMENT (30 seconds)
  static const List<VoiceTest> standardTests = [
    // Sustained Vowels (15 seconds)
    VoiceTest(
      id: 'std_vowel_a',
      category: VoiceTestConstants.categorySustainedVowel,
      level: VoiceTestConstants.levelStandard,
      title: 'Sesli Harf "A"',
      instruction: 'Lütfen 5 saniye boyunca "Aaaa" deyin.\nSesinizi sabit ve düzgün tutun.',
      example: 'Aaaa...',
      duration: 5,
      order: 1,
    ),
    VoiceTest(
      id: 'std_vowel_e',
      category: VoiceTestConstants.categorySustainedVowel,
      level: VoiceTestConstants.levelStandard,
      title: 'Sesli Harf "E"',
      instruction: 'Lütfen 5 saniye boyunca "Eeee" deyin.\nSesinizi sabit ve düzgün tutun.',
      example: 'Eeee...',
      duration: 5,
      order: 2,
    ),
    VoiceTest(
      id: 'std_vowel_o',
      category: VoiceTestConstants.categorySustainedVowel,
      level: VoiceTestConstants.levelStandard,
      title: 'Sesli Harf "O"',
      instruction: 'Lütfen 5 saniye boyunca "Oooo" deyin.\nSesinizi sabit ve düzgün tutun.',
      example: 'Oooo...',
      duration: 5,
      order: 3,
    ),
    
    // Diadochokinetic Tests (15 seconds)
    VoiceTest(
      id: 'std_pataka',
      category: VoiceTestConstants.categoryDiadochokinetic,
      level: VoiceTestConstants.levelStandard,
      title: 'Hızlı Tekrar: Pa-ta-ka',
      instruction: 'Lütfen "pa-ta-ka" kelimesini 10 kez hızlıca tekrarlayın.',
      example: 'pa-ta-ka, pa-ta-ka, pa-ta-ka...',
      duration: 5,
      order: 4,
    ),
    VoiceTest(
      id: 'std_papapa',
      category: VoiceTestConstants.categoryDiadochokinetic,
      level: VoiceTestConstants.levelStandard,
      title: 'Hızlı Tekrar: Pa-pa-pa',
      instruction: 'Lütfen "pa-pa-pa" hecesini 15 kez hızlıca tekrarlayın.',
      example: 'pa-pa-pa-pa-pa...',
      duration: 5,
      order: 5,
    ),
    VoiceTest(
      id: 'std_tatata',
      category: VoiceTestConstants.categoryDiadochokinetic,
      level: VoiceTestConstants.levelStandard,
      title: 'Hızlı Tekrar: Ta-ta-ta',
      instruction: 'Lütfen "ta-ta-ta" hecesini 15 kez hızlıca tekrarlayın.',
      example: 'ta-ta-ta-ta-ta...',
      duration: 5,
      order: 6,
    ),
  ];
  
  // LEVEL 3: COMPREHENSIVE ASSESSMENT (60 seconds)
  static const List<VoiceTest> comprehensiveTests = [
    // All Standard Tests +
    ...standardTests,
    
    // Numbers (15 seconds)
    VoiceTest(
      id: 'comp_count_1_10',
      category: VoiceTestConstants.categoryNumbers,
      level: VoiceTestConstants.levelComprehensive,
      title: 'Sayma: 1-10',
      instruction: 'Lütfen 1\'den 10\'a kadar sayın.',
      example: 'Bir, iki, üç, dört, beş...',
      duration: 5,
      order: 7,
    ),
    VoiceTest(
      id: 'comp_count_10_20',
      category: VoiceTestConstants.categoryNumbers,
      level: VoiceTestConstants.levelComprehensive,
      title: 'Sayma: 10-20',
      instruction: 'Lütfen 10\'dan 20\'ye kadar sayın.',
      example: 'On, on bir, on iki...',
      duration: 5,
      order: 8,
    ),
    VoiceTest(
      id: 'comp_count_backward',
      category: VoiceTestConstants.categoryNumbers,
      level: VoiceTestConstants.levelComprehensive,
      title: 'Geriye Sayma',
      instruction: 'Lütfen 10\'dan geriye doğru sayın.',
      example: 'On, dokuz, sekiz, yedi...',
      duration: 5,
      order: 9,
    ),
    
    // Words (15 seconds)
    VoiceTest(
      id: 'comp_words_common',
      category: VoiceTestConstants.categoryWords,
      level: VoiceTestConstants.levelComprehensive,
      title: 'Basit Kelimeler',
      instruction: 'Lütfen şu kelimeleri okuyun:\nGüneş, Bahçe, Çiçek, Kuş, Ağaç',
      example: 'Güneş, Bahçe, Çiçek...',
      duration: 5,
      order: 10,
    ),
    VoiceTest(
      id: 'comp_words_complex',
      category: VoiceTestConstants.categoryWords,
      level: VoiceTestConstants.levelComprehensive,
      title: 'Karmaşık Kelimeler',
      instruction: 'Lütfen şu kelimeleri okuyun:\nMerhaba, Teşekkürler, Lütfen, Günaydın',
      example: 'Merhaba, Teşekkürler...',
      duration: 5,
      order: 11,
    ),
    VoiceTest(
      id: 'comp_words_repeated',
      category: VoiceTestConstants.categoryWords,
      level: VoiceTestConstants.levelComprehensive,
      title: 'Tekrarlı Kelime',
      instruction: 'Lütfen "Merhaba" kelimesini 5 kez tekrarlayın.',
      example: 'Merhaba, Merhaba, Merhaba...',
      duration: 5,
      order: 12,
    ),
  ];
  
  // Helper methods
  static List<VoiceTest> getTestsByLevel(String level) {
    switch (level) {
      case VoiceTestConstants.levelQuick:
        return quickTests;
      case VoiceTestConstants.levelStandard:
        return standardTests;
      case VoiceTestConstants.levelComprehensive:
        return comprehensiveTests;
      default:
        return quickTests;
    }
  }
  
  static int getTotalDuration(String level) {
    final tests = getTestsByLevel(level);
    return tests.fold(0, (sum, test) => sum + test.duration);
  }
  
  static String getLevelName(String level) {
    switch (level) {
      case VoiceTestConstants.levelQuick:
        return 'Hızlı Tarama';
      case VoiceTestConstants.levelStandard:
        return 'Standart Değerlendirme';
      case VoiceTestConstants.levelComprehensive:
        return 'Kapsamlı Değerlendirme';
      case VoiceTestConstants.levelClinical:
        return 'Klinik Standart';
      default:
        return 'Bilinmeyen';
    }
  }
  
  static String getLevelDescription(String level) {
    switch (level) {
      case VoiceTestConstants.levelQuick:
        return 'Hızlı tarama için tek test (5 saniye)';
      case VoiceTestConstants.levelStandard:
        return '6 test ile standart değerlendirme (30 saniye)';
      case VoiceTestConstants.levelComprehensive:
        return '12 test ile kapsamlı değerlendirme (60 saniye)';
      case VoiceTestConstants.levelClinical:
        return '16 test ile klinik standart (90 saniye)';
      default:
        return '';
    }
  }
}
