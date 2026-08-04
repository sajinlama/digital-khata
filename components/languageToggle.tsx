
'use client';

import React, { useTransition, useState, useEffect } from 'react';
import { Globe, Loader2 } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { changeLocale } from '../app/action';

export function LanguageToggle() {
  const currentLocale = useLocale(); // 'en' or 'np'
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    startTransition(async () => {
      await changeLocale(newLocale);
      router.refresh();
    });
  };

  const handleSingleClick = () => {
    const nextLocale = currentLocale === 'en' ? 'np' : 'en';
    handleToggle(nextLocale);
  };

  return (
    <>
      {/* 1. Mobile Compact Toggle */}
      <button
        type="button"
        disabled={isPending}
        onClick={handleSingleClick}
        aria-label="Toggle language"
        suppressHydrationWarning
        className={`sm:hidden flex items-center gap-1.5 bg-[#EFECE6] border border-[#E2DAD0] p-1 rounded-full shadow-inner active:scale-95 transition-all duration-200 cursor-pointer ${
          isPending ? 'opacity-70 pointer-events-none' : ''
        }`}
      >
        <Globe className="w-3.5 h-3.5 ml-1.5 text-gray-500 shrink-0" />
        <span className="bg-[#0B1D33] text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          {isPending ? (
            <Loader2 className="w-3 h-3 animate-spin text-[#FAAF3B]" />
          ) : mounted ? (
            currentLocale.toUpperCase()
          ) : (
            'EN'
          )}
        </span>
      </button>

     <div
        className={`hidden sm:flex items-center gap-1.5 bg-[#EFECE6] border border-[#E2DAD0] p-1 rounded-full shadow-inner ${
          isPending ? 'opacity-70 pointer-events-none' : ''
        }`}
      >
        <Globe className="w-4 h-4 ml-2 text-gray-500 shrink-0" />

        <button
          type="button"
          disabled={isPending}
          onClick={() => handleToggle('en')}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1 ${
            currentLocale === 'en'
              ? 'bg-[#0B1D33] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {isPending && currentLocale !== 'en' && (
            <Loader2 className="w-3 h-3 animate-spin" />
          )}
          English
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={() => handleToggle('np')}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1 ${
            currentLocale === 'np'
              ? 'bg-[#0B1D33] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {isPending && currentLocale !== 'np' && (
            <Loader2 className="w-3 h-3 animate-spin" />
          )}
          नेपाली
        </button>
      </div>
    </>
  );
}


 