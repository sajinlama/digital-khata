'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export function CallToAction() {
  const t = useTranslations('HomePage.cta');

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#fff9ee]">
      <div className="max-w-5xl mx-auto bg-[#041534] rounded-3xl p-8 sm:p-16 text-center text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold">{t('title')}</h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">{t('subtitle')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto bg-[#835400] hover:bg-[#643f00] text-white px-8 py-3.5 rounded-xl font-semibold transition-all cursor-pointer">
              {t('downloadApp')}
            </button>
            <button className="w-full sm:w-auto border border-white/30 hover:border-white text-white px-8 py-3.5 rounded-xl font-semibold transition-all cursor-pointer">
              {t('registerOnline')}
            </button>
          </div>
          <p className="text-xs text-gray-400 pt-2">{t('note')}</p>
        </div>
      </div>
    </section>
  );
}