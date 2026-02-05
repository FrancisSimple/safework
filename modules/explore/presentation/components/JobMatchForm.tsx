import { Briefcase, Building2, FileText, ArrowRight } from 'lucide-react';

interface JobMatchFormProps {
  jobTitle: string;
  setJobTitle: (val: string) => void;
  company: string;
  setCompany: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function JobMatchForm({ 
  jobTitle, setJobTitle, 
  company, setCompany, 
  description, setDescription, 
  onAnalyze, isAnalyzing 
}: JobMatchFormProps) {
  
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 p-1 overflow-hidden">
      <div className="p-6 md:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Briefcase size={16} className="text-slate-400" /> Job Title
                </label>
                <input 
                  type="text" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Firmware Engineer"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Building2 size={16} className="text-slate-400" /> Company
                </label>
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Tesla"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <FileText size={16} className="text-slate-400" /> Job Description
            </label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the full job requirements here..."
              className="w-full h-64 px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 placeholder:text-slate-400 resize-none leading-relaxed"
            />
          </div>

      </div>

      {/* Footer Action */}
      <div className="bg-slate-50 px-6 md:px-8 py-5 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">
            AI will process your portfolio data securely.
          </p>
          <button 
            onClick={onAnalyze}
            disabled={!jobTitle || !description || isAnalyzing}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all
              ${!jobTitle || !description || isAnalyzing 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] shadow-indigo-500/30'}
            `}
          >
            {isAnalyzing ? 'Scanning...' : 'Analyze & Match'}
            {!isAnalyzing && <ArrowRight size={18} />}
          </button>
      </div>
      
      {/* Progress Bar */}
      {isAnalyzing && (
          <div className="h-1 w-full bg-slate-100">
            <div className="h-full bg-indigo-500 animate-[progress_2s_ease-in-out_infinite]"></div>
          </div>
      )}
    </div>
  );
}