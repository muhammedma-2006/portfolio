import React from 'react';
import { projects } from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import { Layers } from 'lucide-react';

export default function Projects() {
  return (
    <section 
      id="projects" 
      className="py-20 lg:py-28 relative border-t border-slate-850"
      aria-label="Selected Projects"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-sky-400 bg-sky-950/50 border border-sky-800/40 px-3 py-1 rounded-full mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Projects
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            Real applications focused on backend architecture, API contracts, secure authentication, and responsive client experiences.
          </p>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-10 sm:space-y-14">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
