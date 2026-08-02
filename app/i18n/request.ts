import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

// Explicit locale map ensures Turbopack bundles these statically
const messageImports: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import('../../message/en.json'),
  np: () => import('../../message/ne.json'),
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale) {
    const store = await cookies();
    locale = store.get('locale')?.value || 'en';
  }

  // Fallback to 'en' if the requested locale isn't available
  const importMessages = messageImports[locale] ?? messageImports['en'];
  const messages = (await importMessages()).default;

  return {
    locale,
    messages
  };
});