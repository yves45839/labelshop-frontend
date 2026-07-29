import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'À propos — intégrateur de sécurité électronique à Abidjan',
  description:
    "Découvrez Label Retail, intégrateur de sécurité électronique basé à Abidjan : 12 ans d'expérience, 350+ sites équipés, techniciens certifiés Hikvision.",
  path: '/about',
  keywords: [
    'Label Retail',
    'intégrateur sécurité Abidjan',
    "installateur Hikvision Côte d'Ivoire",
  ],
});

const expertises = [
  {
    title: 'Vidéosurveillance',
    description:
      "Caméras IP, PTZ et thermiques Hikvision, enregistreurs NVR/DVR, supervision mobile. De la boutique au site industriel multi-bâtiments.",
    href: '/solutions/videosurveillance-abidjan',
  },
  {
    title: "Contrôle d'accès & pointage",
    description:
      "Badges, biométrie, tourniquets et serrures électromagnétiques, couplés à LR Time pour la gestion du temps de travail.",
    href: '/solutions/controle-acces-cote-divoire',
  },
  {
    title: 'Alarme anti-intrusion',
    description:
      "Centrales AX PRO sans fil, détecteurs et sirènes, avec levée de doute vidéo et alertes sur votre téléphone.",
    href: '/solutions/alarme-anti-intrusion-abidjan',
  },
  {
    title: 'Formation technique',
    description:
      "Vidéosurveillance, alarme, contrôle d'accès, visiophonie : nous formons vos techniciens et installateurs, sur site ou dans nos locaux.",
    href: '/formations',
  },
];

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
              <p className="border-l-2 border-[var(--lr-border)] pl-4">
                En douze ans, nous avons équipé plus de 350 sites en Côte d'Ivoire et formé plus de 600
                techniciens. Cette expérience de terrain — climats difficiles, réseaux instables, contraintes
                de chantier — nourrit chacune de nos préconisations : nous ne vendons pas un catalogue, nous
                dimensionnons une solution qui tiendra dans vos conditions réelles.
              </p>
            </div>
          </div>
        </div>

        {/* Nos métiers */}
        <section className="mt-16">
          <div className="lr-section-heading mb-8">
            <span className="bar" />
            <span className="lr-eyebrow text-[var(--lr-orange-700)]">Nos métiers</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
              Quatre expertises, une seule équipe
            </h2>
          </div>
          <div className="grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)] sm:grid-cols-2">
            {expertises.map((expertise, idx) => (
              <Link
                key={expertise.title}
                href={expertise.href}
                className="bg-white p-6 relative hover:bg-[var(--lr-steel-50)] transition-colors group"
                prefetch={false}
              >
                <span className="absolute top-0 left-0 h-0.5 w-10 bg-[var(--lr-orange-500)]" />
                <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">EXP.0{idx + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)] group-hover:text-[var(--lr-orange-600)] transition-colors">
                  {expertise.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--lr-steel-700)] leading-relaxed">{expertise.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Manière de travailler */}
        <section className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="lr-section-heading mb-6">
              <span className="bar" />
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
                Notre façon de travailler
              </h2>
            </div>
            <div className="space-y-4 text-base text-[var(--lr-steel-700)] leading-relaxed">
              <p>
                Chaque projet commence par une visite technique gratuite : nous étudions vos locaux, votre
                réseau et vos usages avant de chiffrer quoi que ce soit. La préconisation qui en sort est
                écrite, argumentée et comparable — pas un devis jetable.
              </p>
              <p>
                L'installation est réalisée par nos propres techniciens, jamais sous-traitée. La mise en
                service inclut le paramétrage complet, la formation de vos utilisateurs et la documentation
                de l'installation.
              </p>
              <p>
                Ensuite, nous restons là : maintenance préventive, mises à jour de sécurité, extension du
                système quand vos besoins grandissent. La plupart de nos clients travaillent avec nous depuis
                des années.
              </p>
            </div>
          </div>
          <div className="bg-[var(--lr-navy-900)] text-white border border-[var(--lr-navy-800)] p-8 relative self-start">
            <span className="absolute top-0 left-0 h-1 w-16 bg-[var(--lr-orange-500)]" />
            <h2 className="font-display text-xl font-bold uppercase tracking-wide">Parlons de votre projet</h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Un site à sécuriser, des pointages à fiabiliser ou des techniciens à former ?
              Décrivez-nous votre besoin, on vous répond sous 24 h ouvrées.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact?sujet=devis" className="lr-btn-primary">
                Demander un devis
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 font-display text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
              >
                Voir nos solutions
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
