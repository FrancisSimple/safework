export interface Project {
  id: string;
  title: string;
  category: string; // e.g., "Mobile App", "AI & Data", "Embedded Systems"
  status: 'In Progress' | 'Completed';
  description: string;
  techStack: string[];
  date: string;
  images?: string[];
  links?: { label: string; url: string }[];
}

export const PROJECTS_MOCK: Project[] = [
  {
    id: '1',
    title: 'Animgrow',
    category: 'SaaS / AgriTech',
    status: 'In Progress',
    description: 'A "Livestock-as-a-Service" platform allowing users to invest in and manage livestock remotely. Built to solve the scalability issues in traditional animal rearing in Ghana.',
    techStack: ['Flutter', 'FastAPI', 'PostgreSQL', 'Docker'],
    date: 'Jan 2026 - Present',
    images: [
      "https://images.unsplash.com/photo-1516467508483-a721206076f9?q=80&w=1974&auto=format&fit=crop", // Livestock concept
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"  // Dashboard concept
    ],
    links: [
      { label: 'View Pitch Deck', url: '#' }
    ]
  },
  {
    id: '2',
    title: 'Kura',
    category: 'Mobile App',
    status: 'In Progress',
    description: 'A secure and transparent mobile voting application designed for student, organizational, and local elections. Focuses on real-time results and voter verification.',
    techStack: ['Flutter', 'Firebase', 'Dart'],
    date: 'Jan 2026 - Present',
    images: [
      "https://images.unsplash.com/photo-1540910419868-474945984c62?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: '3',
    title: 'Movie Recommender System',
    category: 'AI & Data Science',
    status: 'Completed',
    description: 'A group data project analyzing movie datasets to build a recommendation engine. Used collaborative filtering and content-based filtering techniques.',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter'],
    date: 'Dec 2025',
    links: [
      { label: 'View Report', url: '#' },
      { label: 'GitHub Repo', url: '#' }
    ]
  },
  {
    id: '4',
    title: 'Poctor (Pocket Doctor)',
    category: 'HealthTech / AI',
    status: 'In Progress',
    description: 'An AI-powered health assistant concept designed to provide preliminary health guidance and symptom analysis for users in remote areas.',
    techStack: ['Python', 'AI/ML', 'Mobile'],
    date: 'Dec 2025 - Present',
    images: []
  },
  {
    id: '5',
    title: 'STM32 Hardware Controller',
    category: 'Embedded Systems',
    status: 'Completed',
    description: 'Low-level driver development for STM32F091RC using Assembly and C. Implemented custom timers, DAC interfaces, and peripheral controls.',
    techStack: ['C', 'Assembly', 'STM32', 'Hardware'],
    date: 'Nov 2025',
    images: [
       "https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=2070&auto=format&fit=crop" // Circuit board
    ]
  }
];