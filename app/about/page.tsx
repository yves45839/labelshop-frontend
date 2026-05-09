import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Découvrez Label Retail, intégrateur de sécurité électronique basé à Abidjan. Notre équipe, nos métiers et notre façon de travailler.",
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Société · Histoire</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2">Qui sommes-nous</h1>
          <div className="lr-stripe mt-6 max-w-xs" />
        </div>
      </header>

      <main className="lr-container py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative border border-[var(--lr-navy-800)] lr-corners">
            <Image
              src="/images/about.jpg"
              alt="L'équipe Label Retail sur le terrain"
              width={800}
              height={600}
              className="w-full h-auto"
            />
            <div className="absolute bottom-3 left-3 lr-mono text-[10px] bg-[var(--lr-navy-900)]/90 text-[var(--lr-orange-400)] px-2 py-1">
              // LR · TEAM · ABIDJAN
            </div>
          </div>

          <div>
            <div className="lr-section-heading mb-6">
              <span className="bar" />
              <span className="lr-eyebrow text-[var(--lr-orange-700)]">Notre maison</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
                Sécurité électronique, fait à Abidjan
              </h2>
            </div>

            <div className="space-y-4 text-base text-[var(--lr-steel-700)] leading-relaxed">
              <p className="border-l-2 border-[var(--lr-orange-500)] pl-4">
                <strong className="text-[var(--lr-navy-900)]">Label Retail</strong> est une maison ivoirienne de sécurité électronique. Nous concevons,
                installons et maintenons les solutions qui protègent vos sites au quotidien.
              </p>
              <p className="border-l-2 border-[var(--lr-border)] pl-4">
                Notre équipe réunit des techniciens, des ingénieurs et des formateurs basés à Abidjan, tous
                certifiés sur les produits que nous installons. Quand vous nous appelez, c'est quelqu'un du
                métier qui répond.
              </p>
              <p className="border-l-2 border-[var(--lr-border)] pl-4">
                Banques, industries, commerces, administrations : nos clients nous confient des projets variés,
                parfois complexes, souvent dans la durée. Ce qu'ils retiennent, c'est un travail soigné, des
                délais tenus et un suivi qui ne s'arrête pas le jour de la mise en service.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
