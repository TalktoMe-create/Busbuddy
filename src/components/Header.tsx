import React from 'react';
import { Bus, Clock } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentTime: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, currentTime }) => {
  const navItems = [
    { id: 'bus', label: 'Bus' },
    { id: 'stops', label: 'Bus Stops' },
    { id: 'routes', label: 'Routes' },
    { id: 'favourites', label: 'Favourites' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          id="brand-logo"
          onClick={() => setActiveTab('bus')}
          className="flex items-center space-x-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0f3b57] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <Bus className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0f3b57]">
            BusBuddy
          </span>
        </div>

        {/* Right Navigation */}
        <nav className="flex items-center space-x-1 sm:space-x-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-colors relative ${
                activeTab === item.id
                  ? 'text-[#0f3b57] bg-slate-100/80'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#0f3b57] rounded-full" />
              )}
            </button>
          ))}

          {/* Current Live Time */}
          <div className="hidden md:flex items-center text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md ml-2 border border-slate-200/70">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
            {currentTime}
          </div>
        </nav>
      </div>
    </header>
  );
};
