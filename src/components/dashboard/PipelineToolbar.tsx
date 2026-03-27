'use client';

import { Search, Filter, SlidersHorizontal, ArrowDownAZ, LayoutList, KanbanSquare } from 'lucide-react';
import { CandidateStage } from '@/types';

type ViewMode = 'list' | 'board';

interface PipelineToolbarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedStage: CandidateStage | 'All';
  setSelectedStage: (val: CandidateStage | 'All') => void;
  experienceFilter: string;
  setExperienceFilter: (val: string) => void;
  viewMode: ViewMode;
  setViewMode: (val: ViewMode) => void;
}

export default function PipelineToolbar({
  searchQuery,
  setSearchQuery,
  selectedStage,
  setSelectedStage,
  experienceFilter,
  setExperienceFilter,
  viewMode,
  setViewMode,
}: PipelineToolbarProps) {
  const stages: (CandidateStage | 'All')[] = ['All', 'Applied', 'Shortlisted', 'Interview', 'Offered', 'Hired'];

  return (
    <div className="bg-white border border-slate-200 rounded-t-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center space-x-2 flex-1">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates by name, role..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Stage Filter tabs/pills */}
        <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedStage === stage
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Mobile Stage dropdown */}
        <select 
          className="lg:hidden pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value as CandidateStage | 'All')}
        >
          {stages.map((stage) => (
            <option key={stage} value={stage}>{stage}</option>
          ))}
        </select>

        {/* Experience Dropdown */}
        <div className="relative">
          <select
            className="appearance-none pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
          >
            <option value="All">Any Experience</option>
            <option value="Entry">Entry Level (0-2y)</option>
            <option value="Mid">Mid Level (3-5y)</option>
            <option value="Senior">Senior (6+y)</option>
          </select>
          <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <SlidersHorizontal className="w-4 h-4 mr-2 text-slate-400" />
          More Filters
        </button>

        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 ml-auto md:ml-4">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            title="List View"
          >
            <LayoutList className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('board')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'board' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            title="Board View"
          >
            <KanbanSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
