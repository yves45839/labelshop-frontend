import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LR Time — Logiciel de gestion du temps et des présences',
  description:
    "LR Time est le SaaS de Label Retail pour piloter pointages, congés, heures supplémentaires et exports paie. Pensé pour les entreprises ivoiriennes et africaines.",
  alternates: { canonical: '/lr-time' },
};

const modules = [
  {
    title: 'Pointage multi-canaux',
    description:
      'Biométrie, badges RFID/NFC, application mobile géolocalisée ou web. Chaque collaborateur pointe avec le canal qui lui convient.',
  },
  {
    title: 'Plannings & équipes',
    description:
      'Construisez les rotations de vos équipes, gérez les remplacements et anticipez la couverture des postes critiques.',
  },
  {
    title: 'Congés & absences',
    description:
      'Workflow de demande, validation managériale, soldes calculés automatiquement, alertes et notifications email.',
  },
  {
    title: 'Heures sup & primes',
    description:
      'Règles paramétrables par convention ou par site. Heures normales, sup., dimanches et jours fériés calculés sans intervention.',
  },
  {
    title: 'Exports paie',
    description:
      'Exports CSV/Excel prêts à intégrer dans Sage, Odoo, Excel paie ou tout autre logiciel RH/comptable utilisé.',
  },
  {
    title: 'Tableau de bord temps réel',
    description:
      'Présents, retards, absences, heures cumulées : visualisez l\'activité de tous vos sites en un seul écran.',
  },
];

const benefits = [
  {
    title: 'Pensé pour le marché africain',
    description:
      'Tolérant aux coupures réseau, hébergé localement, conforme à la réglementation ivoirienne et accessible en français.',
  },
  {
    title: 'Mis en place par des pros',
    description:
      "Nos équipes installent, paramètrent et forment vos managers et utilisateurs finaux. Pas de chantier laissé à mi-chemin.",
  },
  {
    title: 'Évolutif sans friction',
    description:
      "Démarrez sur un site, étendez à votre groupe quand vous êtes prêts. Le tarif suit le nombre d'utilisateurs actifs.",
  },
];

export default function LrTimePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 px-6 py-20 text-white md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-100">
            Logiciel maison Label Retail
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            LR Time — pilotez le temps de travail de vos équipes, sans tableur.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-indigo-100">
            Pointage, plannings, congés, heures sup, exports paie : un seul SaaS pour remplacer vos cahiers,
            tableurs et fichiers Excel disséminés.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact?sujet=demo"
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-amber-400"
            >
              Demander une démo
            </Link>
            <Link
              href="/contact?sujet=devis"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Recevoir un devis
            </Link>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-700">Pourquoi LR Time</span>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Conçu chez nous, déployé chez vous</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="border-y border-slate-200 bg-slate-50 px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-700">Les modules</span>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Tout ce qu'il faut, rien de plus</h2>
            <p className="mt-3 text-sm text-slate-700">
              Six modules couvrant la chaîne complète, du pointage de l'employé à l'export pour le service paie.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <div
                key={module.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{module.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarification indicative */}
      <section className="px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-10 text-center shadow-lg">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-700">Tarification</span>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">À partir d'un forfait par utilisateur actif et par mois</h2>
          <p className="mt-3 text-sm text-slate-700">
            Le tarif final dépend du nombre de sites, des modules retenus et du périphérique de pointage choisi.
            Demandez-nous une simulation chiffrée — réponse sous 24h.
          </p>
          <div className="mt-6">
            <Link
              href="/contact?sujet=devis"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-indigo-700"
            >
              Recevoir une simulation
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-slate-200 bg-slate-50 px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">Prêt à voir LR Time sur vos données ?</h2>
          <p className="max-w-2xl text-sm text-slate-700">
            Une démo de 30 minutes suffit pour valider l'adéquation avec votre organisation. Nous vous montrons les
            écrans qui comptent pour votre activité — pas de slide générique.
          </p>
          <Link
            href="/contact?sujet=demo"
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow transition hover:bg-amber-400"
          >
            Réserver ma démo
          </Link>
        </div>
      </section>
    </main>
  );
}
