'use client';

import { useState } from 'react';
import { ENGAGEMENTS_MOCK, Engagement, Activity } from '@/modules/explore/data/engagementsMock';
import { 
  ArrowLeft, Send, Sparkles, Lock, Loader2, CircleDashed, Calendar, 
  TrendingUp, CheckCircle2, Copy, FileText, ChevronDown, Mail, 
  Pencil, X, Save, Trash2, Image as ImageIcon, FolderKanban, Briefcase 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function EngagementDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { isOwner } = useAuth();
  
  // 1. DATA STATE
  const [engagement, setEngagement] = useState<Engagement | null>(() => {
    return ENGAGEMENTS_MOCK.find(e => e.id === id) || null;
  });
  
  // 2. ACTIVITY STATE
  const [newNote, setNewNote] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showSourceLogs, setShowSourceLogs] = useState(false);

  // 3. EDIT STATE
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Engagement>>({});

  if (!engagement) return <div className="p-12 text-center text-slate-400">Engagement not found.</div>;

  // --- HELPER VARS ---
  const isCompleted = engagement.status === 'Completed';
  const hasImage = engagement.images && engagement.images.length > 0;
  const coverImage = hasImage ? engagement.images![0] : null;
  const isProject = engagement.category === 'Project';
  const TypeIcon = isProject ? FolderKanban : Briefcase;

  // --- ACTIONS: ACTIVITY LOGGING ---
  const handleAddActivity = () => {
    if (!newNote.trim()) return;
    
    // 👇 FIX: Added 'status' property here
    const activity: Activity = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      note: newNote,
      type: 'Unprocessed',
      status: 'pending' // <--- THIS WAS MISSING
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

  // --- ACTIONS: EDITING ---
  const openEditModal = () => {
    setFormData({
      role: engagement.role,
      organization: engagement.organization,
      description: engagement.description,
      period: engagement.period,
      status: engagement.status,
      category: engagement.category,
      images: engagement.images
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setEngagement(prev => prev ? { ...prev, ...formData } as Engagement : null);
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 600);
  };

  const handleDelete = () => {
    if (confirm('Are you sure? This cannot be undone.')) {
      router.push('/explore/engagements');
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 relative font-sans">
      
      {/* 1. TOP NAVIGATION */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4">
         <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Link href="/explore/engagements" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
               <ArrowLeft size={18} /> Back
            </Link>
            
            {/* EDIT BUTTON (Owner Only) */}
            {isOwner && (
               <button 
                 onClick={openEditModal}
                 className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/20"
               >
                  <Pencil size={14} /> Edit Venture
               </button>
            )}
         </div>
      </div>

      {/* 2. HERO IMAGE SECTION */}
      <div className="w-full h-64 md:h-96 relative overflow-hidden bg-slate-100 group">
         {hasImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
               src={coverImage!} 
               alt={engagement.role} 
               className="w-full h-full object-cover"
            />
         ) : (
            <div className={`w-full h-full ${engagement.colorClass} opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent`}></div>
         )}
         
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
         
         {/* Floating Logo */}
         <div className="absolute -bottom-8 left-6 md:left-auto md:right-10 lg:right-20">
             <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-white font-bold text-4xl shadow-2xl ring-8 ring-white ${engagement.colorClass}`}>
                {engagement.logoInitial}
             </div>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-12">
        
        {/* 3. HEADER INFO */}
        <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between mb-10">
           <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4">
                  <TypeIcon size={12} /> {engagement.category || 'Engagement'}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                {engagement.role}
              </h1>
              <p className="text-xl text-slate-500 font-medium">
                {engagement.organization}
              </p>
           </div>

           {/* Close / Contact Actions */}
           <div className="flex gap-3 mt-2 md:mt-0">
              {isOwner && !isCompleted && (
                  <button 
                    onClick={() => setIsClosing(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-2xl border border-slate-200 shadow-sm transition-all"
                  >
                    <Lock size={16} className="text-slate-400" /> Close & Analyze
                  </button>
              )}
              {!isOwner && (
                  <a href="mailto:francis@binbyte.com" className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white text-sm font-bold rounded-2xl shadow-md hover:bg-slate-800 transition-all">
                    <Mail size={16} /> Contact Owner
                  </a>
              )}
           </div>
        </div>

        {/* 4. MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: TIMELINE & INPUT */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* A. ACTIVE INPUT */}
             {!isCompleted && (
               <>
                 {isOwner ? (
                    <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${isInputFocused ? 'border-blue-400 ring-4 ring-blue-50 shadow-lg' : 'border-slate-200'}`}>
                        <div className="p-4">
                        <textarea 
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                            onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddActivity(); } }}
                            placeholder="Log a win, challenge, or update... (Press Enter)"
                            className="w-full bg-transparent outline-none text-slate-700 text-base min-h-[100px] resize-none placeholder:text-slate-400"
                        />
                        </div>
                        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-xs text-slate-400 font-medium">Auto-saved to timeline</span>
                        <button onClick={handleAddActivity} disabled={!newNote.trim()} className="p-2.5 bg-slate-900 text-white rounded-xl disabled:opacity-50 hover:bg-blue-600 transition-all shadow-md">
                            <Send size={18} />
                        </button>
                        </div>
                    </div>
                 ) : (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 border-dashed text-center">
                        <div className="inline-flex p-3 bg-white rounded-full text-slate-400 mb-3 shadow-sm border border-slate-100"><Lock size={20} /></div>
                        <h3 className="text-slate-900 font-bold text-sm mb-1">Read-Only View</h3>
                        <p className="text-slate-500 text-xs">This timeline is actively managed by the owner.</p>
                    </div>
                 )}

                 {/* Timeline Logs */}
                 <div className="space-y-6">
                   {engagement.activities.map((activity) => (
                      <div key={activity.id} className="relative pl-12 group animate-in slide-in-from-bottom-2 duration-500">
                          <div className={`absolute left-2 top-0 w-8 h-8 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center z-10 ${activity.type === 'Win' ? 'bg-green-100 text-green-600' : activity.type === 'Challenge' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-400'}`}>
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

             {/* B. COMPLETED SUMMARY */}
             {isCompleted && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                   {/* Executive Summary */}
                   <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                           <div className="p-2 bg-blue-50 rounded-xl"><Sparkles size={20} className="text-blue-600" /></div>
                           <h3 className="text-xl font-bold text-slate-900">Executive Summary</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg">{engagement.finalSummary}</p>
                      </div>
                   </div>

                   {/* Bullets */}
                   <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200">
                      <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm"><FileText size={20} className="text-slate-900" /></div>
                            <h3 className="text-xl font-bold text-slate-900">Resume Bullets</h3>
                         </div>
                         <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider shadow-sm">ATS Optimized</span>
                      </div>
                      <div className="space-y-3">
                         {engagement.cvBullets?.map((bullet, idx) => (
                            <div key={idx} className="group flex gap-4 p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-default">
                               <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                               <p className="text-slate-700 font-medium leading-relaxed grow">{bullet}</p>
                               <button onClick={() => copyToClipboard(bullet, idx)} className={`shrink-0 h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-200 ${copiedIndex === idx ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                                  {copiedIndex === idx ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                               </button>
                            </div>
                         ))}
                      </div>
                   </div>

                   {/* Source Logs Toggle */}
                   <div className="pt-8 border-t border-slate-100">
                      <button onClick={() => setShowSourceLogs(!showSourceLogs)} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors mb-6 mx-auto">
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

          {/* RIGHT: SIDEBAR INFO */}
          <div className="lg:col-span-1 space-y-6">
             {/* Stats Card */}
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Meta Data</h4>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-slate-400" />
                      <div>
                         <p className="text-xs text-slate-400 font-bold uppercase">Timeline</p>
                         <p className="text-sm font-semibold text-slate-700">{engagement.period}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <TrendingUp size={18} className="text-slate-400" />
                      <div>
                         <p className="text-xs text-slate-400 font-bold uppercase">Status</p>
                         <p className={`text-sm font-semibold ${engagement.status === 'Active' ? 'text-green-600' : 'text-slate-700'}`}>{engagement.status}</p>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Pro Tip (Only Active) */}
             {!isCompleted && (
                <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100/50">
                   <h3 className="text-amber-900 font-bold mb-2 flex items-center gap-2"><Sparkles size={16} /> Pro Tip</h3>
                   <p className="text-amber-800/80 text-sm leading-relaxed">Log specifically with keywords. <br/> Instead of &quot;Fixed bug&quot;, try &quot;Fixed <strong>race condition</strong>&quot;.</p>
                </div>
             )}
          </div>

        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. CLOSE MODAL */}
      {isClosing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full animate-in zoom-in-95 duration-300 border border-white/20">
              {!aiLoading ? (
                <>
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 mx-auto shadow-inner"><Sparkles size={32} /></div>
                  <h3 className="text-2xl font-bold text-center text-slate-900 mb-3">Ready to Wrap Up?</h3>
                  <p className="text-slate-500 text-center text-base leading-relaxed mb-8">Our AI will analyze your logs to extract key skills and achievements.</p>
                  <div className="flex flex-col gap-3">
                    <button onClick={handleCloseEngagement} className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">Generate Summary</button>
                    <button onClick={() => setIsClosing(false)} className="w-full py-4 rounded-xl bg-white text-slate-700 font-bold border border-slate-200 hover:bg-slate-50 transition-colors">Cancel</button>
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

      {/* 2. EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h3 className="font-bold text-slate-900">Edit Venture</h3>
                 <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar space-y-5">
                 <div className="space-y-4">
                    <div>
                       <label className="text-xs font-bold text-slate-700 mb-1 block">Role / Title</label>
                       <input type="text" value={formData.role || ''} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                    </div>
                    <div>
                       <label className="text-xs font-bold text-slate-700 mb-1 block">Organization</label>
                       <input type="text" value={formData.organization || ''} onChange={(e) => setFormData({...formData, organization: e.target.value})} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                    </div>
                    <div>
                       <label className="text-xs font-bold text-slate-700 mb-1 block">Description</label>
                       <textarea value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none h-32 resize-none" />
                    </div>
                    <div>
                       <label className="text-xs font-bold text-slate-700 mb-1 block flex items-center gap-2"><ImageIcon size={14} /> Cover Image URL</label>
                       <input type="text" value={formData.images?.[0] || ''} onChange={(e) => setFormData({...formData, images: [e.target.value]})} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" placeholder="https://..." />
                    </div>
                 </div>
                 <div className="flex gap-3 pt-2">
                    <button onClick={handleDelete} className="px-4 py-3 bg-red-50 text-red-500 font-bold rounded-xl hover:bg-red-100 transition-colors"><Trash2 size={20} /></button>
                    <button onClick={handleUpdate} disabled={isSubmitting} className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2">
                       {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Update
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}