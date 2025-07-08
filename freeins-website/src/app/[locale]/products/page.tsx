import { getTranslations } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { locales } from '@/lib/i18n';

type Props = {
  params: { locale: string }
};

// 预生成所有支持的语言路径
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 这个函数会在服务器端运行，用于生成元数据
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'products' });
  return {
    title: `FreeIns - ${t('title')}`
  };
}

export default async function Products({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'products' });

  const productCategories = [
    {
      id: 'nail',
      title: t('nailProducts'),
      products: [
        { id: 'nail-1', name: t('nailPolish'), image: '/images/placeholder.jpg' },
        { id: 'nail-2', name: t('gelPolish'), image: '/images/placeholder.jpg' },
        { id: 'nail-3', name: t('wearableNail'), image: '/images/placeholder.jpg' },
      ],
    },
    {
      id: 'eye',
      title: t('eyeMakeup'),
      products: [
        { id: 'eye-1', name: t('eyeliner'), image: '/images/placeholder.jpg' },
        { id: 'eye-2', name: t('eyeshadow'), image: '/images/placeholder.jpg' },
        { id: 'eye-3', name: t('mascara'), image: '/images/placeholder.jpg' },
      ],
    },
    {
      id: 'face',
      title: t('faceMakeup'),
      products: [
        { id: 'face-1', name: t('foundation'), image: '/images/placeholder.jpg' },
        { id: 'face-2', name: t('concealerHighlighter'), image: '/images/placeholder.jpg' },
        { id: 'face-3', name: t('blush'), image: '/images/placeholder.jpg' },
        { id: 'face-4', name: t('powder'), image: '/images/placeholder.jpg' },
      ],
    },
    {
      id: 'lip',
      title: t('lipMakeup'),
      products: [
        { id: 'lip-1', name: t('lipstick'), image: '/images/placeholder.jpg' },
        { id: 'lip-2', name: t('lipGloss'), image: '/images/placeholder.jpg' },
        { id: 'lip-3', name: t('lipBalm'), image: '/images/placeholder.jpg' },
      ],
    },
    {
      id: 'tools',
      title: t('beautyTools'),
      products: [
        { id: 'tools-1', name: t('beautyTools'), image: '/images/placeholder.jpg' },
      ],
    },
    {
      id: 'skincare',
      title: t('skincare'),
      products: [
        { id: 'skincare-1', name: t('skincare'), image: '/images/placeholder.jpg' },
      ],
    },
    {
      id: 'perfume',
      title: t('perfume'),
      products: [
        { id: 'perfume-1', name: t('perfume'), image: '/images/placeholder.jpg' },
      ],
    },
  ];

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
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {productCategories.map((category) => (
            <div key={category.id} className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{category.title}</h2>
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {category.products.map((product) => (
                  <div key={product.id} className="group">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                      <div className="h-60 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">{product.name}</span>
                      </div>
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}