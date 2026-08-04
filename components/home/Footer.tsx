'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('HomePage.footer');

  return (
    <footer className="w-full bg-[#041534] text-white/80 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7">
              <Image src="/digital.png" alt="Khata Digital" fill className="object-contain" />
            </div>
            <span className="font-serif font-bold text-lg text-white">Khata Digital</span>
          </div>
          <p className="text-xs leading-relaxed text-gray-400">{t('description')}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Mobile App</a></li>
            <li><a href="#" className="hover:text-white">Security</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-xs text-gray-400">Email: help@khata.digital</p>
          <p className="text-xs text-gray-400 mt-1">Location: Kathmandu, Nepal</p>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        {t('rights')}
      </div>
    </footer>
  );
}