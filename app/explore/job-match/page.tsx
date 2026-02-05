'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sparkles } from 'lucide-react';
// 👇 Import our scalable components
import { AccessDenied } from '@/modules/explore/presentation/components/AccessDenied';
import { JobMatchForm } from '@/modules/explore/presentation/components/JobMatchForm';
import { JobMatchResult } from '@/modules/explore/presentation/components/JobMatchResult';

export default function JobMatchPage() {
  const { isOwner } = useAuth();
  
  // Form State
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  
  // Process State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { score: number; summary: string }>(null);

  // Guard Clause: Visitor View
  if (!isOwner) {
    return <AccessDenied />;
  }

  // Handler
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate API Call
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        score: 85,
        summary: "High match! Your experience with Docker and Embedded Systems aligns perfectly. Missing keywords: 'Kubernetes'."
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white pb-20 relative">
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-indigo-50 to-purple-50 opacity-80 z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10 px-4 md:px-8 pt-10">
        
        {/* Header */}
        <div className="mb-10 animate-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 backdrop-blur-md border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles size={12} /> Beta Feature
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Job Match AI
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Paste a job description below. The system will analyze your <strong>Engagements</strong> and <strong>Projects</strong> to generate a tailored application kit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: THE FORM MODULE */}
          <div className="lg:col-span-2 space-y-6">
             <JobMatchForm 
               jobTitle={jobTitle} setJobTitle={setJobTitle}
               company={company} setCompany={setCompany}
               description={description} setDescription={setDescription}
               onAnalyze={handleAnalyze}
               isAnalyzing={isAnalyzing}
             />
          </div>

          {/* RIGHT: THE RESULT MODULE */}
          <div className="lg:col-span-1">
             <div className="sticky top-8 space-y-6">
                <JobMatchResult 
                  isAnalyzing={isAnalyzing} 
                  result={result} 
                />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}