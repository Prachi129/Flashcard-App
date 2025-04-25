import React, { useRef } from 'react';
import { Skill } from '../types';
import * as LucideIcons from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface SkillBarProps {
  skill: Skill;
  index: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(barRef, { threshold: 0.1 });
  
  // Dynamically get the icon from Lucide
  const IconComponent = (LucideIcons as any)[skill.icon.charAt(0).toUpperCase() + skill.icon.slice(1)] || LucideIcons.Code;
  
  return (
    <div 
      ref={barRef}
      className={`transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <IconComponent className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">{skill.name}</h3>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-300">{skill.level}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: isInView ? `${skill.level}%` : '0%'
          }}
        />
      </div>
    </div>
  );
};

export default SkillBar;