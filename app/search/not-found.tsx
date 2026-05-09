'use client';
import Link from 'next/link';

export default function SearchNotFound() {
  return (
    <main className="min-h-[60vh] bg-[var(--lr-steel-50)] flex items-center justify-center">
      <div className="bg-white border border-[var(--lr-border)] p-10 max-w-md text-center relative">
        <div className="lr-stripe -mx-10 -mt-10 mb-6" />
        <span className="lr-mono text-xs text-[var(--lr-orange-600)]">// SEARCH_404</span>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">Aucun produit trouvé</h1>
        <p className="mt-3 text-sm text-[var(--lr-steel-700)]">Reformulez votre recherche, ou écrivez-nous, on retrouvera la pièce qu'il vous faut.</p>
        <Link href="/" className="lr-btn-secondary mt-6">
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
