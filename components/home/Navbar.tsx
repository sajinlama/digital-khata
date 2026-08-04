'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageToggle } from '../languageToggle';


export function Navbar() {
  const t = useTranslations('HomePage.nav');

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#fff9ee] border-b border-[#c5c6cf]/40 shadow-sm">
      <div className="flex justify-between items-center px-4 sm:px-8 py-3 max-w-7xl mx-auto">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-9 h-9">
            <Image
              src="/digital.png"
              alt="Khata Digital Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-serif font-bold text-2xl text-[#041534] tracking-tight">
            Khata Digital
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="text-[#835400] font-semibold border-b-2 border-[#835400]">
            {t('features')}
          </a>
          <a href="#how-it-works" className="text-gray-600 hover:text-[#041534] transition-colors">
            {t('howItWorks')}
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-[#041534] transition-colors">
            {t('pricing')}
          </a>
          <a href="#contact" className="text-gray-600 hover:text-[#041534] transition-colors">
            {t('contact')}
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link
            href="/login"
            className="px-3.5 py-1.5 text-sm font-semibold text-[#041534] hover:underline"
          >
            {t('login')}
          </Link>
          <Link
            href="/register"
            className="bg-[#041534] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-[#0a1a3a] transition-all"
          >
            {t('register')}
          </Link>
        </div>
      </div>
    </nav>
  );
}