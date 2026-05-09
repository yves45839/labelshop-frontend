'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">

      {/* Animation du titre 404 */}
      <motion.h1
        className="text-7xl font-extrabold text-orange-500 mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
      </motion.h1>

      {/* Animation du texte */}
      <motion.p
        className="text-lg text-gray-700 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        On ne retrouve plus cette page. Elle a peut-être déménagé.
      </motion.p>

      {/* Animation de l’image */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Image
          src="/images/404-illustration.svg" // Mets une image ici
          alt="Erreur 404"
          width={300}
          height={300}
          className="mx-auto"
        />
      </motion.div>

      {/* Bouton animé */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Retour à l'accueil
        </Link>
      </motion.div>
    </main>
  );
}
