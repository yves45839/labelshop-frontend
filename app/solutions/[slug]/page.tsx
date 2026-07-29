import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { SOLUTIONS, getSolutionBySlug } from '@/lib/solutions-data';
import { getFormationBySlug } from '@/lib/formations-data';
import { categoryPath } from '@/lib/products';
import { JsonLd, absoluteUrl, buildMetadata, ORG, SITE_URL } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const solution = getSolutionBySlug(slug);
  if (!solution) {
    return { title: 'Solution introuvable', robots: { index: false, follow: false } };
  }
  return buildMetadata({
    title: solution.metaTitle,
    description: solution.metaDescription,
    path: `/solutions/${solution.slug}`,
    keywords: [solution.title, 'Label Retail', "sécurité électronique Côte d'Ivoire"],
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) {
    notFound();
  }

  const path = `/solutions/${solution.slug}`;
  const formation = solution.formationSlug
    ? getFormationBySlug(solution.formationSlug)
    : undefined;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: solution.title,
    description: solution.metaDescription,
    url: absoluteUrl(path),
    areaServed: "Côte d'Ivoire",
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: ORG.name,
      telephone: ORG.phone,
    },
  };

  return (
    <div className="min-h-screen bg-white text-[var(--lr-navy-900)]">
      <JsonLd data={serviceJsonLd} />

      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <Breadcrumb
            items={[
              { name: 'Accueil', path: '/' },
              { name: 'Solutions', path: '/solutions' },
              { name: solution.title, path },
            ]}
          />
          <span className="mt-4 block lr-eyebrow text-[var(--lr-orange-400)]">{solution.eyebrow}</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2 max-w-4xl">
            {solution.title}
          </h1>
          <p className="mt-4 text-white/70 text-base leading-relaxed max-w-3xl">{solution.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact?sujet=devis" className="lr-btn-primary">
              Demander un devis gratuit
            </Link>
            <a
              href={`tel:${ORG.phone}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 font-display text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
            >
              Appeler un technicien
            </a>
          </div>
        </div>
      </header>

      <main className="lr-container py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            {solution.sections.map((section) => (
              <section key={section.heading}>
                <div className="lr-section-heading mb-4">
                  <span className="bar" />
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
                    {section.heading}
                  </h2>
                </div>
                <div className="space-y-4 text-base text-[var(--lr-steel-700)] leading-relaxed">
                  {section.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Maillage : produits, formation, blog */}
          <aside className="space-y-6">
            {solution.productCategory && (
              <div className="bg-[var(--lr-steel-50)] border border-[var(--lr-border)] p-6">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">
                  Le matériel associé
                </h2>
                <p className="mt-2 text-sm text-[var(--lr-steel-700)]">
                  Retrouvez les références que nous installons pour cette solution.
                </p>
                <Link
                  href={categoryPath(solution.productCategory)}
                  className="mt-4 inline-block lr-btn-secondary text-sm"
                  prefetch={false}
                >
                  Voir la catégorie {solution.productCategory} →
                </Link>
              </div>
            )}

            {formation && (
              <div className="bg-[var(--lr-steel-50)] border border-[var(--lr-border)] p-6">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">
                  Formez vos équipes
                </h2>
                <p className="mt-2 text-sm text-[var(--lr-steel-700)]">{formation.title}</p>
                <Link
                  href={`/formations/${formation.slug}`}
                  className="mt-4 inline-block lr-btn-secondary text-sm"
                  prefetch={false}
                >
                  Découvrir la formation →
                </Link>
              </div>
            )}

            <div className="bg-[var(--lr-navy-900)] text-white border border-[var(--lr-navy-800)] p-6 relative">
              <span className="absolute top-0 left-0 h-1 w-16 bg-[var(--lr-orange-500)]" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wide">Aller plus loin</h2>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="/blogs" className="text-white/80 hover:text-[var(--lr-orange-400)] flex items-center gap-2" prefetch={false}>
                    <span className="text-[var(--lr-orange-500)]">›</span>
                    Nos guides techniques sur le blog
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-white/80 hover:text-[var(--lr-orange-400)] flex items-center gap-2" prefetch={false}>
                    <span className="text-[var(--lr-orange-500)]">›</span>
                    Tout le catalogue produits
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white/80 hover:text-[var(--lr-orange-400)] flex items-center gap-2" prefetch={false}>
                    <span className="text-[var(--lr-orange-500)]">›</span>
                    L'équipe et nos certifications
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
