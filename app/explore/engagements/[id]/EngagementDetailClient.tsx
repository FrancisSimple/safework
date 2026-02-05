'use client';

import { useState } from 'react';
import { ENGAGEMENTS_MOCK, Engagement, Activity } from '@/modules/explore/data/engagementsMock';
import { ArrowLeft, Send, Sparkles, Lock, Loader2, CircleDashed, Calendar, TrendingUp, CheckCircle2, Copy, FileText, ChevronDown, Mail } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // 👈 IMPORT AUTH

export default function EngagementDetailClient({ id }: { id: string }) {
  const { isOwner } = useAuth(); // 👈 GET AUTH STATE
  
  const [engagement, setEngagement] = useState<Engagement | null>(() => {
    return ENGAGEMENTS_MOCK.find(e => e.id === id) || null;
  });
  
  const [newNote, setNewNote] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showSourceLogs, setShowSourceLogs] = useState(false);

  if (!engagement) return <div className="p-12 text-center text-slate-400">Engagement not found.</div>;

  const handleAddActivity = () => {
    if (!newNote.trim()) return;
    const activity: Activity = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      note: newNote,
      type: 'Unprocessed'
    };
    setEngagement(prev => prev ? ({ ...prev, activities: [activity, ...prev.activities] }) : null);
    setNewNote('');
  };

  const handleCloseEngagement = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false);
      setIsClosing(false);
      setEngagement(prev => prev ? ({
        ...prev,
        status: 'Completed',
        finalSummary: "GENERATED AI SUMMARY:\n\nThroughout this engagement, Francis demonstrated consistency...",
        cvBullets: ["Spearheaded deployment...", "Mediated conflicts...", "Implemented pipelines..."]
      }) : null);
    }, 3000);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getAccentGradient = () => {
    if (engagement.colorClass.includes('blue')) return 'from-blue-50 to-indigo-50 border-blue-100';
    if (engagement.colorClass.includes('green')) return 'from-emerald-50 to-teal-50 border-emerald-100';
    if (engagement.colorClass.includes('indigo')) return 'from-indigo-50 to-purple-50 border-indigo-100';
    return 'from-slate-50 to-gray-50 border-slate-100';
  };

  const isCompleted = engagement.status === 'Completed';

  return (
    <div className="min-h-screen bg-white pb-20 relative font-sans">
      
      {/* Background Gradient */}
      <div className={`absolute top-0 left-0 right-0 h-80 bg-linear-to-b ${getAccentGradient()} opacity-80 z-0`}></div>

      <div className="max-w-5xl mx-auto relative z-10 px-4 md:px-8 pt-6">
        
        {/* Nav */}
        <Link href="/explore/engagements" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-8 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/50 shadow-sm">
          <ArrowLeft size={16} /> <span>Back to List</span>
        </Link>

        {/* HERO CARD */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/40 rounded-4xl p-6 md:p-10 mb-10">
           <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
              <div className="flex gap-6">
                 <div className={`shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-3xl flex items-center justify-center text-white font-bold text-3xl md:text-4xl shadow-lg ${engagement.colorClass}`}>
                    {engagement.logoInitial}
                 </div>
                 <div className="pt-1">
                    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {engagement.role}
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-3">
                       <span className="text-slate-500 font-medium text-lg">{engagement.organization}</span>
                       <span className="hidden md:inline text-slate-300">•</span>
                       <span className={`self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                          isCompleted ? 'bg-slate-900 text-white border-slate-900' : 'bg-green-100 text-green-700 border-green-200'
                       }`}>
                         {engagement.status}
                       </span>
                    </div>
                 </div>
              </div>

              {/* ACTION BUTTONS (PROTECTED) */}
              {/* Only show "Close" if Owner is logged in AND it's Active */}
              {isOwner && !isCompleted && (
                <button 
                  onClick={() => setIsClosing(true)}
                  className="hidden md:flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-blue-300"
                >
                  <Lock size={16} className="text-slate-400" /> Close & Analyze
                </button>
              )}
              
              {/* If Visitor, show Contact Button */}
              {!isOwner && (
                 <a href="mailto:francis@binbyte.com" className="hidden md:flex items-center gap-2 px-5 py-3 bg-slate-900 text-white text-sm font-bold rounded-2xl shadow-md hover:bg-slate-800 transition-all">
                    <Mail size={16} /> Contact Owner
                 </a>
              )}
           </div>

           {/* Mobile Action Row */}
           <div className="mt-8 pt-6 border-t border-slate-100/60 flex flex-col md:flex-row md:items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    <span>{engagement.period}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-slate-400" />
                    <span>{engagement.activities.length} Logs</span>
                 </div>
              </div>

              {/* Mobile Buttons (Protected) */}
              {isOwner && !isCompleted && (
                <button 
                  onClick={() => setIsClosing(true)}
                  className="md:hidden w-full flex justify-center items-center gap-2 px-4 py-3 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 shadow-sm active:scale-95 transition-all"
                >
                  <Lock size={16} /> Close & Analyze
                </button>
              )}
              
               {!isOwner && (
                 <a href="mailto:francis@binbyte.com" className="md:hidden w-full flex justify-center items-center gap-2 px-4 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-sm active:scale-95 transition-all">
                    <Mail size={16} /> Contact Owner
                 </a>
              )}
           </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
             
             {/* =========================================================
                 SCENARIO A: ACTIVE MODE
             ========================================================= */}
             {!isCompleted && (
               <>
                 {/* INPUT BOX (PROTECTED) */}
                 {/* Only show if Owner. If Visitor, show notice. */}
                 {isOwner ? (
                    <div className={`
                        bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm
                        ${isInputFocused ? 'border-blue-400 ring-4 ring-blue-50 shadow-lg' : 'border-slate-200'}
                    `}>
                        <div className="p-4">
                        <textarea 
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAddActivity();
                                }
                            }}
                            placeholder="Log a win, challenge, or update... (Press Enter)"
                            className="w-full bg-transparent outline-none text-slate-700 text-base md:text-lg min-h-25 resize-none placeholder:text-slate-400"
                        />
                        </div>
                        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-xs text-slate-400 font-medium">Auto-saved to timeline</span>
                        <button 
                            onClick={handleAddActivity}
                            disabled={!newNote.trim()}
                            className="p-2.5 bg-slate-900 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 active:scale-95 transition-all shadow-md"
                        >
                            <Send size={18} />
                        </button>
                        </div>
                    </div>
                 ) : (
                    // VISITOR NOTICE
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 border-dashed text-center">
                        <div className="inline-flex p-3 bg-white rounded-full text-slate-400 mb-3 shadow-sm border border-slate-100">
                            <Lock size={20} />
                        </div>
                        <h3 className="text-slate-900 font-bold text-sm mb-1">Read-Only View</h3>
                        <p className="text-slate-500 text-xs">This timeline is actively managed by the owner. You can view updates but cannot post.</p>
                    </div>
                 )}

                 {/* Active Timeline */}
                 <div className="space-y-6">
                   {engagement.activities.map((activity) => (
                      <div key={activity.id} className="relative pl-12 group animate-in slide-in-from-bottom-2 duration-500">
                         {/* Icon Marker */}
                         <div className={`
                            absolute left-2 top-0 w-8 h-8 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center z-10 
                            ${activity.type === 'Win' ? 'bg-green-100 text-green-600' : activity.type === 'Challenge' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-400'}
                         `}>
                            {activity.type === 'Unprocessed' ? <div className="w-2 h-2 bg-slate-400 rounded-full"></div> : <CheckCircle2 size={14} />}
                         </div>
                         <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-slate-700 leading-relaxed">{activity.note}</p>
                            <div className="flex items-center gap-2 mt-2">
                               <span className="text-xs font-semibold text-slate-400">{activity.date}</span>
                               {activity.type === 'Unprocessed' && (
                                 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-slate-100">
                                    <CircleDashed size={10} className="animate-spin-slow" /> Pending AI
                                 </span>
                               )}
                            </div>
                         </div>
                      </div>
                   ))}
                 </div>
               </>
             )}

             {/* =========================================================
                 SCENARIO B: COMPLETED MODE (Visible to Everyone)
             ========================================================= */}
             {isCompleted && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                   
                   {/* 1. Executive Summary */}
                   <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                           <div className="p-2 bg-blue-50 rounded-xl">
                              <Sparkles size={20} className="text-blue-600" />
                           </div>
                           <h3 className="text-xl font-bold text-slate-900">Executive Summary</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg">
                          {engagement.finalSummary}
                        </p>
                      </div>
                   </div>

                   {/* 2. CV Bullet Points */}
                   <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200">
                      <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                               <FileText size={20} className="text-slate-900" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Resume Bullets</h3>
                         </div>
                         <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider shadow-sm">
                           ATS Optimized
                         </span>
                      </div>

                      <div className="space-y-3">
                         {engagement.cvBullets?.map((bullet, idx) => (
                            <div key={idx} className="group flex gap-4 p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-default">
                               <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                               <p className="text-slate-700 font-medium leading-relaxed grow">
                                 {bullet}
                               </p>
                               <button 
                                 onClick={() => copyToClipboard(bullet, idx)}
                                 className={`shrink-0 h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
                                    copiedIndex === idx ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                                 }`}
                                 title="Copy to clipboard"
                               >
                                 {copiedIndex === idx ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                               </button>
                            </div>
                         ))}
                      </div>
                   </div>

                   {/* 3. Collapsed Source Logs */}
                   <div className="pt-8 border-t border-slate-100">
                      <button 
                        onClick={() => setShowSourceLogs(!showSourceLogs)}
                        className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors mb-6 mx-auto"
                      >
                         <ChevronDown size={16} className={`transition-transform duration-300 ${showSourceLogs ? 'rotate-180' : ''}`} />
                         <span>{showSourceLogs ? 'Hide' : 'Show'} Source Activity Logs ({engagement.activities.length})</span>
                      </button>
                      
                      {showSourceLogs && (
                        <div className="space-y-4 opacity-70 animate-in fade-in slide-in-from-top-2">
                           {engagement.activities.map((activity) => (
                              <div key={activity.id} className="relative pl-6 border-l-2 border-slate-200 ml-2">
                                 <p className="text-slate-600 text-sm">{activity.note}</p>
                                 <p className="text-xs text-slate-400 mt-1">{activity.date}</p>
                              </div>
                           ))}
                        </div>
                      )}
                   </div>

                </div>
             )}
          </div>

          {/* RIGHT COLUMN (Sticky Sidebar) */}
          <div className="lg:col-span-1">
             <div className="sticky top-8 space-y-6">
                
                {/* Active Mode Sidebar */}
                {!isCompleted && (
                   <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100/50 backdrop-blur-sm">
                      <h3 className="text-amber-900 font-bold mb-2 flex items-center gap-2">
                        <Sparkles size={16} /> Pro Tip
                      </h3>
                      <p className="text-amber-800/80 text-sm leading-relaxed">
                        Log specifically with keywords. <br/>
                        Instead of &quot;Fixed bug&quot;, try &quot;Fixed <strong>race condition</strong> in <strong>API</strong>&quot;. The AI picks up on these bold keywords for your CV.
                      </p>
                   </div>
                )}
             </div>
          </div>

        </div>
      </div>

      {/* CLOSE MODAL */}
      {isClosing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full animate-in zoom-in-95 duration-300 border border-white/20">
              {/* Modal Content... Same as previous */}
              {!aiLoading ? (
                <>
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 mx-auto shadow-inner">
                    <Sparkles size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-center text-slate-900 mb-3">Ready to Wrap Up?</h3>
                  <p className="text-slate-500 text-center text-base leading-relaxed mb-8">
                    Our AI will analyze your logs to extract key skills and achievements for your CV.
                  </p>
                  <div className="flex flex-col gap-3">
                    <button onClick={handleCloseEngagement} className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">
                      Generate Summary
                    </button>
                    <button onClick={() => setIsClosing(false)} className="w-full py-4 rounded-xl bg-white text-slate-700 font-bold border border-slate-200 hover:bg-slate-50 transition-colors">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                   <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-6" />
                   <h3 className="text-xl font-bold text-slate-900 mb-2">Analyzing Patterns...</h3>
                   <p className="text-slate-400 text-sm">Reviewing your wins and challenges</p>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
}