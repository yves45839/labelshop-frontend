/**
 * Convertisseur Markdown → HTML minimal (sans dépendance externe).
 * Supporte : titres, gras, italique, listes, tableaux, code, liens, HR.
 */
export function markdownToHtml(md: string): string {
  if (!md) return '';

  let html = md
    // Titres
    .replace(/^###### (.+)$/gm, '<h6 class="text-base font-bold mt-4 mb-1">$1</h6>')
    .replace(/^##### (.+)$/gm, '<h5 class="text-lg font-bold mt-4 mb-1">$1</h5>')
    .replace(/^#### (.+)$/gm, '<h4 class="text-xl font-bold mt-5 mb-2">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 class="text-2xl font-bold mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-3xl font-bold mt-8 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-4xl font-bold mt-8 mb-4">$1</h1>')

    // Séparateurs horizontaux
    .replace(/^---$/gm, '<hr class="my-6 border-[var(--lr-border)]"/>')

    // Tableaux Markdown
    .replace(/(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)*)/gm, (table) => {
      const rows = table.trim().split('\n');
      const header = rows[0];
      const body = rows.slice(2);
      const thCells = header.split('|').filter(c => c.trim()).map(c =>
        `<th class="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider bg-[var(--lr-navy-900)] text-white">${c.trim()}</th>`
      ).join('');
      const trRows = body.map(row =>
        `<tr class="border-b border-[var(--lr-border)] hover:bg-[var(--lr-steel-50)]">${
          row.split('|').filter(c => c.trim()).map(c =>
            `<td class="px-3 py-2 text-sm">${c.trim()}</td>`
          ).join('')
        }</tr>`
      ).join('');
      return `<div class="overflow-x-auto my-6"><table class="w-full border border-[var(--lr-border)] text-sm"><thead><tr>${thCells}</tr></thead><tbody>${trRows}</tbody></table></div>`;
    })

    // Listes non ordonnées
    .replace(/^(\s*)[-*] (.+)$/gm, '<li class="ml-4 list-disc">$2</li>')
    // Listes ordonnées
    .replace(/^(\s*)\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>')
    // Wrapper <ul> autour des <li> consécutifs
    .replace(/(<li[^>]*>.*<\/li>\n?)+/gm, (block) => `<ul class="my-3 space-y-1 pl-4">${block}</ul>`)

    // Code inline
    .replace(/`([^`]+)`/g, '<code class="bg-[var(--lr-steel-100)] px-1.5 py-0.5 text-sm font-mono">$1</code>')

    // Blocs de code
    .replace(/```[\w]*\n([\s\S]*?)```/gm, '<pre class="bg-[var(--lr-steel-100)] p-4 my-4 overflow-x-auto text-sm font-mono border border-[var(--lr-border)]"><code>$1</code></pre>')

    // Gras
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
    // Italique
    .replace(/\*(.+?)\*/g, '<em>$1</em>')

    // Images (doit précéder les liens)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full object-cover my-6 max-h-[480px]" loading="lazy" />')

    // Liens
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[var(--lr-orange-600)] underline hover:text-[var(--lr-orange-800)]" target="_blank">$1</a>')

    // Emojis drapeaux + titres bilingues (lignes avec 🇫🇷 / 🇬🇧)
    .replace(/^(## [🇫🇷🇬🇧].+)$/gm, '<div class="mt-10 mb-2 border-t-2 border-[var(--lr-orange-500)] pt-6">$1</div>')

    // Paragraphes (lignes non vides pas encore balisées)
    .replace(/^(?!<[a-z/]|#|\s*$)(.+)$/gm, '<p class="my-3 leading-relaxed">$1</p>');

  // Nettoyer les doubles sauts de ligne
  html = html.replace(/\n{3,}/g, '\n\n');

  return html;
}

/**
 * Extrait le titre (première ligne # ...) d'un texte markdown.
 */
export function extractTitle(md: string): string {
  const m = md.match(/^# (.+)$/m);
  return m ? m[1].replace(/[🇫🇷🇬🇧:·\/]/g, '').trim() : '';
}

/**
 * Retourne un extrait des N premiers mots du contenu (sans balises).
 */
export function excerpt(md: string, words = 30): string {
  const plain = md.replace(/[#*`|>\[\]!_~]/g, '').replace(/\n/g, ' ').trim();
  const w = plain.split(/\s+/).slice(0, words);
  return w.join(' ') + (w.length === words ? '…' : '');
}
