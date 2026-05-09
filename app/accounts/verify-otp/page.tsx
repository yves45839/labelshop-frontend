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
    <main className="min-h-[80vh] bg-[var(--lr-steel-50)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white border border-[var(--lr-border)] shadow-lg">
        <div className="bg-[var(--lr-navy-900)] text-white px-6 py-5">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">2/2 — Vérification</span>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight mt-1">Vérification du code</h1>
        </div>
        <div className="lr-stripe" />
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="lr-input"
            />
          </div>
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Code OTP</label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              placeholder="Code reçu par e-mail"
              className="lr-input lr-mono text-center text-lg tracking-[0.4em]"
              required
            />
          </div>
          {message && (
            <div className="border border-rose-300 bg-rose-50 px-3 py-2">
              <p className="lr-mono text-xs text-rose-700">// {message}</p>
            </div>
          )}
          <button type="submit" className="lr-btn-primary w-full">Vérifier</button>
        </form>
      </div>
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
