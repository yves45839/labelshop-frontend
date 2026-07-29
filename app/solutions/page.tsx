import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import { SOLUTIONS } from '@/lib/solutions-data';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: "Nos solutions de sécurité électronique en Côte d'Ivoire",
  description:
    "Vidéosurveillance, contrôle d'accès, alarme anti-intrusion et pointage biométrique : les solutions installées et maintenues par Label Retail à Abidjan et en Côte d'Ivoire.",
  path: '/solutions',
  keywords: [
    "sécurité électronique Côte d'Ivoire",
    'vidéosurveillance Abidjan',
    "contrôle d'accès",
    'alarme intrusion',
    'pointage biométrique',
  ],
});

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[var(--lr-steel-50)]">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <Breadcrumb
            items={[
              { name: 'Accueil', path: '/' },
              { name: 'Solutions', path: '/solutions' },
            ]}
          />
          <span className="mt-4 block lr-eyebrow text-[var(--lr-orange-400)]">Nos expertises terrain</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2">
            Solutions de sécurité électronique
          </h1>
          <p className="mt-4 text-white/70 text-base max-w-3xl">
            Quatre expertises que nos techniciens déploient chaque semaine à Abidjan et partout en
            Côte d'Ivoire, du diagnostic à la maintenance.
          </p>
        </div>
      </header>

      <main className="lr-container py-12">
        <div className="grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)] md:grid-cols-2">
          {SOLUTIONS.map((solution, idx) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="bg-white p-8 relative hover:bg-[var(--lr-steel-50)] transition-colors group"
              prefetch={false}
            >
              <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">SOL.{String(idx + 1).padStart(2, '0')}</span>
              <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-wide text-[var(--lr-navy-900)] group-hover:text-[var(--lr-orange-600)] transition-colors">
                {solution.title}
              </h2>
              <p className="mt-3 text-sm text-[var(--lr-steel-700)] leading-relaxed line-clamp-3">
                {solution.intro}
              </p>
              <span className="mt-4 inline-block lr-mono text-xs text-[var(--lr-orange-600)]">
                Découvrir →
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
