export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import ProcessContent from './ProcessContent';
import Loading from '@/components/Loading';

export default function ProcessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProcessContent />
    </Suspense>
  );
}