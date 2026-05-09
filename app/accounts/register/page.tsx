'use client';
import { useState } from 'react';
import { firebaseRegister } from '@/lib/firebase';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await firebaseRegister(
        form.email,
        form.password,
        form.displayName,
      );
      setMessage(
        "Un e-mail de vérification vient de partir. Jetez un œil à votre boîte (et au dossier spam, au cas où)."
      );
      setForm({ displayName: '', email: '', password: '' });
    } catch (err: any) {
      setError(err.message || "L'inscription n'a pas abouti. Réessayez ou contactez-nous.");
    }
  };

  return (
    <main className="container mx-auto py-12 px-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Créer un compte</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={form.displayName}
          onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          placeholder="Nom"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Mot de passe"
          className="w-full border px-3 py-2 rounded"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          S'inscrire
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Vous avez déjà un compte ?{' '}
        <Link href="/accounts/login" className="text-blue-600 hover:underline">
          Connectez-vous
        </Link>
      </p>
    </main>
  );
}
