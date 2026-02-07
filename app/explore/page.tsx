import { Metadata } from 'next';
import BoardClient from './BoardClient';

export const metadata: Metadata = {
  title: 'Mission Control | Francis Sewor',
  description: 'Project activity tracking and task management.',
};

export default function PostsPage() {
  return (
    // We remove the flex/col layout here because BoardClient now handles its own layout
    <div className="h-screen bg-white">
       <BoardClient />
    </div>
  );
}