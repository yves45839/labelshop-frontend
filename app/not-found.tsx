'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] bg-[var(--lr-steel-50)] flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full bg-white border border-[var(--lr-border)] shadow-lg lr-corners overflow-hidden">
        <div className="lr-stripe" />
        <div className="grid md:grid-cols-[1fr_auto] gap-6 p-8 md:p-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="lr-mono text-xs text-[var(--lr-orange-600)] tracking-widest">// HTTP 404 · NOT_FOUND</span>
              <h1 className="font-display text-6xl md:text-7xl font-bold text-[var(--lr-navy-900)] leading-none mt-2">
                404
              </h1>
              <div className="lr-stripe mt-4 max-w-xs" />
            </motion.div>

            <motion.p
              className="mt-5 text-[var(--lr-steel-700)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              On ne retrouve plus cette page. Elle a peut-être déménagé.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <Link href="/" className="lr-btn-primary">
                Retour à l'accueil
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block"
          >
            <div className="border border-[var(--lr-navy-900)] bg-[var(--lr-navy-900)] p-2">
              <Image
                src="/images/404-illustration.svg"
                alt="Erreur 404"
                width={220}
                height={220}
                className="invert opacity-80"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
