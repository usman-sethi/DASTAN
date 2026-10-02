import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Check, RotateCw, Sparkles } from 'lucide-react';
import { LanguagePhrase } from '../types';
import { languagePhrases } from '../data/phrases';
import { speakPhrase } from '../lib/speech';
import { useToast } from './Toast';

export const LanguageLearning: React.FC = () => {
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [learnedPhraseIds, setLearnedPhraseIds] = useState<string[]>([
    'phrase-1', 'phrase-2', 'phrase-3', 'phrase-5', 'phrase-7', 'phrase-9', 'phrase-10'
  ]); // 7 preloaded from brief

  const [mode, setMode] = useState<'phrasebook' | 'flashcards'>('phrasebook');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Phrases' },
    { id: 'greetings', label: 'Greetings' },
    { id: 'hospitality', label: 'Hospitality & Respect' },
    { id: 'food', label: 'Food & Tea' },
    { id: 'transport', label: 'Transit & Directions' },
    { id: 'shopping', label: 'Bazaars & Crafts' },
    { id: 'emergency', label: 'Emergency Support' },
  ];

  const filteredPhrases = activeCategory === 'all'
    ? languagePhrases
    : languagePhrases.filter(p => p.category === activeCategory);

  const handlePlayAudio = (phrase: LanguagePhrase) => {
    setPlayingPhraseId(phrase.id);
    speakPhrase(phrase.phraseLocal, phrase.language);
    showToast('Playing Pronunciation', phrase.phraseLocal, 'info');
    setTimeout(() => setPlayingPhraseId(null), 1400);
  };

  const toggleLearned = (id: string) => {
    if (learnedPhraseIds.includes(id)) {
      setLearnedPhraseIds(prev => prev.filter(item => item !== id));
    } else {
      setLearnedPhraseIds(prev => [...prev, id]);
      showToast('Phrase Marked as Learned', 'Dialect progress updated.', 'success');
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
    <section id="learn-section" className="py-24 sm:py-32 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Act IV Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-bold text-[#E28413] mb-3">
              <span>04 / THE CULTURE & DIALECT</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span className="text-neutral-500 font-medium">PASHTO & KHOWAR IMMERSION</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-[#151D1A] leading-[1.05]">
              Learn the place <br />
              <span className="font-editorial italic font-normal text-[#144D3C]">before you arrive.</span>
            </h2>
            <p className="text-base text-neutral-600 mt-4 leading-relaxed font-light">
              Speaking even a few words of Pashto or Khowar transforms you from a visitor into an honored guest. Master authentic phrases with acoustic cadence and cultural context.
            </p>
          </div>

          {/* Minimalist Progress Meter */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-neutral-200 min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-neutral-600 mb-2">
              <span className="uppercase tracking-wider">Progress</span>
              <span className="tabular-nums font-bold text-[#0C2B22]">{learnedCount} / {totalCount} Phrases</span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#0C2B22] h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2 font-mono">
              <span>RESPECTFUL GUEST</span>
              <span>{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* View Switcher & Category Filter */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-6 border-b border-neutral-100">
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl">
            <button
              onClick={() => setMode('phrasebook')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                mode === 'phrasebook'
                  ? 'bg-white text-[#0C2B22] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Phrasebook View
            </button>
            <button
              onClick={() => {
                setMode('flashcards');
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                mode === 'flashcards'
                  ? 'bg-white text-[#0C2B22] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Flashcard Trainer
            </button>
          </div>

          {/* Filter Categories */}
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
                    ? 'bg-[#0C2B22] text-white font-semibold'
                    : 'bg-[#FAF8F5] text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode 1: Editorial Phrasebook Grid */}
        {mode === 'phrasebook' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhrases.map((phrase) => {
              const isLearned = learnedPhraseIds.includes(phrase.id);
              const isPlaying = playingPhraseId === phrase.id;

              return (
                <div
                  key={phrase.id}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-5 ${
                    isLearned
                      ? 'bg-[#FAF8F5] border-[#0C2B22]/25'
                      : 'bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Language & Audio Trigger */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#0C2B22] bg-[#EBF3EF] px-2.5 py-1 rounded">
                        {phrase.language.toUpperCase()} · {phrase.categoryLabel.toUpperCase()}
                      </span>

                      <div className="flex items-center gap-2">
                        {/* Audio Trigger with sound visualizer */}
                        <button
                          onClick={() => handlePlayAudio(phrase)}
                          className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                            isPlaying
                              ? 'bg-[#E28413] text-white scale-105 shadow-sm'
                              : 'bg-[#FAF8F5] hover:bg-[#EBF3EF] text-[#0C2B22] border border-neutral-200'
                          }`}
                          aria-label={`Listen to pronunciation of ${phrase.phraseLocal}`}
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse' : ''}`} />
                          <span className="text-[11px] font-mono">LISTEN</span>
                        </button>

                        {/* Learned toggle */}
                        <button
                          onClick={() => toggleLearned(phrase.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isLearned
                              ? 'text-emerald-800 bg-emerald-100'
                              : 'text-neutral-300 hover:text-neutral-600'
                          }`}
                          title={isLearned ? 'Marked as learned' : 'Mark as learned'}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Editorial Phrase Typography */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-900 tracking-tight">
                        {phrase.phraseLocal}
                      </h3>
                      <div className="text-xl font-nastaliq text-[#0C2B22] mt-1 font-semibold leading-relaxed">
                        {phrase.phraseScript}
                      </div>
                    </div>

                    {/* Phonetic Pronunciation & Meaning */}
                    <div className="space-y-1.5 text-xs border-t border-neutral-100 pt-3">
                      <div className="text-neutral-500 font-mono text-[11px]">
                        Pronounce: <span className="text-neutral-900 italic font-sans font-medium">{phrase.pronunciation}</span>
                      </div>
                      <div className="text-sm font-editorial italic text-neutral-800">
                        "{phrase.englishMeaning}"
                      </div>
                      <div className="text-xs font-nastaliq text-neutral-600">
                        {phrase.urduMeaning}
                      </div>
                    </div>
                  </div>

                  {/* Cultural Context Wisdom Note */}
                  <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-neutral-150 text-[11px] text-neutral-600 leading-snug">
                    <strong className="text-neutral-900 font-semibold block mb-0.5">Cultural Etiquette:</strong>
                    {phrase.culturalTip}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mode 2: Flashcard Quiz Trainer */}
        {mode === 'flashcards' && currentFlashcard && (
          <div className="max-w-xl mx-auto py-8">
            <div className="text-center font-mono text-xs text-neutral-400 mb-4">
              CARD {currentFlashcardIndex + 1} OF {filteredPhrases.length}
            </div>

            <motion.div
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border-2 border-neutral-200/90 shadow-xl min-h-[360px] flex flex-col justify-between text-center cursor-pointer transition-all hover:border-[#0C2B22]/50 relative"
            >
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="bg-[#EBF3EF] text-[#0C2B22] px-2.5 py-1 rounded font-bold uppercase tracking-wider text-[10px]">
                  {currentFlashcard.language} · {currentFlashcard.categoryLabel}
                </span>
                <span className="flex items-center gap-1.5 text-neutral-500">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Click to Flip</span>
                </span>
              </div>

              {!isFlipped ? (
                // Front Side
                <div className="my-auto space-y-4">
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#E28413]">
                    HOW DO YOU SAY IN {currentFlashcard.language.toUpperCase()}:
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-editorial italic font-normal text-neutral-900">
                    "{currentFlashcard.englishMeaning}"
                  </h3>
                  <div className="text-sm font-nastaliq text-neutral-600">
                    {currentFlashcard.urduMeaning}
                  </div>
                  <div className="text-xs font-mono text-neutral-400 pt-4">
                    Tap to reveal pronunciation & script
                  </div>
                </div>
              ) : (
                // Back Side
                <div className="my-auto space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
                    PHONETIC ANSWER:
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold font-display text-[#0C2B22]">
                    {currentFlashcard.phraseLocal}
                  </h3>
                  <div className="text-3xl font-nastaliq text-[#E28413] font-semibold">
                    {currentFlashcard.phraseScript}
                  </div>
                  <div className="text-xs font-mono text-neutral-600">
                    Phonetic: <strong>{currentFlashcard.pronunciation}</strong>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(currentFlashcard);
                    }}
                    className="mx-auto px-5 py-2.5 bg-[#0C2B22] text-white rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer shadow-sm hover:bg-[#144D3C]"
                  >
                    <Volume2 className="w-4 h-4 text-[#E28413]" />
                    <span>PLAY PRONUNCIATION</span>
                  </button>
                </div>
              )}

              {/* Bottom Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-200 text-xs">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLearned(currentFlashcard.id);
                  }}
                  className={`font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer ${
                    learnedPhraseIds.includes(currentFlashcard.id)
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{learnedPhraseIds.includes(currentFlashcard.id) ? 'Learned ✓' : 'Mark Learned'}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextFlashcard();
                  }}
                  className="px-5 py-2 bg-[#0C2B22] hover:bg-[#144D3C] text-white rounded-xl font-bold uppercase tracking-wider text-xs cursor-pointer shadow-xs"
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
