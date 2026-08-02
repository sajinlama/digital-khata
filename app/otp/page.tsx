'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LanguageToggle } from '@/app/components/languageToggle';

// Initial countdown time: 2 minutes 30 seconds (150s)
const INITIAL_TIME = 150;

export default function OtpVerificationPage() {
  const t = useTranslations('OtpScreen');
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle single digit input + auto-focus
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle keyboard navigation (Backspace)
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle pasting full 6-digit OTP code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d{6}$/.test(pastedData)) return;

    const digits = pastedData.split('');
    setOtp(digits);
    inputRefs.current[5]?.focus();
  };

  // Handle OTP resend reset
  const handleResend = () => {
    if (timeLeft > 0) return;
    setOtp(Array(6).fill(''));
    setTimeLeft(INITIAL_TIME);
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
  const pendingPhone = sessionStorage.getItem('pending_verification_phone');
  
  // Redirect unauthenticated/unregistered users back to register page
  if (!pendingPhone) {
    router.replace('/register');
  }
}, [router]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    console.log('Verifying OTP:', fullOtp);
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f6f0] flex flex-col items-center justify-center p-4 sm:p-8 font-sans relative">
      {/* Top Bar with Language Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10"
      >
        <LanguageToggle />
      </motion.div>

      {/* Main Container Card (Identical design to Login Page) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-5xl bg-[#FAF8F5] rounded-3xl shadow-xl border border-gray-200/60 p-6 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 mt-12 sm:mt-0"
      >
        {/* Left Section: Branding & Intro */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          {/* Back Button */}
          <button
            type="button"
            aria-label="Go back"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#0B172A] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>

          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-28 h-28 mb-1">
              <Image
                src="/digital.png"
                alt="Digital Khata Logo"
                fill
                sizes="(max-width: 768px) 112px, 112px"
                className="object-contain md:object-left"
                priority
              />
            </div>
            <span className="text-xs font-bold tracking-widest text-[#B87D28] uppercase">
              खाता डिजिटल
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0B172A] tracking-tight">
            {t('title', { fallback: 'Verify Number' })}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-md leading-relaxed font-normal">
            {t('subtitle', { fallback: 'Enter the 6-digit code sent to' })}{' '}
            <span className="font-bold text-[#0B172A] tracking-wide font-mono">
              +977 98XXXXXXX
            </span>
          </p>

          <div className="inline-flex items-center gap-2 bg-[#F3EFE6] border border-[#E2DAD0] text-[#333] px-3.5 py-1.5 rounded-md text-xs font-medium shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#B87D28]" />
            <span>{t('encrypted', { fallback: 'Secure AES-256 Encrypted Verification' })}</span>
          </div>
        </div>

        {/* Right Section: Animated Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-[420px] flex flex-col items-center"
        >
          <div className="w-full bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <form onSubmit={handleVerify} className="space-y-6">
              {/* OTP Label */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold tracking-wider text-gray-500 uppercase text-center md:text-left">
                  Verification Code
                </label>

                {/* 6-Digit OTP Inputs */}
                <div className="grid grid-cols-6 gap-2" id="otp-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      aria-label={`Digit ${index + 1}`}
                      className="w-full h-12 sm:h-14 text-center text-lg sm:text-xl font-bold font-mono bg-[#FFFDF7] border border-gray-200 rounded-md text-[#0B172A] focus:outline-none focus:ring-2 focus:ring-[#0B172A] focus:border-transparent transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Resend Action */}
              <div className="text-center">
                <button
                  type="button"
                  id="resend-btn"
                  onClick={handleResend}
                  disabled={timeLeft > 0}
                  className={`text-xs font-semibold transition-colors ${
                    timeLeft > 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#B87D28] hover:text-[#96631e] cursor-pointer underline'
                  }`}
                >
                  {timeLeft > 0 ? (
                    <>
                      {t('resendIn', { fallback: 'Resend OTP in' })}{' '}
                      <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                    </>
                  ) : (
                    t('resendNow', { fallback: 'Resend OTP now' })
                  )}
                </button>
              </div>

              {/* Verify Button (Uses primary #0B1D33 color) */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#0B1D33] hover:bg-[#142942] text-white text-sm font-semibold py-3 rounded-md transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t('verify', { fallback: 'Verify' })}</span>
                <CheckCircle2 className="w-4 h-4" />
              </motion.button>
            </form>
          </div>

          <div className="text-center mt-6 text-[11px] text-gray-500 space-y-0.5">
            <p>
              <span className="font-semibold text-gray-700">डिजिटल खाता</span> डेस्कटपका लागि।
            </p>
            <p className="text-gray-400">
              नेपालभरि १०,००० भन्दा बढी पसल धनीहरूको रोजाइ।
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}