import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VisuraAiServiceContent from '@/app/components/googlestudioai/VisuraAiServiceContent';
import { getVisuraHeroVariant } from '@/app/lib/visura-ai-experiment';
import heroExperiment from '@/app/lib/visura-ai-hero-variants.json';

export const dynamicParams = false;

export function generateStaticParams() {
  return heroExperiment.variants.map((variant) => ({ variant: variant.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }): Promise<Metadata> {
  const { variant: variantId } = await params;
  const variant = getVisuraHeroVariant(variantId);
  if (!variant) return {};

  return {
    title: `Anteprima — ${variant.eyebrow} | Giorgio Tedesco`,
    description: variant.description,
    alternates: { canonical: 'https://giorgiotedesco.it/it/servizi/visura-ai/' },
    robots: { index: false, follow: false },
  };
}

export default async function VisuraAiVariantPreviewPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant: variantId } = await params;
  if (!getVisuraHeroVariant(variantId)) notFound();
  return <VisuraAiServiceContent fixedVariantId={variantId} />;
}
