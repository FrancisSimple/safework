import Link from 'next/link';
import { Engagement } from '../../data/engagementsMock';
import { 
  Calendar, 
  Briefcase, 
  Award, 
  GraduationCap, 
  ExternalLink, 
  Link as LinkIcon, 
  FolderKanban, 
  Zap,
  Building2
} from 'lucide-react';

// Helper to pick the right icon for the "Type" (Startup, Education, etc.)
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Startup': return <Zap size={12} className="text-amber-500" />;
    case 'Education': return <GraduationCap size={12} className="text-blue-500" />;
    case 'Leadership': return <Award size={12} className="text-purple-500" />;
    case 'Work': return <Building2 size={12} className="text-slate-500" />;
    default: return <Briefcase size={12} className="text-slate-400" />;
  }
};

export function EngagementCard({ data }: { data: Engagement }) {
  
  // 1. Determine Visual Identity based on Category (Project vs Engagement)
  // We default to 'Engagement' if the field is missing to prevent errors
  const category = data.category || 'Engagement'; 
  const isProject = category === 'Project';
  
  const CategoryIcon = isProject ? FolderKanban : Briefcase;
  
  // Color Themes
  const categoryTheme = isProject 
    ? 'bg-indigo-50 text-indigo-700 border-indigo-100' 
    : 'bg-emerald-50 text-emerald-700 border-emerald-100';

  return (
    <Link href={`/explore/engagements/${data.id}`} className="block h-full">
      <div className="group relative bg-white rounded-2xl md:rounded-3xl border border-slate-100 p-5 md:p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100 transition-all duration-300 h-full flex flex-col">
        
        {/* Visual Timeline Line (Desktop Only - purely decorative) */}
        <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-slate-100 group-hover:bg-blue-200 transition-colors"></div>
        
        <div className="flex flex-col sm:flex-row gap-5 flex-1">
          
          {/* Logo Section */}
          <div className="shrink-0">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-slate-200/50 ${data.colorClass}`}>
              {data.logoInitial}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 flex flex-col">
            
            {/* Header Row: Title & Badges */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                  {data.role}
                </h3>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-wide mt-1">
                  {data.organization}
                </p>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 self-start md:self-center mt-2 md:mt-0">
                 
                 {/* 1. Category Badge (Project vs Engagement) */}
                 <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${categoryTheme}`}>
                    <CategoryIcon size={12} />
                    {category}
                 </span>

                 {/* 2. Status Badge (Active vs Completed) */}
                 <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                    data.status === 'Active' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                 }`}>
                    {data.status}
                 </span>

              </div>
            </div>

            {/* Metadata Row (Date & Type) */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4">
              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                <Calendar size={12} />
                <span className="font-medium">{data.period}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 text-slate-500">
                {getTypeIcon(data.type)}
                <span className="font-medium">{data.type}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
              {data.description}
            </p>

            {/* Images Grid (If available) */}
            {data.images && data.images.length > 0 && (
              <div className={`mb-4 grid gap-2 rounded-xl overflow-hidden border border-slate-100 ${data.images.length > 1 ? 'grid-cols-2 aspect-2/1' : 'grid-cols-1 aspect-video'}`}>
                {data.images.map((imgUrl, index) => (
                  <div key={index} className="relative h-full w-full bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={imgUrl} 
                      alt="visual"
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Footer Links (If available) */}
            {data.links && data.links.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-50 mt-auto">
                 {data.links.map((link, idx) => (
                   <span 
                     key={idx}
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                   >
                     <LinkIcon size={12} />
                     {link.label}
                     <ExternalLink size={10} className="text-slate-400" />
                   </span>
                 ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}