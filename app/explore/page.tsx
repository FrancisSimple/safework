import { POSTS_MOCK } from '../../modules/explore/data/postsMock';
import { PostCard } from '../../modules/explore/presentation/components/PostCard';

export default function PostsPage() {
  return (
    <div className="relative min-h-screen pb-20">
      
      {/* Subtle Background decoration behind the feed */}
      <div className="fixed top-20 right-0 -z-10 w-125 h-125 bg-blue-100/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl">
        
        {/* Cleaner Header */}
        <div className="mb-10 pt-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Updates</h1>
          <p className="text-slate-500 mt-2 text-lg font-light">
            Engineering logs & insights.
          </p>
        </div>

        {/* The Feed */}
        <div className="space-y-8">
          {POSTS_MOCK.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Minimal "End" State */}
        <div className="text-center py-12 opacity-60">
          <div className="w-16 h-1 bg-slate-200 mx-auto rounded-full mb-3"></div>
          <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">End of Feed</p>
        </div>

      </div>
    </div>
  );
}