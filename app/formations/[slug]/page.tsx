import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  formations,
  getFormationBySlug,
  type FormationChapter,
} from '@/lib/formations-data';

export function generateStaticParams() {
  return formations.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const formation = getFormationBySlug(slug);

  if (!formation) {
    return {
      title: 'Formation introuvable — Label Retail',
      description: 'Cette formation n’existe pas ou plus.',
    };
  }

  return {
    title: `${formation.shortTitle} — Formation Label Retail`,
    description: formation.summary,
    alternates: { canonical: `/formations/${formation.slug}` },
    openGraph: {
      title: `${formation.title} | Label Retail`,
      description: formation.summary,
      images: [{ url: formation.cover }],
    },
  };
}

function ChapterItem({
  item,
  depth = 0,
}: {
  item: FormationChapter['items'][number];
  depth?: number;
}) {
  if (typeof item === 'string') {
    return (
      <li className="flex items-start gap-2 text-sm text-[var(--lr-steel-700)]">
        <span className="mt-0.5 text-[var(--lr-orange-600)] shrink-0">›</span>
        <span>{item}</span>
      </li>
    );
  }

  return (
    <li className="text-sm">
      <div className="flex items-start gap-2 text-[var(--lr-navy-900)] font-semibold">
        <span className="mt-0.5 text-[var(--lr-orange-600)] shrink-0">»</span>
        <span>{item.title}</span>
      </div>
      <ul className={`mt-1 space-y-1 ${depth === 0 ? 'pl-6' : 'pl-4'}`}>
        {item.items.map((sub) => (
          <li
            key={typeof sub === 'string' ? sub : sub.title}
            className="flex items-start gap-2 text-sm text-[var(--lr-steel-700)]"
          >
            <span className="mt-0.5 text-[var(--lr-steel-400)] shrink-0">·</span>
            <span>{typeof sub === 'string' ? sub : sub.title}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default async function FormationDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const formation = getFormationBySlug(slug);

  if (!formation) {
    notFound();
  }

  const otherFormations = formations.filter((f) => f.slug !== formation.slug);

  return (
    <div className="min-h-screen bg-white text-[var(--lr-navy-900)]">
      {/* Hero */}
      <section className="relative bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)] overflow-hidden">
        <div className="absolute inset-0 lr-blueprint-dark opacity-40" />
        <div className="lr-stripe absolute top-0 left-0 right-0" />
        <div className="relative lr-container py-16 grid gap-10 md:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <Link
              href="/formations#catalogue"
              className="lr-eyebrow text-[var(--lr-orange-400)] hover:text-[var(--lr-orange-300)]"
            >
              ← Catalogue formations
            </Link>
            <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold uppercase leading-[1.05] tracking-tight">
              {formation.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">{formation.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="lr-tag lr-tag--orange">{formation.level}</span>
              <span className="lr-tag bg-white/10 text-white border-white/20">
                Durée : {formation.duration}
              </span>
              <span className="lr-tag bg-white/10 text-white border-white/20">
                {formation.family}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/contact?sujet=formation&formation=${encodeURIComponent(formation.shortTitle)}`}
                className="lr-btn-primary"
              >
                S&apos;inscrire / Demander un devis
              </Link>
              <Link
                href="/formations#sessions"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 font-display text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
              >
                Voir le calendrier
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] md:aspect-square overflow-hidden border border-white/10">
            <Image
              src={formation.cover}
              alt={`Apprenants en formation ${formation.shortTitle} — Label Retail`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--lr-navy-900)]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="lr-section bg-[var(--lr-steel-50)] border-b border-[var(--lr-border)]">
        <div className="lr-container grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)] md:grid-cols-3">
          <div className="bg-white p-6">
            <span className="lr-eyebrow text-[var(--lr-orange-700)]">Public visé</span>
            <p className="mt-2 text-sm text-[var(--lr-navy-900)] leading-relaxed">
              {formation.audience}
            </p>
          </div>
          <div className="bg-white p-6">
            <span className="lr-eyebrow text-[var(--lr-orange-700)]">Niveau & durée</span>
            <p className="mt-2 text-sm text-[var(--lr-navy-900)] leading-relaxed">
              {formation.level} — {formation.duration}.
            </p>
          </div>
          <div className="bg-white p-6">
            <span className="lr-eyebrow text-[var(--lr-orange-700)]">Compétences acquises</span>
            <ul className="mt-2 space-y-1">
              {formation.outcomes.map((out) => (
                <li key={out} className="flex items-start gap-2 text-sm text-[var(--lr-steel-700)]">
                  <span className="mt-0.5 text-[var(--lr-orange-600)] shrink-0">✓</span>
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Programme détaillé */}
      <section className="lr-section">
        <div className="lr-container">
          <div className="lr-section-heading mb-10">
            <span className="bar" />
            <span className="lr-eyebrow text-[var(--lr-orange-700)]">Programme</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
              {formation.chapters.length} chapitres détaillés
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--lr-steel-700)]">
              Chaque chapitre alterne théorie, démonstration et exercice sur du
              matériel réel. Le contenu peut être ajusté à votre niveau et à vos
              équipements (audit préalable inclus).
            </p>
          </div>

          <div className="grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)] md:grid-cols-2">
            {formation.chapters.map((chapter, idx) => (
              <div key={chapter.title} className="bg-white p-6 relative">
                <span className="absolute top-0 left-0 h-0.5 w-12 bg-[var(--lr-orange-500)]" />
                <div className="flex items-baseline gap-3">
                  <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">
                    CH.{String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-base font-bold uppercase tracking-wide text-[var(--lr-navy-900)] leading-tight">
                    {chapter.title}
                  </h3>
                </div>
                {chapter.items.length > 0 ? (
                  <ul className="mt-3 space-y-2 border-t border-[var(--lr-border)] pt-3">
                    {chapter.items.map((item) => (
                      <ChapterItem
                        key={typeof item === 'string' ? item : item.title}
                        item={item}
                      />
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-xs text-[var(--lr-steel-500)] lr-mono">
                    // Section d&apos;ouverture — voir chapitres suivants.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Débouchés */}
      {formation.careers && formation.careers.length > 0 && (
        <section className="lr-section bg-[var(--lr-steel-50)] border-t border-[var(--lr-border)]">
          <div className="lr-container">
            <div className="lr-section-heading mb-8">
              <span className="bar" />
              <span className="lr-eyebrow text-[var(--lr-orange-700)]">Débouchés professionnels</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
                Où exercer après la formation
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {formation.careers.map((career) => (
                <span
                  key={career}
                  className="inline-flex items-center px-4 py-2 bg-white border border-[var(--lr-border)] font-display text-xs uppercase tracking-widest text-[var(--lr-navy-900)]"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Autres formations */}
      <section className="lr-section border-t border-[var(--lr-border)]">
        <div className="lr-container">
          <div className="lr-section-heading mb-8">
            <span className="bar" />
            <span className="lr-eyebrow text-[var(--lr-orange-700)]">Aussi au catalogue</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
              Compléter votre parcours
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {otherFormations.map((other) => (
              <Link
                key={other.slug}
                href={`/formations/${other.slug}`}
                className="group bg-white border border-[var(--lr-border)] hover:border-[var(--lr-orange-500)] transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={other.cover}
                    alt={`Formation ${other.shortTitle}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="p-4">
                  <span className="lr-mono text-[10px] text-[var(--lr-steel-500)] uppercase tracking-widest">
                    {other.family}
                  </span>
                  <h3 className="mt-1 font-display text-sm font-bold uppercase tracking-tight text-[var(--lr-navy-900)] group-hover:text-[var(--lr-orange-700)] transition-colors">
                    {other.shortTitle}
                  </h3>
                  <p className="mt-1 lr-mono text-[10px] text-[var(--lr-steel-500)]">
                    {other.level} · {other.duration}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="lr-section bg-[var(--lr-navy-900)] text-white border-t border-[var(--lr-orange-500)]">
        <div className="lr-container text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
            Prêt à former vos équipes sur {formation.shortTitle} ?
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-white/70 leading-relaxed">
            Sessions inter-entreprises à Abidjan ou intra-entreprise chez vous.
            Programme ajustable à votre niveau, vos équipements et votre planning.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={`/contact?sujet=formation&formation=${encodeURIComponent(formation.shortTitle)}`}
              className="lr-btn-primary"
            >
              Demander un devis
            </Link>
            <Link
              href="/formations#sessions"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 font-display text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
            >
              Voir les sessions ouvertes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
