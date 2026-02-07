'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Mail, Lock, Loader2, Github, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(); 
      router.push('/explore');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex font-sans selection:bg-blue-500 selection:text-white">
      
      {/* LEFT COLUMN (Branding) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden border-r border-slate-800">
         {/* Blue Background Effects */}
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse duration-[5000ms]"></div>
         
         <div className="relative z-10 max-w-lg px-10">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-8 shadow-xl shadow-blue-900/20">
              D
            </div>
            <h1 className="text-5xl font-black mb-6 tracking-tight leading-tight">
               Welcome back to <br/> <span className="text-blue-500">Mission Control.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
               Your career operating system is running. Log in to track new wins, manage projects, and generate your latest CV.
            </p>
            
            <div className="space-y-4">
               {['Real-time Activity Tracking', 'AI-Powered Summaries', 'Unified Project Archive'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-slate-300">
                     <CheckCircle2 size={20} className="text-blue-500" />
                     {item}
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* RIGHT COLUMN (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 relative">
         
         <Link href="/" className="absolute top-8 right-8 text-sm font-bold text-slate-500 hover:text-white flex items-center gap-2 transition-colors">
            Back to Home <ArrowRight size={16} />
         </Link>

         <div className="w-full max-w-md">
            <div className="text-center mb-10">
               <h2 className="text-3xl font-bold mb-2">Sign In</h2>
               <p className="text-slate-400">Enter your credentials to access your dashboard.</p>
            </div>

            <button className="w-full py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 font-bold text-slate-300 mb-6">
               <Github size={20} /> Continue with GitHub
            </button>

            <div className="relative mb-8">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
               <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-950 px-2 text-slate-500 font-bold tracking-wider">Or continue with email</span></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
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
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Sign In'}
               </button>
            </form>

            <p className="text-center mt-8 text-slate-500 text-sm">
               Don't have an account? {' '}
               <Link href="/signup" className="text-blue-500 font-bold hover:underline">
                  Create one
               </Link>
            </p>
         </div>
      </div>
    </div>
  );
}