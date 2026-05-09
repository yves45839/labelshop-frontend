# Plan de sprints — Refonte UI + Blogs/Articles + Vidéos

**Périmètre :** frontend uniquement (Next.js 15 / React 19 / Tailwind 4 / Framer Motion).
**Durée totale :** ~8 semaines (4 sprints de 2 semaines). Le sprint vidéo est en **backlog** (à déclencher quand le contenu vidéo sera prêt).
**Hypothèse :** 1 dev frontend à temps plein. Diviser les durées par le nombre de devs.

## Charte graphique — validée

**Logo :** `public/images/lr.png` (« LR » sérif — L bleu, R orange, baseline « LABEL RETAIL » en bleu).

**Palette à dériver du logo (à valider avec les valeurs exactes du logo source) :**

| Token | Usage | Valeur proposée | Tailwind équivalent |
|-------|-------|-----------------|---------------------|
| `--brand-blue-900` | Logo L, titres, navbar | `#1E2A78` | `indigo-900` |
| `--brand-blue-700` | CTA principal hover | `#2D3DA8` | proche `indigo-700` |
| `--brand-blue-600` | CTA principal | `#3A4DCC` | proche `indigo-600` |
| `--brand-orange-500` | Logo R, accents, badges | `#F4A45F` | proche `orange-300/400` |
| `--brand-orange-600` | Hover orange | `#E8893E` | `orange-500` |
| `--neutral-50/100/...` | Fonds, bordures | gamme `slate` | `slate-*` |

**Règle d'or :** bleu = identité + actions principales (boutons, liens, navigation). Orange = accents, highlights, CTA secondaires (« Voir plus », badges promo). Pas plus de **20 % d'orange** sur une page sinon perte d'impact.

**Typographie suggérée :**
- Titres : **Playfair Display** ou **DM Serif Display** (serif chaleureux, écho au logo).
- Corps : **Inter** ou **DM Sans** (lisible, moderne, gratuit).
- À charger via `next/font/google` (zéro flash, optimisé auto).

---

## État actuel — ce qui existe déjà

- Homepage avec carrousel d'images et Framer Motion (`HomePageClient.tsx`)
- Pages produits (liste, détail, catégories) avec SEO dynamique
- **Blogs : CRUD complet déjà présent** (`app/blogs/`, `lib/blogs.ts`) — contenu HTML brut via `dangerouslySetInnerHTML`, pas d'éditeur visuel, UI très basique (liste à puces)
- Pas de vidéos
- Pas de design system cohérent : tout en classes Tailwind inline, dupliquées
- 2 fichiers `.jsx` legacy (Footer, ProductCard.legacy)
- `framer-motion` déjà installé → animations possibles sans nouvelle dépendance

---

## Décisions à prendre AVANT le sprint 0

| Décision | Options | Recommandation |
|----------|---------|----------------|
| **Système de composants** | shadcn/ui (Radix + Tailwind) / Headless UI / from-scratch | **shadcn/ui** — gratuit, copié dans le repo, zéro lock-in, accessibilité gérée |
| **Éditeur de blog** | TipTap (WYSIWYG) / MDX / continuer HTML | **TipTap** — riche, extensible, déjà compatible avec votre backend qui stocke du HTML |
| **Charte graphique** | ✅ Bleu cobalt + Orange (logo LR) | Palette détaillée ci-dessus |
| **Vidéos** | ⏸️ Reportées (sprint vidéo en backlog) | À déclencher quand contenu vidéo prêt |

---

## Sprint 0 — Fondations design (1 semaine)

**Objectif :** poser les bases pour que tout le reste soit cohérent.

### Livrables
1. **Tokens design** dans `app/globals.css` (Tailwind 4 utilise `@theme`) :
   - Palette **bleu cobalt + orange** (voir tableau plus haut) déclinée en 50→900
   - Aliases sémantiques : `--color-primary` = bleu, `--color-accent` = orange, `--color-success/warning/error`
   - Typographie : **DM Serif Display** (titres) + **Inter** (corps), via `next/font/google`
   - Échelle d'espacement standardisée (4/8/12/16/24/32/48/64)
   - Radius (`--radius-sm/md/lg`), ombres (`--shadow-card/elevated`), breakpoints custom
2. **Initialiser shadcn/ui** (`npx shadcn@latest init`) avec la palette validée et ajouter les primitives : Button, Card, Input, Textarea, Select, Dialog, Badge, Skeleton, Toast, Tabs, Sheet (drawer).
3. **Page interne `/styleguide`** (non indexée) qui affiche tous les composants en variantes — sert de doc vivante. À protéger derrière un check d'env (uniquement en `NODE_ENV !== 'production'` ou via un mot-clé URL).
4. **Migration `Footer.jsx` et `ProductCard.legacy.jsx`** vers TSX en utilisant les nouveaux composants.
5. **Mode sombre** : pour cette charte chaleureuse (bleu/orange), un dark mode simplifié (bleu nuit + orange légèrement désaturé) — toggle dans Navbar, persistance via class sur `<html>`. *Optionnel*, peut être reporté au sprint 5 si manque de temps.
6. **Logo `lr.png`** : remplacer toutes les utilisations existantes par un composant `<Logo />` réutilisable (avec variantes `sm/md/lg` et `light/dark` si version blanche du logo dispo).

### Critères d'acceptation
- `/styleguide` affiche tous les composants en clair et sombre.
- Aucune classe Tailwind « brute » de couleur (ex. `bg-blue-600`) dans le code applicatif — uniquement des tokens (ex. `bg-primary`).
- Lighthouse accessibilité ≥ 95 sur la styleguide.

---

## Sprint 1 — Refresh UI core (2 semaines)

**Objectif :** la première impression visuelle change radicalement.

### Livrables
1. **Homepage hero refondu**
   - Section hero plein écran avec **slider d'images existantes en effet Ken Burns** (zoom lent) + parallax léger au scroll. Pas de vidéo (à activer plus tard).
   - Titre en **DM Serif Display** + accent orange sur un mot-clé (ex. *« Sécurité [intelligente] pour entreprises »*)
   - CTA principal **bleu cobalt** plein + CTA secondaire **outline orange**
   - Indicateurs de confiance (logos clients, KPIs : « 500+ installations », « 24/7 monitoring »)
2. **Navbar v2**
   - Logo `<Logo />` à gauche (variantes responsives)
   - Sticky avec backdrop-blur au scroll, fond bleu cobalt translucide
   - Méga-menu pour catégories produits
   - Recherche refondée (débounce 300 ms + AbortController + `useDeferredValue`)
   - Badge **orange** animé sur le panier (compteur)
   - Mobile : drawer animé (Framer Motion / Sheet shadcn)
3. **Footer v2** (à partir du Footer migré en sprint 0)
   - Newsletter (form simple, POST vers backend ou Mailchimp)
   - Liens sociaux, plan du site, mentions légales
4. **Loading skeletons** sur toutes les pages qui utilisent `Chargement...` (cart, blogs, inventory, profile, etc.)
5. **Page 404 et page d'erreur** soignées (illustration SVG, CTA retour accueil).

### Critères d'acceptation
- LCP < 2.5 s sur la homepage (mobile 4G).
- Aucun layout shift (CLS < 0.1).
- Navigation clavier complète sur la Navbar.

---

## Sprint 2 — Pages produits & cartes (2 semaines)

**Objectif :** vitrine produits crédible.

### Livrables
1. **ProductCard v2**
   - Image avec hover zoom + lazy loading
   - Badges (« Nouveau », « -15% », « Stock limité »)
   - Quick view (modal) sans changer de page
   - Bouton « Ajouter au panier » avec micro-animation de feedback
2. **Page liste produits `/products`**
   - Grille responsive (1 / 2 / 3 / 4 colonnes)
   - **Filtres latéraux** : catégorie, marque, prix, disponibilité — synchronisés avec l'URL (`searchParams`) pour partage et SEO
   - Tri (nouveauté, prix asc/desc, popularité)
   - Pagination ou infinite scroll (au choix, infinite scroll meilleur sur mobile)
3. **Page produit détail `/products/[slug]`**
   - **Galerie média** : carrousel d'images + onglet « Vidéo » si présente
   - Spécifications en table propre
   - Onglets : Description / Specs / Avis / FAQ
   - Section « Produits similaires » (3-4 cards)
   - Sticky CTA panier sur mobile
4. **Migration `axios` → `fetch` natif** côté client pour les Server Components (cache App Router).

### Critères d'acceptation
- Filtres modifient l'URL et persistent au refresh.
- Galerie produit fonctionne au touch (swipe) sur mobile.
- Aucun re-render inutile au filtrage (mesurer avec React DevTools Profiler).

---

## Sprint 3 — Blogs & articles (2 semaines)

**Objectif :** une vraie expérience de lecture, pas une simple liste.

### Livrables
1. **Page `/blogs` refondue**
   - Hero avec article mis en avant (featured)
   - Grille de cards : image de couverture, catégorie (badge coloré), titre, extrait, auteur + avatar, date, **temps de lecture estimé** (calculé via wordCount/200)
   - Filtres par catégorie/tag (chips)
   - Recherche dans les articles
   - Pagination
2. **Page article `/blogs/[id]`**
   - Cover image plein largeur
   - Typographie soignée (max-w-prose, line-height 1.7, drop cap optionnel)
   - **Table des matières** générée auto à partir des H2/H3 (sticky sur desktop)
   - Boutons partage social (Twitter/X, LinkedIn, WhatsApp, copy link)
   - Auteur card en fin d'article
   - **Articles connexes** (3 derniers de la même catégorie)
   - Progress bar de lecture en haut de page
3. **Éditeur d'articles (admin)** — refonte de `app/blogs/create` et `[id]/edit`
   - **TipTap** avec barre d'outils : bold/italic/heading/list/quote/link/image/video embed
   - Upload d'image inline (drag & drop)
   - **Embed vidéo YouTube/Vimeo** dans l'article (extension TipTap dédiée)
   - Preview avant publication
   - Sauvegarde automatique en draft (localStorage)
4. **SEO articles**
   - `generateMetadata` par article (titre, description, OG image = cover)
   - JSON-LD schéma `Article` / `BlogPosting`
   - Ajouter les articles dans `sitemap.xml`
5. **Newsletter dans le footer de chaque article**
   - Composant unique réutilisable
   - POST simple, on ne traite pas le backend ici

### Critères d'acceptation
- Un article rédigé dans TipTap s'affiche identique en lecture.
- Le partage Twitter/LinkedIn affiche la cover et le titre (testé avec validateur Twitter Card).
- Lighthouse SEO ≥ 95 sur un article.

---

## Sprint 4 — Polish, perf & QA (2 semaines)

**Objectif :** rendre prêt-pour-production.

### Livrables
1. **Audit Lighthouse** sur 5 pages clés (home, liste produits, produit, blogs, article). Cible : Perf ≥ 85, SEO ≥ 95, A11y ≥ 95, Best Practices ≥ 95 sur mobile.
2. **Accessibilité**
   - Audit avec axe-core et lecteur d'écran (NVDA/VoiceOver)
   - Focus visible partout, contrastes WCAG AA
   - `prefers-reduced-motion` respecté pour Framer Motion (déjà partiellement géré via `useReducedMotion`)
3. **Cross-browser** : Chrome, Safari, Firefox, Edge, Safari iOS, Chrome Android.
4. **Open Graph / Twitter Cards** vérifiées sur 3 articles, 3 produits, accueil.
5. **Tests E2E Playwright** : parcours « ajouter au panier », « lire un article », « jouer une vidéo ». 5-6 tests max, couvrir les chemins critiques.
6. **Dépréciation finale** des fichiers `.jsx` (s'il en reste) et des `any`.

---

## Vue d'ensemble — récapitulatif

| Sprint | Durée | Thème | Livrable visible |
|--------|-------|-------|------------------|
| 0 | 1 sem | Design system | Styleguide + composants + palette LR |
| 1 | 2 sem | UI core | Homepage + Navbar + Footer refait |
| 2 | 2 sem | Produits | Cards, filtres, galerie |
| 3 | 2 sem | Blogs | Lecture soignée + TipTap |
| 4 | 2 sem | Polish | Lighthouse, a11y, tests E2E |
| **Backlog** | 2 sem | **Vidéos (reporté)** | Médiathèque + player |

**Total à livrer : 9 semaines.** Le sprint vidéo viendra plus tard quand le contenu sera prêt.

### Sprint Vidéos (en backlog — à activer plus tard)

À déclencher quand vous aurez du contenu vidéo (YouTube unlisted, Vimeo, ou MP4). Livrables prévus :
- Composant `<VideoPlayer />` réutilisable basé sur `react-player` (lazy load à l'intersection)
- Page `/medias` médiathèque (grille + filtres catégories + modal de lecture + deep-link `?video=xxx`)
- Onglet « Vidéo » dans la galerie produit (sprint 2 prévoit déjà la place)
- Embed YouTube/Vimeo dans les articles (extension TipTap)
- Vidéo de fond hero (option) avec fallback images
- Schema.org `VideoObject` pour le SEO
- Estimation : 2 semaines

---

## Ce que ce plan ne couvre pas (volontairement)

- Backend (endpoints blogs, vidéos, newsletter) — à coordonner avec l'équipe Django
- Création de contenu (rédaction d'articles, tournage de vidéos)
- Stratégie SEO de fond (mots-clés, netlinking)
- Charte graphique : ce plan suppose qu'un parti pris visuel est validé en amont (mood-board en pré-sprint 0)
- Refonte de l'authentification (sujet de sécurité distinct, vu dans `AMELIORATIONS.md`)

---

## Risques & dépendances

| Risque | Mitigation |
|--------|-----------|
| Logo `lr.png` (PNG raster) flou en grand format | Demander/produire une version SVG (sprint 0) |
| Combinaison bleu profond + orange clair → contraste insuffisant texte/fond | Valider WCAG AA dès le styleguide. Texte orange uniquement sur fond foncé, texte bleu sur fond clair. |
| Migration TipTap casse les anciens articles HTML | TipTap accepte le HTML existant en entrée, prévoir une vérif visuelle sur les articles existants |
| Backend `/blogs/` ne renvoie pas les champs nécessaires (catégorie, tags, cover, reading time) | Identifier les champs manquants en début de sprint 3 et coordonner avec l'équipe Django (hors périmètre de ce plan mais bloquant) |

---

## Pour démarrer concrètement — questions restantes

✅ Charte graphique : bleu cobalt + orange (logo `lr.png`), palette détaillée plus haut.
✅ Vidéos : reportées (sprint en backlog).

Reste à valider :

1. **Logo HD** : avez-vous une version vectorielle (SVG / AI) du logo en plus du PNG ? Sinon, prévoir 2 h pour vectoriser (logo simple, faisable). Et une **version monochrome blanche** pour fonds bleus.
2. **Couleurs exactes du logo** : confirmez-vous les valeurs proposées (`#1E2A78` bleu / `#F4A45F` orange) ou avez-vous les codes officiels ? Avec le SVG je peux les extraire automatiquement.
3. **Typographie** : OK pour **DM Serif Display** (titres) + **Inter** (corps), ou vous avez une préférence ?
4. **Équipe** : combien de devs frontend disponibles ?
5. **Catégories d'articles** prévues (tutoriels, actu produit, cas client, conseils sécurité…) — utile pour designer les badges dès le sprint 0.
