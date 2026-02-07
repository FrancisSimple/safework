'use client';

import Link from 'next/link';
import { useRef } from 'react';
// 👇 FIX 1: Import 'Variants' type
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { 
  ArrowRight, LayoutDashboard, Briefcase, Sparkles, 
  CheckCircle2, FileText, Share2, Layers, Zap
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
// 👇 FIX 2: Explicitly type these objects as 'Variants'
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function LandingPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden text-slate-200">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
              D
            </div>
            <span className="font-bold text-white text-lg tracking-tight">DoCareer</span>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              href="/login" 
              className="hidden md:block text-sm font-bold text-slate-400 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="px-5 py-2.5 bg-white text-slate-950 text-sm font-bold rounded-full hover:bg-emerald-50 transition-all flex items-center gap-2 group"
            >
              Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <motion.section 
        ref={targetRef}
        style={{ opacity, scale }}
        className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh]"
      >
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[4000ms]"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center max-w-5xl mx-auto z-10"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-xl mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">The All-In-One Career Engine</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-8">
            Track. Showcase. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">
              Generate.
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Stop losing track of your wins. <span className="text-white font-medium">DoCareer</span> is the 3-in-1 platform that turns your daily to-do list into a live portfolio and an AI-generated CV.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link 
              href="/signup" 
              className="w-full md:w-auto px-8 py-4 bg-emerald-600 text-white text-lg font-bold rounded-2xl hover:bg-emerald-500 hover:scale-105 transition-all shadow-xl shadow-emerald-900/50 flex items-center justify-center gap-2"
            >
              Start for Free <Zap size={20} />
            </Link>
            <Link 
              href="/explore" 
              className="w-full md:w-auto px-8 py-4 bg-slate-900/50 backdrop-blur-sm text-white text-lg font-bold rounded-2xl border border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              See Live Demo
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>


      {/* --- THE 3-IN-1 VALUE PROP --- */}
      <section className="py-32 bg-slate-50 text-slate-900 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-20 text-center"
          >
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-4">Unified Workflow</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
              One Tool. Three Superpowers.
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Most professionals use Trello for tasks, LinkedIn for showcasing, and Word for resumes. DoCareer combines them into a single, automated stream.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* PILLAR 1: TRACK */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-white rounded-[2.5rem] border border-slate-200 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all group"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-4">1. Task Tracker</h4>
              <p className="text-slate-500 leading-relaxed mb-6">
                A simple "To-Do" board for your daily work. Log micro-wins, fix bugs, and track meetings. 
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600">
                 <span className="line-through text-slate-400">Deployed API v2</span> <br/>
                 <span className="font-bold text-emerald-600">✓ Logged to Career History</span>
              </div>
            </motion.div>

            {/* PILLAR 2: SHOWCASE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-white rounded-[2.5rem] border border-slate-200 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
                <Share2 size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-4">2. Public Portfolio</h4>
              <p className="text-slate-500 leading-relaxed mb-6">
                Your completed projects automatically become a stunning, shareable portfolio. No more building personal sites from scratch.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-600"></div>
                 <div className="h-2 w-24 bg-slate-200 rounded-full"></div>
                 <div className="ml-auto text-xs font-bold text-blue-600">Live</div>
              </div>
            </motion.div>

            {/* PILLAR 3: GENERATE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 text-white hover:shadow-2xl hover:shadow-slate-900/20 transition-all group"
            >
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 transition-transform">
                <Sparkles size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-4">3. CV Generator</h4>
              <p className="text-slate-400 leading-relaxed mb-6">
                Need a resume update? Our AI scans your task logs and generates ATS-optimized bullet points instantly.
              </p>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 text-sm text-indigo-200">
                 "Spearheaded API deployment..." <br/>
                 "Optimized database queries..."
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- FEATURE DEEP DIVE (Bento Grid) --- */}
      <section id="features" className="py-32 px-6 bg-slate-950">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <span className="inline-block py-1 px-3 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">Inside the System</span>
               <h3 className="text-4xl md:text-6xl font-black text-white">More than just a list.</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-4 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
               
               {/* MISSION CONTROL */}
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="md:col-span-4 md:row-span-2 bg-slate-900 rounded-[2.5rem] border border-slate-800 p-8 md:p-12 relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
               >
                  <div className="relative z-10 h-full flex flex-col">
                     <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-emerald-500 shadow-xl mb-6">
                        <LayoutDashboard size={32} />
                     </div>
                     <h4 className="text-4xl font-bold text-white mb-4">Mission Control</h4>
                     <p className="text-slate-400 text-lg max-w-lg mb-8">
                        The heart of DoCareer. A unified board where Projects (long-term) and Engagements (roles) live side-by-side. 
                        Track active tasks, log daily wins, and archive completed work with a single click.
                     </p>
                     
                     <div className="mt-auto flex flex-wrap gap-3">
                        <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">Kanban View</span>
                        <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold">Activity Logs</span>
                        <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold">Quick Capture</span>
                     </div>
                  </div>
                  
                  {/* Decorative */}
                  <div className="absolute top-20 right-[-100px] w-[500px] h-[400px] bg-emerald-600/10 rounded-3xl border border-white/5 rotate-12 group-hover:rotate-6 transition-transform duration-700 backdrop-blur-sm"></div>
               </motion.div>

               {/* AI WRITER */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="md:col-span-2 md:row-span-1 bg-linear-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden group"
               >
                  <div className="relative z-10">
                     <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-md">
                        <FileText size={24} />
                     </div>
                     <h4 className="text-2xl font-bold mb-2">Resume Writer</h4>
                     <p className="text-indigo-100 mb-6 text-sm">Don't write your CV. Let the system compile it from your logs.</p>
                  </div>
               </motion.div>

               {/* VENTURE ARCHIVE */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3 }}
                 className="md:col-span-2 md:row-span-1 bg-slate-900 rounded-[2.5rem] border border-slate-800 p-8 group hover:bg-slate-800/50 transition-colors"
               >
                  <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 mb-6 border border-slate-700">
                     <Layers size={24} />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Never Forget</h4>
                  <p className="text-slate-400 text-sm mb-4">
                     Every internship, side project, and freelance gig is archived forever.
                  </p>
               </motion.div>

            </div>
         </div>
      </section>

      {/* --- STATS / SOCIAL PROOF --- */}
      <section className="py-20 border-y border-slate-800 bg-slate-900/50">
         <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
               <h4 className="text-5xl font-black text-white">3-in-1</h4>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Platform</p>
            </div>
            <div className="space-y-2">
               <h4 className="text-5xl font-black text-white">100%</h4>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Data Ownership</p>
            </div>
            <div className="space-y-2">
               <h4 className="text-5xl font-black text-white">AI</h4>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Powered Synthesis</p>
            </div>
            <div className="space-y-2">
               <h4 className="text-5xl font-black text-white">∞</h4>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Career Growth</p>
            </div>
         </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-40 px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-emerald-600/5 -z-10"></div>
         <div className="max-w-4xl mx-auto text-center">
            
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight"
            >
               Your career is a <br/> <span className="text-emerald-500">Database.</span> Start logging.
            </motion.h2>

            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto"
            >
               Join the engineers, designers, and founders using DoCareer to automate their personal growth.
            </motion.p>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2 }}
               className="flex flex-col md:flex-row items-center justify-center gap-4"
            >
               <Link 
                  href="/signup" 
                  className="w-full md:w-auto px-10 py-5 bg-emerald-500 text-white font-bold text-lg rounded-2xl hover:bg-emerald-400 transition-colors flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/20"
               >
                  Get Started for Free <Zap size={20} />
               </Link>
               <Link 
                  href="/explore" 
                  className="w-full md:w-auto px-10 py-5 bg-transparent border border-slate-700 text-white font-bold text-lg rounded-2xl hover:bg-slate-800 transition-colors"
               >
                  Visitor Demo
               </Link>
            </motion.div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">D</div>
               <span className="font-bold text-slate-200">DoCareer</span>
            </div>
            
            <div className="flex gap-8 text-sm font-medium text-slate-500">
               <a href="#" className="hover:text-white transition-colors">Pricing</a>
               <a href="#" className="hover:text-white transition-colors">About</a>
               <a href="#" className="hover:text-white transition-colors">Login</a>
            </div>
            
            <p className="text-sm text-slate-600">© 2026 DoCareer Inc.</p>
         </div>
      </footer>

    </div>
  );
}