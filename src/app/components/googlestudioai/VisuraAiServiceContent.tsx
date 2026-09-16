import { ScanSearch } from 'lucide-react';
import VisuraHeroExperiment from './VisuraHeroExperiment';
import VisuraKanban from './VisuraKanban';
import { canonicalVisuraHeroVariant, getVisuraHeroVariant } from '@/app/lib/visura-ai-experiment';

type VisuraAiServiceContentProps = {
  fixedVariantId?: string;
};

export default function VisuraAiServiceContent({ fixedVariantId }: VisuraAiServiceContentProps) {
  const variantId = fixedVariantId && getVisuraHeroVariant(fixedVariantId)
    ? fixedVariantId
    : canonicalVisuraHeroVariant.id;

  return (
    <>
      <VisuraHeroExperiment fixedVariantId={variantId} />
      <VisuraKanban variantId={variantId} />
      <section className="overflow-x-hidden bg-white py-12 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ScanSearch size={28} className="text-brand-blue" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Una pipeline per fare ordine, non per decidere al posto tuo.</h2>
          </div>
          <div className="max-w-2xl text-lg leading-relaxed text-slate-600">
            <p>Ho trasformato una parte della mia metodologia di analisi in una pipeline agentica: raccoglie segnali pubblici, li mette in relazione e prepara una prima base di lavoro.</p>
            <p className="mt-5">La struttura si adatta a mercati, imprese e verticali diversi. Il giudizio sul contesto, sulle priorità reali e sul progetto resta umano.</p>
          </div>
        </div>
      </section>
    </>
  );
}
