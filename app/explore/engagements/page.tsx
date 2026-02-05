import { ENGAGEMENTS_MOCK } from '../../../modules/explore/data/engagementsMock';
import { EngagementCard } from '../../../modules/explore/presentation/components/EngagementCard';

export default function EngagementsPage() {
  return (
    <div className="relative min-h-screen pb-20">
      
      {/* Background Decoration (Purple this time for variety) */}
      <div className="fixed top-40 left-1/4 -z-10 w-4.5 h-4.5 bg-purple-100/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-175 mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="mb-8 pt-4 border-b border-slate-100/60 pb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Engagements</h1>
          <p className="text-slate-500 mt-2 text-lg font-light">
            My professional roles, organizations, and commitments.
          </p>
        </div>

        {/* The Timeline List */}
        <div className="relative space-y-6 pl-0 md:pl-8 border-l-0 md:border-l-2 border-slate-100/50">
           {ENGAGEMENTS_MOCK.map((item: typeof ENGAGEMENTS_MOCK[number]) => (
             <EngagementCard key={item.id} data={item} />
           ))}
        </div>

        {/* Footer */}
        <div className="text-center py-12 opacity-60">
           <p className="text-slate-400 text-sm">Open to new opportunities.</p>
        </div>

      </div>
    </div>
  );
}