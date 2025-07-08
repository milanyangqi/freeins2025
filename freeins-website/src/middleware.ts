import createMiddleware from 'next-intl/middleware';
import { locales } from './lib/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Default locale for redirects
  defaultLocale: 'zh',
  
  // Always use locale prefix
  localePrefix: 'always',
});

export const config = {
  // Match all pathnames except for
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};