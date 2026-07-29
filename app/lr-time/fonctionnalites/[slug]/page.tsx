import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { LR_TIME_MODULES, getLrTimeModule } from '@/lib/lr-time-data';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return LR_TIME_MODULES.map((module) => ({ slug: module.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const module = getLrTimeModule(slug);
  if (!module) {
    return { title: 'Fonctionnalité introuvable', robots: { index: false, follow: false } };
  }
  return buildMetadata({
    title: `${module.title} — LR Time`,
    description: module.description,
    path: `/lr-time/fonctionnalites/${module.slug}`,
    keywords: [module.title, 'LR Time', 'pointage Hikvision', "gestion du temps Côte d'Ivoire"],
  });
}

export default async function LrTimeFeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const module = getLrTimeModule(slug);
  if (!module) {
    notFound();
  }

  const path = `/lr-time/fonctionnalites/${module.slug}`;
  const otherModules = LR_TIME_MODULES.filter((m) => m.slug !== module.slug);

  return (
    <div className="min-h-screen bg-white text-[var(--lr-navy-900)]">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <Breadcrumb
            items={[
              { name: 'Accueil', path: '/' },
              { name: 'LR Time', path: '/lr-time' },
              { name: module.title, path },
            ]}
          />
          <span className="mt-4 block lr-eyebrow text-[var(--lr-orange-400)]">Module LR Time</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2 max-w-4xl">
            {module.title}
          </h1>
          <p className="mt-4 text-white/70 text-base leading-relaxed max-w-3xl">{module.description}</p>
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
      </header>

      <main className="lr-container py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <section>
            <div className="lr-section-heading mb-5">
              <span className="bar" />
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
                Comment ça fonctionne
              </h2>
            </div>
            <div className="space-y-4 text-base text-[var(--lr-steel-700)] leading-relaxed">
              {module.details.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)] sm:grid-cols-2">
              {module.benefits.map((benefit, idx) => (
                <div key={benefit} className="bg-white p-4 relative">
                  <span className="absolute top-0 left-0 h-0.5 w-8 bg-[var(--lr-orange-500)]" />
                  <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">0{idx + 1}</span>
                  <p className="mt-1 text-sm font-semibold text-[var(--lr-navy-900)]">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="bg-[var(--lr-steel-50)] border border-[var(--lr-border)] p-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">
                Les autres modules
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {otherModules.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/lr-time/fonctionnalites/${other.slug}`}
                      className="lr-link flex items-center gap-2"
                      prefetch={false}
                    >
                      <span className="text-[var(--lr-orange-500)]">›</span>
                      {other.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/lr-time" className="mt-5 inline-block lr-btn-secondary text-sm" prefetch={false}>
                ← Découvrir LR Time
              </Link>
            </div>

            <div className="bg-[var(--lr-navy-900)] text-white border border-[var(--lr-navy-800)] p-6 relative">
              <span className="absolute top-0 left-0 h-1 w-16 bg-[var(--lr-orange-500)]" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wide">Et le matériel ?</h2>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                LR Time fonctionne avec les terminaux de pointage et contrôle d'accès Hikvision que
                nous installons partout en Côte d'Ivoire.
              </p>
              <Link
                href="/solutions/pointage-biometrique-cote-divoire"
                className="mt-4 inline-block lr-mono text-sm font-semibold text-[var(--lr-orange-400)] hover:text-white border-b border-[var(--lr-orange-400)] hover:border-white pb-1 transition-colors"
                prefetch={false}
              >
                Le pointage biométrique par Label Retail →
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
