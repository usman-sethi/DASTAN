import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, ShieldCheck, ArrowRight, ArrowLeft, Calendar, 
  Users, CreditCard, Sparkles, MapPin, Share2, Eye, Download, CheckCircle2
} from 'lucide-react';
import { GeneratedItinerary, BookingRecord } from '../types';
import { useToast } from './Toast';

interface BookingModalProps {
  itinerary: GeneratedItinerary | null;
  onClose: () => void;
  onBookingComplete: (booking: BookingRecord) => void;
  onViewMyTrips: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  itinerary,
  onClose,
  onBookingComplete,
  onViewMyTrips
}) => {
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [travelerName, setTravelerName] = useState('Dr. Bilal Tariq');
  const [travelerEmail, setTravelerEmail] = useState('bilal.tariq@gmail.com');
  const [travelerPhone, setTravelerPhone] = useState('+92 300 8472910');
  const [startDate, setStartDate] = useState('2026-10-18');
  const [dietaryNotes, setDietaryNotes] = useState('Prefer mild spices for kids; interested in fresh trout');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  if (!itinerary) return null;

  const handleConfirmDemoBooking = () => {
    const bookingId = `DST-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: BookingRecord = {
      id: bookingId,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      destinationName: itinerary.destination.name,
      destinationId: itinerary.destination.id,
      tripTitle: itinerary.title,
      days: itinerary.days.length,
      travelerType: 'Family Journey',
      travelerName,
      travelerEmail,
      travelerPhone,
      startDate,
      servicesIncluded: ['Verified Heritage Stay', 'Private 4x4 Mountain Cruiser', 'Licensed Cultural Guide', 'Culinary Experiences'],
      costBreakdown: itinerary.costBreakdown,
      status: 'confirmed',
      progressPercentage: 80,
      assignedGuide: 'Ahmad Khan Yousafzai',
      assignedDriver: 'Gul Zarin',
      assignedStay: itinerary.destination.stays[0]?.name || 'Heritage Mountain Lodge'
    };

    setConfirmedBooking(newBooking);
    onBookingComplete(newBooking);
    setStep(5);
    showToast('Journey Confirmed! 🌟', `Booking ID: ${bookingId} has been created.`, 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: itinerary.title,
        text: `My journey with DASTAN to ${itinerary.destination.name} is booked!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Itinerary Link Copied', 'Booking summary link copied to clipboard.', 'info');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col"
        >
          {/* Header Bar */}
          <div className="bg-[#FAF8F5] px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F382C]">
                <span className="font-nastaliq text-base text-[#E28413]">داستان</span>
                <span>·</span>
                <span className="uppercase tracking-wider">
                  {step < 5 ? `Step ${step} of 4: Journey Reservation` : 'Reservation Confirmed'}
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-neutral-900">
                {step < 5 ? itinerary.title : 'Your Dastan Begins.'}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Indicator (if not on step 5) */}
          {step < 5 && (
            <div className="bg-white px-6 pt-4 pb-2 flex items-center justify-between gap-2 border-b border-neutral-100 text-xs">
              {[
                { s: 1, label: 'Itinerary' },
                { s: 2, label: 'Traveler' },
                { s: 3, label: 'Services' },
                { s: 4, label: 'Price' },
              ].map(({ s, label }) => (
                <div key={s} className="flex items-center gap-1.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step >= s
                        ? 'bg-[#0F382C] text-white'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {s}
                  </span>
                  <span className={`text-[11px] font-medium hidden sm:inline ${step >= s ? 'text-neutral-900 font-bold' : 'text-neutral-400'}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Body Content by Step */}
          <div className="p-6 overflow-y-auto max-h-[65vh] space-y-5 text-xs text-neutral-700">
            {/* STEP 1: Review Itinerary */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">{itinerary.destination.name}</span>
                    <span className="text-neutral-500">{itinerary.days.length} Days Itinerary</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-xs">
                    {itinerary.destination.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-neutral-800 uppercase tracking-wider text-[11px]">
                    Daily Narrative Outline:
                  </div>
                  {itinerary.days.map((day) => (
                    <div key={day.dayNumber} className="p-3 bg-white rounded-lg border border-neutral-200 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-md bg-[#0F382C] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                        {day.dayNumber}
                      </span>
                      <div>
                        <div className="font-bold text-neutral-900 text-xs">{day.title}</div>
                        <div className="text-[11px] text-neutral-500">{day.morning.activity.slice(0, 80)}...</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Traveler Information */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 block">Full Name (Primary Traveler)</label>
                  <input
                    type="text"
                    required
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs font-medium focus:border-[#0F382C] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={travelerEmail}
                      onChange={(e) => setTravelerEmail(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs font-medium focus:border-[#0F382C] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 block">Mobile (WhatsApp for Driver & Guide)</label>
                    <input
                      type="tel"
                      required
                      value={travelerPhone}
                      onChange={(e) => setTravelerPhone(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs font-medium focus:border-[#0F382C] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 block">Journey Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs font-medium focus:border-[#0F382C] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 block">Dietary Preferences or Accessibility Notes</label>
                  <textarea
                    rows={2}
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs font-medium focus:border-[#0F382C] outline-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Select Services */}
            {step === 3 && (
              <div className="space-y-3">
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-neutral-900 text-xs">Assigned Verified Stay</div>
                    <div className="text-neutral-500 text-[11px]">{itinerary.destination.stays[0]?.name || 'Traditional Guesthouse'}</div>
                  </div>
                  <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Included
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-neutral-900 text-xs">Dedicated Mountain Cruiser & Driver</div>
                    <div className="text-neutral-500 text-[11px]">Gul Zarin & High-Altitude Team (4x4 Land Cruiser)</div>
                  </div>
                  <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Included
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-neutral-900 text-xs">Cultural Guide & Archaeologist</div>
                    <div className="text-neutral-500 text-[11px]">Ahmad Khan Yousafzai (9 Yrs Experience)</div>
                  </div>
                  <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Included
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-neutral-900 text-xs">Culinary & Village Experiences</div>
                    <div className="text-neutral-500 text-[11px]">Swati Kitchen cooking & Hujra musical evening</div>
                  </div>
                  <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Included
                  </span>
                </div>
              </div>
            )}

            {/* STEP 4: Price Summary */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-neutral-200 space-y-2.5">
                  <div className="flex justify-between text-neutral-600">
                    <span>Verified Accommodations ({itinerary.days.length - 1} nights):</span>
                    <span className="font-bold text-neutral-900 tabular-nums">PKR {itinerary.costBreakdown.stay.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Dedicated 4x4 & Driver ({itinerary.days.length} days):</span>
                    <span className="font-bold text-neutral-900 tabular-nums">PKR {itinerary.costBreakdown.transport.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Cultural Historian Guide:</span>
                    <span className="font-bold text-neutral-900 tabular-nums">PKR {itinerary.costBreakdown.guide.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Culinary Masterclasses & Experiences:</span>
                    <span className="font-bold text-neutral-900 tabular-nums">PKR {itinerary.costBreakdown.experiences.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500 pt-2 border-t border-neutral-200">
                    <span>DASTAN Traveler Platform & 24/7 SOS (5%):</span>
                    <span className="font-bold text-neutral-700 tabular-nums">PKR {itinerary.costBreakdown.dastanFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#0F382C] pt-2 border-t border-neutral-200">
                    <span>Total Estimated Investment:</span>
                    <span className="tabular-nums">PKR {itinerary.costBreakdown.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#EBF3EF] rounded-xl text-[11px] text-[#0F382C] space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Simulated Demo Booking:
                  </div>
                  <p>
                    No credit card charge is processed during this competition prototype. Clicking "Confirm Demo Booking" assigns sample booking reference credentials.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 5: Confirmation "Your Dastan Begins" */}
            {step === 5 && confirmedBooking && (
              <div className="space-y-6 text-center py-2">
                <div className="w-16 h-16 rounded-full bg-[#EBF3EF] text-[#0F382C] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-[#0F382C]" />
                </div>

                <div>
                  <h3 className="text-3xl font-extrabold font-display text-[#0F382C]">
                    Your Dastan Begins.
                  </h3>
                  <div className="text-xs font-mono font-bold text-[#E28413] mt-1">
                    Booking ID: {confirmedBooking.id}
                  </div>
                  <p className="text-xs text-neutral-600 mt-2 max-w-md mx-auto">
                    Your journey to <strong>{confirmedBooking.destinationName}</strong> has been secured with local custodians.
                  </p>
                </div>

                {/* Booking Receipt Summary Card */}
                <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-neutral-200 text-left space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <span className="text-neutral-500">Destination:</span>
                    <strong className="text-neutral-900">{confirmedBooking.destinationName} ({confirmedBooking.days} Days)</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <span className="text-neutral-500">Primary Traveler:</span>
                    <strong className="text-neutral-900">{confirmedBooking.travelerName}</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <span className="text-neutral-500">Assigned Guide:</span>
                    <strong className="text-[#0F382C]">{confirmedBooking.assignedGuide}</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <span className="text-neutral-500">Start Date:</span>
                    <strong className="text-neutral-900">{confirmedBooking.startDate}</strong>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-[#0F382C] pt-1">
                    <span>Total Investment:</span>
                    <span className="tabular-nums">PKR {confirmedBooking.costBreakdown.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Confirmation Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onViewMyTrips();
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#0F382C] hover:bg-[#164E3D] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Eye className="w-4 h-4 text-[#E28413]" />
                    <span>View in My Trips</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="w-full sm:w-auto px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Itinerary</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Controls (Steps 1–4) */}
          {step < 5 && (
            <div className="p-4 bg-[#FAF8F5] border-t border-neutral-200 flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => (s - 1) as any)}
                  className="px-4 py-2 border border-neutral-200 hover:bg-white rounded-xl text-xs font-semibold text-neutral-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  onClick={() => setStep((s) => (s + 1) as any)}
                  className="px-5 py-2 bg-[#0F382C] hover:bg-[#164E3D] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E28413]" />
                </button>
              ) : (
                <button
                  onClick={handleConfirmDemoBooking}
                  className="px-6 py-2.5 bg-[#E28413] hover:bg-[#d07409] text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Demo Booking</span>
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
