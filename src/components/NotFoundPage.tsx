import React from 'react';
import { ArrowLeft, Compass, Sparkles, MapPin } from 'lucide-react';

interface NotFoundPageProps {
  onReturnHome: () => void;
  onNavigateTab: (tab: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onReturnHome, onNavigateTab }) => {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#151D1A] flex flex-col justify-between pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto my-auto text-center space-y-8 py-12">
        <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#E28413] font-bold">
          ERROR 404 // ROUTE DISCONNECTED
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#0C2B22] leading-tight">
          Lost your way? <br />
          <span className="font-editorial italic font-normal text-[#B44A2D]">
            Every journey takes a wrong turn sometimes.
          </span>
        </h1>

        <p className="text-base text-neutral-600 max-w-lg mx-auto font-light leading-relaxed">
          The trail or page you are looking for has been moved or does not exist in our regional database. Let’s guide you back to verified destinations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onReturnHome}
            className="px-6 py-3.5 bg-[#0C2B22] hover:bg-[#144D3C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#E28413]" />
            <span>Return to DASTAN</span>
          </button>

          <button
            onClick={() => onNavigateTab('explore')}
            className="px-6 py-3.5 bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#0C2B22]" />
            <span>Explore Destinations</span>
          </button>
        </div>

        {/* Quick Links Directory */}
        <div className="pt-12 border-t border-neutral-200 max-w-md mx-auto grid grid-cols-3 gap-3 text-xs font-mono">
          <button
            onClick={() => onNavigateTab('explore')}
            className="p-3 bg-white rounded-xl border border-neutral-200 hover:border-[#0C2B22] transition-colors cursor-pointer text-neutral-700"
          >
            Destinations
          </button>
          <button
            onClick={() => onNavigateTab('experiences')}
            className="p-3 bg-white rounded-xl border border-neutral-200 hover:border-[#0C2B22] transition-colors cursor-pointer text-neutral-700"
          >
            Experiences
          </button>
          <button
            onClick={() => onNavigateTab('learn')}
            className="p-3 bg-white rounded-xl border border-neutral-200 hover:border-[#0C2B22] transition-colors cursor-pointer text-neutral-700"
          >
            Learn Pashto
          </button>
        </div>
      </div>
    </main>
  );
};
