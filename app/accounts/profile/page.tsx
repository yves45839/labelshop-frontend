'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout, cancelAccount } from '@/lib/accounts';

export default function ProfilePage() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('user');
      router.push('/');
    } catch {
      setMessage('Erreur lors de la déconnexion');
    }
  };

  const handleCancel = async () => {
    try {
      await cancelAccount();
      localStorage.removeItem('user');
      router.push('/');
    } catch {
      setMessage('Erreur lors de la suppression du compte');
    }
  };

  return (
    <main className="container mx-auto py-12 px-4 max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Mon compte</h1>
      {message && <p className="text-red-600 text-sm">{message}</p>}
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
