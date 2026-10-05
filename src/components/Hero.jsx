import React from 'react';
import { personalData } from '../data/portfolioData';
import { 
  ArrowDown, 
  Mail, 
  Terminal, 
  CheckCircle2 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from './SocialIcons';

export default function Hero() {
  const { name, headline, bio, socialLinks, status } = personalData;

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Ambient background glow */}
      <div className="ambient-glow-top" aria-hidden="true" />

      {/* Subtle technical engineering grid background with radial fade */}
      <div className="hero-technical-grid" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Availability Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{status}</span>
            </div>

            {/* Name & Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                {name}
              </h1>
              <p className="mt-3 text-xl sm:text-2xl font-medium text-slate-300">
                {headline}
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              {bio.short}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, '#projects')}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm sm:text-base transition-all shadow-lg shadow-blue-900/40 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span>View Selected Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-700/80 font-medium text-sm sm:text-base transition-all hover:border-slate-600 focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Social Links Bar */}
            <div className="pt-4 flex items-center space-x-4 border-t border-slate-800/80">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Connect:
              </span>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-850 transition-all focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-slate-700 hover:bg-slate-850 transition-all focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-400 hover:border-slate-700 hover:bg-slate-850 transition-all focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-green-400 hover:border-slate-700 hover:bg-slate-850 transition-all focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="WhatsApp Profile"
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-slate-700 hover:bg-slate-850 transition-all focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label={`Send email to ${socialLinks.email}`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Visual: Engineering Terminal / Backend Controller Preview (5 cols) - hidden on mobile, visible on tablet & desktop */}
          <div className="hidden md:block lg:col-span-5">
            <div className="relative rounded-2xl bg-surface-card border border-slate-800 shadow-2xl p-1">
              {/* Terminal window header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 rounded-t-xl border-b border-slate-800 text-xs font-mono select-none">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-slate-400 text-[11px] flex items-center space-x-1.5">
                  <Terminal className="w-3 h-3 text-blue-400" />
                  <span>api/v1/authRouter.js</span>
                </div>
                <span className="text-[10px] text-emerald-400">Node v22</span>
              </div>

              {/* Terminal code snippet */}
              <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto bg-slate-950/80 rounded-b-xl">
                <div className="text-slate-500">// Modular REST Controller & JWT Middleware</div>
                <div className="mt-1">
                  <span className="text-purple-400">import</span> express <span className="text-purple-400">from</span> <span className="text-emerald-300">'express'</span>;
                </div>
                <div>
                  <span className="text-purple-400">import</span> &#123; verifyToken &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'../middleware/auth.js'</span>;
                </div>
                <div className="mt-2 text-slate-500">// Protected donor endpoint</div>
                <div>
                  router.<span className="text-blue-400">post</span>(
                  <span className="text-emerald-300">'/donors/register'</span>, 
                  verifyToken,
                </div>
                <div className="pl-4">
                  <span className="text-purple-400">async</span> (req, res, next) =&gt; &#123;
                </div>
                <div className="pl-8">
                  <span className="text-purple-400">const</span> &#123; bloodGroup, city &#125; = req.body;
                </div>
                <div className="pl-8">
                  <span className="text-purple-400">const</span> donor = <span className="text-purple-400">await</span> Donor.<span className="text-blue-400">create</span>(&#123;
                </div>
                <div className="pl-12">
                  userId: req.user.id,
                </div>
                <div className="pl-12">
                  bloodGroup,
                </div>
                <div className="pl-12">
                  verified: <span className="text-amber-400">true</span>
                </div>
                <div className="pl-8">&#125;);</div>
                <div className="pl-8">
                  <span className="text-purple-400">return</span> res.<span className="text-blue-400">status</span>(<span className="text-emerald-400">201</span>).<span className="text-blue-400">json</span>(&#123;
                </div>
                <div className="pl-12">
                  success: <span className="text-amber-400">true</span>,
                </div>
                <div className="pl-12">
                  data: donor
                </div>
                <div className="pl-8">&#125;);</div>
                <div className="pl-4">&#125;</div>
                <div>);</div>

                {/* Status indicator bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Ready for production
                  </span>
                  <span className="text-slate-400">REST • JWT • Mongoose</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
