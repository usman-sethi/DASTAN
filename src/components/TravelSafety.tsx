import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Phone, CloudSun, Compass, ShieldCheck } from 'lucide-react';
import { roadStatuses, emergencyContacts } from '../data/safety';

export const TravelSafety: React.FC = () => {
  return (
    <section id="safety-section" className="py-20 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              <ShieldAlert className="w-4 h-4 text-emerald-700" />
              <span>Traveler Safety & Road Operations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#151D1A]">
              Real-time route & safety dashboard.
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-xl font-light">
              Mountain weather changes swiftly. We track all major road passes, tunnels, and emergency resources in coordination with KPK Tourism Police.
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-neutral-200 px-4 py-2 rounded-xl text-xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-neutral-700 font-semibold">Live Mock Dispatch Feed Active</span>
          </div>
        </div>

        {/* 2-Column Grid: Road Statuses + Emergency Services */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Column 1: Road Arteries & Passes Status (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Key Highway & Mountain Route Status
              </h3>
              <span className="text-[11px] text-neutral-400">Refreshed every 30 minutes</span>
            </div>

            <div className="space-y-3">
              {roadStatuses.map((item, idx) => {
                const isOpen = item.condition === 'open';
                const isAdvisory = item.condition === 'advisory';

                return (
                  <div
                    key={idx}
                    className="p-4 bg-[#FAF8F5] rounded-xl border border-neutral-200/90 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {isOpen && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {isAdvisory && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900">{item.route}</h4>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                        {item.note}
                      </p>
                      <div className="text-[11px] text-neutral-400 pl-6 pt-0.5">
                        {item.lastChecked}
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md shrink-0 uppercase tracking-wider ${
                        isOpen
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.condition}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: 24/7 Emergency Helplines & SOS (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Immediate Assistance & Emergency Helplines
            </h3>

            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-neutral-200 space-y-4">
              {emergencyContacts.map((contact, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-xl border border-neutral-200 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-neutral-900">{contact.service}</div>
                    <div className="text-[11px] text-neutral-500">{contact.notes}</div>
                    <div className="text-[10px] text-emerald-700 font-medium">{contact.availability}</div>
                  </div>

                  <a
                    href={`tel:${contact.number.replace(/\D/g, '')}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F382C] text-white rounded-lg text-xs font-bold hover:bg-[#164E3D] transition-colors shrink-0"
                  >
                    <Phone className="w-3 h-3 text-[#E28413]" />
                    <span>{contact.number}</span>
                  </a>
                </div>
              ))}

              <div className="p-3.5 bg-[#FEF3C7]/60 rounded-xl border border-[#FDE68A] text-xs text-[#78350F] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <p className="leading-snug">
                  Every confirmed traveler on DASTAN is registered with the regional Tourism Police checkpoint at Dargai/Malakand for rapid support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
