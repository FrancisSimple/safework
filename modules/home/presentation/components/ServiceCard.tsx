import React from 'react';
import { BookOpen, Code2, Video, MessageSquare, LucideIcon } from 'lucide-react';

// 1. Map the string names from your data to actual Icon components
const iconMap: Record<string, LucideIcon> = {
  'code': Code2,
  'book': BookOpen,
  'video': Video,
  'chat': MessageSquare,
};

interface ServiceCardProps {
  title: string;
  subTitle?: string;
  iconName: string;
}

export const ServiceCard = ({ title, subTitle, iconName }: ServiceCardProps) => {
  // Get the correct icon, fallback to Code2 if not found
  const Icon = iconMap[iconName] || Code2;

  return (
    <div className="group relative p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden cursor-pointer">
      
      {/* Decorative gradient blob that appears on hover */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex items-start gap-4">
        {/* The Icon Box */}
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
          <Icon size={24} strokeWidth={2} />
        </div>

        {/* Text Content */}
        <div>
          <h3 className="font-semibold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          {subTitle && (
            <p className="text-sm text-slate-500 mt-1 font-medium">
              {subTitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};