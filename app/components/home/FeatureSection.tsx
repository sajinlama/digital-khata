'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Globe, BookOpen, FileText } from 'lucide-react';

export function FeaturesSection() {
  const t = useTranslations('HomePage.features');

  return (
    <section id="features" className="py-20 bg-[#faf3e3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#041534]">
            {t('title')}
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bilingual Support Card */}
          <div className="md:col-span-2 bg-[#fff9ee] border border-[#DDD6C7] p-8 rounded-2xl relative overflow-hidden">
            <div className="w-10 h-10 bg-[#feb64e] text-[#2a1800] rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#041534] mb-2">{t('bilingualTitle')}</h3>
            <p className="text-sm text-gray-600 max-w-md leading-relaxed">{t('bilingualDesc')}</p>
            <div className="mt-6 flex gap-3 text-xs">
              <span className="bg-[#f5edde] border border-[#c5c6cf]/60 px-3 py-1.5 rounded-lg text-[#041534] font-medium">नमस्ते, रमेश जी</span>
              <span className="bg-[#041534] text-white px-3 py-1.5 rounded-lg font-medium">Hello, Ramesh ji</span>
            </div>
          </div>

          {/* Digital Stitch Card */}
          <div className="bg-[#041534] text-white p-8 rounded-2xl border border-gray-800">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4 text-[#feb64e]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">{t('stitchTitle')}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{t('stitchDesc')}</p>
          </div>

          {/* Staff Management Card */}
          <div className="bg-[#fff9ee] border border-[#DDD6C7] p-8 rounded-2xl">
            <div className="w-10 h-10 bg-[#feb64e]/20 text-[#835400] rounded-lg flex items-center justify-center mb-4">
              <div  className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#041534] mb-2">{t('staffTitle')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{t('staffDesc')}</p>
          </div>

          {/* PDF Statements Card */}
          <div className="md:col-span-2 bg-white border border-[#DDD6C7] p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#041534] mb-2">{t('pdfTitle')}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{t('pdfDesc')}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}