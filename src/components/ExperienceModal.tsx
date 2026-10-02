import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShieldCheck, Clock, Users, Check, MapPin, ArrowRight, HeartHandshake } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
  onBookExperience: (experience: Experience) => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  experience,
  onClose,
  onBookExperience
}) => {
  if (!experience) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col"
        >
          {/* Header Image */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-5 left-6 right-6">
              <div className="flex items-center gap-2 text-xs text-[#FEF3C7] font-semibold mb-1">
                <span className="font-nastaliq text-base">{experience.urduTitle}</span>
                <span>·</span>
                <span>{experience.categoryLabel}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {experience.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-neutral-300 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#E28413]" />
                <span>{experience.destinationName}</span>
                <span>·</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{experience.duration}</span>
                <span>·</span>
                <Users className="w-3.5 h-3.5" />
                <span>Max {experience.maxGroupSize} guests</span>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
            {/* Host Profile Banner */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-neutral-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={experience.hostAvatar}
                  alt={experience.hostName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#0F382C]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-neutral-900">{experience.hostName}</span>
                    {experience.hostVerified && (
                      <span className="text-[11px] font-semibold text-[#0F382C] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Host
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-neutral-500">{experience.hostRole}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-neutral-900 flex items-center gap-1 justify-end">
                  <Star className="w-3.5 h-3.5 text-[#E28413] fill-[#E28413]" />
                  <span>{experience.rating}</span>
                </div>
                <div className="text-[11px] text-neutral-500">
                  {experience.reviewsCount} community reviews
                </div>
              </div>
            </div>

            {/* Experience Overview */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                About This Experience
              </h4>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {experience.fullDesc}
              </p>
            </div>

            {/* What is Included */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                What’s Included
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {experience.whatIsIncluded.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700">
                    <Check className="w-4 h-4 text-[#0F382C] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Insight Card */}
            <div className="p-4 bg-[#FEF3C7]/60 rounded-xl border border-[#FDE68A] text-xs text-[#78350F] flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">Cultural Context:</strong>
                {experience.culturalInsight}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-[#FAF8F5] border-t border-neutral-200 flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-neutral-400">Total Per Person</div>
              <div className="text-lg font-bold text-[#0F382C] tabular-nums">
                PKR {experience.pricePKR.toLocaleString()}
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookExperience(experience);
              }}
              className="px-6 py-2.5 bg-[#0F382C] hover:bg-[#164E3D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Add to My Trip Plan</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E28413]" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
