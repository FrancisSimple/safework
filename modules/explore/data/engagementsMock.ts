export interface Activity {
  id: string;
  date: string;
  note: string;
  type?: 'Win' | 'Challenge' | 'Routine' | 'Unprocessed';
  status: 'pending' | 'done';
}

export interface Engagement {
  id: string;
  // 👇 THIS FIELD IS CRITICAL. IT MUST BE 'Project' OR 'Engagement'
  category: 'Project' | 'Engagement'; 
  role: string;
  organization: string;
  period: string;
  type: 'Work' | 'Education' | 'Volunteering' | 'Leadership' | 'Startup';
  status: 'Active' | 'Completed';
  description: string;
  logoInitial: string;
  colorClass: string;
  images?: string[];
  links?: { label: string; url: string }[];
  activities: Activity[]; 
  finalSummary?: string; 
  cvBullets?: string[]; 
}

export const ENGAGEMENTS_MOCK: Engagement[] = [
  // --- 1. ACTIVE ITEMS ---
  {
    id: '1',
    category: 'Engagement', // 👈 Marked as Engagement
    role: 'Co-Founder & Lead Developer',
    organization: 'BinByte Technologies',
    period: 'Dec 2025 - Present',
    type: 'Startup',
    status: 'Active',
    description: 'Leading a team of developers to build scalable software solutions.',
    logoInitial: 'B',
    colorClass: 'bg-blue-600',
    images: ["https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"],
    links: [{ label: 'Website', url: 'https://binbyte.dev' }],
    activities: [
      { id: 'a1', date: '2026-02-01', note: 'Deployed dashboard v2.', type: 'Win', status: 'done' }
    ]
  },
  {
    id: '2',
    category: 'Project', // 👈 Marked as Project
    role: 'Animgrow',
    organization: 'AgriTech Venture',
    period: 'Jan 2026 - Present',
    type: 'Startup',
    status: 'Active',
    description: 'A Livestock-as-a-Service platform for remote animal rearing investments.',
    logoInitial: 'A',
    colorClass: 'bg-emerald-600',
    images: ["https://images.unsplash.com/photo-1484557985045-6f550bfd3962?q=80&w=2070&auto=format&fit=crop"],
    activities: [
      { id: 'b1', date: '2026-01-16', note: 'Submitted funding application.', type: 'Routine', status: 'done' }
    ]
  },
  {
    id: '3',
    category: 'Project', // 👈 Marked as Project
    role: 'Kura',
    organization: 'Personal Project',
    period: 'Jan 2026 - Present',
    type: 'Work',
    status: 'Active',
    description: 'Secure mobile electronic voting system built with Flutter.',
    logoInitial: 'K',
    colorClass: 'bg-indigo-600',
    activities: [
      { id: 'k1', date: '2026-01-04', note: 'Finalized architecture.', type: 'Routine', status: 'done' }
    ]
  },
  {
    id: '4',
    category: 'Engagement', // 👈 Marked as Engagement
    role: 'Resident Assistant',
    organization: 'Ashesi University',
    period: 'Sept 2025 - May 2026',
    type: 'Leadership',
    status: 'Active',
    description: 'Mentoring freshmen and managing hall activities.',
    logoInitial: 'R',
    colorClass: 'bg-red-700',
    activities: []
  },

  // --- 2. ARCHIVED ITEMS ---
  {
    id: '5',
    category: 'Project', // 👈 Marked as Project
    role: 'Poctor',
    organization: 'Health AI Concept',
    period: 'Dec 2025',
    type: 'Work',
    status: 'Completed',
    description: 'AI-powered Pocket Doctor for preliminary diagnosis.',
    logoInitial: 'P',
    colorClass: 'bg-teal-500',
    activities: []
  },
  {
    id: '6',
    category: 'Project', // 👈 Marked as Project
    role: 'Movie Recommender',
    organization: 'Data Science Course',
    period: 'Dec 2025',
    type: 'Education',
    status: 'Completed',
    description: 'Collaborative filtering recommendation engine.',
    logoInitial: 'M',
    colorClass: 'bg-violet-600',
    activities: []
  },
  {
    id: '7',
    category: 'Engagement', // 👈 Marked as Engagement
    role: 'Junior Firmware Intern',
    organization: 'AutoSense Ghana',
    period: 'Jun 2024 - Aug 2024',
    type: 'Work',
    status: 'Completed',
    description: 'IoT sensor calibration and STM32 programming.',
    logoInitial: 'A',
    colorClass: 'bg-orange-600',
    activities: []
  }
];