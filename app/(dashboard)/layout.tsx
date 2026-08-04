'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { LanguageToggle } from '@/components/languageToggle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('Sidebar');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-[#fff9ee]">
        <AppSidebar />

        <SidebarInset className="flex flex-1 flex-col min-w-0 bg-[#fff9ee]">
          {/* Top Header Bar */}
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-[#e9e2d3] bg-[#fff9ee] px-4 sm:px-8">
            {/* Left Side — search bar takes all available space */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <SidebarTrigger className="-ml-1 text-[#041534] shrink-0" />
              <div className="h-4 w-px bg-[#e9e2d3] shrink-0" />

              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full bg-[#f5edde] border-none rounded-lg pl-4 pr-10 py-2 text-sm font-bold text-[#1e1b12] placeholder:text-[#45464e] placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-[#041534]"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#45464e] pointer-events-none" />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 shrink-0">
              <LanguageToggle />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}