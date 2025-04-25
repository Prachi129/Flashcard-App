import React from 'react';
import * as LucideIcons from 'lucide-react';
import { socialLinks } from '../data/navigation';

interface SocialIconsProps {
  className?: string;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ className = '' }) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {socialLinks.map((social) => {
        const IconComponent = (LucideIcons as any)[social.icon.charAt(0).toUpperCase() + social.icon.slice(1)];
        
        return (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            aria-label={social.platform}
          >
            <IconComponent className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;