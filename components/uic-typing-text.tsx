'use client';
import { useEffect, useState } from 'react';

export function TypingText({ phrases, paused }: { phrases: readonly string[]; paused: boolean }) {
  const [frame, setFrame] = useState({ word: 0, count: phrases[0]?.length ?? 0, deleting: true });
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync(); media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    if (paused || reduced || phrases.length < 2) return;
    const phrase = phrases[frame.word];
    if (!phrase) return;
    let delay: number;
    let next: typeof frame;
    if (frame.deleting && frame.count === 0) {
      delay = 350; next = { word: (frame.word + 1) % phrases.length, count: 0, deleting: false };
    } else if (frame.deleting) {
      delay = frame.count === phrase.length ? 1900 : 32 + Math.random() * 25;
      next = { ...frame, count: frame.count - 1 };
    } else {
      const count = Math.min(frame.count + 1, phrase.length);
      delay = 58 + Math.random() * 62; next = { ...frame, count, deleting: count === phrase.length };
    }
    const timer = window.setTimeout(() => setFrame(next), delay);
    return () => window.clearTimeout(timer);
  }, [frame, phrases, paused, reduced]);
  return <span className="craft-typing" aria-hidden="true">
    {reduced ? phrases[0] : phrases[frame.word]?.slice(0, frame.count)}<span className="craft-cursor" />
  </span>;
}
