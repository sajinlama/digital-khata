// next.config.ts
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  devIndicators: false,
};

// Pass the relative path to your request config file here
const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

export default withNextIntl(nextConfig);