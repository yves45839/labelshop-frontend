"use client";

import { FormEvent, useMemo, useState } from "react";

function formatTimeslot(value: string): string {
  if (!value) return "À convenir";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "À convenir";

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
      "Bonjour Label Retail, j'aimerais qu'on échange.",
      `Nom : ${lastName || "—"}`,
      `Prénom : ${firstName || "—"}`,
      `Email : ${email || "—"}`,
      `Entreprise : ${company || "—"}`,
      `Créneau souhaité : ${formatTimeslot(timeslot)}`,
    ].join("\n");

    return `https://wa.me/2250788899965?text=${encodeURIComponent(message)}`;
  }, [company, email, firstName, lastName, timeslot]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isWithinBusinessHours(timeslot)) {
      setError("Merci de choisir un créneau du lundi au vendredi, entre 8 h 30 et 17 h.");
      return;
    }

    setError(null);
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Contact</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2">Parlons de votre projet</h1>
          <p className="mt-3 text-sm text-white/70 max-w-xl">
            Remplissez le formulaire, on vous recontacte sur WhatsApp pour fixer un rendez-vous.
          </p>
          <div className="lr-stripe mt-6 max-w-xs" />
        </div>
      </header>

      <main className="lr-container py-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 max-w-5xl mx-auto">
          <div className="bg-white border border-[var(--lr-border)] p-6 md:p-8">
            <div className="lr-section-heading mb-6">
              <span className="bar" />
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Formulaire de prise de contact</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="lr-eyebrow text-[var(--lr-steel-500)]">Nom</span>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="lr-input"
                    placeholder="Dupont"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="lr-eyebrow text-[var(--lr-steel-500)]">Prénom</span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="lr-input"
                    placeholder="Marie"
                    required
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="lr-eyebrow text-[var(--lr-steel-500)]">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="lr-input"
                  placeholder="prenom.nom@email.com"
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="lr-eyebrow text-[var(--lr-steel-500)]">Entreprise (facultatif)</span>
                <input
                  type="text"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  className="lr-input"
                  placeholder="Le nom de votre société"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="lr-eyebrow text-[var(--lr-steel-500)]">Créneau souhaité (du lundi au vendredi, 8 h 30 – 17 h)</span>
                <input
                  type="datetime-local"
                  value={timeslot}
                  onChange={(event) => setTimeslot(event.target.value)}
                  className="lr-input lr-mono"
                />
                <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">// Champ facultatif. Si vous le remplissez, choisissez un horaire ouvré.</span>
              </label>

              {error && (
                <div className="border border-rose-300 bg-rose-50 px-4 py-3">
                  <p className="lr-mono text-xs text-rose-700">// {error}</p>
                </div>
              )}

              <div className="border-t border-[var(--lr-border)] pt-5 space-y-3">
                <button type="submit" className="lr-btn-primary w-full md:w-auto">
                  Envoyer sur WhatsApp
                </button>
                <p className="lr-mono text-xs text-[var(--lr-steel-500)]">
                  // Cliquer sur ce bouton ouvre WhatsApp avec votre message prérempli, à destination du +225 07 88 89 99 65.
                </p>
              </div>
            </form>
          </div>

          <aside className="bg-[var(--lr-navy-900)] text-white border border-[var(--lr-navy-800)] p-6 md:p-8 h-fit relative">
            <span className="absolute top-0 left-0 h-1 w-16 bg-[var(--lr-orange-500)]" />
            <span className="lr-eyebrow text-[var(--lr-orange-400)]">Contact direct</span>
            <h3 className="font-display text-xl font-bold uppercase tracking-wide mt-2">Une autre façon de nous joindre</h3>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="border-l-2 border-[var(--lr-orange-500)] pl-3">
                <dt className="lr-eyebrow text-white/50">Email</dt>
                <dd className="lr-mono text-white mt-0.5">info@label-ci.com</dd>
              </div>
              <div className="border-l-2 border-white/10 pl-3">
                <dt className="lr-eyebrow text-white/50">Tél.</dt>
                <dd className="lr-mono text-white mt-0.5">+225 07 888 999 65</dd>
              </div>
              <div className="border-l-2 border-white/10 pl-3">
                <dt className="lr-eyebrow text-white/50">Fixe</dt>
                <dd className="lr-mono text-white mt-0.5">+225 27 21 58 56 77</dd>
              </div>
              <div className="border-l-2 border-white/10 pl-3">
                <dt className="lr-eyebrow text-white/50">Horaires</dt>
                <dd className="text-white mt-0.5 text-xs">Lun – Ven · 8 h 30 → 17 h</dd>
              </div>
            </dl>
          </aside>
        </div>
      </main>
    </div>
  );
}
