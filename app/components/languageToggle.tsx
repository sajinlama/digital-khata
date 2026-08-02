// components/LanguageToggle.tsx
'use client';

import React, { useTransition } from 'react';
import { Globe, Loader2 } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { changeLocale } from '../action';

export function LanguageToggle() {
  const currentLocale = useLocale(); // Automatically gets current locale ('en' or 'np')
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleToggle = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    startTransition(async () => {
      // 1. Call server action to set the 'locale' cookie
      await changeLocale(newLocale);
      // 2. Refresh page to reflect new translations
      router.refresh();
    });
  };

  return (
    <div
      className={`flex items-center gap-2 bg-[#EFECE6] border border-[#E2DAD0] p-1 rounded-full shadow-inner ${
        isPending ? 'opacity-70 pointer-events-none' : ''
      }`}
    >
      <Globe className="w-4 h-4 ml-2 text-gray-500" />
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
        {isPending && currentLocale !== 'en' && <Loader2 className="w-3 h-3 animate-spin" />}
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
        {isPending && currentLocale !== 'np' && <Loader2 className="w-3 h-3 animate-spin" />}
        नेपाली
      </button>
    </div>
  );
}