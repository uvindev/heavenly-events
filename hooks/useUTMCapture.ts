'use client';

import { useEffect } from 'react';

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'] as const;

export function useUTMCapture() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    UTM_PARAMS.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        sessionStorage.setItem(param, value);
      }
    });
  }, []);
}
