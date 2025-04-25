import { useState, useEffect } from 'react';

export const useScrollspy = (sectionIds: string[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      const sections = sectionIds.map(id => {
        const element = document.getElementById(id);
        return {
          id: id,
          offsetTop: element?.offsetTop || 0,
          offsetHeight: element?.offsetHeight || 0
        };
      });
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, offsetTop, offsetHeight } = sections[i];
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(id);
          return;
        }
      }
      
      setActiveSection(sections[0].id);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);
  
  return activeSection;
};