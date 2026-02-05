'use client';

import { Project } from '../../data/projectsMock';
import { ExternalLink, Link as LinkIcon, Code2, Layers } from 'lucide-react';

export function ProjectCard({ project }: { project: Project }) {
  const isCompleted = project.status === 'Completed';

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100 transition-all duration-300">
      
      {/* 1. Image Header (If images exist) */}
      {project.images && project.images.length > 0 && (
        <div className={`w-full bg-slate-100 relative ${project.images.length > 1 ? 'grid grid-cols-2 h-48' : 'h-48'}`}>
          {project.images.slice(0, 2).map((img, idx) => (
            <div key={idx} className="relative h-full w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img} 
                alt={`${project.title} preview`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay for multiple images */}
              {project.images!.length > 1 && idx === 0 && (
                 <div className="absolute right-0 top-0 bottom-0 w-px bg-white/20 z-10"></div>
              )}
            </div>
          ))}
          
          {/* Status Badge Overlay */}
          <div className="absolute top-4 left-4 z-20">
             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${
                isCompleted 
                ? 'bg-slate-900/80 text-white' 
                : 'bg-green-500/90 text-white animate-pulse'
             }`}>
               {project.status}
             </span>
          </div>
        </div>
      )}

      {/* 2. Content Body */}
      <div className="p-6">
        
        {/* If no image, show status here */}
        {(!project.images || project.images.length === 0) && (
           <div className="mb-4">
             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                isCompleted 
                ? 'bg-slate-100 text-slate-600' 
                : 'bg-green-50 text-green-700 border border-green-200'
             }`}>
               {project.status}
             </span>
           </div>
        )}

        <div className="flex justify-between items-start mb-2">
           <div>
              <p className="text-xs font-semibold text-blue-600 mb-1 flex items-center gap-1">
                <Layers size={12} /> {project.category}
              </p>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
           </div>
           <span className="text-xs text-slate-400 font-medium whitespace-nowrap mt-1">{project.date}</span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
           <div className="flex flex-wrap gap-2">
             {project.techStack.map(tech => (
               <span key={tech} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 text-xs font-medium flex items-center gap-1.5">
                  <Code2 size={10} className="opacity-50" />
                  {tech}
               </span>
             ))}
           </div>
        </div>

        {/* Links Footer */}
        {project.links && project.links.length > 0 && (
          <div className="pt-4 border-t border-slate-50 flex gap-3">
             {project.links.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <LinkIcon size={12} />
                  {link.label}
                  <ExternalLink size={10} className="opacity-50" />
                </a>
             ))}
          </div>
        )}

      </div>
    </div>
  );
}