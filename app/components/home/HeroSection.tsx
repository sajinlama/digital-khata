'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, ArrowRight, PlayCircle, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  const t = useTranslations('HomePage');

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-[#fff9ee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#feb64e]/30 text-[#714800] px-3 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#835400]" />
            <span>{t('hero.tagline')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#041534] leading-tight">
            {t('hero.titlePart1')} <br />
            <span className="text-[#835400]">{t('hero.titlePart2')}</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-[#835400] text-white px-6 py-3.5 rounded-xl font-medium shadow-md hover:bg-[#643f00] transition-all flex items-center gap-2 cursor-pointer">
              <span>{t('hero.getStarted')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border-2 border-[#041534] text-[#041534] px-6 py-3.5 rounded-xl font-medium hover:bg-[#041534]/5 transition-all flex items-center gap-2 cursor-pointer">
              <PlayCircle className="w-5 h-5" />
              <span>{t('hero.watchDemo')}</span>
            </button>
          </div>
        </motion.div>

        {/* Right UI Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#fff9ee] rounded-2xl shadow-2xl border border-[#DDD6C7] overflow-hidden">
            {/* Header Mockup */}
            <div className="bg-[#041534] p-4 flex items-center justify-between text-white">
              <span className="font-serif font-bold text-lg">{t('mockup.myLedger')}</span>
              <div className="w-8 h-8 rounded-full bg-[#feb64e] text-[#2a1800] flex items-center justify-center font-bold text-sm">
                K
              </div>
            </div>

            {/* Content Mockup */}
            <div className="p-4 space-y-3 bg-[#fff9ee]">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{t('mockup.totalBalance')}</p>
                  <p className="font-mono text-3xl font-bold text-[#041534]">रू 42,500.00</p>
                </div>
                <span className="bg-[#feb64e]/20 text-[#835400] px-2.5 py-1 rounded-md text-xs font-bold">
                  {t('mockup.customers')}
                </span>
              </div>

              {/* Transactions */}
              <div className="border-l-4 border-red-600 bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm text-[#041534]">Ramesh Shrestha</p>
                  <p className="text-xs text-gray-500">2 hours ago • Rice & Lentils</p>
                </div>
                <p className="font-mono text-sm font-bold text-red-600">रू 1,200</p>
              </div>

              <div className="border-l-4 border-green-600 bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm text-[#041534]">Priya Thapa</p>
                  <p className="text-xs text-gray-500">Yesterday • Full Settlement</p>
                </div>
                <p className="font-mono text-sm font-bold text-[#041534]">रू 5,000</p>
              </div>
            </div>

            {/* Footer Action Mockup */}
            <div className="p-3 border-t border-[#DDD6C7] bg-[#f5edde] flex justify-center">
              <button className="bg-[#835400] text-white px-5 py-2 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm">
                <Plus className="w-4 h-4" />
                <span>{t('mockup.addTransaction')}</span>
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}