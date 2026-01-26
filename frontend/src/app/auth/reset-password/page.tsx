'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token');
    }
  }, [token]);

  useEffect(() => {
    // Check password strength
    if (password.length === 0) {
      setPasswordStrength({ score: 0, text: '', color: '' });
      return;
    }

    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const strengths = [
      { score: 0, text: 'Very Weak', color: 'bg-red-500' },
      { score: 1, text: 'Weak', color: 'bg-orange-500' },
      { score: 2, text: 'Fair', color: 'bg-yellow-500' },
      { score: 3, text: 'Good', color: 'bg-blue-500' },
      { score: 4, text: 'Strong', color: 'bg-green-500' },
      { score: 5, text: 'Very Strong', color: 'bg-green-600' },
    ];

    setPasswordStrength(strengths[score]);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Invalid or missing reset token');
      return;
    }

    if (password.length < 12) {
      setError('Password must be at least 12 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://web-production-c00b0.up.railway.app/api/v1/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          new_password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        setError(data.detail || 'Failed to reset password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1a1f3a] rounded-2xl p-8 border border-[#64FFDA]/20 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Password Reset Successful!</h2>
          <p className="text-gray-400 mb-6">
            Your password has been successfully reset. Redirecting to login...
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] text-[#0A0E27] font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-black">
              <span className="bg-gradient-to-r from-[#64FFDA] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                Neural
              </span>
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#64FFDA] bg-clip-text text-transparent">
                Cipher
              </span>
              <span className="text-[#64FFDA] opacity-60">.ai</span>
            </h1>
            <p className="text-xs text-gray-400 tracking-[0.2em] uppercase font-bold mt-1">
              Early Detection AI
            </p>
          </Link>
        </div>

        {/* Reset Password Form */}
        <div className="bg-[#1a1f3a] rounded-2xl p-8 border border-[#64FFDA]/20">
          <h2 className="text-2xl font-bold text-white mb-2">Reset Your Password</h2>
          <p className="text-gray-400 mb-6">Enter your new password below</p>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0E27] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#64FFDA] transition-colors"
                placeholder="Enter new password (min 12 characters)"
                required
                minLength={12}
              />
              {password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{passwordStrength.text}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Use 12+ characters with uppercase, lowercase, numbers, and symbols
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0E27] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#64FFDA] transition-colors"
                placeholder="Confirm your new password"
                required
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !token}
              className="w-full py-3 bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] text-[#0A0E27] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm text-[#64FFDA] hover:text-[#3B82F6] transition-colors"
            >
              ← Back to Login
            </Link>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>For your security, password reset links expire after 60 minutes</p>
        </div>
      </div>
    </div>
  );
}
