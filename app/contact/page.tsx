"use client";

import { FormEvent, useMemo, useState } from "react";

function formatTimeslot(value: string): string {
  if (!value) return "Non spécifié";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Non spécifié";

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

function isWithinBusinessHours(value: string): boolean {
  if (!value) return true;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  const day = date.getDay();
  if (day === 0 || day === 6) return false;

  const minutes = date.getHours() * 60 + date.getMinutes();
  const start = 8 * 60 + 30;
  const end = 17 * 60;

  return minutes >= start && minutes <= end;
}

export default function ContactPage() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const [error, setError] = useState<string | null>(null);

  const whatsappLink = useMemo(() => {
    const message = [
      "Bonjour, je souhaite planifier un échange.",
      `Nom : ${lastName || "Non renseigné"}`,
      `Prénom : ${firstName || "Non renseigné"}`,
      `Email : ${email || "Non renseigné"}`,
      `Entreprise : ${company || "Non spécifiée"}`,
      `Créneau souhaité : ${formatTimeslot(timeslot)}`,
    ].join("\n");

    return `https://wa.me/2250788899965?text=${encodeURIComponent(message)}`;
  }, [company, email, firstName, lastName, timeslot]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isWithinBusinessHours(timeslot)) {
      setError("Merci de choisir un créneau en jour ouvrable entre 8h30 et 17h.");
      return;
    }

    setError(null);
    window.open(whatsappLink, "_blank");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-4xl flex-col gap-8 px-6 pb-24 pt-16 md:px-12 lg:px-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="mb-8 space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Contact</p>
            <h1 className="text-3xl font-semibold md:text-4xl">Planifier un échange</h1>
            <p className="text-sm text-slate-300">
              Complétez ce formulaire pour initier la prise de rendez-vous. Nous vous répondrons directement sur WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
                Nom
                <input
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  placeholder="Dupont"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
                Prénom
                <input
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  placeholder="Marie"
                  required
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                placeholder="prenom.nom@email.com"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Entreprise (optionnelle)
              <input
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                placeholder="Label Retail"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Créneau souhaité (jour ouvrable, 8h30 - 17h)
              <input
                type="datetime-local"
                value={timeslot}
                onChange={(event) => setTimeslot(event.target.value)}
                className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
              />
              <span className="text-xs text-slate-400">Ce champ est facultatif mais doit respecter les horaires indiqués.</span>
            </label>

            {error && <p className="text-sm text-rose-400">{error}</p>}

            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-[1.02]"
              >
                Soumettre
              </button>
              <p className="text-xs text-slate-400">
                Le bouton enverra un message WhatsApp au +2250788899965 pour organiser votre rendez-vous.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
