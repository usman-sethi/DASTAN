import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, HandCoins, ShieldCheck, HeartHandshake, ArrowRight, 
  Sparkles, CheckCircle2, ChevronRight, X, Building, Car, UserCheck, Utensils
} from 'lucide-react';
import { useToast } from './Toast';

export const ForHosts: React.FC = () => {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [cityRegion, setCityRegion] = useState('Swat (Mingora / Kalam)');
  const [serviceType, setServiceType] = useState('Local Cultural Guide');
  const [languages, setLanguages] = useState('Pashto, Urdu, English');
  const [experienceYears, setExperienceYears] = useState('5');
  const [storyDescription, setStoryDescription] = useState('');

  const handleSubmitHost = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      'Application Received! 🤝',
      'Welcome to DASTAN. Our regional coordinator will contact you via WhatsApp for identity verification.',
      'success'
    );
  };

  const handleResetModal = () => {
    setModalOpen(false);
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setStoryDescription('');
  };

  return (
    <section id="hosts-section" className="py-20 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Impact Banner: One Traveler. Multiple Livelihoods */}
        <div className="bg-[#0F382C] text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FEF3C7] mb-2 uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-[#E28413]" />
              <span>Community Impact Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              One traveler. <br />
              <span className="text-[#FEF3C7] font-serif italic">Multiple local livelihoods.</span>
            </h2>
            <p className="text-sm text-neutral-200 mt-3 leading-relaxed font-light max-w-2xl">
              Tourism should benefit the people who make the destination special. On DASTAN, there are no intermediary travel conglomerates skimming 40% margins.
            </p>
          </div>

          {/* Interactive Economic Distribution Diagram */}
          <div className="relative z-10 mt-10 pt-8 border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
                <UserCheck className="w-5 h-5 mx-auto mb-1 text-[#FEF3C7]" />
                <div className="text-xs font-bold">Local Guide</div>
                <div className="text-[11px] text-[#FEF3C7] font-semibold mt-0.5">25% Value</div>
              </div>
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
                <Car className="w-5 h-5 mx-auto mb-1 text-[#FEF3C7]" />
                <div className="text-xs font-bold">Mountain Driver</div>
                <div className="text-[11px] text-[#FEF3C7] font-semibold mt-0.5">25% Value</div>
              </div>
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
                <Building className="w-5 h-5 mx-auto mb-1 text-[#FEF3C7]" />
                <div className="text-xs font-bold">Local Guesthouse</div>
                <div className="text-[11px] text-[#FEF3C7] font-semibold mt-0.5">30% Value</div>
              </div>
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
                <Utensils className="w-5 h-5 mx-auto mb-1 text-[#FEF3C7]" />
                <div className="text-xs font-bold">Village Cooks</div>
                <div className="text-[11px] text-[#FEF3C7] font-semibold mt-0.5">10% Value</div>
              </div>
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
                <HeartHandshake className="w-5 h-5 mx-auto mb-1 text-[#FEF3C7]" />
                <div className="text-xs font-bold">Heritage Fund</div>
                <div className="text-[11px] text-[#FEF3C7] font-semibold mt-0.5">5% Value</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl backdrop-blur-xs border border-white/10">
                <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-[#E28413]" />
                <div className="text-xs font-bold">DASTAN Platform</div>
                <div className="text-[11px] text-neutral-300 font-semibold mt-0.5">5% Value</div>
              </div>
            </div>
          </div>
        </div>

        {/* For Hosts Headline & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Pitch (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#E28413] mb-2">
                Join the DASTAN Provider Guild
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold font-display text-neutral-900 leading-tight">
                Turn your local knowledge into sustainable income.
              </h3>
              <p className="text-sm text-neutral-600 mt-3 leading-relaxed font-light">
                Are you an indigenous guide, safe mountain driver, guesthouse owner, or home chef in Swat, Kalam, or Chitral? DASTAN connects you directly with respectful travelers who honor your stories and pay fair rates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-neutral-200">
                <div className="font-bold text-xs text-neutral-900 mb-1">List Your Experience</div>
                <p className="text-[11px] text-neutral-500 leading-snug">Design your own culinary class, hiking route, or craft workshop with your custom pricing.</p>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-neutral-200">
                <div className="font-bold text-xs text-neutral-900 mb-1">Reach Curated Travelers</div>
                <p className="text-[11px] text-neutral-500 leading-snug">Connect with domestic and overseas travelers seeking authentic heritage rather than mass tourism.</p>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-neutral-200">
                <div className="font-bold text-xs text-neutral-900 mb-1">Manage Direct Bookings</div>
                <p className="text-[11px] text-neutral-500 leading-snug">Guaranteed upfront escrow payouts directly to your Pakistani bank account or JazzCash/Easypaisa.</p>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-neutral-200">
                <div className="font-bold text-xs text-neutral-900 mb-1">Build Your Reputation</div>
                <p className="text-[11px] text-neutral-500 leading-snug">Receive the DASTAN verified badge and build an unshakeable digital track record.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-3 bg-[#0F382C] hover:bg-[#164E3D] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Become a DASTAN Host</span>
                <ArrowRight className="w-4 h-4 text-[#E28413]" />
              </button>
            </div>
          </div>

          {/* Right: Testimonial & Quote Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                alt="Ahmad Khan"
                loading="lazy"
                decoding="async"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#0F382C]"
              />
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Ahmad Khan Yousafzai</h4>
                <p className="text-xs text-neutral-500">DASTAN Host Since March 2024</p>
                <div className="text-[11px] text-[#0F382C] font-semibold mt-0.5">140+ Travelers Guided in Swat</div>
              </div>
            </div>

            <blockquote className="text-xs text-neutral-700 italic leading-relaxed border-l-2 border-[#0F382C] pl-4">
              "Before DASTAN, commercial tour bus operators dictated low wages and treated our villages as mere transit stops. With DASTAN, travelers come specifically to understand our heritage. The income has allowed me to fund my daughter’s software engineering education in Peshawar."
            </blockquote>

            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
              <span>Average Monthly Host Earnings:</span>
              <strong className="text-neutral-900 tabular-nums">PKR 125,000+</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Host Application Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative overflow-hidden"
          >
            <button
              onClick={handleResetModal}
              className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmitHost} className="space-y-4 text-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F382C] uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#0F382C]" />
                    Host Onboarding Protocol
                  </div>
                  <h3 className="text-xl font-bold font-display text-neutral-900">
                    Apply to join DASTAN
                  </h3>
                  <p className="text-neutral-500 mt-0.5">
                    We review all applications within 48 hours for local community verification.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tariq Khan"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-[#0F382C]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-neutral-700 block">WhatsApp Mobile</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300..."
                      className="w-full p-2.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-[#0F382C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-neutral-700 block">Location / Valley</label>
                    <select
                      value={cityRegion}
                      onChange={(e) => setCityRegion(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-[#0F382C]"
                    >
                      <option value="Swat">Swat Valley</option>
                      <option value="Kalam">Kalam & Ushu</option>
                      <option value="Chitral">Chitral & Ayun</option>
                      <option value="Kalash">Kalash Valleys</option>
                      <option value="Hunza">Hunza Valley</option>
                      <option value="Skardu">Skardu & Baltistan</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-neutral-700 block">Service Type</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-[#0F382C]"
                    >
                      <option value="Local Cultural Guide">Local Cultural Guide</option>
                      <option value="Mountain 4x4 Driver">Mountain 4x4 Driver</option>
                      <option value="Guesthouse / Homestay">Guesthouse / Homestay</option>
                      <option value="Culinary Workshop">Culinary Workshop</option>
                      <option value="Artisan Masterclass">Artisan Masterclass</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-neutral-700 block">Years Experience</label>
                    <input
                      type="number"
                      min="1"
                      max="40"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 block">Tell us about your story and experience</label>
                  <textarea
                    rows={3}
                    required
                    value={storyDescription}
                    onChange={(e) => setStoryDescription(e.target.value)}
                    placeholder="Describe what authentic experience you would offer travelers (e.g. traditional clay-pot cooking, ancient Buddhist ruins walk, high mountain photography trail)..."
                    className="w-full p-2.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-[#0F382C]"
                  />
                </div>

                <div className="p-3 bg-[#EBF3EF] rounded-xl text-[11px] text-[#0F382C] leading-snug">
                  ✓ I agree to submit government CNIC identification and agree to DASTAN's Cultural Integrity & Fair Pricing Code.
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleResetModal}
                    className="px-4 py-2 border border-neutral-200 rounded-xl text-neutral-600 hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0F382C] hover:bg-[#164E3D] text-white rounded-xl font-bold cursor-pointer"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            ) : (
              // Submitted Success State
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#0F382C]" />
                </div>
                <h3 className="text-2xl font-bold font-display text-neutral-900">
                  Application Received
                </h3>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for applying to become a DASTAN custodian. Our regional coordinator in <strong>{cityRegion}</strong> will reach out via WhatsApp at <strong>{phone}</strong> to coordinate your verification visit.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleResetModal}
                    className="px-6 py-2.5 bg-[#0F382C] text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
};
