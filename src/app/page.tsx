'use client';

import { useState, useMemo, useEffect } from 'react';
import toast from 'react-hot-toast';
import JobOverviewSection from '@/components/dashboard/JobOverviewSection';
import PipelineToolbar from '@/components/dashboard/PipelineToolbar';
import CandidateTable from '@/components/dashboard/CandidateTable';
import CandidateBoard from '@/components/dashboard/CandidateBoard';
import CandidateDrawer from '@/components/dashboard/CandidateDrawer';
import AddCandidateModal from '@/components/dashboard/AddCandidateModal';
import Header from '@/components/layout/Header';
import { mockJobOverview, mockCandidates as initialCandidates } from '@/lib/mockData';
import { Candidate, CandidateStage } from '@/types';

type ViewMode = 'list' | 'board';

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [mockCandidates, setMockCandidates] = useState<Candidate[]>(initialCandidates);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<CandidateStage | 'All'>('All');
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenDrawer = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  const handleAddCandidate = (newCandidate: Candidate) => {
    setMockCandidates(prev => [newCandidate, ...prev]);
  };

  const handleUpdateCandidate = (updatedCandidate: Candidate) => {
    setMockCandidates(prev => prev.map(c => c.id === updatedCandidate.id ? updatedCandidate : c));
    if (selectedCandidate?.id === updatedCandidate.id) {
      setSelectedCandidate(updatedCandidate);
    }
  };

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            candidate.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (!matchesSearch) return false;
      if (selectedStage !== 'All' && candidate.stage !== selectedStage) return false;

      if (experienceFilter !== 'All') {
        const years = candidate.experienceYears;
        if (experienceFilter === 'Entry' && years > 2) return false;
        if (experienceFilter === 'Mid' && (years < 3 || years > 5)) return false;
        if (experienceFilter === 'Senior' && years < 6) return false;
      }

      return true;
    });
  }, [mockCandidates, searchQuery, selectedStage, experienceFilter]);

  if (!isClient) return null;

  return (
    <div className="flex flex-col h-full min-h-0">
      <Header breadcrumb="Jobs" subBreadcrumb="Engineering" title="Senior Frontend Engineer" />
      <div className="p-6 max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Candidate Pipeline</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 text-white text-sm font-medium rounded-lg transition-all shadow-sm flex items-center transform hover:scale-105"
        >
          + Add Candidate
        </button>
      </div>

      <JobOverviewSection job={mockJobOverview} />

      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm animate-pulse flex flex-col space-y-4">
          <div className="h-12 bg-slate-100 rounded-lg w-full mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-slate-100 rounded-full"></div>
              <div className="h-4 bg-slate-100 rounded flex-1"></div>
              <div className="h-4 bg-slate-100 rounded w-24"></div>
              <div className="h-4 bg-slate-100 rounded w-24"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="shadow-sm flex-1 flex flex-col min-h-0">
          <PipelineToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedStage={selectedStage}
            setSelectedStage={setSelectedStage}
            experienceFilter={experienceFilter}
            setExperienceFilter={setExperienceFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <div className="mt-4 flex-1 overflow-hidden h-full">
            {viewMode === 'list' ? (
              <CandidateTable 
                candidates={filteredCandidates} 
                onSelectCandidate={handleOpenDrawer} 
              />
            ) : (
              <CandidateBoard
                candidates={filteredCandidates}
                onSelectCandidate={handleOpenDrawer}
              />
            )}
          </div>
        </div>
      )}

      <CandidateDrawer 
        candidate={selectedCandidate} 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onUpdateCandidate={handleUpdateCandidate}
      />
      
      <AddCandidateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCandidate}
      />
      </div>
    </div>
  );
}
