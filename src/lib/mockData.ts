import { Candidate, JobOverview, CandidateStage } from '@/types';

export const mockJobOverview: JobOverview = {
  id: 'JOB-IND-2024',
  title: 'Senior Full Stack Engineer',
  department: 'Product & Engineering',
  location: 'Bangalore, India (Hybrid)',
  openPositions: 5,
  hiringManager: 'Harsh Yadav',
  totalApplicants: 1342
};

const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
  'Shaurya', 'Atharva', 'Ananya', 'Diya', 'Aditi', 'Priya', 'Riya', 'Anjali', 'Sneha', 'Pooja',
  'Neha', 'Kavya', 'Rahul', 'Rohit', 'Amit', 'Vikas', 'Manish', 'Sunil', 'Anil', 'Kiran',
  'Vikram', 'Siddharth', 'Rohan', 'Karan', 'Tarun', 'Nitin', 'Deepak', 'Rajesh', 'Sanjay', 'Ravi'
];

const lastNames = [
  'Sharma', 'Singh', 'Kumar', 'Patel', 'Gupta', 'Reddy', 'Rao', 'Desai', 'Joshi', 'Malhotra',
  'Yadav', 'Verma', 'Iyer', 'Menon', 'Nair', 'Chauhan', 'Rajput', 'Bose', 'Das', 'Chatterjee'
];

const cities = [
  'Bangalore, KA', 'Mumbai, MH', 'Pune, MH', 'Hyderabad, TS', 'Chennai, TN', 
  'Gurugram, HR', 'Noida, UP', 'Ahmedabad, GJ', 'Kolkata, WB', 'Indore, MP'
];

const companies = [
  'TCS', 'Infosys', 'Wipro', 'HCLTech', 'Tech Mahindra', 
  'Flipkart', 'Zomato', 'Swiggy', 'Paytm', 'Ola Cabs', 
  'Freshworks', 'Postman', 'Razorpay', 'Zerodha', 'CRED',
  'Amazon India', 'Microsoft India', 'Google India', 'Atlassian'
];

const roles = [
  'Frontend Developer', 'Backend Engineer', 'Full Stack Developer', 
  'UI/UX Designer', 'DevOps Engineer', 'QA Architect', 'Product Manager', 
  'Data Scientist', 'SDE II', 'Senior SDE'
];

const skillsDb = ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'PostgreSQL', 'Next.js', 'Tailwind', 'Python', 'Docker', 'Kubernetes', 'GraphQL', 'Redis', 'Kafka', 'Java', 'Spring Boot'];

const stages: CandidateStage[] = ['Applied', 'Shortlisted', 'Interview', 'Offered', 'Hired'];

// Deterministic random
let seed = 1234;
function random() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(random() * arr.length)];
}

function generatePhone() {
  return `+91 ${Math.floor(random() * 4 + 6)}${Math.floor(random() * 900 + 100)} ${Math.floor(random() * 900000 + 100000)}`;
}

export const mockCandidates: Candidate[] = Array.from({ length: 1000 }).map((_, i) => {
  const firstName = getRandom(firstNames);
  const lastName = getRandom(lastNames);
  const stage = stages[Math.floor(random() * stages.length)]; // spread evenly
  const experienceYears = Math.floor(random() * 12) + 1;
  const numSkills = Math.floor(random() * 4) + 3;
  const skills = Array.from({ length: numSkills }).map(() => getRandom(skillsDb)).filter((v, i, a) => a.indexOf(v) === i);
  
  let interviewStatus = 'Not Scheduled';
  if (stage === 'Interview') interviewStatus = 'Scheduled: Technical Round ' + (Math.floor(random() * 3) + 1);
  if (stage === 'Offered' || stage === 'Hired') interviewStatus = 'Completed';
  if (stage === 'Shortlisted') interviewStatus = 'Pending HR Screen';

  const notes = random() > 0.5 ? 'Good technical background, needs to be evaluated on system design.' : '';

  let lastActivity = '';
  if (stage === 'Applied') lastActivity = Math.floor(random() * 10 + 1) + ' days ago';
  if (stage === 'Shortlisted') lastActivity = Math.floor(random() * 48 + 1) + ' hours ago';
  if (stage === 'Interview') lastActivity = Math.floor(random() * 24 + 1) + ' hours ago';
  if (stage === 'Offered') lastActivity = Math.floor(random() * 3 + 1) + ' days ago';
  if (stage === 'Hired') lastActivity = Math.floor(random() * 2 + 1) + ' weeks ago';

  return {
    id: `c-ind-${i + 1000}`,
    name: `${firstName} ${lastName}`,
    currentRole: getRandom(roles),
    company: getRandom(companies),
    experienceYears,
    matchScore: Math.floor(random() * 35) + 60, // 60-95
    stage,
    lastActivity,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.in`,
    phone: generatePhone(),
    location: getRandom(cities),
    skills,
    notes: notes,
    interviewStatus
  };
});
