import React, { useState } from 'react';
import { CaseStudy } from '@/app/lib/types';
import { ExternalLink, TrendingUp, Code2, Layers, ArrowLeft, CheckCircle2, Calendar, Globe } from 'lucide-react';

const cases: CaseStudy[] = [
  {
    id: '1',
    client: 'FinTech Corp',
    title: 'Real-time Trading Dashboard',
    description: 'Re-engineered a legacy dashboard into a high-performance React application handling 50k+ websocket updates per second. Implemented a custom virtualized grid to handle massive datasets without UI lag.',
    tags: ['React', 'TypeScript', 'WebSockets', 'D3.js'],
    image: 'https://picsum.photos/seed/fintech/800/600',
    outcome: 'Decreased latency by 300%'
  },
  {
    id: '2',
    client: 'Global Logistics',
    title: 'Supply Chain Management System',
    description: 'Developed a comprehensive internal tool for tracking global shipments, integrating with multiple 3rd party APIs. Created a reusable component library that accelerated future feature development by 40%.',
    tags: ['Next.js', 'GraphQL', 'Tailwind', 'AWS'],
    image: 'https://picsum.photos/seed/logistics/800/600',
    outcome: 'Saved 20hrs/week in manual data entry'
  },
  {
    id: '3',
    client: 'E-Commerce Giant',
    title: 'Headless Checkout Migration',
    description: 'Led the migration from a monolithic Magento backend to a headless architecture using Next.js and Shopify Plus, improving mobile conversion rates significantly.',
    tags: ['Shopify', 'Next.js', 'Redis', 'Vercel'],
    image: 'https://picsum.photos/seed/ecommerce/800/600',
    outcome: '+15% Mobile Conversion Rate'
  }
];

const CaseStudies: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const singleCaseContent = `
    <h3>The Challenge</h3>
    <p>The client's existing solution was suffering from severe performance bottlenecks. Traders needed real-time data updates, but the legacy Angular JS application was freezing under high load (50k+ messages/second). Every millisecond of latency translated to lost revenue.</p>
    
    <h3>The Solution</h3>
    <p>We decided to rebuild the frontend using a modern React stack, focusing entirely on performance.</p>
    <ul>
       <li><strong>Web Workers:</strong> Offloaded data parsing and formatting to a web worker to keep the main thread free for UI updates.</li>
       <li><strong>Virtualization:</strong> Implemented <code>react-window</code> for rendering the order book, allowing millions of rows to exist in memory while only rendering the viewport.</li>
       <li><strong>Throttling:</strong> Applied smart throttling to the WebSocket stream, batching updates to sync with the browser's refresh rate (60fps).</li>
    </ul>

    <h3>Results</h3>
    <p>The new dashboard handles 5x the data volume with zero UI jank. Latency was reduced by 300%, and user satisfaction scores (NPS) went from -20 to +60 within the first month of launch.</p>
  `;

  if (selectedCase) {
    return (
      <div className="bg-white min-h-screen animate-in zoom-in-95 duration-300">

        {/* Navigation */}
        <div className="absolute top-6 left-6 z-30">
          <button
            onClick={() => setSelectedCase(null)}
            className="btn btn-circle bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 hover:border-white/50"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        {/* Hero Header */}
        <div className="relative h-[60vh] min-h-[400px] w-full bg-slate-900 overflow-hidden flex items-end">
          <div className="absolute inset-0 opacity-50">
            <img src={selectedCase.image} alt={selectedCase.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

          <div className="container mx-auto px-6 pb-12 relative z-10 max-w-7xl">
            <div className="badge bg-brand-orange text-white border-none font-bold mb-4">{selectedCase.client}</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl">{selectedCase.title}</h1>
            <div className="flex flex-wrap gap-4 text-slate-300">
              <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm border border-white/10">
                <Globe size={16} /> Web App
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm border border-white/10">
                <Calendar size={16} /> 2023
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-16 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg prose-slate prose-headings:text-slate-900 prose-li:marker:text-brand-orange max-w-none">
                <div dangerouslySetInnerHTML={{ __html: singleCaseContent }} />
              </div>

              {/* Gallery Simulation */}
              <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="bg-slate-100 rounded-xl h-64 w-full"></div>
                <div className="bg-slate-100 rounded-xl h-64 w-full"></div>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-8">

              {/* Impact Card */}
              <div className="card bg-ice-50 border border-ice-100 p-6">
                <div className="flex items-center gap-3 text-brand-blue mb-2">
                  <TrendingUp size={24} />
                  <span className="font-bold uppercase tracking-wider text-sm">Impact</span>
                </div>
                <div className="text-3xl font-bold text-slate-900">{selectedCase.outcome}</div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <Code2 size={20} className="text-slate-400" /> Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.tags.map(tag => (
                    <span key={tag} className="badge badge-lg bg-white border-slate-200 text-slate-700 py-4 px-4">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <CheckCircle2 size={20} className="text-slate-400" /> Deliverables
                </h4>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2"></div> System Architecture</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2"></div> Frontend Development</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2"></div> CI/CD Pipeline Setup</li>
                </ul>
              </div>

              <div className="divider"></div>

              {/* CTA */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl"></div>
                <h3 className="font-bold text-xl mb-2 relative z-10">Like what you see?</h3>
                <p className="text-slate-300 text-sm mb-6 relative z-10">I can bring the same level of engineering rigor to your next project.</p>
                <button className="btn bg-brand-blue hover:bg-blue-600 text-white border-none w-full font-bold relative z-10">
                  Start a Project
                </button>
              </div>

            </aside>
          </div>
        </div>

      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="bg-transparent min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4 block">Portfolio</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Selected Works</h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            A showcase of technical challenges solved through rigorous engineering and user-centric design.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="grid gap-20">
          {cases.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >

              {/* Image Side */}
              <div className="w-full lg:w-1/2 cursor-pointer" onClick={() => setSelectedCase(project)}>
                <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10">
                  <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-colors z-10 duration-500"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Stats */}
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 flex items-center gap-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase">Impact</div>
                        <div className="font-bold text-slate-900">{project.outcome}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="badge bg-brand-blue/10 text-brand-blue border-none font-bold px-3 py-1">{project.client}</div>
                </div>

                <h2
                  onClick={() => setSelectedCase(project)}
                  className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight cursor-pointer hover:text-brand-blue transition-colors"
                >
                  {project.title}
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Layers size={16} /> Tech Stack
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-sm font-medium border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCase(project)}
                  className="btn bg-slate-900 hover:bg-slate-800 text-white border-none shadow-lg shadow-slate-900/20 group"
                >
                  View Case Study <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* CTA Footer for Cases */}
        <div className="mt-32 text-center bg-white/50 backdrop-blur-sm py-16 rounded-3xl border border-ice-100">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Have a project in mind?</h3>
          <p className="text-slate-600 mb-8">I'm currently available for new opportunities and consulting.</p>
          <button className="btn bg-brand-blue hover:bg-blue-600 text-white border-none btn-lg font-bold">
            Discuss Your Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;