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
      setMessage('Erreur lors de la déconnexion');
    }
  };

  const handleCancel = async () => {
    try {
      await firebaseDeleteAccount();
      removeCurrentUser();
      router.push('/');
    } catch {
      setMessage('Erreur lors de la suppression du compte');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await firebaseUpdatePassword(password);
      setMessage('Mot de passe mis à jour');
      setPassword('');
    } catch {
      setMessage('Erreur lors du changement de mot de passe');
    }
  };

  return (
    <main className="container mx-auto py-12 px-4 max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Mon compte</h1>
      {message && <p className="text-red-600 text-sm">{message}</p>}
      {user && (
        <div className="space-y-1">
          <p>Nom : {user.name}</p>
          <p>Email : {user.email}</p>
        </div>
      )}
      <form onSubmit={handlePasswordChange} className="space-y-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nouveau mot de passe"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Modifier le mot de passe
        </button>
      </form>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Mes commandes</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : orders.length === 0 ? (
          <p>Aucune commande pour le moment.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map((order) => (
              <li key={order.id} className="border p-3 rounded">
                <p>Commande #{order.id}</p>
                <p>Date : {new Date(order.created_at).toLocaleDateString()}</p>
                <p>Total : {order.total} FCFA</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Se déconnecter
      </button>
      <button
        onClick={handleCancel}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Supprimer mon compte
      </button>
    </main>
  );
}
