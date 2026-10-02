import React, { useState, useEffect } from 'react';
import { Search, Compass, Menu, X, ArrowUpRight } from 'lucide-react';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 45);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'explore', label: 'Destinations' },
    { id: 'map', label: 'Topography' },
    { id: 'trips', label: 'Trip Studio' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'learn', label: 'Language' },
    { id: 'safety', label: 'Safety' },
    { id: 'hosts', label: 'For Hosts' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0C2B22]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-2.5 text-white'
            : 'bg-transparent py-4 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('explore')}
              className="group flex items-baseline gap-2 text-left cursor-pointer focus-visible:outline-none"
            >
              <span className="text-xl sm:text-2xl font-black font-display tracking-tight text-white group-hover:text-[#FEF3C7] transition-colors">
                DASTAN
              </span>
              <span className="text-xs sm:text-sm font-nastaliq text-[#E28413] font-semibold">
                داستان
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 Clean editorial text nav links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-xs uppercase tracking-wider font-semibold transition-all relative py-1 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#FEF3C7]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E28413] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              aria-label="Search destinations, experiences, and verified guides"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline text-xs font-medium text-neutral-300">Search</span>
            </button>

            {/* My Trips Dashboard indicator */}
            <button
              onClick={() => handleNavClick('my-trips')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap border ${
                activeTab === 'my-trips'
                  ? 'bg-[#E28413] text-white border-[#E28413]'
                  : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
              }`}
            >
              <span>My Trips</span>
              {savedTripsCount > 0 && (
                <span className="bg-[#0C2B22] text-[#FEF3C7] text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
                  {savedTripsCount}
                </span>
              )}
            </button>

            {/* Plan Journey Primary CTA */}
            <button
              onClick={() => handleNavClick('planner')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E28413] hover:bg-[#d07409] text-white rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-xs"
            >
              <span>Plan Journey</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0C2B22]/98 backdrop-blur-xl px-5 pt-4 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold ${
                    activeTab === link.id
                      ? 'bg-white/15 text-[#FEF3C7]'
                      : 'text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => handleNavClick('my-trips')}
                className="text-left px-3 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold text-neutral-300 hover:bg-white/10 flex items-center justify-between"
              >
                <span>My Saved Trips</span>
                {savedTripsCount > 0 && (
                  <span className="bg-[#E28413] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {savedTripsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left px-3 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold text-[#E28413] hover:bg-white/10"
              >
                Prototype Metrics & Model
              </button>
            </div>

            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => handleNavClick('planner')}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#E28413] text-white rounded-lg text-xs font-bold shadow-xs uppercase tracking-wider"
              >
                <span>Start Your Journey</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
