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
    <div className="min-h-screen bg-white text-[var(--lr-navy-900)]">
      {/* Hero */}
      <section className="relative bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)] overflow-hidden">
        <div className="absolute inset-0 lr-blueprint-dark opacity-50" />
        <div className="lr-stripe absolute top-0 left-0 right-0" />
        <div className="relative lr-container py-20">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Logiciel maison Label Retail</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight max-w-4xl mt-3">
            LR Time — <span className="text-[var(--lr-orange-400)]">pilotez le temps</span> de travail de vos équipes, sans tableur.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70 leading-relaxed">
            Pointage, plannings, congés, heures sup, exports paie : un seul SaaS pour remplacer vos cahiers,
            tableurs et fichiers Excel disséminés.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact?sujet=demo" className="lr-btn-primary">
              Demander une démo
            </Link>
            <Link
              href="/contact?sujet=devis"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 font-display text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
            >
              Recevoir un devis
            </Link>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="lr-section">
        <div className="lr-container">
          <div className="lr-section-heading mb-10">
            <span className="bar" />
            <span className="lr-eyebrow text-[var(--lr-orange-700)]">Pourquoi LR Time</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
              Conçu chez nous, déployé chez vous
            </h2>
          </div>
          <div className="grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)] md:grid-cols-3">
            {benefits.map((benefit, idx) => (
              <div key={benefit.title} className="bg-white p-6 relative">
                <span className="absolute top-0 left-0 h-0.5 w-12 bg-[var(--lr-orange-500)]" />
                <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">0{idx + 1} / 03</span>
                <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)] leading-tight">{benefit.title}</h3>
                <p className="mt-2 text-sm text-[var(--lr-steel-700)] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="lr-section bg-[var(--lr-steel-50)] border-y border-[var(--lr-border)]">
        <div className="lr-container">
          <div className="lr-section-heading mb-10">
            <span className="bar" />
            <span className="lr-eyebrow text-[var(--lr-orange-700)]">Les modules</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">Tout ce qu'il faut, rien de plus</h2>
            <p className="mt-2 text-sm text-[var(--lr-steel-700)] max-w-2xl">
              Six modules couvrant la chaîne complète, du pointage de l'employé à l'export pour le service paie.
            </p>
          </div>
          <div className="grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)] md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, idx) => (
              <div
                key={module.title}
                className="bg-white p-6 relative hover:bg-[var(--lr-steel-50)] transition-colors"
              >
                <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">MOD.{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)] leading-tight">{module.title}</h3>
                <p className="mt-2 text-sm text-[var(--lr-steel-700)] leading-relaxed">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarification indicative */}
      <section className="lr-section">
        <div className="lr-container">
          <div className="max-w-3xl mx-auto bg-[var(--lr-navy-900)] text-white border border-[var(--lr-navy-800)] p-10 relative">
            <span className="absolute top-0 left-0 h-1 w-16 bg-[var(--lr-orange-500)]" />
            <span className="lr-eyebrow text-[var(--lr-orange-400)]">Tarification</span>
            <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
              À partir d'un forfait par utilisateur actif et par mois
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Le tarif final dépend du nombre de sites, des modules retenus et du périphérique de pointage choisi.
              Demandez-nous une simulation chiffrée — réponse sous 24h.
            </p>
            <div className="mt-6">
              <Link href="/contact?sujet=devis" className="lr-btn-primary">
                Recevoir une simulation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="lr-section bg-[var(--lr-steel-50)] border-t border-[var(--lr-border)]">
        <div className="lr-container">
          <div className="max-w-4xl mx-auto text-center bg-white border border-[var(--lr-border)] p-10">
            <div className="lr-stripe -mx-10 -mt-10 mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
              Prêt à voir LR Time sur vos données ?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm text-[var(--lr-steel-700)] leading-relaxed">
              Une démo de 30 minutes suffit pour valider l'adéquation avec votre organisation. Nous vous montrons les
              écrans qui comptent pour votre activité — pas de slide générique.
            </p>
            <div className="mt-6">
              <Link href="/contact?sujet=demo" className="lr-btn-primary">
                Réserver ma démo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
