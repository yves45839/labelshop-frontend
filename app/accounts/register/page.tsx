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
    <main className="min-h-[80vh] bg-[var(--lr-steel-50)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white border border-[var(--lr-border)] shadow-lg">
        <div className="bg-[var(--lr-navy-900)] text-white px-6 py-5">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Espace client</span>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight mt-1">Créer un compte</h1>
        </div>
        <div className="lr-stripe" />
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Nom</label>
            <input
              type="text"
              value={form.displayName}
              onChange={(e) => setForm({ ...form, displayName: e.target.value })}
              placeholder="Nom"
              className="lr-input"
              required
            />
          </div>
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="lr-input"
              required
            />
          </div>
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Mot de passe</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Mot de passe"
              className="lr-input"
              required
            />
          </div>
          {error && (
            <div className="border border-rose-300 bg-rose-50 px-3 py-2">
              <p className="lr-mono text-xs text-rose-700">// {error}</p>
            </div>
          )}
          {message && (
            <div className="border border-emerald-300 bg-emerald-50 px-3 py-2">
              <p className="lr-mono text-xs text-emerald-700">// {message}</p>
            </div>
          )}
          <button type="submit" className="lr-btn-primary w-full">S'inscrire</button>
        </form>
        <p className="px-6 pb-6 text-sm text-center text-[var(--lr-steel-700)] border-t border-[var(--lr-border)] pt-4">
          Vous avez déjà un compte ?{' '}
          <Link href="/accounts/login" className="text-[var(--lr-orange-700)] hover:text-[var(--lr-navy-900)] font-semibold border-b border-[var(--lr-orange-700)] pb-0.5">
            Connectez-vous
          </Link>
        </p>
      </div>
    </main>
  );
}
