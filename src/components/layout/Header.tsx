'use client';
import { Bell, Search, ChevronDown, User as UserIcon, Settings, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

interface HeaderProps {
  breadcrumb?: string;
  subBreadcrumb?: string;
  title?: string;
}

export default function Header({ breadcrumb = 'Workspace', subBreadcrumb, title }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching workspace for: ${searchQuery}`);
    }
  };

  const handleLogout = () => {
    toast.success('Signed out successfully! (Mock)');
    setShowProfileMenu(false);
  };

  const handleProfileUpdate = () => {
    toast.success('Opened Profile Editor (Mock)');
    setShowProfileMenu(false);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center flex-1">
        <div className="flex flex-col">
          <div className="flex items-center text-sm text-slate-500">
            <span className="hover:text-slate-900 cursor-pointer">{breadcrumb}</span>
            {subBreadcrumb && (
              <>
                <span className="mx-2">/</span>
                <span className="hover:text-slate-900 cursor-pointer">{subBreadcrumb}</span>
              </>
            )}
            {title && (
              <>
                <span className="mx-2">/</span>
                <span className="text-slate-900 font-medium">{title}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across workspace..." 
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-64"
          />
        </form>
        
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 text-slate-400 hover:text-slate-600 focus:text-blue-600 hover:bg-slate-100 focus:bg-blue-50 focus:outline-none rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">Notifications</h3>
                <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                  <p className="text-sm text-slate-800 font-medium">Theresa Webb accepted offer</p>
                  <p className="text-xs text-slate-500 mt-1">10 minutes ago</p>
                </div>
                <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                  <p className="text-sm text-slate-800 font-medium">Interview scheduled with Priyanka</p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-2 p-1.5 focus:outline-none rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-medium text-white shadow-sm ring-2 ring-white">
              HY
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50 py-1">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-900">Harsh Yadav</p>
                <p className="text-xs text-slate-500 truncate">harsh.yadav@recruitsaas.in</p>
              </div>
              <button 
                onClick={handleProfileUpdate}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center transition-colors"
              >
                <UserIcon className="w-4 h-4 mr-2 text-slate-400" />
                Profile Details
              </button>
              <button 
                onClick={() => { toast.success('Settings Opened'); setShowProfileMenu(false); }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center transition-colors"
              >
                <Settings className="w-4 h-4 mr-2 text-slate-400" />
                Preferences
              </button>
              <div className="h-px bg-slate-100 my-1"></div>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2 text-red-400" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
