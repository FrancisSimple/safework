export interface Post {
  id: string;
  author: string;
  role: string;
  date: string;
  content: string;
  tags: string[];
  likes: number; // Keeping this in the interface for data integrity, even if not used in UI
  images?: string[]; // 👈 NEW: Optional array of image URLs
}

export const POSTS_MOCK: Post[] = [
  {
    id: '1',
    author: 'Francis K. Sewor',
    role: 'Software Engineer',
    date: '2 hours ago',
    content: "Just deployed the new version of my portfolio! 🚀 It's built with Next.js 14 and Tailwind CSS. The focus was on Clean Architecture and modular design. What do you think about the glassmorphism effect?",
    tags: ['#NextJS', '#WebDev', '#Architecture'],
    likes: 24,
    // 1 Image Example
    images: [
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: '2',
    author: 'Francis K. Sewor',
    role: 'Software Engineer',
    date: '1 day ago',
    content: "Working on an exciting Embedded Systems project using STM32. There is something satisfying about writing C code that controls actual hardware. Will share a demo video soon!",
    tags: ['#EmbeddedSystems', '#STM32', '#CProgramming'],
    likes: 45,
    // 2 Images Example
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: '3',
    author: 'Francis K. Sewor',
    role: 'Software Engineer',
    date: '3 days ago',
    content: "Big thanks to the open source community. I ran into a complex bug with a Docker container today, and a GitHub issue thread from 2023 saved my life. Always give back when you can.",
    tags: ['#OpenSource', '#Docker', '#DevLife'],
    likes: 18,
    // No Images Example (Will render text only)
  }
];