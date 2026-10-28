import type { Metadata } from 'next';
import AtprotoLogin from '@/app/components/googlestudioai/AtprotoLogin';

export const metadata: Metadata = { title: 'Account | Giorgio Tedesco', robots: { index: false, follow: false } };

export default function AccountPage() {
  return <div className="relative isolate min-h-[80vh] overflow-hidden bg-brand-ice pt-32 pb-24 md:pt-40">
    <div className="absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" aria-hidden="true" />
    <div className="container mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:gap-20"><AtprotoLogin page="account" /></div>
  </div>;
}
