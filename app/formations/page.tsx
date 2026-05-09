import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Formations — Label Retail',
  description:
    "Formations Hikvision, LR Time, certifiantes et sur-mesure organisées par Label Retail à Abidjan et en distanciel.",
  alternates: { canonical: '/formations' },
};

const families = [
  {
    title: 'Techniques Hikvision',
    audience: 'Techniciens, intégrateurs, services généraux',
    modules: [
      'Installation et configuration des caméras IP',
      'Paramétrage HikCentral Pro & enregistreurs NVR',
      'Maintenance préventive et résolution d\'incidents',
    ],
    duration: '2 à 5 jours',
  },
  {
    title: 'Utilisateurs LR Time',
    audience: 'Managers, RH, utilisateurs finaux',
    modules: [
      'Découverte de l\'interface et du tableau de bord',
      'Validation des congés et heures supplémentaires',
      'Exports paie et rapports périodiques',
    ],
    duration: '1 à 2 jours',
  },
  {
    title: 'Certifiantes & habilitations',
    audience: 'Personnel technique exposé aux risques',
    modules: [
      'Habilitations électriques B0/B1/B2/H1V',
      'Sécurité électronique — référentiel courants faibles',
      'Préparation aux certifications constructeur',
    ],
    duration: '2 à 4 jours',
  },
  {
    title: 'Sur-mesure entreprises',
    audience: 'Vos équipes — programme dédié',
    modules: [
      'Audit du besoin et conception du programme',
      'Animation chez vous, en salle ou en distanciel',
      'Évaluation et attestation de formation',
    ],
    duration: 'Selon cahier des charges',
  },
];

const sessions = [
  {
    date: '15 juin 2026',
    title: 'Configuration HikCentral Pro',
    family: 'Techniques Hikvision',
    duration: '3 jours',
    location: 'Plateau, Abidjan',
    seats: '8 places',
  },
  {
    date: '22 juin 2026',
    title: 'LR Time pour managers',
    family: 'Utilisateurs LR Time',
    duration: '1 jour',
    location: 'En ligne',
    seats: '12 places',
  },
  {
    date: '5 juillet 2026',
    title: 'Habilitation B1V/H1V',
    family: 'Certifiantes & habilitations',
    duration: '2 jours',
    location: 'Marcory, Abidjan',
    seats: '10 places',
  },
  {
    date: '12 juillet 2026',
    title: 'Maintenance des caméras IP',
    family: 'Techniques Hikvision',
    duration: '2 jours',
    location: 'Plateau, Abidjan',
    seats: '8 places',
  },
];

export default function FormationsPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--lr-navy-900)]">
      {/* Hero */}
      <section className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)] relative overflow-hidden">
        <div className="absolute inset-0 lr-blueprint-dark opacity-50" />
        <div className="lr-stripe absolute top-0 left-0 right-0" />
        <div className="relative lr-container py-20">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Centre de formation Label Retail</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight max-w-4xl mt-3">
            Formez vos équipes par des <span className="text-[var(--lr-orange-400)]">praticiens</span>, pas par des slides.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Quatre familles de formations, animées par nos ingénieurs et formateurs certifiés Hikvision et LR Time,
            à Abidjan ou en distanciel.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#sessions" className="lr-btn-primary">Voir les sessions ouvertes</Link>
            <Link
              href="/contact?sujet=formation"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 font-display text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
            >
              Demander une formation sur-mesure
            </Link>
          </div>
        </div>
      </section>

      {/* 4 familles */}
      <section className="lr-section bg-[var(--lr-steel-50)] border-b border-[var(--lr-border)]">
        <div className="lr-container">
          <div className="lr-section-heading mb-10">
            <span className="bar" />
            <span className="lr-eyebrow text-[var(--lr-orange-700)]">Notre catalogue</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
              Quatre familles, un seul interlocuteur
            </h2>
          </div>
          <div className="grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)] md:grid-cols-2">
            {families.map((family, idx) => (
              <div
                key={family.title}
                className="flex flex-col gap-4 bg-white p-6 relative hover:bg-[var(--lr-steel-50)] transition-colors"
              >
                <span className="absolute top-0 left-0 h-0.5 w-12 bg-[var(--lr-orange-500)]" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">FAM.0{idx + 1}</span>
                    <h3 className="mt-1 font-display text-xl font-bold uppercase tracking-wide text-[var(--lr-navy-900)] leading-tight">{family.title}</h3>
                  </div>
                  <span className="whitespace-nowrap lr-tag lr-tag--orange">{family.duration}</span>
                </div>
                <p className="lr-eyebrow text-[var(--lr-steel-500)]">{family.audience}</p>
                <ul className="space-y-2 text-sm text-[var(--lr-steel-700)] border-t border-[var(--lr-border)] pt-3">
                  {family.modules.map((module) => (
                    <li key={module} className="flex items-start gap-2">
                      <span className="mt-0.5 text-[var(--lr-orange-600)]">›</span>
                      <span>{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section id="sessions" className="lr-section">
        <div className="lr-container">
          <div className="lr-section-heading mb-10">
            <span className="bar" />
            <span className="lr-eyebrow text-[var(--lr-orange-700)]">Calendrier</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
              Prochaines sessions ouvertes
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--lr-steel-700)]">
              Inscrivez-vous en quelques clics. Les places sont limitées pour garantir la qualité pédagogique.
            </p>
          </div>

          <div className="border border-[var(--lr-border)] bg-white overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--lr-navy-900)] text-white">
                <tr>
                  <th className="px-4 py-3 md:px-6 font-display uppercase tracking-widest text-xs">Date</th>
                  <th className="px-4 py-3 md:px-6 font-display uppercase tracking-widest text-xs">Formation</th>
                  <th className="hidden px-4 py-3 md:table-cell md:px-6 font-display uppercase tracking-widest text-xs">Famille</th>
                  <th className="hidden px-4 py-3 md:table-cell md:px-6 font-display uppercase tracking-widest text-xs">Lieu</th>
                  <th className="px-4 py-3 md:px-6 font-display uppercase tracking-widest text-xs">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--lr-border)]">
                {sessions.map((session) => (
                  <tr key={session.title} className="hover:bg-[var(--lr-steel-50)] transition-colors">
                    <td className="px-4 py-4 md:px-6">
                      <div className="font-display font-bold uppercase tracking-wide text-[var(--lr-navy-900)] lr-tnum">{session.date}</div>
                      <div className="lr-mono text-[10px] text-[var(--lr-steel-500)]">{session.duration}</div>
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      <div className="font-display font-semibold uppercase tracking-wide text-[var(--lr-navy-900)]">{session.title}</div>
                      <div className="text-xs text-[var(--lr-steel-500)] md:hidden">{session.family} · {session.location}</div>
                    </td>
                    <td className="hidden px-4 py-4 text-[var(--lr-steel-700)] md:table-cell md:px-6">{session.family}</td>
                    <td className="hidden px-4 py-4 text-[var(--lr-steel-700)] md:table-cell md:px-6">
                      <div>{session.location}</div>
                      <div className="lr-mono text-[10px] text-emerald-700">{session.seats}</div>
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      <Link
                        href={`/contact?sujet=formation&session=${encodeURIComponent(session.title)}`}
                        className="inline-flex items-center justify-center bg-[var(--lr-orange-600)] hover:bg-[var(--lr-orange-700)] px-4 py-2 font-display text-xs font-semibold uppercase tracking-widest text-white border border-[var(--lr-orange-700)] transition-colors"
                      >
                        S'inscrire
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA sur-mesure */}
      <section className="lr-section bg-[var(--lr-steel-50)] border-t border-[var(--lr-border)]">
        <div className="lr-container">
          <div className="max-w-4xl mx-auto bg-white border border-[var(--lr-border)] p-10 text-center">
            <div className="lr-stripe -mx-10 -mt-10 mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
              Vous ne trouvez pas votre formation ?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm text-[var(--lr-steel-700)] leading-relaxed">
              Décrivez-nous votre besoin : équipement utilisé, niveau des stagiaires, contraintes de planning. Nous concevons un
              programme et un calendrier adaptés à votre organisation.
            </p>
            <div className="mt-6">
              <Link href="/contact?sujet=formation" className="lr-btn-primary">
                Demander un programme sur-mesure
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
