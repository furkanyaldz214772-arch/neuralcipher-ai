'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuthStore()
  
  const plan = searchParams.get('plan') || 'premium'
  const cycle = searchParams.get('cycle') || 'monthly'
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  const planDetails = {
    premium: {
      name: 'Premium',
      price: { monthly: 9.99, yearly: 99 },
      features: [
        'Sınırsız test',
        'Detaylı sonuçlar (59 biyobelirteç)',
        'Sınırsız geçmiş',
        'Doktor paylaşımı',
        'Trend analizi',
        'PDF rapor indirme',
        'Öncelikli destek'
      ]
    }
  }

  const selectedPlan = planDetails[plan as keyof typeof planDetails]
  const price = selectedPlan.price[cycle as keyof typeof selectedPlan.price]

  const handleCheckout = async () => {
    setIsProcessing(true)
    setError('')

    try {
      // Create Stripe checkout session
      const response = await api.post('/api/v1/subscriptions/create-checkout', {
        plan,
        cycle
      })

      // Redirect to Stripe checkout
      window.location.href = response.data.checkout_url
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ödeme işlemi başlatılamadı')
      setIsProcessing(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Ödeme</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{selectedPlan.name} Plan</div>
                    <div className="text-sm text-gray-600">
                      {cycle === 'monthly' ? 'Aylık' : 'Yıllık'} abonelik
                    </div>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    ${price}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Dahil Olan Özellikler:</h3>
                {selectedPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Güvenli Ödeme</p>
                    <p>Ödemeniz Stripe tarafından güvenli bir şekilde işlenir. Kredi kartı bilgileriniz saklanmaz.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Hesap Bilgileri</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium text-gray-900">{user?.email}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Hesap Tipi</span>
                  <span className="font-medium text-gray-900 capitalize">{user?.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Ödeme Özeti</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium text-gray-900">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dönem</span>
                  <span className="font-medium text-gray-900">
                    {cycle === 'monthly' ? 'Aylık' : 'Yıllık'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ara Toplam</span>
                  <span className="font-medium text-gray-900">${price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">KDV (%20)</span>
                  <span className="font-medium text-gray-900">${(price * 0.2).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Toplam</span>
                  <span className="text-2xl font-bold text-gray-900">${(price * 1.2).toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold mb-4"
              >
                {isProcessing ? 'İşleniyor...' : 'Ödemeye Geç'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Ödeme yaparak{' '}
                <a href="/terms" className="text-blue-600 hover:text-blue-700">Kullanım Koşulları</a>
                {' '}ve{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-700">Gizlilik Politikası</a>
                'nı kabul etmiş olursunuz.
              </p>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Güvenli ödeme sağlayıcısı:</p>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">🔒</div>
                  <span className="font-semibold text-gray-900">Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
