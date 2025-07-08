export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import ContactContent from './ContactContent';
import Loading from '@/components/Loading';

export default function ContactPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ContactContent />
    </Suspense>
  );
}