'use client';

import { useState } from 'react';
import { ENGAGEMENTS_MOCK, Engagement } from '@/modules/explore/data/engagementsMock';
import Link from 'next/link';
import { 
  ArrowUpRight, FolderKanban, Briefcase, Archive, Activity, Search, X, 
  Plus, Loader2, Save 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function EngagementsPage() {
  const { isOwner } = useAuth();

  // 1. DATA STATE
  const [items, setItems] = useState<Engagement[]>(ENGAGEMENTS_MOCK);
  
  // 2. UI STATE
  const [filter, setFilter] = useState<'Active' | 'Completed'>('Active');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. CREATE FORM STATE
  const [formData, setFormData] = useState({
    category: 'Engagement' as 'Project' | 'Engagement',
    role: '',
    organization: '',
    period: 'Present',
    description: '',
    imageUrl: '',
    status: 'Active' as 'Active' | 'Completed'
  });

  // --- ACTIONS ---

  const handleCreate = () => {
    if (!formData.role || !formData.organization) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const newItem: Engagement = {
        id: Date.now().toString(),
        category: formData.category,
        role: formData.role,
        organization: formData.organization,
        period: formData.period,
        type: 'Work',
        status: formData.status,
        description: formData.description,
        logoInitial: formData.organization.charAt(0).toUpperCase(),
        colorClass: formData.category === 'Project' ? 'bg-indigo-600' : 'bg-emerald-600',
        images: formData.imageUrl ? [formData.imageUrl] : [],
        activities: []
      };

      setItems(prev => [newItem, ...prev]);
      setIsSubmitting(false);
      setIsModalOpen(false);
      // Reset Form
      setFormData({
        category: 'Engagement',
        role: '',
        organization: '',
        period: 'Present',
        description: '',
        imageUrl: '',
        status: 'Active'
      });
    }, 600);
  };

  // --- FILTERING ---
  const activeCount = items.filter(i => i.status === 'Active').length;
  const archivedCount = items.filter(i => i.status === 'Completed').length;

  const filteredItems = items.filter(item => {
    const matchesStatus = item.status === filter;
    const matchesSearch = item.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Ventures</h1>
                <div className="flex items-center gap-2 mt-1">
                   <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {activeCount} Active
                   </span>
                   <span className="text-slate-300 text-[10px]">•</span>
                   <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                      {archivedCount} Archived
                   </span>
                </div>
             </div>

             <div className="relative group w-full md:w-72">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                   <Search size={16} />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter ventures..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                   <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"><X size={14} /></button>
                )}
             </div>
          </div>

          <div className="flex gap-6 -mb-px overflow-x-auto">
             <button onClick={() => setFilter('Active')} className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${filter === 'Active' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
               <Activity size={16} /> Active Pursuits
             </button>
             <button onClick={() => setFilter('Completed')} className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${filter === 'Completed' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
               <Archive size={16} /> Archive
             </button>
          </div>
        </div>
      </div>

      {/* GRID LIST */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CREATE CARD (Owner Only) */}
            {isOwner && !searchQuery && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative h-full min-h-[320px] rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 hover:bg-white hover:border-blue-400 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-blue-600"
              >
                 <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Plus size={32} />
                 </div>
                 <div className="text-center">
                    <h3 className="font-bold text-lg">Add New Venture</h3>
                    <p className="text-xs font-medium opacity-70">Project or Engagement</p>
                 </div>
              </button>
            )}

            {/* ITEM CARDS */}
            {filteredItems.map((item) => {
               const hasImage = item.images && item.images.length > 0;
               const coverImage = hasImage ? item.images![0] : null;
               
               const category = item.category || 'Engagement';
               const isProject = category === 'Project';
               const TypeIcon = isProject ? FolderKanban : Briefcase;
               const badgeColor = isProject ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100';

               return (
                 <Link key={item.id} href={`/explore/engagements/${item.id}`} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300 flex flex-col h-full">
                      {/* Cover Image */}
                      <div className="h-32 w-full relative overflow-hidden bg-slate-100">
                         {hasImage ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={coverImage!} alt={item.role} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                         ) : (
                            <div className={`w-full h-full ${item.colorClass} opacity-10`}></div>
                         )}
                         <div className={`absolute -bottom-5 left-5 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-white ${item.colorClass} z-10`}>
                            {item.logoInitial}
                         </div>
                      </div>

                      {/* Content */}
                      <div className="pt-8 px-5 pb-5 flex-1 flex flex-col">
                         <div className="flex justify-between items-start mb-1">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 pr-2">{item.role}</h3>
                            <span className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${badgeColor}`}>
                               <TypeIcon size={10} /> {category}
                            </span>
                         </div>
                         <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wide">{item.organization}</p>
                         <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">{item.description}</p>
                         
                         <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">{item.period}</span>
                            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                         </div>
                      </div>
                 </Link>
               );
            })}
         </div>
      </div>

      {/* CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h3 className="font-bold text-slate-900">New Venture</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar space-y-5">
                 {/* Form Fields Same as before ... */}
                 <div className="space-y-4">
                    <div>
                       <label className="text-xs font-bold text-slate-700 mb-1 block">Role / Title</label>
                       <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} placeholder="e.g. Lead Developer" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                    </div>
                    <div>
                       <label className="text-xs font-bold text-slate-700 mb-1 block">Organization</label>
                       <input type="text" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} placeholder="e.g. BinByte" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                    </div>
                 </div>
                 <button onClick={handleCreate} disabled={!formData.role || !formData.organization || isSubmitting} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} {isSubmitting ? 'Creating...' : 'Create Venture'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}