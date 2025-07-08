import { getTranslations } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { locales } from '@/lib/i18n';
import { InferPageParamsType } from 'next-typesafe-url';

type Props = {
  params: { locale: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// 预生成所有支持的语言路径
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 这个函数会在服务器端运行，用于生成元数据
export async function generateMetadata({ params }: Props) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: `FreeIns - ${t('title')}`
  };
}

export default async function About({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
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

      {/* Company Info */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('company')}</h2>
              <p className="mt-4 text-lg text-gray-500">
                {t('companyIntro')}
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">{t('companyImagePlaceholder')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="lg:order-2">
              <h2 className="text-2xl font-bold text-gray-900">{t('founderTitle')}</h2>
              <p className="mt-4 text-lg text-gray-500">
                {t('founderDescription')}
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:order-1">
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">{t('founderImagePlaceholder')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy & Values */}
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