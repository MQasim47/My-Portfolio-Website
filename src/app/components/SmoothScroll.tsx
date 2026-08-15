'use client';

import { useEffect } from 'react';

/**
 * SmoothScroll — no external packages needed.
 * Pure CSS scroll-behavior handles anchor/button scrolls.
 * This component only adds the html class so CSS kicks in.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Just ensure the html element has smooth scroll enabled
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return null;
}