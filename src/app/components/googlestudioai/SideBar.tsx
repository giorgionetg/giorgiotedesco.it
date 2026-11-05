import { ArrowUpRight, Bot, PanelsTopLeft, ScanSearch } from 'lucide-react';
import TrackedServiceLink from './TrackedServiceLink';
import type { ServiceId } from '@/app/lib/types';

const services = [
    {
        id: 'websites',
        title: { en: 'Websites', it: 'Siti web' },
        description: {
            en: 'Offer, content, development and measurement for small businesses and professional practices.',
            it: 'Offerta, contenuti, sviluppo e misurazione per PMI e studi professionali.',
        },
        href: '/it/servizi/siti-web/',
        icon: PanelsTopLeft,
        label: { en: 'Design and development', it: 'Progettazione e sviluppo' },
    },
    {
        id: 'visura-ai',
        title: { en: 'Visura AI', it: 'Visura AI' },
        description: {
            en: 'A website review to understand what to improve and where to start.',
            it: 'Un’analisi del sito per capire cosa migliorare e da dove partire.',
        },
        href: '/it/servizi/visura-ai/',
        icon: ScanSearch,
        label: { en: 'Website analysis', it: 'Analisi del sito' },
    },
    {
        id: 'ai-sitter',
        title: { en: 'AI Sitter', it: 'AI Sitter' },
        description: {
            en: 'Started a web project with AI? Let’s find out what it needs to get finished.',
            it: 'Hai iniziato un progetto web con l’AI? Vediamo cosa manca per finirlo.',
        },
        href: '/it/servizi/ai-sitter/',
        icon: Bot,
        label: { en: 'Finishing AI projects', it: 'Completamento progetti AI' },
    },
 ] as const;

export default function SideBar({ locale, article, recommendedServices }: { locale: 'en' | 'it'; article: string; recommendedServices?: ServiceId[] }) {
    if (recommendedServices?.length === 0) return null;

    const selectedServices = recommendedServices?.length
        ? [...new Set(recommendedServices)].map((id) => services.find((service) => service.id === id)).filter((service) => service !== undefined)
        : [];
    const displayedServices = selectedServices.length ? selectedServices : services;
    const selection = selectedServices.length ? 'article' : 'default';

    return (
        <aside aria-labelledby="article-services-title" className="w-full min-w-0 space-y-4 lg:sticky lg:top-24">
            <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">{locale === 'en' ? 'Work with me' : 'Lavoriamo insieme'}</p>
                <h2 id="article-services-title" className="mt-2 text-xl font-bold tracking-tight text-slate-900">{locale === 'en' ? 'My services' : 'I miei servizi'}</h2>
            </div>

            {displayedServices.map(({ id, title, description, href, icon: Icon, label }) => (
                <TrackedServiceLink
                    key={href}
                    href={href}
                    service={id}
                    article={article}
                    locale={locale}
                    selection={selection}
                >
                    <div className="flex items-start justify-between gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                            <Icon size={20} aria-hidden="true" />
                        </span>
                        <ArrowUpRight size={18} className="mt-1 text-slate-400 transition group-hover:text-brand-blue" aria-hidden="true" />
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{label[locale]}</p>
                    <h3 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-brand-blue">{title[locale]}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{description[locale]}</p>
                </TrackedServiceLink>
            ))}
        </aside>
    );
}
