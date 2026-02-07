'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderKanban, 
  User, 
  Menu, 
  X, 
  LogIn, 
  LogOut, 
  Home, 
  Sparkles 
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

// 👇 UPDATED NAVIGATION LIST
const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: Home }, // New Home Link
  { name: 'Posts', href: '/explore', icon: LayoutDashboard },
  { name: 'Engagements', href: '/explore/engagements', icon: Briefcase },
  // 👇 NEW FEATURE LINK
  { name: 'Job Match AI', href: '/explore/job-match', icon: Sparkles }, 
  { name: 'About', href: '/explore/about', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isOwner, login, logout } = useAuth();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <Menu size={24} />
            </button>
            <span className="font-bold text-slate-900">Francis Sewor</span>
         </div>
         {isOwner && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase">Owner Mode</span>}
      </div>

      {/* Sidebar Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:block
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-600/20">
                F
              </div>
              <div className="hidden md:block">
                 <p className="font-bold text-slate-800 text-sm">Francis K. Sewor</p>
                 <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                   {isOwner ? 'Owner Access' : 'Visitor Access'}
                 </p>
              </div>
           </div>

           <button 
             onClick={() => setIsOpen(false)}
             className="md:hidden p-2 text-slate-400 hover:text-slate-600"
           >
             <X size={20} />
           </button>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href; 
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsOpen(false)} 
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  ${item.name === 'Job Match AI' ? 'mt-4 border border-indigo-100 bg-indigo-50/50 text-indigo-600 hover:bg-indigo-50' : ''}
                `}
              >
                <Icon size={20} className={isActive ? 'text-blue-600' : item.name === 'Job Match AI' ? 'text-indigo-500' : 'text-slate-400 group-hover:text-slate-600'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer with Auth Toggle */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
           <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wider">Session Mode</p>
              
              <button 
                 onClick={isOwner ? logout : login}
                 className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                   isOwner 
                     ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' 
                     : 'bg-slate-900 text-white hover:bg-slate-800'
                 }`}
              >
                 {isOwner ? <LogOut size={14} /> : <LogIn size={14} />}
                 {isOwner ? 'Logout (View as Visitor)' : 'Login as Owner'}
              </button>
           </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}