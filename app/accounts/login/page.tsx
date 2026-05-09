'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { firebaseLogin } from '@/lib/firebase';
import { saveCurrentUser } from '@/lib/user';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await firebaseLogin(form.email, form.password);
      saveCurrentUser({ id: user.uid, email: user.email, name: user.displayName });
      router.push('/');
    } catch (err: any) {
      setError(err.message || "Connexion impossible. Vérifiez vos identifiants.");
    }
  };

  return (
    <main className="min-h-[80vh] bg-[var(--lr-steel-50)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white border border-[var(--lr-border)] shadow-lg">
        <div className="bg-[var(--lr-navy-900)] text-white px-6 py-5">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Espace client</span>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight mt-1">Se connecter</h1>
        </div>
        <div className="lr-stripe" />
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="vous@entreprise.ci"
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
              placeholder="••••••••"
              className="lr-input"
              required
            />
          </div>
          {error && (
            <div className="border border-rose-300 bg-rose-50 px-3 py-2">
              <p className="lr-mono text-xs text-rose-700">// {error}</p>
            </div>
          )}
          <button type="submit" className="lr-btn-primary w-full">
            Se connecter
          </button>
        </form>
        <p className="px-6 pb-6 text-sm text-center text-[var(--lr-steel-700)] border-t border-[var(--lr-border)] pt-4">
          Vous n'avez pas encore de compte ?{' '}
          <Link href="/accounts/register" className="text-[var(--lr-orange-700)] hover:text-[var(--lr-navy-900)] font-semibold border-b border-[var(--lr-orange-700)] pb-0.5">
            Créez le vôtre
          </Link>
        </p>
      </div>
    </main>
  );
}
