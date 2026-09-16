'use client';

import { useState, useEffect } from 'react';

export function usePageContent(pageKey, defaultContent = null) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadContent() {
      try {
        const res = await fetch(`/api/admin/pages?page=${pageKey}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && isMounted) {
            setContent(json.data);
          }
        }
      } catch (e) {
        // Fallback gracefully to defaultContent
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, [pageKey]);

  return { content, loading };
}
