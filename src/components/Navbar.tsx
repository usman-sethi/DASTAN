import React, { useState } from 'react';
import { Search, Compass, Menu, X, Briefcase, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  savedTripsCount: number;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  savedTripsCount,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'explore', label: 'Explore' },
    { id: 'trips', label: 'Trips' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'learn', label: 'Learn' },
    { id: 'safety', label: 'Travel Advisory' },
    { id: 'hosts', label: 'For Hosts' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      {/* Subtle Demo Banner */}
      <div className="bg-[#0F382C] text-neutral-100 text-xs px-4 py-1.5 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E28413] animate-pulse" />
          <span className="truncate">
            <strong className="text-[#FEF3C7] font-semibold">DEMO MODE:</strong> Pakistan Cultural Tourism Prototype — Verified Places, People & Language
          </span>
          <div className="ml-auto hidden sm:flex items-center gap-4 text-[11px] text-neutral-300">
            <button 
              onClick={onOpenAdmin}
              className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Demo Metrics & Model
            </button>
            <span>KP Tourism Focus</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar: Strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element with subtle Nastaliq story mark) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleNavClick('explore')}
            className="group flex items-baseline gap-2 text-left cursor-pointer focus-visible:outline-none"
          >
            <span className="text-2xl font-bold font-display tracking-tight text-[#0F382C] group-hover:text-[#164E3D] transition-colors">
              DASTAN
            </span>
            <span className="text-sm font-nastaliq text-[#E28413] font-semibold">
              داستان
            </span>
          </button>
        </div>

        {/* Zone 2: 4–6 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
                  isActive ? 'text-[#0F382C] font-semibold' : 'text-neutral-600 hover:text-[#0F382C]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F382C] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1–2 Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-neutral-600 hover:text-[#0F382C] hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            aria-label="Search destinations, experiences, and verified guides"
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline text-xs font-medium text-neutral-500">Search</span>
          </button>

          {/* My Trips Dashboard indicator */}
          <button
            onClick={() => handleNavClick('my-trips')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'my-trips'
                ? 'bg-[#0F382C] text-white'
                : 'bg-[#EBF3EF] text-[#0F382C] hover:bg-[#DCEAE3]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>My Trips</span>
            {savedTripsCount > 0 && (
              <span className="bg-[#E28413] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {savedTripsCount}
              </span>
            )}
          </button>

          {/* Start Journey CTA */}
          <button
            onClick={() => handleNavClick('planner')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0F382C] hover:bg-[#164E3D] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            <Compass className="w-3.5 h-3.5 text-[#E28413]" />
            <span>Plan Journey</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-[#0F382C] rounded-lg transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-[#FAF8F5] px-4 pt-3 pb-5 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                  activeTab === link.id
                    ? 'bg-[#EBF3EF] text-[#0F382C] font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('my-trips')}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#0F382C]" />
                My Saved Trips
              </span>
              {savedTripsCount > 0 && (
                <span className="bg-[#E28413] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {savedTripsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#E28413] hover:bg-[#FEF3C7]/40 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Demo Business Model & Metrics
            </button>
          </div>
          <div className="pt-2 border-t border-neutral-200">
            <button
              onClick={() => handleNavClick('planner')}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0F382C] text-white rounded-lg text-sm font-semibold shadow-xs"
            >
              <Compass className="w-4 h-4 text-[#E28413]" />
              Start Your Journey
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
