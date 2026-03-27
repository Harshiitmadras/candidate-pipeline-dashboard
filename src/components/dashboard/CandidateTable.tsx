import { Candidate } from '@/types';
import { MoreVertical, CheckCircle2, Clock, Mail, Phone, Calendar as CalendarIcon, X, Search, FileEdit, Trash2, Mail as MailIcon, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface CandidateTableProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
}

export default function CandidateTable({ candidates, onSelectCandidate }: CandidateTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside() {
      setOpenMenuId(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (candidates.length === 0) {
    return (
      <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
          <Search className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">No candidates found</h3>
        <p className="text-sm text-slate-500 max-w-sm">
          We couldn't find any candidates matching your current filters. Try adjusting your search query or removing some filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl overflow-x-auto h-full min-h-[500px]">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 bg-slate-50/95 backdrop-blur z-10">
          <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <th className="px-6 py-4">Candidate</th>
            <th className="px-6 py-4">Experience</th>
            <th className="px-6 py-4">Match Score</th>
            <th className="px-6 py-4">Stage</th>
            <th className="px-6 py-4">Last Activity</th>
            <th className="px-4 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {candidates.map((candidate) => (
            <tr 
              key={candidate.id} 
              className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              onClick={() => onSelectCandidate(candidate)}
            >
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    {candidate.avatarUrl ? (
                      <img className="h-10 w-10 rounded-full object-cover" src={candidate.avatarUrl} alt="" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                        {candidate.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                      {candidate.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {candidate.currentRole} at {candidate.company}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-700">{candidate.experienceYears} years</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-slate-100 rounded-full h-2 mr-2 overflow-hidden">
                    <div 
                      className={cn(
                        "h-2 rounded-full",
                        candidate.matchScore >= 90 ? "bg-emerald-500" :
                        candidate.matchScore >= 75 ? "bg-blue-500" : "bg-amber-500"
                      )}
                      style={{ width: `${candidate.matchScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{candidate.matchScore}%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={cn(
                  "px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md border",
                  candidate.stage === 'Applied' && "bg-slate-100 text-slate-700 border-slate-200",
                  candidate.stage === 'Shortlisted' && "bg-purple-50 text-purple-700 border-purple-200",
                  candidate.stage === 'Interview' && "bg-blue-50 text-blue-700 border-blue-200",
                  candidate.stage === 'Offered' && "bg-amber-50 text-amber-700 border-amber-200",
                  candidate.stage === 'Hired' && "bg-emerald-50 text-emerald-700 border-emerald-200"
                )}>
                  {candidate.stage}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                {candidate.lastActivity}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === candidate.id ? null : candidate.id);
                  }}
                  className="text-slate-400 hover:text-slate-600 focus:text-blue-600 focus:bg-blue-50 focus:outline-none p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                
                {openMenuId === candidate.id && (
                  <div 
                    className="absolute right-8 top-full -mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 z-10 py-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button 
                      onClick={() => {
                        onSelectCandidate(candidate);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center transition-colors"
                    >
                      <UserIcon className="w-4 h-4 mr-2 text-slate-400" />
                      View Profile
                    </button>
                    <button 
                      onClick={() => {
                        toast.success(`Emailed ${candidate.name}`);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center transition-colors"
                    >
                      <MailIcon className="w-4 h-4 mr-2 text-slate-400" />
                      Email Candidate
                    </button>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <button 
                      onClick={() => {
                        toast.error(`${candidate.name} has been rejected.`);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-2 text-red-400" />
                      Reject Candidate
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
