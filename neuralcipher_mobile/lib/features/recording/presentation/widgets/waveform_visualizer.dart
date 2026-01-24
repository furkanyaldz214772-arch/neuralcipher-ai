import 'package:flutter/material.dart';

class WaveformVisualizer extends StatefulWidget {
  final double amplitude;
  final Color color;
  final double height;
  
  const WaveformVisualizer({
    super.key,
    required this.amplitude,
    this.color = Colors.blue,
    this.height = 100.0,
  });
  
  @override
  State<WaveformVisualizer> createState() => _WaveformVisualizerState();
}

class _WaveformVisualizerState extends State<WaveformVisualizer>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  final List<double> _amplitudes = List.filled(50, 0.0);
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 50),
    )..repeat();
  }
  
  @override
  void didUpdateWidget(WaveformVisualizer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.amplitude != oldWidget.amplitude) {
      _updateAmplitudes();
    }
  }
  
  void _updateAmplitudes() {
    setState(() {
      // Shift amplitudes left
      for (int i = 0; i < _amplitudes.length - 1; i++) {
        _amplitudes[i] = _amplitudes[i + 1];
      }
      // Add new amplitude
      _amplitudes[_amplitudes.length - 1] = widget.amplitude;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: widget.height,
      child: CustomPaint(
        painter: WaveformPainter(
          amplitudes: _amplitudes,
          color: widget.color,
          animation: _controller,
        ),
        size: Size.infinite,
      ),
    );
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

class WaveformPainter extends CustomPainter {
  final List<double> amplitudes;
  final Color color;
  final Animation<double> animation;
  
  WaveformPainter({
    required this.amplitudes,
    required this.color,
    required this.animation,
  }) : super(repaint: animation);
  
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = 3.0
      ..strokeCap = StrokeCap.round
      ..style = PaintingStyle.stroke;
    
    final barWidth = size.width / amplitudes.length;
    final centerY = size.height / 2;
    
    // Draw waveform bars
    for (int i = 0; i < amplitudes.length; i++) {
      final x = i * barWidth;
      final amplitude = amplitudes[i];
      final barHeight = amplitude * (size.height / 2) * 0.8;
      
      // Draw vertical bar
      canvas.drawLine(
        Offset(x, centerY - barHeight),
        Offset(x, centerY + barHeight),
        paint,
      );
    }
    
    // Draw center line
    final centerLinePaint = Paint()
      ..color = color.withOpacity(0.3)
      ..strokeWidth = 1.0;
    
    canvas.drawLine(
      Offset(0, centerY),
      Offset(size.width, centerY),
      centerLinePaint,
    );
  }
  
  @override
  bool shouldRepaint(WaveformPainter oldDelegate) {
    return oldDelegate.amplitudes != amplitudes ||
        oldDelegate.color != color;
  }
}
