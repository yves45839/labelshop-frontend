'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginData } from '@/lib/accounts';

export default function LoginPage() {
  const [form, setForm] = useState<LoginData>({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form);
      router.push('/');
    } catch (err: any) {
      setError('Erreur de connexion');
    }
  };

  return (
    <main className="container mx-auto py-12 px-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Connexion</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="Nom d'utilisateur"
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Pas encore de compte?{' '}
        <a href="/accounts/register" className="text-blue-600 hover:underline">
          Inscrivez-vous
        </a>
      </p>
    </main>
  );
}
