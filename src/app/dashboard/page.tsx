import { mockCandidates, mockJobOverview } from '@/lib/mockData';
import { Users, UserPlus, Briefcase, Award } from 'lucide-react';
import Header from '@/components/layout/Header';

export default function DashboardSummary() {
  const total = mockCandidates.length;
  const interviewing = mockCandidates.filter(c => c.stage === 'Interview').length;
  const offered = mockCandidates.filter(c => c.stage === 'Offered').length;
  const hired = mockCandidates.filter(c => c.stage === 'Hired').length;

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto">
      <Header breadcrumb="Workspace" title="Dashboard Overview" />
      <div className="p-6 max-w-7xl mx-auto flex flex-col w-full h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back, Harsh 👋</h1>
        <p className="text-slate-500">Here's what's happening globally across all active roles today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Users, label: 'Total Candidates', value: total, color: 'text-blue-600', bg: 'bg-blue-100' },
          { icon: Briefcase, label: 'In Interviews', value: interviewing, color: 'text-purple-600', bg: 'bg-purple-100' },
          { icon: Award, label: 'Offers Extended', value: offered, color: 'text-amber-600', bg: 'bg-amber-100' },
          { icon: UserPlus, label: 'Hired Candidates', value: hired, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex-1">
        <h3 className="font-semibold text-slate-800 mb-4">Latest Hires across India</h3>
        <div className="space-y-4">
          {mockCandidates.filter(c => c.stage === 'Hired').slice(0, 5).map(hired => (
            <div key={hired.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex flex-col items-center justify-center">
                  {hired.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-slate-900">{hired.name}</p>
                  <p className="text-xs text-slate-500">{hired.currentRole} • {hired.location}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  Onboarding
                </span>
                <p className="text-xs text-slate-400 mt-1">{hired.lastActivity}</p>
              </div>
            </div>
          ))}
          {hired === 0 && <p className="text-sm text-slate-500">No candidates hired yet.</p>}
        </div>
      </div>
      </div>
    </div>
  );
}
