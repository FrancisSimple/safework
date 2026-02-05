'use client';

import { Post } from '../../data/postsMock';
import { MessageCircle, Share2, MoreHorizontal, Hash } from 'lucide-react';
import { useState } from 'react';
import { ReplyModal } from './ReplyModal';

export function PostCard({ post }: { post: Post }) {
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  return (
    <>
      <article className="group bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100 transition-all duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="absolute -inset-0.5 bg-linear-to-tr from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm md:text-lg border-2 border-white">
                {post.author.charAt(0)}
              </div>
            </div>
            
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 leading-tight text-sm md:text-base">{post.author}</h3>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mt-1">
                 <span className="font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{post.role}</span>
                 <span className="hidden sm:inline">•</span>
                 <span>{post.date}</span>
              </div>
            </div>
          </div>
          
          <button className="text-slate-300 hover:text-slate-600 transition-colors p-2 -mr-2">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="mb-5 pl-0 md:pl-15">
          <p className="text-slate-700 leading-relaxed text-sm md:text-[15px] whitespace-pre-wrap">
            {post.content}
          </p>

          {/* 👇 NEW: IMAGE GALLERY LOGIC */}
          {post.images && post.images.length > 0 && (
            <div className={`mt-4 grid gap-2 rounded-2xl overflow-hidden border border-slate-100 ${post.images.length > 1 ? 'grid-cols-2 aspect-2/1' : 'grid-cols-1 aspect-video'}`}>
              {post.images.map((imgUrl, index) => (
                <div key={index} className="relative h-full w-full bg-slate-100">
                  {/* Using standard img tag for simplicity with external URLs */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={imgUrl} 
                    alt={`Post attachment ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <div 
                key={tag} 
                className="inline-flex items-center gap-1 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 text-[11px] md:text-xs font-medium hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-colors cursor-pointer"
              >
                <Hash size={12} className="opacity-50" />
                {tag.replace('#', '')}
              </div>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50 pl-0 md:pl-15">
          <div>
              <button 
                onClick={() => setIsReplyModalOpen(true)}
                className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors group/comment"
              >
                <div className="p-1.5 md:p-2 rounded-full group-hover/comment:bg-blue-50 transition-colors">
                    <MessageCircle size={16} className="md:w-4.5 md:h-4.5" />
                </div>
                <span>Reply</span>
              </button>
          </div>

          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Share2 size={16} className="md:w-4.5 md:h-4.5" />
          </button>
        </div>

      </article>

      <ReplyModal 
        isOpen={isReplyModalOpen} 
        onClose={() => setIsReplyModalOpen(false)}
        postTitle={post.content.substring(0, 50) + "..."}
      />
    </>
  );
}