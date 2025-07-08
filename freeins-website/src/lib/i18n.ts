import { getRequestConfig } from 'next-intl/server';

export const locales = ['zh', 'en', 'es', 'vi', 'id', 'fr', 'ms', 'ar'];

export default getRequestConfig(async ({ locale }) => {
  // 确保locale是有效的
  const validLocale = locales.includes(locale as string) ? locale : 'zh';
  
  try {
    return {
      locale: validLocale,
      messages: (await import(`../messages/${validLocale}.json`)).default
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${validLocale}`, error);
    // 回退到默认语言
    return {
      locale: 'zh',
      messages: (await import('../messages/zh.json')).default
    };
  }
});