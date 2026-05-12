import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LR Time — Pointage Hikvision, plannings et rapports de présence',
  description:
    "LR Time est le SaaS multi-tenant de Label Retail pour piloter pointage Hikvision, plannings, congés, employés, terminaux et rapports de présence. Pensé pour les entreprises ivoiriennes et africaines.",
  alternates: { canonical: '/lr-time' },
};

const modules = [
  {
    slug: 'pointage',
    title: 'Pointage Hikvision',
    description:
      'Terminaux Hikvision (biométrie visage, empreinte, carte RFID) intégrés via Hik Device Gateway. Ingestion temps réel par webhook + rattrapage automatique en cas de coupure réseau.',
  },
  {
    slug: 'plannings',
    title: 'Plannings & shifts',
    description:
      "Plannings hebdomadaires, périodes datées, work shifts (heures de travail, pauses, marges de retard et de départ anticipé, heures supplémentaires). Affectation par employé ou par département, avec règles weekend flexible.",
  },
  {
    slug: 'conges',
    title: 'Congés & absences',
    description:
      "Demandes de congés (payés, maladie, sans solde, spéciaux) avec workflow de validation manager : approbation, rejet motivé, annulation. Soldes et statuts traçables.",
  },
  {
    slug: 'rapports',
    title: 'Rapports & corrections',
    description:
      "Rapports de présence agrégés par jour, semaine ou mois, exportables en CSV/Excel pour intégration manuelle dans Sage, Odoo ou Excel paie. Corrections de pointage avec piste d'audit complète.",
  },
  {
    slug: 'employes',
    title: 'Employés & organisation',
    description:
      "Annuaire employés multi-sites, départements hiérarchiques, organisations, groupes d'accès. Données biométriques (visage, empreinte, carte) chiffrées au repos par Fernet. Invitations utilisateurs internes par email.",
  },
  {
    slug: 'terminaux',
    title: 'Terminaux & accès',
    description:
      "Onboarding et supervision centralisés des terminaux Hikvision via la gateway : synchronisation, redémarrage à distance, lecture de carte, configuration des lecteurs et webhooks. Multi-tenant strictement isolé.",
  },
] as const;

const benefits = [
  {
    title: 'Pensé pour les coupures réseau',
    description:
      "Les pointages sont conservés sur le terminal Hikvision puis rattrapés automatiquement par le gateway dès le retour du réseau. Aucun pointage perdu, même en cas d'incident internet.",
  },
  {
    title: 'Mis en place par des pros',
    description:
      "Nos équipes installent les terminaux, paramètrent les plannings et forment vos managers et collaborateurs finaux. Pas de chantier laissé à mi-chemin.",
  },
  {
    title: 'Sécurité & conformité au cœur',
    description:
      "Multi-tenant strictement isolé, biométrie chiffrée Fernet, audit log de toutes les actions, exports et suppression de données sur demande (RGPD-ready). JWT pour l'API, RBAC par organisation.",
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
            Pointage Hikvision, plannings, congés, rapports de présence, employés et terminaux :
            un SaaS multi-tenant pour remplacer vos cahiers, tableurs et fichiers Excel disséminés.
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
              <Link
                key={module.slug}
                href={`/lr-time/fonctionnalites/${module.slug}`}
                className="bg-white p-6 relative hover:bg-[var(--lr-steel-50)] transition-colors group"
              >
                <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">MOD.{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)] leading-tight group-hover:text-[var(--lr-orange-600)] transition-colors">{module.title}</h3>
                <p className="mt-2 text-sm text-[var(--lr-steel-700)] leading-relaxed">{module.description}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs text-[var(--lr-steel-500)] leading-relaxed">
            <span className="lr-mono uppercase text-[var(--lr-orange-600)]">Roadmap</span>
            {' '}— application mobile collaborateur (consultation pointage, demande de congé, validation manager) prévue en 2026.
            Les connecteurs paie directs (Sage, Odoo) sont à l'étude ; aujourd'hui les rapports s'exportent en CSV/Excel.
          </p>
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
