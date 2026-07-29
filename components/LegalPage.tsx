import type { ReactNode } from 'react';

/** Gabarit commun des pages légales (mentions, confidentialité, CGV). */
export default function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">{eyebrow}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mt-2">{title}</h1>
          <div className="lr-stripe mt-6 max-w-xs" />
        </div>
      </header>
      <main className="lr-container py-12 max-w-3xl">
        <div
          className="
            space-y-8 text-base text-[var(--lr-steel-700)] leading-relaxed
            [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:uppercase
            [&_h2]:tracking-wide [&_h2]:text-[var(--lr-navy-900)] [&_h2]:mt-2
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1
          "
        >
          {children}
        </div>
      </main>
    </div>
  );
}
