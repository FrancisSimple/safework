'use client';

import { useState } from 'react';
import { ENGAGEMENTS_MOCK, Engagement, Activity } from '@/modules/explore/data/engagementsMock';
import { Plus, CheckCircle2, ArrowUpRight, Calendar, X, Briefcase, FolderKanban, Loader2, Trophy, AlertTriangle, ListChecks, Pencil, Trash2, Lock, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function BoardClient() {
  const { isOwner } = useAuth();
  
  // Board Data
  const [engagements, setEngagements] = useState<Engagement[]>(ENGAGEMENTS_MOCK);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // --- MODAL STATES ---
  type ModalState = {
    type: 'create_board' | 'add_activity' | 'edit_activity' | 'readonly_alert';
    engagementId?: string;
    activityId?: string;
  } | null;

  const [activeModal, setActiveModal] = useState<ModalState>(null);
  const [deleteModal, setDeleteModal] = useState<{ engagementId: string, activityId: string } | null>(null);

  // Form States
  const [actNote, setActNote] = useState('');
  const [actStatus, setActStatus] = useState<'pending' | 'done'>('pending');
  const [actType, setActType] = useState<'Win' | 'Challenge' | 'Routine'>('Routine');
  
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newType, setNewType] = useState<'Project' | 'Engagement'>('Engagement');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ACTIONS ---

  const toggleActivityStatus = (e: React.MouseEvent, engagementId: string, activityId: string) => {
    e.stopPropagation();
    if (!isOwner) { setActiveModal({ type: 'readonly_alert' }); return; }

    setEngagements(prev => prev.map(eng => {
      if (eng.id !== engagementId) return eng;
      return {
        ...eng,
        activities: eng.activities.map(act => {
          if (act.id !== activityId) return act;
          return {
            ...act,
            status: act.status === 'pending' ? 'done' : 'pending',
            date: act.status === 'pending' ? new Date().toISOString().split('T')[0] : act.date
          };
        })
      };
    }));
  };

  const handleCardClick = (engagementId: string, activity: Activity) => {
    if (!isOwner) { setActiveModal({ type: 'readonly_alert' }); return; }
    openEditModal(engagementId, activity);
  };

  const requestDelete = (engagementId: string, activityId: string) => {
    if (activeModal) setActiveModal(null);
    setDeleteModal({ engagementId, activityId });
  };

  const confirmDelete = () => {
    if (!deleteModal) return;
    const { engagementId, activityId } = deleteModal;
    setEngagements(prev => prev.map(eng => {
      if (eng.id !== engagementId) return eng;
      return { ...eng, activities: eng.activities.filter(a => a.id !== activityId) };
    }));
    setDeleteModal(null);
  };

  const handleSaveActivity = () => {
    if (!actNote.trim() || !activeModal?.engagementId) return;

    setEngagements(prev => prev.map(eng => {
      if (eng.id !== activeModal.engagementId) return eng;

      if (activeModal.type === 'edit_activity' && activeModal.activityId) {
        return {
          ...eng,
          activities: eng.activities.map(act => {
            if (act.id !== activeModal.activityId) return act;
            return { ...act, note: actNote, status: actStatus, type: actStatus === 'done' ? actType : 'Routine' };
          })
        };
      }

      const newActivity: Activity = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        note: actNote,
        type: actStatus === 'done' ? actType : 'Routine',
        status: actStatus
      };
      return { ...eng, activities: [newActivity, ...eng.activities] };
    }));
    closeModal();
  };

  const handleCreateEngagement = () => {
    if (!newTitle.trim() || !newOrg.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      // 👇 FIXED: Added 'category' field
      const newEngagement: Engagement = {
        id: Date.now().toString(),
        category: newType, // <--- THIS WAS MISSING
        role: newTitle,
        organization: newOrg,
        period: 'Just Started',
        type: newType === 'Project' ? 'Work' : 'Leadership',
        status: 'Active',
        description: 'Newly created via Board.',
        logoInitial: newOrg.charAt(0).toUpperCase(),
        colorClass: newType === 'Project' ? 'bg-indigo-600' : 'bg-emerald-600',
        activities: []
      };
      setEngagements(prev => [...prev, newEngagement]);
      setIsSubmitting(false);
      closeModal();
    }, 600);
  };

  // --- UI HELPERS ---
  const openAddModal = (engagementId: string) => {
    setActNote(''); setActStatus('pending'); setActType('Routine');
    setActiveModal({ type: 'add_activity', engagementId });
  };

  const openEditModal = (engagementId: string, activity: Activity) => {
    setActNote(activity.note); setActStatus(activity.status); setActType(activity.type === 'Win' || activity.type === 'Challenge' ? activity.type : 'Routine');
    setActiveModal({ type: 'edit_activity', engagementId, activityId: activity.id });
  };

  const closeModal = () => {
    setActiveModal(null); setNewTitle(''); setNewOrg('');
  };

  // --- FILTERING LOGIC ---
  const activeEngagements = engagements.filter(e => e.status === 'Active');

  const filteredEngagements = activeEngagements.filter(eng => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;

    // Check if Title or Org matches
    const matchesHeader = eng.role.toLowerCase().includes(query) || eng.organization.toLowerCase().includes(query);
    
    // Check if any activity matches
    const matchesActivity = eng.activities.some(act => act.note.toLowerCase().includes(query));

    return matchesHeader || matchesActivity;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      
      {/* 1. HEADER SECTION */}
      <div className="px-4 md:px-8 pt-6 pb-2 shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                 Mission Control <span className="text-2xl">🚀</span>
              </h1>
              <p className="text-slate-500 font-medium">Everything happening right now.</p>
           </div>

           {/* SEARCH BAR */}
           <div className="relative group w-full md:w-80">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                 <Search size={18} />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks, roles, or tech..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
              />
              {searchQuery && (
                 <button 
                   onClick={() => setSearchQuery('')}
                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                 >
                    <X size={14} />
                 </button>
              )}
           </div>
        </div>
      </div>

      {/* 2. BOARD AREA */}
      <div className="flex-1 min-h-0 w-full overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory md:snap-none mt-4">
        <div className="flex h-full gap-5 px-4 md:px-8 w-max">
          
          {filteredEngagements.map((engagement) => {
             // Filter activities based on search too!
             const visibleActivities = engagement.activities.filter(act => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                // Show if activity matches OR if the parent engagement matches
                return act.note.toLowerCase().includes(query) || 
                       engagement.role.toLowerCase().includes(query) || 
                       engagement.organization.toLowerCase().includes(query);
             });

             const sortedActivities = [...visibleActivities].sort((a, b) => {
               if (a.status === b.status) return 0;
               return a.status === 'pending' ? -1 : 1;
             });

             // Use the new category field
             const isProject = engagement.category === 'Project';
             const typeLabel = isProject ? 'Project' : 'Engagement';
             const TypeIcon = isProject ? FolderKanban : Briefcase;
             const typeColor = isProject 
                ? 'bg-indigo-50 text-indigo-700 border-indigo-100' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-100';

             return (
               <div key={engagement.id} className="snap-center shrink-0 w-[85vw] md:w-80 flex flex-col h-full max-h-[calc(100vh-160px)] bg-slate-50 rounded-2xl border border-slate-200 shadow-sm transition-all">
                  
                  {/* HEADER */}
                  <div className="p-3 border-b border-slate-200 bg-white rounded-t-2xl sticky top-0 z-10 space-y-3">
                     <div className="flex justify-between items-center">
                        <span className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${typeColor}`}>
                           <TypeIcon size={12} />
                           {typeLabel}
                        </span>

                        <div className="flex items-center gap-1">
                           {isOwner && (
                             <button onClick={() => openAddModal(engagement.id)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors" title="Log new activity">
                               <Plus size={18} />
                             </button>
                           )}
                           <Link href={`/explore/engagements/${engagement.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                             <ArrowUpRight size={18} />
                           </Link>
                        </div>
                     </div>

                     <div className="flex gap-3 overflow-hidden items-center pb-1">
                        <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-white font-bold shadow-sm ${engagement.colorClass}`}>
                           {engagement.logoInitial}
                        </div>
                        <div className="min-w-0">
                           <h3 className="font-bold text-slate-900 text-sm truncate leading-tight w-40" title={engagement.role}>
                             {engagement.role}
                           </h3>
                           <p className="text-xs text-slate-500 font-medium truncate">
                             {engagement.organization}
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* CARD LIST */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                     {sortedActivities.map((activity) => {
                        const isPending = activity.status === 'pending';
                        return (
                          <div 
                            key={activity.id} 
                            onClick={() => handleCardClick(engagement.id, activity)}
                            className={`
                              group relative p-3 rounded-xl border shadow-sm transition-all duration-200 cursor-pointer active:scale-95
                              ${isPending ? 'bg-white border-slate-200' : 'bg-slate-100/50 border-slate-100 opacity-60'}
                            `}
                          >
                             <div className="flex gap-3 items-start">
                                <button 
                                  onClick={(e) => toggleActivityStatus(e, engagement.id, activity.id)}
                                  className={`shrink-0 p-2 -m-2 z-10 rounded-full flex items-center justify-center transition-all`}
                                >
                                   <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                                      isPending ? 'border-slate-300 group-hover:border-blue-500' : 'bg-green-500 border-green-500 text-white'
                                   }`}>
                                      {!isPending && <CheckCircle2 size={12} />}
                                   </div>
                                </button>
                                
                                <div className="flex-1 min-w-0 pointer-events-none">
                                   <p className={`text-sm leading-relaxed ${isPending ? 'text-slate-700 font-medium' : 'text-slate-500 line-through'}`}>{activity.note}</p>
                                   {!isPending && activity.type !== 'Routine' && activity.type !== 'Unprocessed' && (
                                      <span className={`inline-block mt-2 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${activity.type === 'Win' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{activity.type}</span>
                                   )}
                                </div>
                             </div>
                          </div>
                        );
                     })}
                     
                     {sortedActivities.length === 0 && (
                        <div className="text-center py-8 opacity-50">
                           {searchQuery ? (
                             <>
                               <Filter size={20} className="text-slate-400 mx-auto mb-2" />
                               <p className="text-slate-400 text-xs italic">No matching tasks</p>
                             </>
                           ) : (
                             <>
                               <Calendar size={20} className="text-slate-400 mx-auto mb-2" />
                               <p className="text-slate-400 text-xs italic">No activities</p>
                             </>
                           )}
                        </div>
                     )}
                  </div>
               </div>
             );
          })}

          {isOwner && !searchQuery && (
            <button 
              onClick={() => setActiveModal({ type: 'create_board' })}
              className="snap-center shrink-0 w-[85vw] md:w-80 h-32 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-600 transition-all cursor-pointer"
            >
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 mb-2">
                 <Plus size={20} />
               </div>
               <p className="text-sm font-bold">New Board</p>
            </button>
          )}

          {!isOwner && !searchQuery && (
            <div className="snap-center shrink-0 w-[85vw] md:w-80 h-32 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400">
               <p className="text-sm">End of Board</p>
            </div>
          )}
        </div>
      </div>

      {/* --- MODALS --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h3 className="font-bold text-slate-900">
                   {activeModal.type === 'readonly_alert' ? 'View Only Mode' : activeModal.type === 'create_board' ? 'Create New Board' : activeModal.type === 'edit_activity' ? 'Edit Activity' : 'Log Activity'}
                 </h3>
                 <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={20} /></button>
              </div>

              <div className="p-6">
                 {/* 1. READ ONLY ALERT */}
                 {activeModal.type === 'readonly_alert' && (
                    <div className="text-center py-4">
                       <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                          <Lock size={24} />
                       </div>
                       <p className="text-slate-600 mb-6">
                          You are viewing as a <strong>Visitor</strong>. You cannot edit, delete, or mark items as done.
                       </p>
                       <button onClick={closeModal} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl">Got it</button>
                    </div>
                 )}

                 {/* 2. ADD/EDIT ACTIVITY */}
                 {(activeModal.type === 'add_activity' || activeModal.type === 'edit_activity') && (
                   <div className="space-y-4">
                      <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button onClick={() => setActStatus('pending')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${actStatus === 'pending' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>To Do</button>
                        <button onClick={() => setActStatus('done')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${actStatus === 'done' ? 'bg-green-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Done</button>
                      </div>
                      <textarea autoFocus value={actNote} onChange={(e) => setActNote(e.target.value)} className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700" />
                      
                      {actStatus === 'done' && (
                         <div className="grid grid-cols-3 gap-2">
                            {(['Routine', 'Win', 'Challenge'] as const).map((t) => (
                               <button key={t} onClick={() => setActType(t)} className={`py-2 rounded-lg text-xs font-bold border transition-all flex flex-col items-center gap-1 ${actType === t ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-400'}`}>{t}</button>
                            ))}
                         </div>
                      )}

                      <div className="flex gap-3 pt-2">
                         {activeModal.type === 'edit_activity' && activeModal.engagementId && activeModal.activityId && (
                           <button onClick={() => requestDelete(activeModal.engagementId!, activeModal.activityId!)} className="px-4 py-3 bg-red-50 text-red-500 font-bold rounded-xl hover:bg-red-100"><Trash2 size={20} /></button>
                         )}
                         <button onClick={handleSaveActivity} disabled={!actNote.trim()} className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50">Save</button>
                      </div>
                   </div>
                 )}

                 {/* 3. CREATE BOARD */}
                 {activeModal.type === 'create_board' && (
                   <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                         <button onClick={() => setNewType('Engagement')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${newType === 'Engagement' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100'}`}><Briefcase size={20} /><span className="text-xs font-bold">Engagement</span></button>
                         <button onClick={() => setNewType('Project')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${newType === 'Project' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-100'}`}><FolderKanban size={20} /><span className="text-xs font-bold">Project</span></button>
                      </div>
                      <div className="space-y-3">
                         <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                         <input type="text" value={newOrg} onChange={(e) => setNewOrg(e.target.value)} placeholder="Organization" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                      </div>
                      <button onClick={handleCreateEngagement} disabled={!newTitle || !newOrg || isSubmitting} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2">{isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />} {isSubmitting ? 'Creating...' : 'Create Board'}</button>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
               <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 size={24} /></div>
               <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Activity?</h3>
               <p className="text-sm text-slate-500 mb-6">Are you sure you want to remove this task?</p>
               <div className="flex gap-3">
                  <button onClick={() => setDeleteModal(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
                  <button onClick={confirmDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 shadow-lg shadow-red-500/30">Delete</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}