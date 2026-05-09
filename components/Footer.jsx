import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-[var(--lr-navy-950)] text-white">
      {/* Bande hachurée signalétique en haut */}
      <div className="lr-stripe" />

      {/* Grille blueprint en arrière-plan */}
      <div className="lr-blueprint-dark">
        <div className="lr-container py-14 grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Bloc identité */}
          <div className="md:col-span-5 lr-corners pl-4 pt-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 border border-white/20 bg-white/5 flex items-center justify-center">
                <Image src="/images/lr.png" alt="Logo Label Retail" width={36} height={36} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold tracking-wide uppercase">Label Retail</h3>
                <span className="lr-eyebrow text-[var(--lr-orange-400)]">Intégrateur Hikvision · CI</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              Intégrateur Hikvision en Côte d'Ivoire. Sécurité, gestion du temps, formation.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
              <div className="border border-white/10 bg-white/5 p-3">
                <div className="font-display text-2xl font-bold text-[var(--lr-orange-400)] lr-tnum">12</div>
                <div className="lr-eyebrow text-white/60 mt-1">ans</div>
              </div>
              <div className="border border-white/10 bg-white/5 p-3">
                <div className="font-display text-2xl font-bold text-[var(--lr-orange-400)] lr-tnum">350+</div>
                <div className="lr-eyebrow text-white/60 mt-1">sites</div>
              </div>
              <div className="border border-white/10 bg-white/5 p-3">
                <div className="font-display text-2xl font-bold text-[var(--lr-orange-400)] lr-tnum">600+</div>
                <div className="lr-eyebrow text-white/60 mt-1">formés</div>
              </div>
            </div>
          </div>

          {/* Liens utiles */}
          <div className="md:col-span-3">
            <div className="lr-section-heading mb-5">
              <span className="bar" />
              <h3 className="font-display text-base font-semibold uppercase tracking-widest">Liens utiles</h3>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-white/70 hover:text-[var(--lr-orange-400)] transition-colors flex items-center gap-2"><span className="text-[var(--lr-orange-500)]">›</span>Accueil</Link></li>
              <li><Link href="/products" className="text-white/70 hover:text-[var(--lr-orange-400)] transition-colors flex items-center gap-2"><span className="text-[var(--lr-orange-500)]">›</span>Produits</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-[var(--lr-orange-400)] transition-colors flex items-center gap-2"><span className="text-[var(--lr-orange-500)]">›</span>À propos</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-[var(--lr-orange-400)] transition-colors flex items-center gap-2"><span className="text-[var(--lr-orange-500)]">›</span>Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <div className="lr-section-heading mb-5">
              <span className="bar" />
              <h3 className="font-display text-base font-semibold uppercase tracking-widest">Contact</h3>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex items-start gap-3 border-l-2 border-[var(--lr-orange-500)] pl-3">
                <dt className="lr-eyebrow text-white/50 w-16 flex-shrink-0 pt-0.5">Email</dt>
                <dd className="text-white lr-mono text-xs">info@label-ci.com</dd>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-white/10 pl-3">
                <dt className="lr-eyebrow text-white/50 w-16 flex-shrink-0 pt-0.5">Tél.</dt>
                <dd className="text-white lr-mono text-xs">+225 07 888 999 65</dd>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-white/10 pl-3">
                <dt className="lr-eyebrow text-white/50 w-16 flex-shrink-0 pt-0.5">Fixe</dt>
                <dd className="text-white lr-mono text-xs">+225 27 21 58 56 77</dd>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-white/10 pl-3">
                <dt className="lr-eyebrow text-white/50 w-16 flex-shrink-0 pt-0.5">Adresse</dt>
                <dd className="text-white text-xs">Abidjan, Côte d'Ivoire</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="lr-container py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span className="lr-mono">© {new Date().getFullYear()} LABEL RETAIL · ALL RIGHTS RESERVED</span>
          <span className="lr-eyebrow">REF / LR-WEB-{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
