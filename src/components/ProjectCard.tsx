import React, { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(cardRef, { threshold: 0.1 });
  
  return (
    <div 
      ref={cardRef}
      className={`group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <a 
              href={project.link || '#'} 
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full transition hover:bg-white/40"
              aria-label={`Visit ${project.title} project`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
            <a 
              href="#" 
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full transition hover:bg-white/40"
              aria-label={`View ${project.title} on GitHub`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;