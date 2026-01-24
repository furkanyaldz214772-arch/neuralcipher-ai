import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../core/constants/app_constants.dart';

class AppTheme {
  // Deep Ocean Blue Color Palette
  static const Color primaryBlue = Color(0xFF2196F3);
  static const Color secondaryGreen = Color(0xFF4CAF50);
  static const Color errorRed = Color(0xFFE53935);
  static const Color warningOrange = Color(0xFFFFA726);
  
  // Light Theme
  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    
    colorScheme: ColorScheme.light(
      primary: primaryBlue,
      secondary: secondaryGreen,
      error: errorRed,
      surface: Colors.white,
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onSurface: const Color(0xFF212121),
    ),
    
    // Typography - Large fonts for 50+ age group
    textTheme: GoogleFonts.robotoTextTheme(
      TextTheme(
        displayLarge: TextStyle(
          fontSize: AppConstants.fontSizeLarge,
          fontWeight: FontWeight.bold,
          color: const Color(0xFF212121),
        ),
        displayMedium: TextStyle(
          fontSize: 28,
          fontWeight: FontWeight.bold,
          color: const Color(0xFF212121),
        ),
        headlineLarge: TextStyle(
          fontSize: AppConstants.fontSizeHeading,
          fontWeight: FontWeight.w600,
          color: const Color(0xFF212121),
        ),
        headlineMedium: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: const Color(0xFF212121),
        ),
        bodyLarge: TextStyle(
          fontSize: AppConstants.fontSizeBody,
          fontWeight: FontWeight.normal,
          color: const Color(0xFF212121),
        ),
        bodyMedium: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.normal,
          color: const Color(0xFF212121),
        ),
        labelLarge: TextStyle(
          fontSize: AppConstants.fontSizeBody,
          fontWeight: FontWeight.w500,
          color: Colors.white,
        ),
      ),
    ),
    
    // Elevated Button Theme
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        minimumSize: const Size(double.infinity, AppConstants.recommendedTouchTarget),
        padding: const EdgeInsets.symmetric(
          horizontal: AppConstants.spacingLg,
          vertical: AppConstants.spacingMd,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: TextStyle(
          fontSize: AppConstants.fontSizeBody,
          fontWeight: FontWeight.w600,
        ),
      ),
    ),
    
    // Card Theme
    cardTheme: CardThemeData(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      margin: const EdgeInsets.all(AppConstants.spacingMd),
    ),
    
    // App Bar Theme
    appBarTheme: AppBarTheme(
      elevation: 0,
      centerTitle: true,
      backgroundColor: primaryBlue,
      foregroundColor: Colors.white,
      titleTextStyle: GoogleFonts.roboto(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: Colors.white,
      ),
    ),
  );
  
  // Dark Theme
  static ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    
    colorScheme: ColorScheme.dark(
      primary: const Color(0xFF64B5F6),
      secondary: const Color(0xFF81C784),
      error: const Color(0xFFEF5350),
      surface: const Color(0xFF1E1E1E),
      onPrimary: Colors.black,
      onSecondary: Colors.black,
      onSurface: const Color(0xFFE0E0E0),
    ),
    
    textTheme: GoogleFonts.robotoTextTheme(
      TextTheme(
        displayLarge: TextStyle(
          fontSize: AppConstants.fontSizeLarge,
          fontWeight: FontWeight.bold,
          color: const Color(0xFFE0E0E0),
        ),
        displayMedium: TextStyle(
          fontSize: 28,
          fontWeight: FontWeight.bold,
          color: const Color(0xFFE0E0E0),
        ),
        headlineLarge: TextStyle(
          fontSize: AppConstants.fontSizeHeading,
          fontWeight: FontWeight.w600,
          color: const Color(0xFFE0E0E0),
        ),
        headlineMedium: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: const Color(0xFFE0E0E0),
        ),
        bodyLarge: TextStyle(
          fontSize: AppConstants.fontSizeBody,
          fontWeight: FontWeight.normal,
          color: const Color(0xFFE0E0E0),
        ),
        bodyMedium: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.normal,
          color: const Color(0xFFE0E0E0),
        ),
        labelLarge: TextStyle(
          fontSize: AppConstants.fontSizeBody,
          fontWeight: FontWeight.w500,
          color: Colors.black,
        ),
      ),
    ),
    
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        minimumSize: const Size(double.infinity, AppConstants.recommendedTouchTarget),
        padding: const EdgeInsets.symmetric(
          horizontal: AppConstants.spacingLg,
          vertical: AppConstants.spacingMd,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: TextStyle(
          fontSize: AppConstants.fontSizeBody,
          fontWeight: FontWeight.w600,
        ),
      ),
    ),
    
    cardTheme: CardThemeData(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      margin: const EdgeInsets.all(AppConstants.spacingMd),
    ),
    
    appBarTheme: AppBarTheme(
      elevation: 0,
      centerTitle: true,
      backgroundColor: const Color(0xFF64B5F6),
      foregroundColor: Colors.black,
      titleTextStyle: GoogleFonts.roboto(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: Colors.black,
      ),
    ),
  );
}
