/**
 * Speech synthesis utility for DASTAN language learning phrases.
 * Uses window.speechSynthesis with fallback audio tones.
 */

export function speakPhrase(text: string, language: 'Pashto' | 'Khowar' | 'Urdu' = 'Pashto') {
  if (typeof window === 'undefined') return;

  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any pending utterances

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Attempt to pick an Urdu, Arabic, Persian, or Hindi voice if Pashto voice isn't present in standard OS voices
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.lang.startsWith('ur') || 
        v.lang.startsWith('ar') || 
        v.lang.startsWith('fa') || 
        v.lang.startsWith('hi')
      ) || voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = 0.85; // Slightly slower for language learners
      utterance.pitch = 1.0;
      
      window.speechSynthesis.speak(utterance);
      return;
    }
  } catch (e) {
    console.warn('Speech synthesis unavailable, falling back to Web Audio synthesis', e);
  }

  // Web Audio chime feedback fallback if speech synthesis is disabled or blocked
  playSubtleChime();
}

function playSubtleChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // Ignore audio context initialization errors
  }
}
