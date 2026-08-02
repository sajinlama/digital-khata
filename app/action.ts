// app/actions.ts
'use server';

import { cookies } from 'next/headers';

export async function changeLocale(locale: string) {
  const store = await cookies();
  store.set('locale', locale, {
    path: '/',
    maxAge: 31536000, // 1 year
    sameSite: 'lax',
  });
}

