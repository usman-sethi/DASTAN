import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, BookOpen, CheckCircle, RotateCw, Sparkles, HelpCircle, Layers, Check } from 'lucide-react';
import { LanguagePhrase } from '../types';
import { languagePhrases } from '../data/phrases';
import { speakPhrase } from '../lib/speech';
import { useToast } from './Toast';

export const LanguageLearning: React.FC = () => {
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [learnedPhraseIds, setLearnedPhraseIds] = useState<string[]>([
    'phrase-1', 'phrase-2', 'phrase-3', 'phrase-5', 'phrase-7', 'phrase-9', 'phrase-10'
  ]); // 7 preloaded to match "7 / 20 phrases learned" from brief!

  const [mode, setMode] = useState<'phrasebook' | 'flashcards'>('phrasebook');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Phrases' },
    { id: 'greetings', label: 'Greetings' },
    { id: 'hospitality', label: 'Respect & Hospitality' },
    { id: 'food', label: 'Food & Tea' },
    { id: 'transport', label: 'Transport & Directions' },
    { id: 'shopping', label: 'Shopping & Bazaars' },
    { id: 'emergency', label: 'Emergency Support' },
  ];

  const filteredPhrases = activeCategory === 'all'
    ? languagePhrases
    : languagePhrases.filter(p => p.category === activeCategory);

  const handlePlayAudio = (phrase: LanguagePhrase) => {
    setPlayingPhraseId(phrase.id);
    speakPhrase(phrase.phraseLocal, phrase.language);
    showToast('Playing Pronunciation', `Audio for "${phrase.phraseLocal}"`, 'info');
    setTimeout(() => setPlayingPhraseId(null), 1200);
  };

  const toggleLearned = (id: string) => {
    if (learnedPhraseIds.includes(id)) {
      setLearnedPhraseIds(prev => prev.filter(item => item !== id));
    } else {
      setLearnedPhraseIds(prev => [...prev, id]);
      showToast('Phrase Marked as Learned! 🎉', 'Your progress has updated.', 'success');
    }
  };

  const currentFlashcard = filteredPhrases[currentFlashcardIndex % filteredPhrases.length] || filteredPhrases[0];

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setCurrentFlashcardIndex(prev => (prev + 1) % filteredPhrases.length);
  };

  const totalCount = languagePhrases.length;
  const learnedCount = learnedPhraseIds.length;
  const progressPercent = Math.round((learnedCount / totalCount) * 100);

  return (
    <section id="learn-section" className="py-20 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E28413] mb-2">
              <BookOpen className="w-4 h-4" />
              <span>DASTAN Cultural Differentiator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#151D1A]">
              Learn before you go.
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-xl font-light">
              Speaking even three words of Pashto or Khowar changes you from an outsider to an honored guest. Master authentic phrases with pronunciation audio and cultural etiquette.
            </p>
          </div>

          {/* Progress Tracker Widget */}
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-neutral-200 min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800 mb-1.5">
              <span>Your Language Journey</span>
              <span className="text-[#0F382C] tabular-nums">{learnedCount} / {totalCount} phrases learned</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-neutral-200 h-2.5 rounded-full overflow-hidden">
              <motion.div
                className="bg-[#0F382C] h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-2">
              <span>Level: Respectful Guest</span>
              <span className="font-semibold text-[#E28413]">{progressPercent}% Completed</span>
            </div>
          </div>
        </div>

        {/* View Switcher: Interactive Phrasebook vs Flashcard Trainer */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl">
            <button
              onClick={() => setMode('phrasebook')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === 'phrasebook'
                  ? 'bg-white text-[#0F382C] shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Phrasebook</span>
            </button>

            <button
              onClick={() => {
                setMode('flashcards');
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === 'flashcards'
                  ? 'bg-white text-[#0F382C] shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Interactive Flashcards</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCurrentFlashcardIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-[#0F382C] text-white'
                    : 'bg-[#FAF8F5] text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* MODE 1: Interactive Phrasebook Grid */}
        {mode === 'phrasebook' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPhrases.map((phrase) => {
              const isLearned = learnedPhraseIds.includes(phrase.id);
              const isPlaying = playingPhraseId === phrase.id;

              return (
                <div
                  key={phrase.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                    isLearned
                      ? 'bg-[#FAF8F5] border-[#0F382C]/30'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Language Badge & Audio Trigger */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F382C] bg-[#EBF3EF] px-2 py-0.5 rounded">
                          {phrase.language} · {phrase.categoryLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Audio Speak Button */}
                        <button
                          onClick={() => handlePlayAudio(phrase)}
                          className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                            isPlaying
                              ? 'bg-[#E28413] text-white scale-105'
                              : 'bg-[#FAF8F5] hover:bg-[#EBF3EF] text-[#0F382C] border border-neutral-200'
                          }`}
                          title="Listen to authentic pronunciation"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span className="text-[11px] font-semibold">Listen</span>
                        </button>

                        {/* Learned toggle */}
                        <button
                          onClick={() => toggleLearned(phrase.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isLearned
                              ? 'text-emerald-700 bg-emerald-100'
                              : 'text-neutral-300 hover:text-neutral-600'
                          }`}
                          title={isLearned ? 'Learned' : 'Mark as learned'}
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Local Phrase & Urdu Calligraphy */}
                    <div>
                      <div className="text-xl font-bold font-display text-neutral-900">
                        {phrase.phraseLocal}
                      </div>
                      <div className="text-lg font-nastaliq text-[#0F382C] mt-1 font-semibold leading-relaxed">
                        {phrase.phraseScript}
                      </div>
                    </div>

                    {/* Pronunciation & English Meaning */}
                    <div className="space-y-1.5 pt-1 text-xs">
                      <div className="text-neutral-500">
                        <strong className="text-neutral-700 font-semibold">Pronounce:</strong>{' '}
                        <span className="italic font-mono text-neutral-800">{phrase.pronunciation}</span>
                      </div>
                      <div className="text-neutral-800">
                        <strong className="text-neutral-700 font-semibold">English:</strong>{' '}
                        <span className="font-medium text-[#0F382C]">{phrase.englishMeaning}</span>
                      </div>
                      <div className="text-neutral-600 font-nastaliq text-sm">
                        <strong>اردو:</strong> {phrase.urduMeaning}
                      </div>
                    </div>
                  </div>

                  {/* Cultural Tip Footer */}
                  <div className="p-3 bg-[#FEF3C7]/40 rounded-xl border border-[#FDE68A]/60 text-[11px] text-[#78350F] leading-snug">
                    <span className="font-bold">Etiquette Tip:</span> {phrase.culturalTip}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODE 2: Interactive Flashcard Quiz Trainer */}
        {mode === 'flashcards' && currentFlashcard && (
          <div className="max-w-xl mx-auto py-6">
            <div className="text-center mb-4">
              <span className="text-xs font-semibold text-neutral-500">
                Card {currentFlashcardIndex + 1} of {filteredPhrases.length}
              </span>
            </div>

            {/* Flashcard container with flip animation */}
            <motion.div
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border-2 border-neutral-200/80 shadow-lg min-h-[340px] flex flex-col justify-between text-center cursor-pointer transition-all hover:border-[#0F382C]/50 relative"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="bg-[#EBF3EF] text-[#0F382C] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                  {currentFlashcard.language} · {currentFlashcard.categoryLabel}
                </span>
                <span className="flex items-center gap-1 text-neutral-500">
                  <RotateCw className="w-3.5 h-3.5" />
                  Click to Flip
                </span>
              </div>

              {!isFlipped ? (
                // Front Side: How do I say X?
                <div className="my-auto space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#E28413]">
                    How do you say in {currentFlashcard.language}:
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900">
                    "{currentFlashcard.englishMeaning}"
                  </h3>
                  <div className="text-sm font-nastaliq text-neutral-600">
                    {currentFlashcard.urduMeaning}
                  </div>
                  <div className="text-xs text-neutral-400 pt-4">
                    Tap anywhere to reveal answer & pronunciation
                  </div>
                </div>
              ) : (
                // Back Side: Revealed local phrase
                <div className="my-auto space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Answer:
                  </div>
                  <h3 className="text-3xl font-bold font-display text-[#0F382C]">
                    {currentFlashcard.phraseLocal}
                  </h3>
                  <div className="text-2xl font-nastaliq text-[#E28413] font-semibold">
                    {currentFlashcard.phraseScript}
                  </div>
                  <div className="text-sm font-mono text-neutral-700">
                    Phonetic: <strong>{currentFlashcard.pronunciation}</strong>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(currentFlashcard);
                    }}
                    className="mx-auto px-4 py-2 bg-[#0F382C] text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Volume2 className="w-4 h-4 text-[#E28413]" />
                    <span>Play Pronunciation Audio</span>
                  </button>
                </div>
              )}

              {/* Bottom Card Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLearned(currentFlashcard.id);
                  }}
                  className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer ${
                    learnedPhraseIds.includes(currentFlashcard.id)
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{learnedPhraseIds.includes(currentFlashcard.id) ? 'Learned ✓' : 'Mark as Learned'}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextFlashcard();
                  }}
                  className="px-4 py-2 bg-[#0F382C] hover:bg-[#164E3D] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
                >
                  Next Phrase →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
