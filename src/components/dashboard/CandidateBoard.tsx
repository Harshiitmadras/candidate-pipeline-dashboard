import { Candidate, CandidateStage } from '@/types';
import { cn } from '@/lib/utils';
import { Clock, MessageSquare, Paperclip } from 'lucide-react';

interface CandidateBoardProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
}

const STAGES: CandidateStage[] = ['Applied', 'Shortlisted', 'Interview', 'Offered', 'Hired'];

export default function CandidateBoard({ candidates, onSelectCandidate }: CandidateBoardProps) {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-6 h-full min-h-[500px]">
      {STAGES.map((stage) => {
        const stageCandidates = candidates.filter(c => c.stage === stage);
        
        return (
          <div key={stage} className="flex-1 min-w-[300px] bg-slate-100/50 rounded-xl p-3 border border-slate-200 flex flex-col">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="font-semibold text-slate-800">{stage}</h3>
              <span className="text-xs font-medium bg-white text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
                {stageCandidates.length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3">
              {stageCandidates.map(candidate => (
                <div 
                  key={candidate.id}
                  onClick={() => onSelectCandidate(candidate)}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {candidate.name}
                        </h4>
                        <p className="text-xs text-slate-500">{candidate.currentRole}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {candidate.skills.slice(0, 2).map(skill => (
                      <span key={skill} className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 2 && (
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">
                        +{candidate.skills.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <MessageSquare className="w-3.5 h-3.5 mr-1" />
                        {candidate.notes ? 1 : 0}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {candidate.lastActivity.replace(' ago', '')}
                    </div>
                  </div>
                </div>
              ))}
              
              {stageCandidates.length === 0 && (
                <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm font-medium">
                  Drop candidates here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
