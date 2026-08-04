'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  Users,
  BadgeCheck,
  Settings,
  User,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';

interface SidebarNavItem {
  titleKey: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: SidebarNavItem[] = [
  {
    titleKey: 'dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    titleKey: 'customers',
    url: '/customers',
    icon: Users,
  },
  {
    titleKey: 'staff',
    url: '/staff',
    icon: BadgeCheck,
  },
  {
    titleKey: 'settings',
    url: '/settings',
    icon: Settings,
  },
];

interface AppSidebarProps {
  userAvatarUrl?: string;
  userName?: string;
  userRole?: string;
}

export function AppSidebar({
  userAvatarUrl,
  userName = 'Rajesh Pradhan',
  userRole = 'Store Owner',
}: AppSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('Sidebar');

  return (
    <Sidebar className="w-64 border-r border-[#384668]/30 bg-[#041534] text-[#ffddb5] flex flex-col h-full">
      {/* 1. Header / Branding */}
      <SidebarHeader className="px-4 py-6 border-b border-[#384668]/20">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src="/digital.png"
              alt="Digital Khata Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <h1 className="font-serif text-lg font-bold text-[#384668] leading-tight">
              {t('brandTitle')}
            </h1>
            <p className="text-xs text-[#8392b7] font-medium">
              {t('brandSubtitle')}
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* 2. Main Navigation Menu */}
      <SidebarContent className="flex-1 py-4">
        <SidebarGroup className="px-0 py-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(`${item.url}/`);
                const ItemIcon = item.icon;

                return (
                  <SidebarMenuItem key={item.titleKey}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={`w-full py-3 h-auto rounded-none transition-colors justify-start gap-3 text-[15px] ${
                        isActive
                          ? 'bg-transparent text-[#ffddb5] font-bold border-l-4 border-[#ffddb5] pl-3 hover:bg-[#1b2a4a] hover:text-[#ffddb5]'
                          : 'text-[#a3aecb] font-semibold pl-4 hover:bg-[#1b2a4a] hover:text-[#d9e2ff]'
                      }`}
                      render={
                        <Link href={item.url} title={t(item.titleKey)}>
                          <ItemIcon className="w-5 h-5 shrink-0" />
                          <span className="truncate">{t(item.titleKey)}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 3. User Profile Footer */}
      <SidebarFooter className="mt-auto px-4 py-6 border-t border-[#384668]/20 bg-[#041534]">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#1b2a4a] border border-[#384668] flex items-center justify-center shrink-0">
            {userAvatarUrl ? (
              <Image
                src={userAvatarUrl}
                alt={userName}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <User className="w-5 h-5 text-[#8392b7]" />
            )}
          </div>
          <div className="overflow-hidden group-data-[collapsible=icon]:hidden">
            <p className="text-white text-sm font-bold truncate leading-snug">
              {userName}
            </p>
            <p className="text-xs text-[#8392b7] truncate">{userRole}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}