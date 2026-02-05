import { Sparkles, CheckCircle2 } from 'lucide-react';

interface JobMatchResultProps {
  isAnalyzing: boolean;
  result: { score: number; summary: string } | null;
}

export function JobMatchResult({ isAnalyzing, result }: JobMatchResultProps) {
  
  // 1. Initial Helper State
  if (!result && !isAnalyzing) {
    return (
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
          <Sparkles size={32} />
        </div>
        <h3 className="font-bold text-slate-900 mb-2">Ready to Match</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Paste a JD to see how well your portfolio aligns. The AI will generate a tailored <strong>CV</strong> and <strong>Cover Letter</strong> instantly.
        </p>
      </div>
    );
  }

  // 2. Loading State (Skeleton)
  if (isAnalyzing) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg text-center animate-pulse">
        <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4"></div>
        <div className="h-4 bg-slate-100 rounded-full w-3/4 mx-auto mb-3"></div>
        <div className="h-3 bg-slate-100 rounded-full w-1/2 mx-auto"></div>
      </div>
    );
  }

  // 3. Result State
  if (result) {
    return (
      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 animate-in zoom-in-95 duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-100 rounded-full text-emerald-700">
            <CheckCircle2 size={20} />
          </div>
          <h3 className="font-bold text-emerald-900">Analysis Complete</h3>
        </div>
        <div className="mb-6">
          <div className="flex items-end gap-2 mb-1">
            <span className="text-4xl font-extrabold text-emerald-700">{result.score}%</span>
            <span className="text-sm font-bold text-emerald-600/60 mb-1.5">Match</span>
          </div>
          <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
          </div>
        </div>
        <p className="text-sm text-emerald-800/80 leading-relaxed mb-4">
          {result.summary}
        </p>
        <button className="w-full py-3 bg-white border border-emerald-200 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 transition-colors">
          View Generated CV
        </button>
      </div>
    );
  }

  return null;
}