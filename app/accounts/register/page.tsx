'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { firebaseRegister } from '@/lib/firebase';

export default function RegisterPage() {
  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await firebaseRegister(
        form.email,
        form.password,
        form.displayName,
      );
      localStorage.setItem(
        'user',
        JSON.stringify({ id: user.uid, email: user.email, name: user.displayName })
      );
      router.push('/');
    } catch (err: any) {
      setError("Erreur lors de l'inscription");
    }
  };

  return (
    <main className="container mx-auto py-12 px-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Inscription</h1>
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          S'inscrire
        </button>
      </form>
    </main>
  );
}
