import React, { useState, useEffect } from 'react';
import { navigationLinks, personalData } from '../data/portfolioData';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { Menu, X } from 'lucide-react';

// Static section IDs for scrollspy
const SECTION_IDS = navigationLinks.map(link => link.href.replace('#', ''));

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const activeId = useScrollSpy(SECTION_IDS, 120);

  // Track scroll position for backdrop blur and shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/20' 
          : 'bg-[#080c14]/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center space-x-3 group focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg p-1"
            aria-label="Muhammed M A — Return to Top"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-blue-400 font-mono font-bold text-sm group-hover:border-blue-500/50 group-hover:text-blue-300 transition-colors">
              MA
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base text-white tracking-tight group-hover:text-blue-400 transition-colors">
                {personalData.name}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Primary Navigation">
            {navigationLinks.map((link) => {
              const currentSection = link.href.replace('#', '');
              const isActive = activeId === currentSection;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 ${
                    isActive
                      ? 'text-white bg-slate-800/80'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span 
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-400 rounded-full" 
                      aria-hidden="true" 
                    />
                  )}
                </a>
              );
            })}

            {/* Resume Link - styled identically to normal navbar navigation items */}
            <a
              href={personalData.socialLinks.resume}
              download="Muhammed_M_A_Resume.pdf"
              className="relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 text-slate-300 hover:text-white hover:bg-slate-900/50"
              aria-label="Download Resume"
            >
              Resume
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-850 focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div 
          className="md:hidden border-b border-slate-800 bg-[#0c121e] px-4 pt-3 pb-5 space-y-2 animate-fadeIn"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          {navigationLinks.map((link) => {
            const currentSection = link.href.replace('#', '');
            const isActive = activeId === currentSection;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}

          {/* Mobile Resume Link - styled identically to normal mobile navigation items */}
          <a
            href={personalData.socialLinks.resume}
            download="Muhammed_M_A_Resume.pdf"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-slate-300 hover:bg-slate-800/80 hover:text-white"
            aria-label="Download Resume"
          >
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
