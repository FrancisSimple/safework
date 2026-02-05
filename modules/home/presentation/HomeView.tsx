'use client'; 

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { PROFILE_MOCK, SERVICES_MOCK } from '../data/servicesMock';
import { ServiceCard } from './components/ServiceCard';

export default function HomeView() {
  const [isImageReady, setIsImageReady] = useState(false);

  return (
    // 1. Reduced outer padding (p-3 on mobile)
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-3 md:p-8 font-sans">
      
      {/* 2. Responsive Border Radius (rounded-3xl on mobile) */}
      <div className="max-w-6xl w-full bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row animate-in fade-in zoom-in duration-700">
        
        {/* 3. Reduced Inner Padding (p-6 on mobile) */}
        <div className="flex-1 p-6 md:p-14 flex flex-col justify-center">
          
          <div className="mb-8 md:mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for work
            </div>
            
            {/* 4. Responsive Font Sizes */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {PROFILE_MOCK.welcomeMessage} <span className="text-blue-600">I&apos;m {PROFILE_MOCK.name}.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
              {PROFILE_MOCK.introText}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
            {SERVICES_MOCK.map((service) => (
              <ServiceCard 
                key={service.id} 
                title={service.title} 
                subTitle={service.subTitle}
                iconName={service.iconName}
              />
            ))}
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex gap-4 w-full sm:w-auto">
                <a 
                  href={`https://wa.me/${PROFILE_MOCK.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 font-medium text-sm hover:bg-green-100 transition-colors border border-green-200"
                >
                  <div className="p-1 bg-green-500 rounded-full text-white">
                     <MessageCircle size={14} fill="currentColor" />
                  </div>
                  WhatsApp
                </a>

                <a 
                  href={`mailto:${PROFILE_MOCK.contactEmail}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-700 font-medium text-sm hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <div className="p-1 bg-slate-400 rounded-full text-white">
                     <Mail size={14} />
                  </div>
                  Email Me
                </a>
             </div>

             <Link 
               href="/explore"
               className="group flex items-center gap-2 text-slate-900 font-semibold hover:text-blue-600 transition-colors cursor-pointer"
             >
               Explore my world
               <span className="bg-slate-100 p-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                 <ArrowRight size={16} />
               </span>
             </Link>
          </div>
        </div>

        <div className="md:w-[45%] bg-slate-900 relative min-h-75 md:min-h-auto overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

           <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-center p-6 text-white/80 z-0 transition-opacity duration-500 ${isImageReady ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-32 h-32 rounded-full border-4 border-white/10 mx-auto mb-4 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                    <span className="text-4xl">F</span>
                  </div>
                  <p className="text-sm uppercase tracking-widest opacity-70">Francis K. Sewor</p>
                  <p className="font-bold">Software Engineer</p>
              </div>

              <Image 
                src={PROFILE_MOCK.imageUrl} 
                alt={PROFILE_MOCK.name}
                fill
                className={`object-cover hover:scale-105 transition-all duration-700 z-10 ${isImageReady ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsImageReady(true)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  setIsImageReady(false); 
                }}
              />
           </div>
           <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-900 to-transparent opacity-80 z-20 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}