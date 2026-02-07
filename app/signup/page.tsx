'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Mail, Lock, Loader2, User, Rocket } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login();
      router.push('/explore');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex font-sans selection:bg-blue-500 selection:text-white">
      
      {/* LEFT COLUMN */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden border-r border-slate-800">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         {/* Blue Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse duration-[5000ms]"></div>
         
         <div className="relative z-10 max-w-lg px-10 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-500 mb-8 mx-auto border border-slate-700 shadow-xl">
              <Rocket size={32} />
            </div>
            <h1 className="text-5xl font-black mb-6 tracking-tight">
               Start your <br/> <span className="text-blue-500">Career Engine.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
               Join engineers tracking their work, automating their CVs, and never forgetting a micro-win again.
            </p>
         </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 relative">
         
         <Link href="/" className="absolute top-8 right-8 text-sm font-bold text-slate-500 hover:text-white flex items-center gap-2 transition-colors">
            Back to Home <ArrowRight size={16} />
         </Link>

         <div className="w-full max-w-md">
            <div className="text-center mb-10">
               <h2 className="text-3xl font-bold mb-2">Create Account</h2>
               <p className="text-slate-400">Get started for free. No credit card required.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
               <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative">
                     <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                     <input 
                        type="text" 
                        placeholder="Francis Sewor" 
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                        required
                     />
                  </div>
               </div>

               <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative">
                     <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                     <input 
                        type="email" 
                        placeholder="you@example.com" 
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                        required
                     />
                  </div>
               </div>

               <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                  <div className="relative">
                     <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                     <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                        required
                     />
                  </div>
               </div>

               <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 mt-4"
               >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Create Account'}
               </button>
            </form>

            <p className="text-center mt-8 text-slate-500 text-sm">
               Already have an account? {' '}
               <Link href="/login" className="text-blue-500 font-bold hover:underline">
                  Log in
               </Link>
            </p>
         </div>
      </div>
    </div>
  );
}