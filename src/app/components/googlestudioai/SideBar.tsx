import Link from 'next/link';
import { ArrowUpRight, Bot, PanelsTopLeft, ScanSearch } from 'lucide-react';

const services = [
    {
        title: 'Siti web',
        description: 'Offerta, contenuti, sviluppo e misurazione per PMI e studi professionali.',
        href: '/it/servizi/siti-web/',
        icon: PanelsTopLeft,
        label: 'Progettazione e sviluppo',
    },
    {
        title: 'Visura AI',
        description: 'Un’analisi del sito per capire cosa migliorare e da dove partire.',
        href: '/it/servizi/visura-ai/',
        icon: ScanSearch,
        label: 'Analisi del sito',
    },
    {
        title: 'AI Sitter',
        description: 'Hai iniziato un progetto web con l’AI? Vediamo cosa manca per finirlo.',
        href: '/it/servizi/ai-sitter/',
        icon: Bot,
        label: 'Completamento progetti AI',
    },
];

export default function SideBar() {
    return (
        <aside aria-labelledby="article-services-title" className="w-full min-w-0 space-y-4 lg:sticky lg:top-24">
            <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Lavoriamo insieme</p>
                <h2 id="article-services-title" className="mt-2 text-xl font-bold tracking-tight text-slate-900">I miei servizi</h2>
            </div>

            {services.map(({ title, description, href, icon: Icon, label }) => (
                <Link
                    key={href}
                    href={href}
                    className="group block w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                    <div className="flex items-start justify-between gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                            <Icon size={20} aria-hidden="true" />
                        </span>
                        <ArrowUpRight size={18} className="mt-1 text-slate-400 transition group-hover:text-brand-blue" aria-hidden="true" />
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
                    <h3 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-brand-blue">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </Link>
            ))}
        </aside>
    );
}
