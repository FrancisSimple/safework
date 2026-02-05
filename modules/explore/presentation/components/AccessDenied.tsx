import { Lock } from 'lucide-react';
import Link from 'next/link';

export function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-slate-50 animate-in fade-in duration-500">
      <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-6 text-slate-400">
        <Lock size={32} />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Internal Tool</h1>
      <p className="text-slate-500 max-w-md mb-8">
        This AI Job Match tool is restricted to the portfolio owner. It is used to generate tailored resumes and cover letters.
      </p>
      <Link href="/explore" className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
        Return to Portfolio
      </Link>
    </div>
  );
}