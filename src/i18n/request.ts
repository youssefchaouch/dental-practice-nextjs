import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const supportedLocales = ['en', 'fr'];

const resolveLocale = (locale?: string) =>
  supportedLocales.includes(locale ?? '') ? locale! : 'fr';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get('locale')?.value);

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});