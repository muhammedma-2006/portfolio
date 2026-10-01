import React from 'react';
import { personalData, focusAreas } from '../data/portfolioData';
import { User, Server, ShieldCheck, Database, Layout, ArrowUpRight, Terminal } from 'lucide-react';

export default function About() {
  const iconMap = {
    Server: Server,
    ShieldCheck: ShieldCheck,
    Database: Database,
    Layout: Layout
  };

  return (
    <section 
      id="about" 
      className="py-20 lg:py-28 relative border-t border-slate-850"
      aria-label="About Muhammed M A"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-sky-400 bg-sky-950/50 border border-sky-800/40 px-3 py-1 rounded-full mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Background & Approach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineering with Purpose
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Human Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p className="text-white font-medium text-lg sm:text-xl">
              I am an Information Technology student in India specializing in full-stack web development with practical engineering foundations.
            </p>

            <p className="text-slate-300">
              Rather than viewing development merely through surface-level templates, I focus on how the whole system connects: architecting maintainable backend servers, creating clean REST API endpoints, designing resilient database schemas, and securing user workflows with token authentication and password hashing.
            </p>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800/90 text-sm sm:text-base text-slate-300 border-l-4 border-l-blue-500">
              <span className="font-semibold text-white block mb-1">
                Learning by Building & Debugging
              </span>
              I learn best through building, debugging, and improving real products. When unexpected behavior happens, I dig into request lifecycles, database query plans, and error payloads to fix the root cause rather than patching symptoms.
            </div>

            

            {/* Core Stats / Quick Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {personalData.stats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-surface/80 border border-slate-800 text-center"
                >
                  <span className="text-xs text-slate-400 uppercase font-mono block">
                    {stat.label}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white mt-1 block">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Focus Areas (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-1 rounded-xl bg-gradient-to-b from-blue-500/20 to-transparent">
              <div className="p-6 rounded-lg bg-surface border border-slate-850">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-4 pb-3 border-b border-slate-800">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span>CORE INTERESTS & PRACTICES</span>
                </div>

                <div className="space-y-4">
                  {focusAreas.map((area, idx) => {
                    const IconComponent = iconMap[area.icon] || Server;
                    return (
                      <div 
                        key={idx}
                        className="group p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/30 transition-colors"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 shrink-0 mt-0.5 group-hover:bg-blue-500/20 transition-colors">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                              {area.title}
                            </h4>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              {area.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
