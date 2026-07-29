'use client';

import { useEffect } from 'react';

export default function FirebaseInit() {
  useEffect(() => {
    // Import dynamique : sort le SDK Firebase du bundle initial de chaque page.
    import('@/lib/firebase').then(({ initFirebase }) => initFirebase());
  }, []);
  return null;
}
