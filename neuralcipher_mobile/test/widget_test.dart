import 'package:flutter_test/flutter_test.dart';
import 'package:neuralcipher_mobile/main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const NeuralCipherApp());

    // Verify that app title is displayed
    expect(find.text('NeuralCipher.ai'), findsOneWidget);
    
    // Verify welcome message
    expect(find.text('Hoş Geldiniz!'), findsOneWidget);
  });
}
