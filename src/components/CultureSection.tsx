import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, HeartHandshake, Camera, Shirt, Utensils, Shield, Check } from 'lucide-react';
import { cultureTopics } from '../data/culture';

export const CultureSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(cultureTopics[0].id);

  const selectedTopic = cultureTopics.find(t => t.id === selectedTopicId) || cultureTopics[0];

  const iconMap: Record<string, React.ReactNode> = {
    'cult-etiquette': <HeartHandshake className="w-5 h-5 text-[#0F382C]" />,
    'cult-attire': <Shirt className="w-5 h-5 text-[#0F382C]" />,
    'cult-photography': <Camera className="w-5 h-5 text-[#0F382C]" />,
    'cult-food': <Utensils className="w-5 h-5 text-[#0F382C]" />,
    'cult-community': <Shield className="w-5 h-5 text-[#0F382C]" />,
  };

  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F382C] mb-2">
            <BookOpen className="w-4 h-4 text-[#0F382C]" />
            <span>Cultural Intelligence & Respect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#151D1A]">
            Know before you go.
          </h2>
          <p className="text-sm text-neutral-600 mt-2 font-light">
            Practical, respectful wisdom gathered directly from village elders, community custodians, and experienced regional guides.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Topic Navigation Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {cultureTopics.map((topic) => {
              const isSelected = topic.id === selectedTopic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-white border-[#0F382C] shadow-md ring-1 ring-[#0F382C]'
                      : 'bg-white/60 border-neutral-200 hover:bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-[#EBF3EF]' : 'bg-neutral-100'}`}>
                    {iconMap[topic.id] || <HeartHandshake className="w-5 h-5 text-[#0F382C]" />}
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-[#E28413] uppercase tracking-wider">
                      {topic.category}
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 mt-0.5">
                      {topic.title}
                    </h3>
                    <div className="text-xs font-nastaliq text-neutral-500 mt-0.5">
                      {topic.urduSubtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Topic Insights (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <span className="text-xs font-bold text-[#E28413] uppercase tracking-wider">
                  {selectedTopic.category}
                </span>
                <h3 className="text-2xl font-bold font-display text-neutral-900 mt-1">
                  {selectedTopic.title}
                </h3>
              </div>
              <span className="font-nastaliq text-lg text-[#0F382C] font-semibold">
                {selectedTopic.urduSubtitle}
              </span>
            </div>

            <div className="py-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Context & Philosophy
                </h4>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {selectedTopic.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Practical Guidance for Travelers
                </h4>
                <div className="space-y-3">
                  {selectedTopic.practicalAdvice.map((advice, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-neutral-200/80 text-xs text-neutral-800">
                      <span className="w-5 h-5 rounded-full bg-[#EBF3EF] text-[#0F382C] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className="leading-relaxed">{advice}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Importance callout */}
              <div className="p-4 bg-[#EBF3EF] rounded-xl border border-[#D0E4DC] text-xs text-[#0F382C] leading-relaxed">
                <strong className="block font-bold mb-1">Why This Matters in Pakistan:</strong>
                {selectedTopic.culturalImportance}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
