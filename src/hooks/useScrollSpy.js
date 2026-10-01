import { useState, useEffect } from 'react';

/**
 * Custom hook to track active section in viewport for navigation scrollspy
 * @param {string[]} sectionIds - Array of section element IDs (e.g. ['home', 'about', 'projects'])
 * @param {number} offset - Offset in pixels for navbar height
 * @returns {string} activeId - ID of currently active section
 */
export function useScrollSpy(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState(sectionIds[0] || 'home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the section closest to current scroll position
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(id);
            return;
          }
        }
      }

      // Default to first section if scrolled near top
      if (window.scrollY < 200 && sectionIds.length > 0) {
        setActiveId(sectionIds[0]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeId;
}
