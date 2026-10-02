import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, MapPin, Compass, UserCheck, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { destinations } from '../data/destinations';
import { experiences } from '../data/experiences';
import { providers } from '../data/providers';
import { Destination, Experience, Provider } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (destId: Destination['id']) => void;
  onSelectExperience: (exp: Experience) => void;
  onSelectProvider: (prov: Provider) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDestination,
  onSelectExperience,
  onSelectProvider
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'destinations' | 'experiences' | 'hosts'>('all');

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        destinations: destinations.slice(0, 3),
        experiences: experiences.slice(0, 3),
        providers: providers.slice(0, 3),
      };
    }

    return {
      destinations: destinations.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.region.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      ),
      experiences: experiences.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.destinationName.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.shortDesc.toLowerCase().includes(q)
      ),
      providers: providers.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.role.toLowerCase().includes(q) ||
        p.destinationName.toLowerCase().includes(q) ||
        p.languages.some(l => l.toLowerCase().includes(q))
      )
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-neutral-200 flex items-center gap-3 bg-[#FAF8F5]">
            <Search className="w-5 h-5 text-[#0F382C] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Swat, Kalam, trout cooking, local guides, Pashto..."
              className="w-full bg-transparent text-sm font-medium text-neutral-800 outline-none placeholder:text-neutral-400"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-neutral-400 hover:text-neutral-700 text-xs p-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Type Tabs */}
          <div className="px-4 py-2 border-b border-neutral-100 flex items-center gap-2 overflow-x-auto text-xs bg-white">
            <span className="text-neutral-400 text-[11px] font-semibold uppercase mr-1">Filter:</span>
            {[
              { id: 'all', label: 'All Results' },
              { id: 'destinations', label: 'Destinations' },
              { id: 'experiences', label: 'Experiences' },
              { id: 'hosts', label: 'Verified Hosts' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                  filterType === tab.id
                    ? 'bg-[#0F382C] text-white font-semibold'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div className="p-4 overflow-y-auto max-h-[60vh] space-y-6 text-xs">
            {/* Destinations Block */}
            {(filterType === 'all' || filterType === 'destinations') && filteredResults.destinations.length > 0 && (
              <div className="space-y-2">
                <div className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
                  Destinations ({filteredResults.destinations.length})
                </div>
                <div className="space-y-1.5">
                  {filteredResults.destinations.map(d => (
                    <button
                      key={d.id}
                      onClick={() => {
                        onClose();
                        onSelectDestination(d.id);
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-neutral-200 flex items-center justify-between text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-[#0F382C]" />
                        <div>
                          <span className="font-bold text-neutral-900 group-hover:text-[#0F382C]">{d.name}</span>
                          <span className="text-neutral-400 ml-2">({d.region})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-500">
                        <span className="text-[11px] font-semibold text-[#0F382C]">From PKR {d.startingPricePKR.toLocaleString()}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#0F382C]" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Experiences Block */}
            {(filterType === 'all' || filterType === 'experiences') && filteredResults.experiences.length > 0 && (
              <div className="space-y-2">
                <div className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
                  Authentic Experiences ({filteredResults.experiences.length})
                </div>
                <div className="space-y-1.5">
                  {filteredResults.experiences.map(e => (
                    <button
                      key={e.id}
                      onClick={() => {
                        onClose();
                        onSelectExperience(e);
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-neutral-200 flex items-center justify-between text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <Compass className="w-4 h-4 text-[#E28413]" />
                        <div>
                          <span className="font-bold text-neutral-900 group-hover:text-[#0F382C]">{e.title}</span>
                          <div className="text-[11px] text-neutral-500">Host: {e.hostName} · {e.duration}</div>
                        </div>
                      </div>
                      <span className="font-bold text-[#0F382C] tabular-nums">
                        PKR {e.pricePKR.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Hosts Block */}
            {(filterType === 'all' || filterType === 'hosts') && filteredResults.providers.length > 0 && (
              <div className="space-y-2">
                <div className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
                  Verified Local Custodians ({filteredResults.providers.length})
                </div>
                <div className="space-y-1.5">
                  {filteredResults.providers.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onClose();
                        onSelectProvider(p);
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-neutral-200 flex items-center justify-between text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <UserCheck className="w-4 h-4 text-emerald-700" />
                        <div>
                          <span className="font-bold text-neutral-900 group-hover:text-[#0F382C]">{p.name}</span>
                          <span className="text-neutral-400 ml-1.5 text-[11px]">({p.role} · {p.destinationName})</span>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] text-[#E28413] font-semibold">
                        <Star className="w-3 h-3 fill-[#E28413]" />
                        {p.rating}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredResults.destinations.length === 0 && 
             filteredResults.experiences.length === 0 && 
             filteredResults.providers.length === 0 && (
              <div className="text-center py-8 text-neutral-400">
                No matching results found for "{query}". Try "Swat", "Kalam", or "Trout".
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
