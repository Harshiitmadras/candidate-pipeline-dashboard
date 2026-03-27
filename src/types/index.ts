export type CandidateStage = 'Applied' | 'Shortlisted' | 'Interview' | 'Offered' | 'Hired';

export interface Candidate {
  id: string;
  name: string;
  currentRole: string;
  company: string;
  experienceYears: number;
  matchScore: number;
  stage: CandidateStage;
  lastActivity: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  notes?: string;
  interviewStatus?: string;
}

export interface JobOverview {
  id: string;
  title: string;
  department: string;
  location: string;
  openPositions: number;
  hiringManager: string;
  totalApplicants: number;
}
