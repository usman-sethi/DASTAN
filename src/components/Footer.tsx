import React from 'react';
import { Compass, ShieldCheck, HeartHandshake, Phone, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#151D1A] text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display tracking-tight text-white">
                DASTAN
              </span>
              <span className="text-sm font-nastaliq text-[#E28413] font-semibold">
                داستان
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              DASTAN connects travelers with verified local stays, guides, transport, and authentic cultural experiences across Pakistan. Every place has a story.
            </p>
            <div className="pt-2 flex items-center gap-3 text-neutral-400 text-[11px]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Verified Hosts
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-[#E28413]" />
                Direct Local Income
              </span>
              <span>·</span>
              <span>Khyber Pakhtunkhwa</span>
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Destinations
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-white transition-colors cursor-pointer">
                  Swat Valley (وادیٔ سوات)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-white transition-colors cursor-pointer">
                  Kalam Valley (کالام)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-white transition-colors cursor-pointer">
                  Chitral & Kalash (چترال)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-white transition-colors cursor-pointer">
                  Hunza Valley (ہنزہ)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-white transition-colors cursor-pointer">
                  Skardu & Deosai (سکردو)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Experience */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('planner')} className="hover:text-white transition-colors cursor-pointer">
                  Trip Studio Planner
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('experiences')} className="hover:text-white transition-colors cursor-pointer">
                  Culinary & Village Experiences
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('learn')} className="hover:text-white transition-colors cursor-pointer">
                  Learn Pashto & Dialects
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('safety')} className="hover:text-white transition-colors cursor-pointer">
                  Route Status & Safety
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('hosts')} className="hover:text-white transition-colors cursor-pointer">
                  Become a DASTAN Host
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Investor */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Verification & Support
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li className="text-neutral-400">
                24/7 KPK Tourism Police: <strong className="text-white">1422</strong>
              </li>
              <li className="text-neutral-400">
                Emergency Rescue: <strong className="text-white">1122</strong>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="text-[#E28413] hover:underline font-semibold cursor-pointer"
                >
                  Investor Model & Prototype Metrics →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © 2026 DASTAN Technologies Pvt. Ltd. All rights reserved. Built for cultural preservation and sustainable tourism in Pakistan.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
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
