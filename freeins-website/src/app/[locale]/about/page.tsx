import { getTranslations } from 'next-intl/server';
import type { AppGenerateMetadata } from '@/types';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/lib/i18n';

// 预生成所有支持的语言路径
export function generateStaticParams(): { locale: string }[] {
  return locales.map((locale) => ({ locale }));
}

// 这个函数会在服务器端运行，用于生成元数据
export const generateMetadata: AppGenerateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: `FreeIns - ${t('title')}`
  };
}

export default async function About({ 
  params,
  searchParams 
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} />
      
      {/* Hero Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {t('title')}
            </h1>
          </div>
        </div>
      </div>

      {/* Company Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('company')}</h2>
              <p className="text-gray-600 mb-4">{t('companyIntro')}</p>
              <p className="text-gray-600">{t('companyDescription')}</p>
            </div>
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              {t('companyImagePlaceholder')}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('founderTitle')}</h2>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('founderName')}</h3>
              <p className="text-gray-600">{t('founderDescription')}</p>
            </div>
            <div className="bg-gray-200 h-64 flex items-center justify-center order-1 md:order-2">
              {t('founderImagePlaceholder')}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">{t('philosophy')}</h2>
            <p className="mt-4 text-lg text-gray-500">
              {t('philosophyDescription')}
            </p>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{t('values')}</h2>
            <p className="mt-4 text-lg text-gray-500">
              {t('valuesDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Certificates */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">{t('certificates')}</h2>
            <p className="mt-4 text-lg text-gray-500">
              {t('certificatesDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">{t('certificate1')}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">{t('certificate2')}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">{t('certificate3')}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">{t('certificate4')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}