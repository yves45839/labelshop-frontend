'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu rapide"
        className="w-12 h-12 bg-[var(--lr-navy-900)] border border-[var(--lr-orange-500)] text-white flex items-center justify-center shadow-xl hover:bg-[var(--lr-orange-600)] transition-colors"
      >
        <span className="text-xl font-display">☰</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-14 right-0 w-44 bg-white border border-[var(--lr-border)] shadow-2xl"
          >
            <div className="lr-stripe" />
            <ul className="text-sm">
              <li>
                <Link
                  href="/accounts/login"
                  className="block px-4 py-2.5 font-display uppercase text-xs tracking-widest text-[var(--lr-navy-900)] hover:bg-[var(--lr-navy-900)] hover:text-white border-b border-[var(--lr-border)] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Connexion
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="block px-4 py-2.5 font-display uppercase text-xs tracking-widest text-[var(--lr-navy-900)] hover:bg-[var(--lr-navy-900)] hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Commandes
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
