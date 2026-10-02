import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, Users, ShieldCheck, Star, DollarSign, PieChart, Sparkles, Building } from 'lucide-react';

interface AdminDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDemoModal: React.FC<AdminDemoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col"
        >
          {/* Header Bar */}
          <div className="bg-[#0F382C] text-white p-6 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FEF3C7] uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-[#E28413]" />
                <span>Executive & Investor Overview</span>
              </div>
              <h2 className="text-2xl font-bold font-display">
                DASTAN Platform Unit Economics & Metrics
              </h2>
              <div className="mt-1 text-xs text-amber-300 font-bold bg-amber-400/20 inline-block px-2.5 py-0.5 rounded">
                DEMO DATA — Prototype Metrics for Competition Judges
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Metric Cards Grid */}
          <div className="p-6 overflow-y-auto max-h-[75vh] space-y-6 text-xs text-neutral-700">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-neutral-200">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-bold uppercase">Simulated Bookings</span>
                  <TrendingUp className="w-4 h-4 text-[#0F382C]" />
                </div>
                <div className="text-2xl font-extrabold font-display text-neutral-900 mt-2 tabular-nums">
                  128
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">+34% this month</div>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-neutral-200">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-bold uppercase">Gross GMV (PKR)</span>
                  <DollarSign className="w-4 h-4 text-[#E28413]" />
                </div>
                <div className="text-2xl font-extrabold font-display text-[#0F382C] mt-2 tabular-nums">
                  PKR 3.84M
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Avg Order: PKR 38,500</div>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-neutral-200">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-bold uppercase">Verified Providers</span>
                  <ShieldCheck className="w-4 h-4 text-[#0F382C]" />
                </div>
                <div className="text-2xl font-extrabold font-display text-neutral-900 mt-2 tabular-nums">
                  64
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">KP & Northern Pakistan</div>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-neutral-200">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-bold uppercase">Average CSAT</span>
                  <Star className="w-4 h-4 text-[#E28413] fill-[#E28413]" />
                </div>
                <div className="text-2xl font-extrabold font-display text-neutral-900 mt-2 tabular-nums">
                  4.92 / 5.0
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Zero safety incidents</div>
              </div>
            </div>

            {/* Business Model & Revenue Streams */}
            <div className="p-5 bg-white rounded-2xl border border-neutral-200 space-y-4">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#0F382C]" />
                <h3 className="text-sm font-bold text-neutral-900">
                  Business Model & Monetization Architecture
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200 space-y-1">
                  <div className="font-bold text-neutral-900 text-xs">1. Marketplace Commission (Primary)</div>
                  <div className="text-[11px] text-emerald-800 font-semibold">5% Take-Rate on Completed Journeys</div>
                  <p className="text-[11px] text-neutral-500 leading-snug">
                    Standard industry charge on packaged services (stays, 4x4 drivers, guides, and masterclasses).
                  </p>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200 space-y-1">
                  <div className="font-bold text-neutral-900 text-xs">2. Verified Host Subscriptions</div>
                  <div className="text-[11px] text-[#0F382C] font-semibold">PKR 2,500 / month (Pro Custodians)</div>
                  <p className="text-[11px] text-neutral-500 leading-snug">
                    Premium placement, verified badge certification, multilingual profile translation, and WhatsApp dispatch.
                  </p>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200 space-y-1">
                  <div className="font-bold text-neutral-900 text-xs">3. Bespoke Concierge & Corporate</div>
                  <div className="text-[11px] text-[#E28413] font-semibold">12% High-Value Escort Tier</div>
                  <p className="text-[11px] text-neutral-500 leading-snug">
                    Diplomatic, expat, and institutional expeditions with dedicated logistics coordinators and security clearance.
                  </p>
                </div>
              </div>
            </div>

            {/* Target Expansion Roadmap */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-neutral-200 space-y-3">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Geographic Roadmap (Phase 1–3)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-neutral-200">
                  <strong className="text-[#0F382C] block mb-1">Phase 1: KPK Focus (Current)</strong>
                  <span className="text-neutral-600">Swat, Kalam, Chitral & Kalash valleys. 64 verified providers.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-neutral-200">
                  <strong className="text-neutral-900 block mb-1">Phase 2: Gilgit-Baltistan (Q2 2027)</strong>
                  <span className="text-neutral-600">Hunza, Skardu, Fairy Meadows & Deosai plateau expansion.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-neutral-200">
                  <strong className="text-neutral-900 block mb-1">Phase 3: Balochistan & Heritage</strong>
                  <span className="text-neutral-600">Makran Coastal Highway, Hingol, and Cholistan desert cultural trails.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#FAF8F5] border-t border-neutral-200 text-right">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#0F382C] hover:bg-[#164E3D] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Close Investor View
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
