'use client';

import { Candidate, CandidateStage } from '@/types';
import { X, Mail, Phone, MapPin, Calendar, FileText, ExternalLink, Award, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface CandidateDrawerProps {
  candidate: Candidate | null;
  onClose: () => void;
  isOpen: boolean;
  onUpdateCandidate: (c: Candidate) => void;
}

export default function CandidateDrawer({ candidate, onClose, isOpen, onUpdateCandidate }: CandidateDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!candidate) return null;

  const handleAdvanceStage = () => {
    const stages: CandidateStage[] = ['Applied', 'Shortlisted', 'Interview', 'Offered', 'Hired'];
    const currentIndex = stages.indexOf(candidate.stage);
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];
      onUpdateCandidate({ ...candidate, stage: nextStage, lastActivity: 'Just now' });
      toast.success(`${candidate.name} advanced to ${nextStage}!`, { icon: '🚀' });
    } else {
      toast.error(`${candidate.name} is already Hired.`);
    }
  };

  const handleScheduleInterview = () => {
    onUpdateCandidate({ 
      ...candidate, 
      interviewStatus: 'Scheduled: Mock Interview (Tomorrow)' 
    });
    toast.success(`Interview scheduled for ${candidate.name}!`, { icon: '📅' });
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 w-full md:w-[540px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Candidate Profile</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Header Profile */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-bold flex-shrink-0">
                  {candidate.name.charAt(0)}
                </div>
                <div className="ml-5">
                  <h1 className="text-2xl font-bold text-slate-900 mb-1">{candidate.name}</h1>
                  <p className="text-slate-600 font-medium">{candidate.currentRole}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{candidate.company}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={cn(
                  "px-3 py-1 inline-flex text-xs font-semibold rounded-md border mb-2",
                  candidate.stage === 'Applied' && "bg-slate-100 text-slate-700 border-slate-200",
                  candidate.stage === 'Shortlisted' && "bg-purple-50 text-purple-700 border-purple-200",
                  candidate.stage === 'Interview' && "bg-blue-50 text-blue-700 border-blue-200",
                  candidate.stage === 'Offered' && "bg-amber-50 text-amber-700 border-amber-200",
                  candidate.stage === 'Hired' && "bg-emerald-50 text-emerald-700 border-emerald-200"
                )}>
                  {candidate.stage}
                </span>
                <span className="text-xs text-slate-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Updated {candidate.lastActivity}
                </span>
              </div>
            </div>

            {/* Match Score */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-8 flex items-center">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-700 font-bold bg-emerald-50 mr-4">
                {candidate.matchScore}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Excellent Match</h3>
                <p className="text-xs text-slate-500 mt-0.5">Based on skills and experience fit for Senior Frontend Engineer</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center text-sm text-slate-600">
                <Mail className="w-4 h-4 mr-3 text-slate-400" />
                <a href={`mailto:${candidate.email}`} className="hover:text-blue-600 transition-colors">{candidate.email}</a>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Phone className="w-4 h-4 mr-3 text-slate-400" />
                {candidate.phone}
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <MapPin className="w-4 h-4 mr-3 text-slate-400" />
                {candidate.location}
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Award className="w-4 h-4 mr-3 text-slate-400" />
                {candidate.experienceYears} Years Experience
              </div>
            </div>

            {/* Skills Tags */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center">
                Skills & Experience
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-md text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interview Status */}
            {candidate.interviewStatus && (
              <div className="mb-8 border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center">
                  <Calendar className="w-4 h-4 text-slate-500 mr-2" />
                  <h3 className="text-sm font-semibold text-slate-800">Interview Status</h3>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex items-start">
                    <div className="mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{candidate.interviewStatus}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {candidate.notes && (
              <div className="mb-8 border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center">
                  <FileText className="w-4 h-4 text-slate-500 mr-2" />
                  <h3 className="text-sm font-semibold text-slate-800">Team Notes</h3>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-sm text-slate-600 leading-relaxed">{candidate.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center space-x-3 mt-auto">
          <button 
            onClick={handleAdvanceStage}
            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={candidate.stage === 'Hired'}
          >
            Advance Stage
          </button>
          <button 
            onClick={handleScheduleInterview}
            className="flex-1 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 active:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Schedule Interview
          </button>
          <button 
            onClick={() => toast.success('External profile opened!')}
            className="p-2.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}
