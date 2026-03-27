import { mockCandidates } from '@/lib/mockData';
import { Calendar as CalendarIcon, Clock, Users, Video } from 'lucide-react';
import Header from '@/components/layout/Header';

export default function InterviewsSchedule() {
  const interviewCandidates = mockCandidates
    .filter(c => c.stage === 'Interview' && c.interviewStatus && c.interviewStatus.includes('Scheduled'))
    .slice(0, 10); // Show next 10

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto">
      <Header breadcrumb="Workspace" title="Interviews" />
      <div className="p-6 max-w-7xl mx-auto flex flex-col w-full h-full">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Upcoming Interviews</h1>
          <p className="text-slate-500">You have {interviewCandidates.length} interviews scheduled across branches in India.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
          Sync Calendar
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 flex items-center">
            <CalendarIcon className="w-5 h-5 text-slate-400 mr-2" />
            This Week's Schedule
          </h3>
        </div>
        
        {interviewCandidates.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No upcoming interviews</h3>
            <p className="text-sm text-slate-500 mt-1">Check back later or schedule new ones from the pipeline.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {interviewCandidates.map(candidate => (
              <div key={candidate.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-start mb-4 md:mb-0">
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex flex-col items-center justify-center min-w-[70px] text-blue-700 mr-5">
                    <span className="text-xs font-semibold uppercase">Today</span>
                    <span className="text-lg font-bold">2:30</span>
                    <span className="text-xs">PM</span>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {candidate.name}
                    </h4>
                    <p className="text-sm text-slate-500 mb-2">{candidate.currentRole} • {candidate.location}</p>
                    <div className="flex items-center text-xs text-slate-500 space-x-4">
                      <span className="flex items-center">
                        <Video className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        Google Meet
                      </span>
                      <span className="flex items-center text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                        {candidate.interviewStatus}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 md:ml-4">
                  <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Reschedule
                  </button>
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                    Join Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
