import React from 'react';
import { Terminal, Cpu, Heart, Globe, Box, ArrowRight, ShieldCheck, GitBranch, Database, Layers, Cuboid, Workflow } from 'lucide-react';

interface AboutFullProps {
  onBookCall: () => void;
}

const AboutFull: React.FC<AboutFullProps> = ({ onBookCall }) => {
  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-500">
      
      {/* 1. HERO - Strategic Positioning */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            <div className="lg:w-2/3">
               <span className="font-mono text-brand-blue font-bold tracking-widest text-sm uppercase mb-6 block">
                  Solution Architect & Tech Lead
               </span>
               <h1 className="text-5xl md:text-7xl font-serif font-medium text-slate-900 leading-[1.1] mb-8">
                  Designing Systems for the <br/>
                  <span className="italic text-slate-500">Next Decade.</span>
               </h1>
               <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed max-w-2xl">
                  I move beyond just writing code. With 16+ years of experience, I architect scalable, cloud-native solutions and lead technical teams through complex digital transformations, bridging the gap between Web2 stability and Web3 innovation.
               </p>
            </div>

            <div className="lg:w-1/3 relative mt-8 lg:mt-0">
               <div className="relative z-10 bg-slate-100 p-1 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop" 
                    alt="Giorgio Working" 
                    className="rounded-xl grayscale contrast-125"
                  />
               </div>
               <div className="absolute top-10 -right-10 -z-10 text-brand-orange opacity-20">
                  <Workflow size={200} />
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY - The Architect Mindset */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100">
         <div className="container mx-auto px-6 max-w-5xl">
            
            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
               <div>
                  <h3 className="text-3xl font-serif text-slate-900 mb-6">The "Tech Lead" Mindset</h3>
                  <div className="w-16 h-1 bg-brand-orange mb-6"></div>
                  <p className="text-lg text-slate-600 leading-relaxed mb-4">
                     In modern software engineering, the challenge isn't just making it work—it's making it maintainable, secure, and scalable.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                     My focus has shifted from pure implementation to <strong>Strategic Architecture</strong>. Whether it's designing a high-throughput data ingestion engine or securing a distributed microservices network, I prioritize <strong>System Design</strong> patterns that decouple complexity and enable teams to move faster.
                  </p>
               </div>
               <div className="bg-white p-8 md:p-12 rounded-tl-[4rem] rounded-br-[4rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                  <ShieldCheck size={48} className="text-brand-blue mb-6" />
                  <p className="font-serif text-2xl text-slate-800 italic leading-snug">
                     "Giorgio brings clarity to chaos. He translates business requirements into rigorous technical roadmaps, ensuring security and scalability are never afterthoughts."
                  </p>
                  <div className="mt-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
                     — C-Level Stakeholder Feedback
                  </div>
               </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
               <div className="md:w-1/2">
                  <h3 className="text-3xl font-serif text-slate-900 mb-6">Data Archeology</h3>
                  <div className="w-16 h-1 bg-brand-blue mb-6"></div>
                  <p className="text-lg text-slate-600 leading-relaxed">
                     I often find myself spearheading projects that others fear: replacing aging enterprise infrastructures without disrupting operations.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed mt-4">
                     My approach involves performing complex data normalization on massive datasets and migrating inconsistent legacy systems into modern, containerized architectures. I ensure 100% data integrity while transitioning to cloud-native standards.
                  </p>
               </div>
               <div className="md:w-1/2 grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                     <span className="block text-4xl font-bold text-slate-900 mb-2">Architect</span>
                     <span className="text-sm text-slate-500 font-medium uppercase">Role Focus</span>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-sm text-white">
                     <span className="block text-4xl font-bold text-brand-orange mb-2">Cloud</span>
                     <span className="text-sm text-slate-300 font-medium uppercase">Native</span>
                  </div>
                  <div className="col-span-2 bg-brand-blue/5 p-6 rounded-2xl border border-brand-blue/10">
                     <span className="block text-xl font-bold text-brand-blue mb-2">Key Verticals</span>
                     <span className="text-slate-600">Enterprise Data, Fintech Security, Web3 & 3D Web</span>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* 3. TIMELINE - High Level / Outcome Oriented */}
      <section className="py-24 overflow-hidden relative">
         <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-4xl font-serif text-slate-900 mb-16 text-center">Career Progression</h2>
            
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
               
               {/* Item 1: We-Com (Genericized for NDA) */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-hover:bg-brand-blue group-hover:text-white transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                     <Database size={18} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                     <div className="font-bold text-slate-900 mb-1">Senior Software Engineer & Project Lead</div>
                     <div className="text-xs text-brand-blue uppercase tracking-wider mb-1">We-Com • Sep 2024 - Present</div>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Leading the architectural modernization of a mission-critical enterprise platform. Responsible for Containerization (K8s), designing scalable Data Ingestion pipelines, and defining security governance for sensitive environments.
                     </p>
                  </div>
               </div>

               {/* Item 2: Wonderland Engine */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-hover:bg-brand-blue group-hover:text-white transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                     <GitBranch size={18} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                     <div className="font-bold text-slate-900 mb-1">Full Stack Engineer</div>
                     <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Wonderland Engine • Jun 2022 - Aug 2024</div>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Focused on modern frontend scalability. Led the migration to strict TypeScript, optimized NoSQL data structures, and streamlined CI/CD pipelines using Docker and GitLab for a high-traffic marketplace.
                     </p>
                  </div>
               </div>

               {/* Item 3: Elettronica */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-hover:bg-brand-blue group-hover:text-white transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                     <ShieldCheck size={18} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                     <div className="font-bold text-slate-900 mb-1">Security Analyst & Web Developer</div>
                     <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">ELETTRONICA S.p.A. • 2014 - 2022</div>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Responsible for the integrity and development of secure internal corporate platforms. Managed full-stack ecosystems with a heavy focus on data protection and system reliability in a defense-sector environment.
                     </p>
                  </div>
               </div>

               {/* Item 4: Early Days */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-hover:bg-brand-blue group-hover:text-white transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                     <Cuboid size={18} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                     <div className="font-bold text-slate-900 mb-1">The Foundations (3D & Interactive)</div>
                     <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">2007 - 2014</div>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Started with a passion for 3D Graphics (Blender/Unity) and Game Development, which laid the groundwork for my deep understanding of rendering pipelines and interactive user interfaces.
                     </p>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* 4. TECH LANDSCAPE - Modern & Future Oriented */}
      <section className="py-24 bg-slate-900 text-slate-300">
         <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-serif text-white mb-16">Technical Arsenal</h2>
            
            <div className="grid md:grid-cols-3 gap-12">
               <div>
                  <h4 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                     <Terminal size={16}/> Modern Core
                  </h4>
                  <ul className="space-y-4">
                     <li className="flex justify-between border-b border-slate-800 pb-2">
                        <span>React.js / Next.js</span>
                        <span className="text-slate-500">Expert</span>
                     </li>
                     <li className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Node.js / Bun</span>
                        <span className="text-slate-500">Advanced</span>
                     </li>
                     <li className="flex justify-between border-b border-slate-800 pb-2">
                        <span>TypeScript (Strict)</span>
                        <span className="text-slate-500">Expert</span>
                     </li>
                     <li className="flex justify-between border-b border-slate-800 pb-2">
                        <span>GraphQL / TRPC</span>
                        <span className="text-slate-500">Advanced</span>
                     </li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                     <Layers size={16}/> System Architecture
                  </h4>
                  <ul className="space-y-4">
                     <li className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Docker / Kubernetes</span>
                        <span className="text-slate-500">Advanced</span>
                     </li>
                     <li className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Event-Driven Systems</span>
                        <span className="text-slate-500">Advanced</span>
                     </li>
                     <li className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Cloud Native (AWS)</span>
                        <span className="text-slate-500">Advanced</span>
                     </li>
                     <li className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Security (OAuth, mTLS)</span>
                        <span className="text-slate-500">Specialist</span>
                     </li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                     <Cuboid size={16}/> Future Tech
                  </h4>
                  <div className="flex flex-wrap gap-2">
                     <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">Web3 / Solidity</span>
                     <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">Three.js / R3F</span>
                     <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">Game Dev (Godot)</span>
                     <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">AI Integration</span>
                     <span className="px-3 py-1 bg-slate-800 rounded-full text-sm">Python / ML</span>
                  </div>
                  <p className="mt-6 text-sm text-slate-500 leading-relaxed">
                     Actively researching and building in the Web3 and AI space, bringing cutting-edge innovation to enterprise stability.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 5. PERSONAL / OFFLINE */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="inline-block p-4 rounded-full bg-ice-50 text-brand-blue mb-6">
               <Heart size={24} />
            </div>
            <h2 className="text-3xl font-serif text-slate-900 mb-6">Beyond the Code</h2>
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-8">
               My roots in <strong>3D Graphics</strong> and <strong>Game Development</strong> keep me creative. When I'm not architecting systems, I'm analyzing crypto markets or experimenting with new game engines.
            </p>
            <p className="text-slate-500 italic mb-12">
               "Technically rigorous, creatively driven."
            </p>
            
            <button 
               onClick={onBookCall}
               className="btn bg-brand-blue hover:bg-blue-700 text-white btn-lg font-bold shadow-xl shadow-blue-500/20 border-none"
            >
               Let's Architect Your Next Big Thing <ArrowRight className="ml-2" />
            </button>
         </div>
      </section>

    </div>
  );
};

export default AboutFull;