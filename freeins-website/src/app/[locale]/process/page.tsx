import { getTranslations } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProcessStep from '@/components/ProcessStep';
import { locales } from '@/lib/i18n';

// 预生成所有支持的语言路径
export function generateStaticParams(): { locale: string }[] {
  return locales.map((locale) => ({ locale }));
}

// 这个函数会在服务器端运行，用于生成元数据
export async function generateMetadata({ 
  params,
  searchParams 
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'process' });
  return {
    title: `FreeIns - ${t('title')}`
  };
}

export default async function Process({ 
  params,
  searchParams 
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'process' });

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

      {/* Production Process */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">{t('production')}</h2>
          </div>
          
          <div className="relative">
            {/* Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>
            
            {/* Steps */}
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <h3 className="text-lg font-medium text-indigo-600">{t('rawMaterials')}</h3>
                  <p className="mt-2 text-gray-600">{t('rawMaterialsDescription')}</p>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8 flex md:justify-start">
                  <div className="h-40 w-40 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">{t('imagePlaceholder')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right order-1 md:order-2">
                  <div className="h-40 w-40 bg-gray-200 rounded-lg flex items-center justify-center ml-auto">
                    <span className="text-gray-400">{t('imagePlaceholder')}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8 order-2 md:order-1">
                  <h3 className="text-lg font-medium text-indigo-600">{t('inertiaCheck')}</h3>
                  <p className="mt-2 text-gray-600">{t('inertiaCheckDescription')}</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <h3 className="text-lg font-medium text-indigo-600">{t('weighing')}</h3>
                  <p className="mt-2 text-gray-600">{t('weighingDescription')}</p>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8 flex md:justify-start">
                  <div className="h-40 w-40 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">{t('imagePlaceholder')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right order-1 md:order-2">
                  <div className="h-40 w-40 bg-gray-200 rounded-lg flex items-center justify-center ml-auto">
                    <span className="text-gray-400">{t('imagePlaceholder')}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8 order-2 md:order-1">
                  <h3 className="text-lg font-medium text-indigo-600">{t('manufacturing')}</h3>
                  <p className="mt-2 text-gray-600">{t('manufacturingDescription')}</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <h3 className="text-lg font-medium text-indigo-600">{t('packaging')}</h3>
                  <p className="mt-2 text-gray-600">{t('packagingDescription')}</p>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8 flex md:justify-start">
                  <div className="h-40 w-40 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">图片</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right order-1 md:order-2">
                  <div className="h-40 w-40 bg-gray-200 rounded-lg flex items-center justify-center ml-auto">
                    <span className="text-gray-400">图片</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8 order-2 md:order-1">
                  <h3 className="text-lg font-medium text-indigo-600">{t('inspection')}</h3>
                  <p className="mt-2 text-gray-600">{t('inspectionDescription')}</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <h3 className="text-lg font-medium text-indigo-600">{t('finished')}</h3>
                  <p className="mt-2 text-gray-600">{t('finishedDescription')}</p>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8 flex md:justify-start">
                  <div className="h-40 w-40 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">图片</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Production Environment */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">{t('environment')}</h2>
            <p className="mt-4 text-lg text-gray-500">
              {t('environmentDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">{t('cleanroom')}</h3>
              <p className="mt-2 text-gray-600">{t('cleanroomDescription')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">{t('machinery')}</h3>
              <p className="mt-2 text-gray-600">{t('machineryDescription')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">{t('team')}</h3>
              <p className="mt-2 text-gray-600">{t('teamDescription')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">{t('supplyChain')}</h3>
              <p className="mt-2 text-gray-600">{t('supplyChainDescription')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Management */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">{t('qualityManagement')}</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">{t('qualityOperation')}</h3>
              <p className="mt-2 text-gray-600">{t('qualityOperationDescription')}</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">{t('qualityPolicy')}</h3>
              <p className="mt-2 text-gray-600">{t('qualityPolicyDescription')}</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">{t('qualityObjectives')}</h3>
              <p className="mt-2 text-gray-600">{t('qualityObjectivesDescription')}</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">{t('processManagement')}</h3>
              <p className="mt-2 text-gray-600">{t('processManagementDescription')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* R&D & Services */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">{t('rd')}</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-medium text-gray-900">{t('technology')}</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                  <span className="ml-2">{t('formulaDevelopment')}</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                  <span className="ml-2">{t('packagingMaterials')}</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                  <span className="ml-2">{t('packagingDesign')}</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                  <span className="ml-2">{t('testing')}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-900">{t('qualityService')}</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                  <span className="ml-2">{t('freeSamples')}</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                  <span className="ml-2">{t('flexibleSupplyChain')}</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                  <span className="ml-2">{t('costControl')}</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                  <span className="ml-2">{t('technicalSupport')}</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                  <span className="ml-2">{t('logistics')}</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                  <span className="ml-2">{t('marketing')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Success Cases */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">{t('successCases')}</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">{t('brands')}</h3>
              <p className="mt-2 text-gray-600">{t('brandsDescription')}</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">{t('wholesalers')}</h3>
              <p className="mt-2 text-gray-600">{t('wholesalersDescription')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advantages */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">{t('advantages')}</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">{t('supplyChainPlatform')}</h3>
              <p className="mt-2 text-gray-600">{t('supplyChainPlatformDescription')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">{t('multiLevelProcurement')}</h3>
              <p className="mt-2 text-gray-600">{t('multiLevelProcurementDescription')}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}