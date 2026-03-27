'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import { mockCandidates } from '@/lib/mockData';
import { Mail, Phone, MapPin, Briefcase, Calendar, ChevronLeft, ChevronRight, Search, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 24;

export default function CandidatesDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE);
  const currentCandidates = filteredCandidates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEmail = (email: string) => {
    toast.success(`Drafting email to ${email}...`);
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto bg-slate-50/50">
      <Header breadcrumb="Workspace" title="Global Candidate Database" />
      
      <div className="p-6 max-w-[1600px] mx-auto w-full flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">All Candidates</h1>
            <p className="text-slate-500 mt-1">
              Browsing {filteredCandidates.length} candidate profiles across all roles.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search candidates by name, role, or company..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-4 py-2.5 w-full md:w-80 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <button 
              onClick={() => toast.success('Modal opened! (Demo)')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-sm shrink-0"
            >
              + Add Candidate
            </button>
          </div>
        </div>

        {filteredCandidates.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No candidates found</h3>
            <p className="text-slate-500 max-w-sm">
              We couldn't find any candidates matching "{searchQuery}". Try adjusting your search keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 ml:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCandidates.map(candidate => (
              <div 
                key={candidate.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group"
              >
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-lg font-bold text-slate-700">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-1" title={candidate.name}>
                          {candidate.name}
                        </h3>
                        <p className="text-sm text-blue-600 font-medium line-clamp-1">{candidate.currentRole}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-5">
                    <div className="flex items-center text-sm text-slate-600">
                      <Briefcase className="w-4 h-4 mr-3 text-slate-400 shrink-0" />
                      <span className="truncate">{candidate.company}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mr-3 text-slate-400 shrink-0" />
                      <span className="truncate">{candidate.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="w-4 h-4 mr-3 text-slate-400 shrink-0" />
                      <span>{candidate.experienceYears} Years Experience</span>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {candidate.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="px-2.5 py-1 bg-slate-50 text-slate-500 text-xs font-medium rounded-full border border-slate-200">
                        +{candidate.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={cn(
                      "px-2.5 py-1 text-xs font-semibold rounded-lg border",
                      candidate.stage === 'Applied' && "bg-slate-100 text-slate-700 border-slate-200",
                      candidate.stage === 'Shortlisted' && "bg-purple-50 text-purple-700 border-purple-200",
                      candidate.stage === 'Interview' && "bg-blue-50 text-blue-700 border-blue-200",
                      candidate.stage === 'Offered' && "bg-amber-50 text-amber-700 border-amber-200",
                      candidate.stage === 'Hired' && "bg-emerald-50 text-emerald-700 border-emerald-200"
                    )}>
                      {candidate.stage}
                    </span>
                    <span className="text-xs text-slate-400 font-medium block">
                      {candidate.matchScore}% Match
                    </span>
                  </div>

                  <div className="flex space-x-1">
                    <button 
                      onClick={() => handleEmail(candidate.email)}
                      title="Email Candidate"
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 focus:outline-none rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => toast.success(`Viewing ${candidate.name}'s resume...`)}
                      title="View Resume"
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 focus:outline-none rounded-lg transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-semibold text-slate-900">{Math.min(currentPage * ITEMS_PER_PAGE, filteredCandidates.length)}</span> of <span className="font-semibold text-slate-900">{filteredCandidates.length}</span> candidates
            </p>
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
