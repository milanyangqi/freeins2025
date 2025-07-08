export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import ProductsContent from './ProductsContent';
import Loading from '@/components/Loading';

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsContent />
    </Suspense>
  );
}