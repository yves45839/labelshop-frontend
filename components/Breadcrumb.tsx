import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd, type BreadcrumbItem } from '@/lib/seo';

/**
 * Fil d'Ariane visible (header navy) + balisage BreadcrumbList.
 * Le dernier élément est la page courante (non cliquable).
 */
export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav
        aria-label="Fil d'Ariane"
        className="flex items-center gap-2 lr-mono text-[11px] text-white/60 flex-wrap"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={item.path} className="flex items-center gap-2">
              {index > 0 && <span className="text-white/30">/</span>}
              {isLast ? (
                <span className="text-white line-clamp-1">{item.name}</span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-[var(--lr-orange-400)]"
                  prefetch={false}
                >
                  {item.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
