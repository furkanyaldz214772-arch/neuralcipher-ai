import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/subscription_provider.dart';

class SubscriptionScreen extends StatefulWidget {
  const SubscriptionScreen({super.key});

  @override
  State<SubscriptionScreen> createState() => _SubscriptionScreenState();
}

class _SubscriptionScreenState extends State<SubscriptionScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SubscriptionProvider>().loadSubscription();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Abonelik'),
      ),
      body: Consumer<SubscriptionProvider>(
        builder: (context, provider, child) {
          if (provider.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          final subscription = provider.subscription;

          return SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Current plan card
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Mevcut Plan',
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                        const SizedBox(height: 16),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              _getPlanName(subscription?['plan'] ?? 'free'),
                              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            if (subscription?['plan'] != 'free')
                              Chip(
                                label: Text(
                                  subscription?['status'] == 'active'
                                      ? 'Aktif'
                                      : 'İptal Edildi',
                                ),
                                backgroundColor: subscription?['status'] == 'active'
                                    ? Colors.green
                                    : Colors.orange,
                              ),
                          ],
                        ),
                        if (subscription?['plan'] != 'free') ...[
                          const SizedBox(height: 8),
                          Text(
                            'Sonraki ödeme: ${_formatDate(subscription?['current_period_end'])}',
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
                
                const SizedBox(height: 24),
                
                // Plans
                Text(
                  'Planlar',
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
                const SizedBox(height: 16),
                
                // Free plan
                _PlanCard(
                  title: 'Ücretsiz',
                  price: '₺0',
                  period: '/ay',
                  features: const [
                    'Aylık 1 test',
                    'Basit sonuçlar',
                    'Geçmiş görüntüleme',
                  ],
                  isCurrentPlan: subscription?['plan'] == 'free',
                  onSelect: null,
                ),
                
                const SizedBox(height: 16),
                
                // Premium plan
                _PlanCard(
                  title: 'Premium',
                  price: '₺299',
                  period: '/ay',
                  features: const [
                    'Sınırsız test',
                    'Detaylı 59 biyobelirteç analizi',
                    'Trend analizi',
                    'Doktor mesajlaşma',
                    'Öncelikli destek',
                  ],
                  isCurrentPlan: subscription?['plan'] == 'premium',
                  isPopular: true,
                  onSelect: subscription?['plan'] != 'premium'
                      ? () => _upgradeToPremium(provider)
                      : null,
                ),
                
                const SizedBox(height: 16),
                
                // Enterprise plan
                _PlanCard(
                  title: 'Enterprise',
                  price: '₺29,999',
                  period: '/ay',
                  features: const [
                    'Tüm Premium özellikler',
                    'Özel doktor ataması',
                    'API erişimi',
                    'Özel raporlar',
                    '7/24 destek',
                  ],
                  isCurrentPlan: subscription?['plan'] == 'enterprise',
                  onSelect: () => _contactSales(),
                ),
                
                const SizedBox(height: 24),
                
                // Cancel subscription button
                if (subscription?['plan'] != 'free' && 
                    subscription?['status'] == 'active')
                  TextButton(
                    onPressed: () => _cancelSubscription(provider),
                    style: TextButton.styleFrom(
                      foregroundColor: Colors.red,
                    ),
                    child: const Text('Aboneliği İptal Et'),
                  ),
              ],
            ),
          );
        },
      ),
    );
  }

  String _getPlanName(String plan) {
    switch (plan) {
      case 'free':
        return 'Ücretsiz';
      case 'premium':
        return 'Premium';
      case 'enterprise':
        return 'Enterprise';
      default:
        return plan;
    }
  }

  String _formatDate(String? dateStr) {
    if (dateStr == null) return '';
    final date = DateTime.parse(dateStr);
    return '${date.day}/${date.month}/${date.year}';
  }

  Future<void> _upgradeToPremium(SubscriptionProvider provider) async {
    final success = await provider.createCheckout(plan: 'premium');
    
    if (!mounted) return;
    
    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Ödeme sayfasına yönlendiriliyorsunuz...'),
        ),
      );
      // TODO: Open checkout URL
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(provider.errorMessage ?? 'Hata oluştu'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  void _contactSales() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Enterprise Plan'),
        content: const Text(
          'Enterprise plan için lütfen satış ekibimizle iletişime geçin:\n\nsales@neuralcipher.ai',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Tamam'),
          ),
        ],
      ),
    );
  }

  Future<void> _cancelSubscription(SubscriptionProvider provider) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Aboneliği İptal Et'),
        content: const Text(
          'Aboneliğinizi iptal etmek istediğinizden emin misiniz? '
          'Mevcut dönem sonuna kadar Premium özelliklerine erişmeye devam edeceksiniz.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Vazgeç'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('İptal Et'),
          ),
        ],
      ),
    );

    if (confirmed != true || !mounted) return;

    final success = await provider.cancelSubscription();
    
    if (!mounted) return;
    
    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Abonelik iptal edildi'),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(provider.errorMessage ?? 'Hata oluştu'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }
}

class _PlanCard extends StatelessWidget {
  final String title;
  final String price;
  final String period;
  final List<String> features;
  final bool isCurrentPlan;
  final bool isPopular;
  final VoidCallback? onSelect;

  const _PlanCard({
    required this.title,
    required this.price,
    required this.period,
    required this.features,
    required this.isCurrentPlan,
    this.isPopular = false,
    this.onSelect,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: isPopular ? 8 : 2,
      child: Container(
        decoration: isPopular
            ? BoxDecoration(
                border: Border.all(
                  color: Theme.of(context).colorScheme.primary,
                  width: 2,
                ),
                borderRadius: BorderRadius.circular(12),
              )
            : null,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    title,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  if (isPopular)
                    Chip(
                      label: const Text('Popüler'),
                      backgroundColor: Theme.of(context).colorScheme.primary,
                      labelStyle: const TextStyle(color: Colors.white),
                    ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    price,
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    period,
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                ],
              ),
              const SizedBox(height: 16),
              ...features.map((feature) => Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Row(
                  children: [
                    Icon(
                      Icons.check_circle,
                      size: 20,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                    const SizedBox(width: 8),
                    Expanded(child: Text(feature)),
                  ],
                ),
              )),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: isCurrentPlan ? null : onSelect,
                  child: Text(isCurrentPlan ? 'Mevcut Plan' : 'Seç'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
