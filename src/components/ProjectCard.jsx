import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import BrowserMockup from './BrowserMockup';

/**
 * Reusable Editorial Project Card
 * Shows project mockup, category, title, problem statement, key highlights, stack, and links.
 */
export default function ProjectCard({ project }) {
  const {
    title,
    category,
    badge,
    description,
    problemStatement,
    stack,
    highlights,
    liveUrl,
    githubUrl
  } = project;

  return (
    <article 
      className="group relative rounded-2xl bg-surface/70 border border-slate-800/80 p-6 lg:p-8 hover:border-slate-700/80 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/20"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Mockup / Visual Area (7 cols on desktop) */}
        <div className="lg:col-span-7 order-1">
          <BrowserMockup project={project} />
        </div>

        {/* Content Area (5 cols on desktop) */}
        <div className="lg:col-span-5 order-2 flex flex-col justify-between space-y-4">
          <div>
            {/* Category & Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono font-medium text-sky-400 bg-sky-950/60 border border-sky-800/50 px-2.5 py-1 rounded-full">
                {category}
              </span>
              {badge && (
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 
              id={`project-title-${project.id}`}
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors"
            >
              {title}
            </h3>

            {/* Problem-focused Description */}
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              {description}
            </p>

            {/* Deeper Problem Statement */}
            {problemStatement && (
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed border-l-2 border-slate-700 pl-3">
                {problemStatement}
              </p>
            )}

            {/* Architectural Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800/70">
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400 block mb-1.5 font-semibold">
                  Engineering Focus
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {highlights.map((highlight, hIdx) => (
                    <span 
                      key={hIdx}
                      className="inline-flex items-center text-xs text-slate-300 bg-slate-900/80 border border-slate-800 px-2 py-0.5 rounded"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5" />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Technology Stack Tags */}
          <div className="pt-2">
            <div className="flex flex-wrap gap-1.5 mb-5">
              {stack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="text-xs font-mono px-2 py-1 rounded bg-slate-900/90 text-slate-300 border border-slate-800/90"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-medium transition-all shadow-md shadow-blue-900/30 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-label={`Open live demo for ${title}`}
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs sm:text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-slate-400"
                  aria-label={`View GitHub repository for ${title}`}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
