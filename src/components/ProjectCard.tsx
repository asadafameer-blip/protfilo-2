/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from '../types';

interface ProjectCardProps {
  key?: string;
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  // Alternate glows between deep gold and bright champagne
  const isEven = index % 2 === 0;
  const hoverClass = isEven ? 'glass-hover-cyan' : 'glass-hover-pink';
  const neonTextClass = isEven ? 'text-[#D4AF37]' : 'text-[#F5E56B]';
  const borderClass = isEven ? 'hover:border-[#D4AF37]/40' : 'hover:border-[#F5E56B]/40';

  return (
    <article
      id={`project-card-${project.id}`}
      className={`glass rounded-xl overflow-hidden flex flex-col h-full border border-white/5 group ${hoverClass} ${borderClass} interactive-card max-w-sm mx-auto w-full`}
    >
      {/* Visual Frame - Smaller Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0d0d]">
        <img
          src={project.screenshot}
          alt={`${project.title} Interface`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Shimmer gradient filter layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent opacity-80" />
        
        {/* Animated slide indicator badge - Smaller */}
        <div className="absolute top-2 right-2 shrink-0">
          <span className="text-[8px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-black/70 border border-white/10 text-gray-400">
            PRJ-{String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Narrative Section - Compact */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className={`font-display font-bold text-sm sm:text-base text-white mb-1 tracking-tight transition-colors group-hover:${neonTextClass} line-clamp-1`}>
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed mb-3 flex-1 font-light line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags list - Smaller */}
        <div className="flex flex-wrap gap-1 mb-3" aria-label="Project technologies">
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[8px] sm:text-[9px] font-mono tracking-wide px-1.5 py-0.5 rounded tech-tag"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[8px] sm:text-[9px] font-mono tracking-wide px-1.5 py-0.5 rounded tech-tag text-gray-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Interactive CTA Controls - Smaller Button */}
        <div className="mt-auto">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg border transition-all text-[10px] sm:text-xs font-semibold w-full ${
              isEven 
                ? 'border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/5 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]' 
                : 'border-[#F5E56B]/30 text-[#F5E56B] bg-[#F5E56B]/5 hover:bg-[#F5E56B] hover:text-black hover:border-[#F5E56B]'
            }`}
            title={`Launch ${project.title} live app`}
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[9px] sm:text-xs" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </article>
  );
}