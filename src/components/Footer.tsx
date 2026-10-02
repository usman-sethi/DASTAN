import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0C2B22] text-neutral-400 text-xs border-t border-white/10 relative overflow-hidden">
      {/* Visual atmospheric transition gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        {/* Massive Editorial Climax Statement */}
        <div className="pb-20 border-b border-white/10 max-w-4xl">
          <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#E28413] mb-4">
            ACT V / YOUR STORY
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight leading-[0.98]">
            Your next story <br />
            <span className="font-editorial italic font-normal text-[#FEF3C7]">is waiting.</span>
          </h2>
          <div className="mt-8">
            <button
              onClick={() => onSelectTab('planner')}
              className="px-8 py-4 bg-[#E28413] hover:bg-[#d07409] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Begin Your Journey</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold font-display tracking-tight text-white">
                DASTAN
              </span>
              <span className="font-nastaliq text-2xl text-[#E28413] font-semibold">
                داستان
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm font-light">
              Connecting mindful travelers with verified stays, generational guides, dedicated mountain transport, and authentic cultural masterclasses across Pakistan.
            </p>
            <div className="pt-2 flex items-center gap-3 text-neutral-400 font-mono text-[11px]">
              <span>KHYBER PAKHTUNKHWA</span>
              <span aria-hidden="true">·</span>
              <span>GILGIT-BALTISTAN</span>
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div className="space-y-3 font-mono text-[11px]">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              Destinations
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Swat Valley (وادیٔ سوات)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Kalam Valley (کالام)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Chitral & Kalash (چترال)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Hunza Valley (ہنزہ)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Skardu & Deosai (سکردو)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform */}
          <div className="space-y-3 font-mono text-[11px]">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              Platform
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onSelectTab('planner')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Trip Studio Planner
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('experiences')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Culinary & Artisan Masterclasses
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('learn')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Learn Pashto & Khowar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('safety')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Live Mountain Road Status
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('hosts')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Join Provider Guild
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Dispatch & Prototype Review */}
          <div className="space-y-3 font-mono text-[11px]">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              Dispatch & Helplines
            </h4>
            <ul className="space-y-2.5">
              <li className="text-neutral-400">
                KP Tourism Police: <strong className="text-white">1422</strong>
              </li>
              <li className="text-neutral-400">
                Emergency Rescue: <strong className="text-white">1122</strong>
              </li>
              <li className="text-neutral-400">
                Motorway Police: <strong className="text-white">130</strong>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="text-[#E28413] hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Investor Model & Metrics</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimal Legal & Technical Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div>
            © 2026 DASTAN Technologies Pvt. Ltd. Verified cultural tourism infrastructure for Pakistan.
          </div>

          <div className="flex items-center gap-6">
            <span>86% DIRECT CUSTODIAN VALUE</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
