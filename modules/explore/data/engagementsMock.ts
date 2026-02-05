export interface Activity {
  id: string;
  date: string;
  note: string;
  type?: 'Win' | 'Challenge' | 'Routine' | 'Unprocessed'; // Optional type
}

export interface Engagement {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: 'Work' | 'Education' | 'Volunteering' | 'Leadership';
  status: 'Active' | 'Completed';
  description: string;
  logoInitial: string;
  colorClass: string;
  images?: string[];
  links?: { label: string; url: string }[];
  // 👇 NEW FIELDS
  activities: Activity[]; 
  finalSummary?: string; 
  cvBullets?: string[]; // 👈 NEW: Array of resume-ready bullet points
}

export const ENGAGEMENTS_MOCK: Engagement[] = [
  {
    id: '1',
    role: 'Co-Founder & Lead Developer',
    organization: 'BinByte Technologies',
    period: 'Dec 2025 - Present',
    type: 'Work',
    status: 'Active',
    description: 'Leading a team of developers to build software solutions. Established the company alongside other students from KNUST and Legon to provide tech training and project development.',
    logoInitial: 'B',
    colorClass: 'bg-blue-600',
    images: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
    ],
    links: [
      { label: 'Visit Website', url: 'https://binbyte.dev' },
      { label: 'LinkedIn', url: '#' }
    ],
    // 👇 PRE-FILLED ACTIVITY EXAMPLES
    activities: [
      { id: 'a1', date: '2026-02-01', note: 'Successfully deployed the new client dashboard using Docker.', type: 'Win' },
      { id: 'a2', date: '2026-01-28', note: 'Had a difficult meeting regarding timeline delays.', type: 'Challenge' }
    ]
  },
  {
    id: '2',
    role: 'Resident Assistant',
    organization: 'Ashesi University',
    period: 'Sept 2025 - May 2026',
    type: 'Leadership',
    status: 'Active',
    description: 'Selected for the Student Life and Excellence (SLE) program. Responsible for fostering a supportive residential community and mentoring younger students.',
    logoInitial: 'A',
    colorClass: 'bg-red-800',
    activities: []
  },
  {
    id: '3',
    role: 'Founder',
    organization: 'Animgrow',
    period: 'Jan 2026 - Present',
    type: 'Work',
    status: 'Active',
    description: 'Developing a "Livestock-as-a-Service" platform. Leveraging 10+ years of personal experience in rearing goats and sheep to build a tech-enabled agricultural solution.',
    logoInitial: 'L',
    colorClass: 'bg-green-600',
    activities: []
  },
  {
    id: '4',
    role: 'Senior Computer Engineering Student',
    organization: 'Ashesi University',
    period: '2022 - 2026',
    type: 'Education',
    status: 'Active',
    description: 'Major in Computer Engineering. Focusing on Embedded Systems, Machine Learning, and Software Engineering principles.',
    logoInitial: 'U',
    colorClass: 'bg-slate-700',
    activities: []
  },
  // 👇 NEW COMPLETED EXAMPLE (For testing the CV View)
  {
    id: '99',
    role: 'Junior Firmware Intern',
    organization: 'AutoSense Ghana',
    period: 'Jun 2024 - Aug 2024',
    type: 'Work',
    status: 'Completed',
    description: 'Summer internship focusing on IoT sensor calibration and data logging systems.',
    logoInitial: 'A',
    colorClass: 'bg-indigo-600',
    activities: [
      { id: '1', date: '2024-08-20', note: 'Final presentation to the engineering lead.', type: 'Win' },
      { id: '2', date: '2024-07-15', note: 'Fixed the I2C timing issue on the sensor board.', type: 'Win' },
      { id: '3', date: '2024-06-10', note: 'Struggled with legacy codebase documentation.', type: 'Challenge' }
    ],
    finalSummary: "During this internship, Francis transitioned from academic theory to practical firmware debugging. He took ownership of the sensor calibration module, reducing data drift by 15%. His ability to navigate legacy codebases and document his findings was highlighted as a key contribution.",
    cvBullets: [
      "Engineered a C++ calibration routine for IoT sensors, improving data accuracy by 15% across 50+ deployed units.",
      "Resolved critical I2C communication latency issues by optimizing interrupt handling in the firmware layer.",
      "Refactored legacy codebase and produced 20+ pages of technical documentation, reducing onboarding time for future interns."
    ]
  }
];