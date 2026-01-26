'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://web-production-c00b0.up.railway.app/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        // Even if email doesn't exist, show success for security
        setSuccess(true);
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
          <div className="w-16 h-16 bg-[#64FFDA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
          <p className="text-gray-400 mb-6">
            If an account exists with <strong className="text-white">{email}</strong>, you will receive a password reset link shortly.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            The link will expire in 60 minutes for security reasons.
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] text-[#0A0E27] font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Login
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

        {/* Forgot Password Form */}
        <div className="bg-[#1a1f3a] rounded-2xl p-8 border border-[#64FFDA]/20">
          <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
          <p className="text-gray-400 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0E27] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#64FFDA] transition-colors"
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] text-[#0A0E27] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
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
          <p>For security reasons, we'll send a reset link even if the email doesn't exist</p>
        </div>
      </div>
    </div>
  );
}
