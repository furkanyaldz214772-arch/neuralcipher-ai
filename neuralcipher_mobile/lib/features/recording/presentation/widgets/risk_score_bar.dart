import 'package:flutter/material.dart';

/// Animated risk score bar widget
class RiskScoreBar extends StatefulWidget {
  final double riskScore; // 0.0 to 1.0
  final Duration animationDuration;

  const RiskScoreBar({
    super.key,
    required this.riskScore,
    this.animationDuration = const Duration(milliseconds: 1500),
  });

  @override
  State<RiskScoreBar> createState() => _RiskScoreBarState();
}

class _RiskScoreBarState extends State<RiskScoreBar>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: widget.animationDuration,
      vsync: this,
    );

    _animation = Tween<double>(
      begin: 0.0,
      end: widget.riskScore,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOutCubic,
    ));

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Column(
          children: [
            // Bar with indicator
            SizedBox(
              height: 50,
              child: Stack(
                children: [
                  // Gradient bar
                  Container(
                    height: 40,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                      gradient: const LinearGradient(
                        colors: [
                          Color(0xFF4CAF50), // Green
                          Color(0xFF8BC34A), // Light green
                          Color(0xFFFFC107), // Amber
                          Color(0xFFFF9800), // Orange
                          Color(0xFFF44336), // Red
                        ],
                        stops: [0.0, 0.25, 0.5, 0.75, 1.0],
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.1),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                  ),

                  // Indicator
                  Positioned(
                    left: _animation.value *
                        (MediaQuery.of(context).size.width - 80),
                    top: 0,
                    child: Column(
                      children: [
                        // Triangle pointer
                        CustomPaint(
                          size: const Size(20, 10),
                          painter: TrianglePainter(
                            color: Colors.white,
                          ),
                        ),
                        // Vertical line
                        Container(
                          width: 3,
                          height: 40,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(2),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.3),
                                blurRadius: 4,
                                offset: const Offset(0, 2),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 12),

            // Labels
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Düşük Risk',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[600],
                    fontWeight: FontWeight.w500,
                  ),
                ),
                Text(
                  'Orta Risk',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[600],
                    fontWeight: FontWeight.w500,
                  ),
                ),
                Text(
                  'Yüksek Risk',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[600],
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ],
        );
      },
    );
  }
}

/// Triangle painter for indicator
class TrianglePainter extends CustomPainter {
  final Color color;

  TrianglePainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    final path = Path()
      ..moveTo(size.width / 2, 0) // Top center
      ..lineTo(0, size.height) // Bottom left
      ..lineTo(size.width, size.height) // Bottom right
      ..close();

    canvas.drawPath(path, paint);

    // Shadow
    canvas.drawShadow(
      path,
      Colors.black.withOpacity(0.3),
      4.0,
      true,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

/// Animated percentage display
class AnimatedPercentage extends StatefulWidget {
  final double value; // 0.0 to 1.0
  final Duration animationDuration;
  final TextStyle? textStyle;

  const AnimatedPercentage({
    super.key,
    required this.value,
    this.animationDuration = const Duration(milliseconds: 1500),
    this.textStyle,
  });

  @override
  State<AnimatedPercentage> createState() => _AnimatedPercentageState();
}

class _AnimatedPercentageState extends State<AnimatedPercentage>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: widget.animationDuration,
      vsync: this,
    );

    _animation = Tween<double>(
      begin: 0.0,
      end: widget.value * 100,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOutCubic,
    ));

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Text(
          '${_animation.value.toStringAsFixed(1)}%',
          style: widget.textStyle ??
              Theme.of(context).textTheme.displayLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
        );
      },
    );
  }
}
