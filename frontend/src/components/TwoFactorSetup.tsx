'use client';

import React, { useState } from 'react';

export const TwoFactorSetup: React.FC = () => {
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup');
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSetup = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/auth/2fa/setup', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Setup başarısız');

      const data = await response.json();
      setQrCode(data.qr_code);
      setSecret(data.secret);
      setBackupCodes(data.backup_codes);
      setStep('verify');
    } catch (error) {
      alert('Hata: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/auth/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      if (!response.ok) throw new Error('Doğrulama başarısız');

      setStep('complete');
    } catch (error) {
      alert('Hata: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg border border-cyan-400">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">🔐 2FA Kurulumu</h2>

      {step === 'setup' && (
        <div>
          <p className="text-gray-300 mb-4">
            2FA (İki Faktörlü Kimlik Doğrulama) hesabınızı daha güvenli hale getirir.
          </p>
          <button
            onClick={handleSetup}
            disabled={loading}
            className="w-full px-6 py-3 bg-cyan-400 text-blue-950 rounded-lg hover:bg-cyan-300 font-semibold disabled:opacity-50"
          >
            {loading ? '⏳ Yükleniyor...' : '🔐 Kuruluma Başla'}
          </button>
        </div>
      )}

      {step === 'verify' && (
        <div>
          <p className="text-gray-300 mb-4">
            1. Aşağıdaki QR Code'u Google Authenticator veya Authy uygulamasında tarayın:
          </p>
          <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto mb-4 border border-cyan-400 p-2 bg-white" />
          
          <p className="text-gray-300 mb-4">
            2. Veya manuel olarak şu kodu girin:
          </p>
          <div className="p-3 bg-blue-950 rounded border border-purple-500 mb-4 font-mono text-sm break-all text-purple-300">
            {secret}
          </div>

          <p className="text-gray-300 mb-4">
            3. Uygulamada gösterilen 6 haneli kodu girin:
          </p>
          <input
            type="text"
            placeholder="000000"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.slice(0, 6))}
            maxLength={6}
            className="w-full mb-4 px-4 py-2 bg-blue-950 border-2 border-cyan-400 text-white rounded-lg focus:outline-none focus:border-cyan-300"
          />

          <p className="text-sm text-gray-400 mb-4">
            <strong className="text-cyan-400">⚠️ Yedek Kodlar:</strong> Bu kodları güvenli bir yerde saklayın.
          </p>
          <div className="p-3 bg-purple-950 rounded border border-purple-500 mb-4 text-sm text-purple-300 max-h-32 overflow-y-auto">
            {backupCodes.map((code, index) => (
              <div key={index} className="font-mono">{code}</div>
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={loading || verificationCode.length !== 6}
            className="w-full px-6 py-3 bg-cyan-400 text-blue-950 rounded-lg hover:bg-cyan-300 font-semibold disabled:opacity-50"
          >
            {loading ? '⏳ Doğrulanıyor...' : '✅ Doğrula'}
          </button>
        </div>
      )}

      {step === 'complete' && (
        <div className="text-center">
          <p className="text-green-400 text-lg font-semibold mb-4">
            ✅ 2FA Başarıyla Etkinleştirildi!
          </p>
          <p className="text-gray-300">
            Artık giriş yaparken 2FA kodu girmeniz gerekecek.
          </p>
        </div>
      )}
    </div>
  );
};

export default TwoFactorSetup;
