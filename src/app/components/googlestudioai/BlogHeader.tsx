'use_client';


import { Calendar } from 'lucide-react';

export default function BlogHeader(props: { title: string, written?: string, category: string, readTime?: string, showReadingTime?: boolean }) {

    return (
        <header className=" py-16 border-b border-slate-100 mt-20">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <div className="flex items-center justify-center gap-3 text-sm text-slate-500 mb-6 font-medium uppercase tracking-wide">
                    <span className="text-brand-blue">{props.category}</span>
                    {props.showReadingTime !== false && <><span>•</span><span>{props.readTime || '2 min'}</span></>}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                    {props.title}
                </h1>
                {props.written && <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                    <Calendar size={16} /> Posted on {props.written}
                </div>}
            </div>
        </header>
    );
}

