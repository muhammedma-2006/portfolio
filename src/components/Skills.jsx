import React from 'react';
import { skillsData } from '../data/portfolioData';
import { Code2, Server, Wrench, CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
  {
    key: 'frontend',
    title: 'Frontend Development',
    icon: Code2,
    accentColor: 'text-sky-400',
    data: skillsData.frontend,
  },
  {
    key: 'backend',
    title: 'Backend Development',
    icon: Server,
    accentColor: 'text-blue-400',
    data: skillsData.backend,
  },
  {
    key: 'tools',
    title: 'Tools & Platforms',
    icon: Wrench,
    accentColor: 'text-teal-400',
    data: skillsData.tools,
  },
];

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="py-20 lg:py-28 relative border-t border-slate-850"
      aria-label="Technical Skills and Tools"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-sky-400 bg-sky-950/50 border border-sky-800/40 px-3 py-1 rounded-full mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills & Core Tooling
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            Technologies and platforms I actively work with to build responsive interfaces, reliable APIs, and maintainable web applications.
          </p>
        </div>

        {/* 3-Column Clean Grouped Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const group = category.data;

            return (
              <div 
                key={category.key}
                className="rounded-2xl bg-surface/60 border border-slate-800/80 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/10"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${category.accentColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white tracking-tight">
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400 block">
                        {group.skills.length} core competencies
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {group.description}
                  </p>

                  {/* Skills Tag Cloud / List */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <div 
                        key={sIdx}
                        className="group/tag inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 text-xs hover:border-slate-600 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80 group-hover/tag:bg-blue-300" />
                        <span className="font-medium text-slate-200">{skill.name}</span>
                        {skill.highlight && (
                          <span className="text-[10px] text-slate-400 font-mono hidden xl:inline">
                            • {skill.highlight}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Indicator footer */}
                <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Practical Experience
                  </span>
                  <span>Tested in Projects</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
