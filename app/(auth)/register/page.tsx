  'use client';

  import React, { useState } from 'react';
  import Image from 'next/image';
  import Link from 'next/link';
  import { useRouter } from 'next/navigation';
  import { Phone, Lock, Store, User, Languages } from 'lucide-react';
  import { motion } from 'framer-motion';
  import { useTranslations } from 'next-intl';
  import { LanguageToggle } from '@/app/components/languageToggle';

  export default function RegisterPage() {
    const t = useTranslations('RegisterPage');
    const router = useRouter();

    const [formData, setFormData] = useState({
      shopName: '',
      fullName: '',
      phoneNumber: '',
      password: '',
    });

    const handleRegister = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Store phone number & verification flag in sessionStorage for protected OTP flow
      sessionStorage.setItem('pending_verification_phone', formData.phoneNumber);
      sessionStorage.setItem('otp_verified', 'false');
      sessionStorage.setItem('registration_data', JSON.stringify(formData));

      // Route directly to OTP verification page
      router.push('/otp');
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

        {/* Main Container Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-5xl bg-[#FAF8F5] rounded-3xl shadow-xl border border-gray-200/60 p-6 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 mt-12 sm:mt-0"
        >
          
          {/* Left Section: Branding */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            
            {/* Logo from /public/digital.png with explicit sizes prop */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative w-30 h-20 mb-2">
                <Image
                  src="/digital.png"
                  alt="Digital Khata Logo"
                  fill
                  sizes="(max-width: 768px) 120px, 120px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0B172A] tracking-tight">
              {t('title')}
            </h1>

            <p className="text-sm sm:text-base text-gray-600 max-w-md leading-relaxed font-normal">
              {t('description')}
            </p>

            <div className="inline-flex items-center gap-2 bg-[#F3EFE6] border border-[#E2DAD0] text-[#333] px-3.5 py-1.5 rounded-md text-xs font-medium shadow-sm">
              <Languages className="w-4 h-4 text-gray-600" />
              <span>{t('tagline')}</span>
            </div>
          </div>

          {/* Right Section: Animated Register Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-[420px] flex flex-col items-center"
          >
            <div className="w-full bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <form onSubmit={handleRegister} className="space-y-4">
                
                {/* Shop Name Field */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                    {t('shopNameLabel')}
                  </label>
                  <div className="relative flex items-center">
                    <Store className="absolute left-3 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      required
                      placeholder={t('shopNamePlaceholder')}
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                      className="w-full bg-[#FFFDF7] border border-gray-200 rounded-md py-2 pl-9 pr-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0B172A] transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Owner Full Name Field */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                    {t('fullNameLabel')}
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      required
                      placeholder={t('fullNamePlaceholder')}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#FFFDF7] border border-gray-200 rounded-md py-2 pl-9 pr-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0B172A] transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Phone Input Field */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                    {t('phoneLabel')}
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-3 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      required
                      placeholder="98XXXXXXXX"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full bg-[#FFFDF7] border border-gray-200 rounded-md py-2 pl-9 pr-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0B172A] transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                    {t('passwordLabel')}
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 w-4 h-4 text-gray-500" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-[#FFFDF7] border border-gray-200 rounded-md py-2 pl-9 pr-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0B172A] transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Register Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#FAAF3B] hover:bg-[#f3a42c] text-[#0B172A] text-sm font-semibold py-2.5 rounded-md transition-colors shadow-sm cursor-pointer mt-2"
                >
                  {t('submitButton')}
                </motion.button>

                <div className="relative flex items-center justify-center my-3">
                  <div className="border-t border-gray-200 w-full"></div>
                  <span className="bg-white px-2 text-[10px] text-gray-400 font-semibold tracking-wider uppercase absolute">
                    {t('or')}
                  </span>
                </div>

                {/* Already have an account */}
                <div className="text-center pt-1">
                  <span className="text-xs text-gray-500">{t('alreadyHaveAccount')} </span>
                  <Link
                    href="/login"
                    className="text-xs text-[#0B172A] font-bold hover:underline"
                  >
                    {t('loginLink')}
                  </Link>
                </div>
              </form>
            </div>

            <div className="text-center mt-6 text-[11px] text-gray-500 space-y-0.5">
              <p>
                <span className="font-semibold text-gray-700">{t('footerAppTitle')}</span>
              </p>
              <p className="text-gray-400">
                {t('footerTrust')}
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    );
  }