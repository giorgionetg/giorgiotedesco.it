import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="about">
      {/* Abstract Background Shape */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-ice-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* Image Column */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-blue rounded-2xl rotate-6 opacity-20 group-hover:rotate-3 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-brand-orange rounded-2xl -rotate-3 opacity-20 group-hover:-rotate-1 transition-transform duration-500"></div>
              <img
                src="/images/giorgiotedesco-ai-clone.png"
                alt="Giorgio Tedesco"
                className="relative rounded-2xl shadow-xl w-full max-w-md aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
              About Me
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              Architecting the web,<br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-500">
                one system at a time.
              </span>
            </h2>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
              <p>
                Ciao! I'm{" "}
                <strong className="text-slate-900 font-semibold">Giorgio</strong>, a{" "}
                <strong className="text-slate-900 font-semibold">
                  Senior Full-Stack Architect and Tech Lead
                </strong>{" "}
                with over a decade of experience designing and leading complex web platforms
                for enterprises and SMEs.
              </p>

              <p>
                I work across the entire stack:{" "}
                <strong className="text-slate-900 font-semibold">
                  frontend architectures, backend systems, APIs, authentication and
                  authorization
                </strong>
                , and cloud-native infrastructure. My background includes refactoring legacy
                systems, designing scalable REST-based architectures, and making long-term
                technical decisions in multi-stakeholder environments.
              </p>

              <p>
                I bridge business requirements and technical execution, ensuring systems are{" "}
                <strong className="text-slate-900 font-semibold">
                  scalable, secure, and maintainable
                </strong>{" "}
                over time. Currently open to new challenges in the Fintech and Logistics
                sectors, both as a senior individual contributor and technical lead.
              </p>
            </div>


            <div className="mt-8 flex gap-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900">16+</span>
                <span className="text-sm text-slate-500 uppercase tracking-wide">Years Exp.</span>
              </div>
              <div className="w-px bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900">10+</span>
                <span className="text-sm text-slate-500 uppercase tracking-wide">Long-Lived Systems</span>
              </div>
              <div className="w-px bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900">Real World</span>
                <span className="text-sm text-slate-500 uppercase tracking-wide">Constraints</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;