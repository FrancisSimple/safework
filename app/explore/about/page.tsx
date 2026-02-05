import { ABOUT_MOCK } from '../../../modules/explore/data/aboutMock';
import { MapPin, User, Home, GraduationCap, Zap, Compass } from 'lucide-react';

// Helper to render the right icon based on the string name in the data
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Home': return <Home size={20} />;
    case 'GraduationCap': return <GraduationCap size={20} />;
    case 'Zap': return <Zap size={20} />;
    case 'Compass': return <Compass size={20} />;
    default: return <User size={20} />;
  }
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pb-20">
      
      {/* Background Decoration - Warm/Orange tone for "Story" feel */}
      <div className="fixed top-40 left-1/2 -translate-x-1/2 -z-10 w-150 h-150 bg-orange-50/60 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      <div className="max-w-2xl mx-auto animate-in fade-in duration-700">
        
        {/* 1. HERO SUMMARY */}
        <div className="mb-12 text-center md:text-left">
           <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
             {ABOUT_MOCK.greeting}
           </h1>
           <p className="text-xl text-slate-600 leading-relaxed font-light">
             {ABOUT_MOCK.summary}
           </p>
        </div>

        {/* 2. STATUS CARD (The "Now" Snapshot) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-16 flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4 text-center sm:text-left">
              {/* Profile Initials */}
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-2xl">
                F
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Role</p>
                <h3 className="font-bold text-slate-900 text-lg leading-tight">{ABOUT_MOCK.currentRole}</h3>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-slate-500 text-sm mt-1">
                  <MapPin size={12} />
                  {ABOUT_MOCK.location}
                </div>
              </div>
           </div>

           {/* Live Status Pulse */}
           <div className="bg-blue-50 px-4 py-3 rounded-2xl border border-blue-100 flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </div>
              <div className="text-left">
                 <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Status</p>
                 <p className="text-sm font-semibold text-blue-700 whitespace-nowrap">{ABOUT_MOCK.currentStatus}</p>
              </div>
           </div>
        </div>

        {/* 3. STORY CHAPTERS */}
        <div className="space-y-16">
           {ABOUT_MOCK.chapters.map((chapter) => (
             <section key={chapter.id} className="relative pl-8 md:pl-10 border-l-2 border-slate-100/80">
                
                {/* Timeline Icon Marker */}
                <div className="absolute -left-4.5 top-0 bg-white py-1">
                   <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-center shadow-sm">
                      {getIcon(chapter.icon)}
                   </div>
                </div>

                {/* Content */}
                <div className="pt-1">
                   <h2 className="text-2xl font-bold text-slate-900 mb-4">{chapter.title}</h2>
                   
                   {/* Rich Text Rendering */}
                   <div className="text-lg text-slate-600 leading-relaxed space-y-4">
                     {chapter.content.split('\n\n').map((paragraph, idx) => (
                       <p key={idx}>{paragraph}</p>
                     ))}
                   </div>
                </div>

             </section>
           ))}
        </div>

        {/* 4. FOOTER NOTE */}
        <div className="mt-24 pt-10 border-t border-slate-100 text-center">
           <p className="text-slate-400 italic font-serif text-xl">
             &ldquo;The best way to predict the future is to invent it.&rdquo;
           </p>
           <div className="mt-8">
              <a 
                href="mailto:francis@binbyte.com" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all hover:scale-105 shadow-lg shadow-slate-900/20"
              >
                Let&apos;s talk
              </a>
           </div>
        </div>

      </div>
    </div>
  );
}