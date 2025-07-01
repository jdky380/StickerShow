import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';

export default getRequestConfig(async () => {
  // Parse the pathname to get the locale
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const locale = pathname.split('/')[1] || 'en';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
}); 