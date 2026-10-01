import React from 'react';
import { experiments } from '../data/portfolioData';
import { Terminal, Database, Code2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import BrowserMockup from './BrowserMockup';

export default function Experiments() {
  if (!experiments || experiments.length === 0) return null;

  return (
    <section 
      id="experiments" 
      className="pb-20 lg:pb-28 relative"
      aria-label="More Experiments and Academic Systems"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sub-heading */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-sky-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              More Experiments & Foundations
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Foundational coursework and database projects exploring relational schemas, server sessions, and classical web architectures.
            </p>
          </div>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 gap-6">
          {experiments.map((item) => (
            <div 
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-surface/50 border border-slate-800/80 hover:border-slate-700 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Visual frame preview */}
                <div className="lg:col-span-6">
                  <BrowserMockup project={item} />
                </div>

                {/* Details */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    {item.highlights && (
                      <div className="mt-3 pt-3 border-t border-slate-800/60">
                        <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400 block mb-1 font-semibold">
                          Core Concepts
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.highlights.map((h, i) => (
                            <span 
                              key={i}
                              className="text-xs text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded"
                            >
                              • {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.stack.map((t, idx) => (
                        <span 
                          key={idx}
                          className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-medium transition-colors"
                        aria-label={`View code for ${item.title}`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
