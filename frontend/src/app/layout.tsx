// Force clean build - 31 Jan 2026
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'NeuralCipher.ai - Detect Parkinson\'s Through Voice',
  description: 'AI-powered voice analysis detects Parkinson\'s disease 10 years early. 92.31% accuracy in neurological disease detection.',
  keywords: 'AI, Parkinson, voice analysis, early detection, artificial intelligence, neurology',
  authors: [{ name: 'NeuralCipher.ai' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body 
        className={`${inter.variable} font-sans`}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
