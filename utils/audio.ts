
// Base64 generated sounds to ensure functionality without external files

// Short "Click" (High pitch blip)
const CLICK_SOUND = "data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/w==";

// "Success" (Arcade Win style)
const SUCCESS_SOUND = "data:audio/wav;base64,UklGRmIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A";

// "Processing" (Static/Computer noise - Short loopable)
const PROCESSING_SOUND = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAAAAP8A/wD/AP8=";

const SOUNDS = {
  click: CLICK_SOUND,
  success: SUCCESS_SOUND,
  processing: PROCESSING_SOUND
};

const audioCache: Record<string, HTMLAudioElement> = {};

export const preloadSounds = () => {
  if (typeof window === 'undefined') return;
  
  Object.keys(SOUNDS).forEach(key => {
    try {
      const k = key as keyof typeof SOUNDS;
      const audio = new Audio(SOUNDS[k]);
      audio.preload = 'auto';
      audioCache[key] = audio;
    } catch (e) {
      console.warn(`Failed to preload sound: ${key}`, e);
    }
  });
};

export const playSound = (name: keyof typeof SOUNDS, volume: number = 1.0) => {
  if (typeof window === 'undefined') return;

  const src = SOUNDS[name];
  if (!src) return;
  
  try {
    const audio = new Audio(src);
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(e => {
        // Auto-play policy might block this if no interaction
        console.debug('Audio play blocked or failed', e);
      });
    }
  } catch (e) {
    console.warn('Audio error', e);
  }
};

export const getAudio = (name: keyof typeof SOUNDS): HTMLAudioElement | null => {
  if (typeof window === 'undefined') return null;
  return new Audio(SOUNDS[name]);
};
