'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  firebaseLogout,
  firebaseDeleteAccount,
  firebaseUpdatePassword,
} from '@/lib/firebase';
import { listOrders } from '@/lib/orders';
import { getCurrentUser, removeCurrentUser } from '@/lib/user';

export default function ProfilePage() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<{ id: number; created_at: string; total: number; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.push('/accounts/login');
      return;
    }
    setUser(u);
    listOrders(u.id)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    try {
      await firebaseLogout();
      removeCurrentUser();
      router.push('/');
    } catch {
      setMessage("La déconnexion n'a pas abouti. Réessayez dans un instant.");
    }
  };

  const handleCancel = async () => {
    try {
      await firebaseDeleteAccount();
      removeCurrentUser();
      router.push('/');
    } catch {
      setMessage("La suppression du compte n'a pas pu se faire. Reconnectez-vous puis réessayez.");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await firebaseUpdatePassword(password);
      setMessage('Mot de passe mis à jour.');
      setPassword('');
    } catch {
      setMessage("Le mot de passe n'a pas pu être modifié. Réessayez ou reconnectez-vous.");
    }
  };

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-10">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Espace client</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mt-1">Mon compte</h1>
        </div>
      </header>

      <main className="lr-container py-10 max-w-3xl space-y-6">
        {message && (
          <div className="border border-rose-300 bg-rose-50 px-4 py-3">
            <p className="lr-mono text-xs text-rose-700">// {message}</p>
          </div>
        )}

        {user && (
          <div className="bg-white border border-[var(--lr-border)] p-6">
            <div className="lr-section-heading mb-4">
              <span className="bar" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Identité</h2>
            </div>
            <dl className="grid grid-cols-[100px_1fr] gap-3 text-sm border-t border-[var(--lr-border)] pt-3">
              <dt className="lr-eyebrow text-[var(--lr-steel-500)]">Nom</dt>
              <dd className="text-[var(--lr-navy-900)] font-semibold">{user.name}</dd>
              <dt className="lr-eyebrow text-[var(--lr-steel-500)]">Email</dt>
              <dd className="text-[var(--lr-navy-900)] lr-mono">{user.email}</dd>
            </dl>
          </div>
        )}

        <div className="bg-white border border-[var(--lr-border)] p-6">
          <div className="lr-section-heading mb-4">
            <span className="bar" />
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Sécurité</h2>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-3">
            <div>
              <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Nouveau mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
                className="lr-input"
                required
              />
            </div>
            <button type="submit" className="lr-btn-primary w-full md:w-auto">
              Modifier le mot de passe
            </button>
          </form>
        </div>

        <div className="bg-white border border-[var(--lr-border)] p-6">
          <div className="lr-section-heading mb-4">
            <span className="bar" />
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Mes commandes</h2>
          </div>
          {loading ? (
            <p className="lr-mono text-xs text-[var(--lr-steel-500)]">// Chargement…</p>
          ) : orders.length === 0 ? (
            <p className="text-sm text-[var(--lr-steel-700)]">Pas encore de commande à votre actif.</p>
          ) : (
            <ul className="divide-y divide-[var(--lr-border)] border-t border-[var(--lr-border)]">
              {orders.map((order) => (
                <li key={order.id} className="grid grid-cols-3 gap-3 py-3 text-sm">
                  <span className="lr-mono text-[var(--lr-navy-900)]">#{order.id}</span>
                  <span className="text-[var(--lr-steel-700)] lr-mono text-xs">{new Date(order.created_at).toLocaleDateString()}</span>
                  <span className="font-display font-bold text-[var(--lr-navy-900)] lr-tnum text-right">{order.total.toLocaleString()} <span className="text-xs text-[var(--lr-steel-500)]">FCFA</span></span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <button onClick={handleLogout} className="lr-btn-secondary">
            Se déconnecter
          </button>
          <button
            onClick={handleCancel}
            className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 hover:bg-rose-700 font-display text-xs font-semibold uppercase tracking-widest text-white border border-rose-700 transition-colors"
          >
            Supprimer mon compte
          </button>
        </div>
      </main>
    </div>
  );
}
