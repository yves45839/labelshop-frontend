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
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="px-6 pb-12 pt-20 md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
            Centre de formation Label Retail
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Formez vos équipes par des praticiens, pas par des slides.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            Quatre familles de formations, animées par nos ingénieurs et formateurs certifiés Hikvision et LR Time,
            à Abidjan ou en distanciel.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#sessions"
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-amber-700"
            >
              Voir les sessions ouvertes
            </Link>
            <Link
              href="/contact?sujet=formation"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
            >
              Demander une formation sur-mesure
            </Link>
          </div>
        </div>
      </section>

      {/* 4 familles */}
      <section className="border-y border-slate-200 bg-slate-50 px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Notre catalogue</span>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Quatre familles, un seul interlocuteur</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {families.map((family) => (
              <div
                key={family.title}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-slate-900">{family.title}</h3>
                  <span className="whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                    {family.duration}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-slate-500">{family.audience}</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {family.modules.map((module) => (
                    <li key={module} className="flex items-start gap-2">
                      <span className="mt-1 text-amber-600">•</span>
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
      <section id="sessions" className="px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Calendrier</span>
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Prochaines sessions ouvertes</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-700">
                Inscrivez-vous en quelques clics. Les places sont limitées pour garantir la qualité pédagogique.
              </p>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600">
                <tr>
                  <th className="px-4 py-3 md:px-6">Date</th>
                  <th className="px-4 py-3 md:px-6">Formation</th>
                  <th className="hidden px-4 py-3 md:table-cell md:px-6">Famille</th>
                  <th className="hidden px-4 py-3 md:table-cell md:px-6">Lieu</th>
                  <th className="px-4 py-3 md:px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sessions.map((session) => (
                  <tr key={session.title} className="hover:bg-slate-50">
                    <td className="px-4 py-4 md:px-6">
                      <div className="font-semibold text-slate-900">{session.date}</div>
                      <div className="text-xs text-slate-600">{session.duration}</div>
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      <div className="font-semibold text-slate-900">{session.title}</div>
                      <div className="text-xs text-slate-600 md:hidden">{session.family} • {session.location}</div>
                    </td>
                    <td className="hidden px-4 py-4 text-slate-700 md:table-cell md:px-6">{session.family}</td>
                    <td className="hidden px-4 py-4 text-slate-700 md:table-cell md:px-6">
                      <div>{session.location}</div>
                      <div className="text-xs text-emerald-700">{session.seats}</div>
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      <Link
                        href={`/contact?sujet=formation&session=${encodeURIComponent(session.title)}`}
                        className="inline-flex items-center justify-center rounded-full bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-amber-700"
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
      <section className="border-t border-slate-200 bg-slate-50 px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">Vous ne trouvez pas votre formation ?</h2>
          <p className="max-w-2xl text-sm text-slate-700">
            Décrivez-nous votre besoin : équipement utilisé, niveau des stagiaires, contraintes de planning. Nous concevons un
            programme et un calendrier adaptés à votre organisation.
          </p>
          <Link
            href="/contact?sujet=formation"
            className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-amber-700"
          >
            Demander un programme sur-mesure
          </Link>
        </div>
      </section>
    </main>
  );
}
