export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import type { AppGenerateMetadata } from '@/types';



import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/lib/i18n';

async function fetchPageContent(locale: string, slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://backend:3001'}/pages?locale=${locale}&slug=${slug}`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Failed to fetch page content');
  const pages = await res.json();
  return pages[0] || { title: 'Page not found', content: 'Content not available' };
}

async function AboutContent({ locale }: { locale: string }) {
  const page = await fetchPageContent(locale, 'about');
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {page.title}
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
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
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
    </div>
  );
}

// 预生成所有支持的语言路径
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

// 这个函数会在服务器端运行，用于生成元数据
export const generateMetadata = async ({ params }) => {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: `FreeIns - ${t('title')}`
  };
}

export default async function About({ params }) {
  const { locale } = params;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <AboutContent locale={locale} />
      </Suspense>
      <Footer />
    </div>
  );
}