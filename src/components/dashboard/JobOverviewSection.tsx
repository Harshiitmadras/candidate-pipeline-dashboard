import { JobOverview } from '@/types';
import { MapPin, Users, User, Briefcase } from 'lucide-react';

interface JobOverviewProps {
  job: JobOverview;
}

export default function JobOverviewSection({ job }: JobOverviewProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
              Active
            </span>
          </div>
          
          <div className="flex flex-wrap items-center text-sm text-slate-500 gap-y-2 gap-x-6 mt-4">
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-1.5 text-slate-400" />
              {job.department}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1.5 text-slate-400" />
              {job.location}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1.5 text-slate-400" />
              Hiring Manager: {job.hiringManager}
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mt-6 md:mt-0">
          <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center min-w-[120px] border border-slate-100">
            <span className="text-3xl font-bold text-blue-600">{job.openPositions}</span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Open Roles</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center min-w-[120px] border border-slate-100">
            <span className="text-3xl font-bold text-slate-700">{job.totalApplicants}</span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Applicants</span>
          </div>
        </div>
      </div>
    </div>
  );
}
