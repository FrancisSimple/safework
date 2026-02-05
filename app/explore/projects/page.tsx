'use client';

import { useState } from 'react';
import { PROJECTS_MOCK } from '../../../modules/explore/data/projectsMock';
import { ProjectCard } from '../../../modules/explore/presentation/components/ProjectCard';
import { Sparkles, Archive } from 'lucide-react';

export default function ProjectsPage() {
  // State to track which tab is selected
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  // Filter the data based on the state
  const displayedProjects = PROJECTS_MOCK.filter(p => 
    activeTab === 'active' ? p.status === 'In Progress' : p.status === 'Completed'
  );

  return (
    <div className="relative min-h-screen pb-20">
       
       {/* Background Decoration - Changes color based on tab! */}
       <div 
         className={`fixed top-20 right-1/4 -z-10 w-125 h-125 rounded-full blur-3xl opacity-50 pointer-events-none transition-colors duration-700 ${
           activeTab === 'active' ? 'bg-emerald-100/40' : 'bg-slate-200/40'
         }`}
       ></div>

       <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
         
         {/* 1. Header Area */}
         <div className="mb-8 pt-4 border-b border-slate-100/60 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Projects</h1>
              <p className="text-slate-500 mt-2 text-lg font-light">
                {activeTab === 'active' ? 'Things I am building right now.' : 'Things I have finished.'}
              </p>
            </div>

            {/* 2. THE TAB SWITCHER */}
            <div className="bg-slate-100 p-1 rounded-xl inline-flex self-start md:self-auto">
              
              {/* Active Tab Button */}
              <button
                onClick={() => setActiveTab('active')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'active' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Sparkles size={16} className={activeTab === 'active' ? 'text-green-500' : 'opacity-50'} />
                In Progress
              </button>

              {/* Completed Tab Button */}
              <button
                onClick={() => setActiveTab('completed')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'completed' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Archive size={16} className={activeTab === 'completed' ? 'text-blue-500' : 'opacity-50'} />
                Completed
              </button>

            </div>
         </div>

         {/* 3. The Project Grid (Dynamic) */}
         <div 
           key={activeTab} // This forces a subtle re-render animation when switching
           className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-2 fade-in duration-300"
         >
            {displayedProjects.length > 0 ? (
              displayedProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              // Empty State Handler (Just in case)
              <div className="col-span-full py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400">No projects found in this category yet.</p>
              </div>
            )}
         </div>

       </div>
    </div>
  );
}