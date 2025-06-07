'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterData } from '@/lib/accounts';

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(form);
      if (form.email) {
        router.push(`/accounts/verify-otp?email=${encodeURIComponent(form.email)}`);
      } else {
        router.push('/accounts/login');
      }
    } catch (err: any) {
      setError('Erreur lors de l\'inscription');
    }
  };

  return (
    <main className="container mx-auto py-12 px-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Inscription</h1>
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
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="customer">Client</option>
          <option value="seller">Vendeur</option>
          <option value="admin">Admin</option>
        </select>
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
