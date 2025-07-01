import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'zh', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'tw', 'vi'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Use locale prefix except for default locale
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en|es|fr|ja|ko|pt|tw|vi|zh)/:path*']
}; 