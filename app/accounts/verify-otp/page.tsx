'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyOTP, VerifyOTPData } from '@/lib/accounts';

function VerifyOTPForm() {
  const params = useSearchParams();
  const emailParam = params.get('email') || '';
  const [form, setForm] = useState<VerifyOTPData>({
    email: emailParam,
    code: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyOTP(form);
      setMessage('Code validé. Vous pouvez vous connecter.');
      setTimeout(() => router.push('/accounts/login'), 1500);
    } catch (err: any) {
      setMessage("Le code est invalide ou a expiré. Demandez-en un nouveau.");
    }
  };

  return (
    <main className="container mx-auto py-12 px-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Vérification du code</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          placeholder="Code reçu par e-mail"
          className="w-full border px-3 py-2 rounded"
          required
        />
        {message && <p className="text-red-600 text-sm">{message}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Vérifier
        </button>
      </form>
    </main>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense>
      <VerifyOTPForm />
    </Suspense>
  );
}
