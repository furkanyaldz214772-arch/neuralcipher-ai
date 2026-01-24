import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../../features/recording/data/models/test_history.dart';

/// Database service for local storage
class DatabaseService {
  static final DatabaseService _instance = DatabaseService._internal();
  static Database? _database;

  factory DatabaseService() => _instance;

  DatabaseService._internal();

  /// Get database instance
  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }

  /// Initialize database
  Future<Database> _initDatabase() async {
    final databasesPath = await getDatabasesPath();
    final path = join(databasesPath, 'neuralcipher.db');

    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
    );
  }

  /// Create tables
  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE test_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        file_id TEXT NOT NULL,
        test_date TEXT NOT NULL,
        risk_score REAL NOT NULL,
        risk_level TEXT NOT NULL,
        healthy_confidence REAL NOT NULL,
        parkinsons_confidence REAL NOT NULL,
        interpretation TEXT NOT NULL,
        recommendations TEXT NOT NULL,
        processing_time_ms REAL NOT NULL
      )
    ''');

    // Create index on test_date for faster queries
    await db.execute('''
      CREATE INDEX idx_test_date ON test_history(test_date DESC)
    ''');
  }

  /// Insert test history
  Future<int> insertTestHistory(TestHistory history) async {
    final db = await database;
    return await db.insert(
      'test_history',
      history.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  /// Get all test history (ordered by date, newest first)
  Future<List<TestHistory>> getAllTestHistory() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'test_history',
      orderBy: 'test_date DESC',
    );

    return List.generate(maps.length, (i) {
      return TestHistory.fromMap(maps[i]);
    });
  }

  /// Get test history by ID
  Future<TestHistory?> getTestHistoryById(int id) async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'test_history',
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );

    if (maps.isEmpty) return null;
    return TestHistory.fromMap(maps.first);
  }

  /// Get recent test history (last N tests)
  Future<List<TestHistory>> getRecentTestHistory(int limit) async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'test_history',
      orderBy: 'test_date DESC',
      limit: limit,
    );

    return List.generate(maps.length, (i) {
      return TestHistory.fromMap(maps[i]);
    });
  }

  /// Get test history count
  Future<int> getTestHistoryCount() async {
    final db = await database;
    final result = await db.rawQuery('SELECT COUNT(*) as count FROM test_history');
    return Sqflite.firstIntValue(result) ?? 0;
  }

  /// Delete test history by ID
  Future<int> deleteTestHistory(int id) async {
    final db = await database;
    return await db.delete(
      'test_history',
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  /// Delete all test history
  Future<int> deleteAllTestHistory() async {
    final db = await database;
    return await db.delete('test_history');
  }

  /// Get statistics
  Future<Map<String, dynamic>> getStatistics() async {
    final db = await database;
    
    // Total tests
    final totalTests = await getTestHistoryCount();
    
    // Average risk score
    final avgResult = await db.rawQuery(
      'SELECT AVG(risk_score) as avg_risk FROM test_history'
    );
    final avgRisk = (avgResult.first['avg_risk'] as double?) ?? 0.0;
    
    // Risk level distribution
    final lowRisk = await db.rawQuery(
      'SELECT COUNT(*) as count FROM test_history WHERE risk_level = ?',
      ['LOW']
    );
    final moderateRisk = await db.rawQuery(
      'SELECT COUNT(*) as count FROM test_history WHERE risk_level = ?',
      ['MODERATE']
    );
    final highRisk = await db.rawQuery(
      'SELECT COUNT(*) as count FROM test_history WHERE risk_level = ?',
      ['HIGH']
    );
    
    return {
      'total_tests': totalTests,
      'average_risk_score': avgRisk,
      'low_risk_count': Sqflite.firstIntValue(lowRisk) ?? 0,
      'moderate_risk_count': Sqflite.firstIntValue(moderateRisk) ?? 0,
      'high_risk_count': Sqflite.firstIntValue(highRisk) ?? 0,
    };
  }

  /// Close database
  Future<void> close() async {
    final db = await database;
    await db.close();
    _database = null;
  }
  
  // ==================== SYNC METHODS ====================
  
  /// Save profile (placeholder for sync service)
  Future<void> saveProfile(Map<String, dynamic> profile) async {
    // TODO: Implement profile storage if needed
    // For now, this is a placeholder for sync service compatibility
  }
  
  /// Save test (placeholder for sync service)
  Future<void> saveTest(Map<String, dynamic> test) async {
    // TODO: Implement test storage if needed
    // For now, this is a placeholder for sync service compatibility
  }
  
  /// Get pending tests (placeholder for sync service)
  Future<List<Map<String, dynamic>>> getPendingTests() async {
    // TODO: Implement pending tests tracking if needed
    // For now, return empty list
    return [];
  }
  
  /// Update test server ID (placeholder for sync service)
  Future<void> updateTestServerId(int localId, int serverId) async {
    // TODO: Implement server ID tracking if needed
    // For now, this is a placeholder for sync service compatibility
  }
}
