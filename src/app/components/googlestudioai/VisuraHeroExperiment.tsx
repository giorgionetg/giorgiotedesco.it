'use client';

import { ArrowDown } from 'lucide-react';
import { MouseEvent, useEffect, useRef } from 'react';
import {
  canonicalVisuraHeroVariant,
  getVisuraHeroVariant,
  trackVisuraExperiment,
} from '@/app/lib/visura-ai-experiment';

type VisuraHeroExperimentProps = {
  fixedVariantId?: string;
};

export default function VisuraHeroExperiment({ fixedVariantId }: VisuraHeroExperimentProps) {
  const variant = fixedVariantId ? getVisuraHeroVariant(fixedVariantId) ?? canonicalVisuraHeroVariant : canonicalVisuraHeroVariant;
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    trackVisuraExperiment('hero_view', variant.id);
  }, [variant.id]);

  const scrollToVisura = (event: MouseEvent<HTMLAnchorElement>) => {
    trackVisuraExperiment('hero_cta_click', variant.id);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

    event.preventDefault();
    const target = document.getElementById('avvia-visura');
    if (!target) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });

    if (reducedMotion) {
      target.focus({ preventScroll: true });
      return;
    }

    window.setTimeout(() => target.focus({ preventScroll: true }), 550);
  };

  return (
    <section className="overflow-x-hidden border-b border-slate-200 bg-white pb-12 pt-28 sm:pb-24 sm:pt-40" data-variant-id={variant.id}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-12">
        <div className="w-full lg:max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-brand-blue">{variant.eyebrow}</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">{variant.headline}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-600">{variant.description}</p>
          <a href="#avvia-visura" onClick={scrollToVisura} className="btn btn-lg mt-8 w-full border-none bg-brand-blue font-bold text-white hover:bg-blue-700 sm:mt-9 sm:w-auto">
            {variant.cta} <ArrowDown size={19} />
          </a>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">{variant.microcopy}</p>
        </div>
      </div>
    </section>
  );
}
