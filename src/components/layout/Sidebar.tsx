'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Briefcase, Calendar, Settings } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const linkClass = (path: string) => {
    if (isActive(path)) {
      return "flex items-center px-3 py-2.5 rounded-lg bg-blue-600/10 text-blue-400 font-medium transition-colors group";
    }
    return "flex items-center px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white text-slate-300 transition-colors group";
  };

  const iconClass = (path: string) => {
    if (isActive(path)) {
      return "w-5 h-5 mr-3 text-blue-500";
    }
    return "w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-400";
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 text-white font-bold text-xl tracking-tight">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white text-lg leading-none">R</span>
        </div>
        RecruitSaaS
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
        <nav className="space-y-1">
          <Link href="/dashboard" className={linkClass('/dashboard')}>
            <LayoutDashboard className={iconClass('/dashboard')} />
            Dashboard
          </Link>
          <Link href="/" className={linkClass('/')}>
            <Briefcase className={iconClass('/')} />
            Jobs
          </Link>
          <Link href="/candidates" className={linkClass('/candidates')}>
            <Users className={iconClass('/candidates')} />
            Candidates
          </Link>
          <Link href="/interviews" className={linkClass('/interviews')}>
            <Calendar className={iconClass('/interviews')} />
            Interviews
          </Link>
        </nav>

        <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-8 mb-2">Settings</p>
        <nav className="space-y-1">
          <Link href="/settings" className={linkClass('/settings')}>
            <Settings className={iconClass('/settings')} />
            Configuration
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-white">
            HY
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Harsh Yadav</p>
            <p className="text-xs text-slate-500">Hiring Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
