'use client';

import { X, MessageCircle, Mail } from 'lucide-react';
import { useState } from 'react';
import { PROFILE_MOCK } from '../../../home/data/servicesMock'; // Importing your contact info

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  postTitle: string; // We'll use the post snippet as the title
}

export function ReplyModal({ isOpen, onClose, postTitle }: ReplyModalProps) {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  // 1. Logic to open WhatsApp with pre-filled text
  const handleWhatsApp = () => {
    const text = `Hi Francis, I read your post about "${postTitle}" and wanted to share my thoughts:\n\n${message}`;
    const url = `https://wa.me/${PROFILE_MOCK.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
  };

  // 2. Logic to open Email with pre-filled text
  const handleEmail = () => {
    const subject = `Re: Your post "${postTitle}"`;
    const body = `Hi Francis,\n\nI read your post and wanted to share my thoughts:\n\n${message}\n\nBest regards,`;
    const url = `mailto:${PROFILE_MOCK.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-900">Reply to Post</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Replying to:</p>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-600 italic line-clamp-2">
            &quot;{postTitle}&quot;
          </div>

          <textarea
            className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none text-slate-700 placeholder:text-slate-400"
            placeholder="Type your thoughts here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
          <p className="text-xs text-center text-slate-400 mb-1">Select how you want to send this:</p>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleWhatsApp}
              disabled={!message.trim()}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageCircle size={18} />
              WhatsApp
            </button>

            <button 
              onClick={handleEmail}
              disabled={!message.trim()}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail size={18} />
              Email
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}