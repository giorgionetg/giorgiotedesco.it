import type { Metadata } from 'next';
import AtprotoLogin from '@/app/components/googlestudioai/AtprotoLogin';
import { pageMetadata } from '@/app/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Sign in with AT Protocol | Giorgio Tedesco',
  description: 'Connect your AT Protocol account to GiorgioTedesco.it.',
  path: '/login/',
});

export default function LoginPage() {
  return <div className="relative isolate min-h-[80vh] overflow-hidden bg-brand-ice pt-32 pb-24 md:pt-40">
    <div className="absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" aria-hidden="true" />
    <div className="container mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
      <AtprotoLogin />
    </div>
  </div>;
}
