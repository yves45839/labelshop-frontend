# Pistes d'amélioration — labelshop-frontend

Analyse du repo `yves45839/labelshop-frontend` (branche `main`, commit `12031a1`).
Stack : Next.js 15 (App Router) + React 19 + Tailwind 4 + Firebase Auth + backend Django sur PythonAnywhere.

---

## 1. Sécurité — à traiter en priorité

### 1.1. Vérification d'admin uniquement côté client
Dans `lib/user.ts` :
```ts
const ADMIN_EMAILS = ['admin@example.com'];
export function isAdminEmail(email) {
  if (email.endsWith('@label-ci.com')) return true;
  return ADMIN_EMAILS.includes(email);
}
```
Et dans `app/inventory/page.tsx` la protection se résume à un `window.location.href = '/'`. N'importe quelle requête directe à `/inventory/` ou aux endpoints backend bypass la vérification.

**À faire :** déplacer la vérification d'admin côté serveur — soit via les **Firebase Custom Claims** (`auth.setCustomUserClaims(uid, { admin: true })`), soit en validant côté Django via le token Firebase. Côté Next, utiliser un `middleware.ts` qui vérifie le claim et redirige avant que la page ne soit servie.

### 1.2. Configuration Firebase en dur
`lib/firebase.ts` contient toutes les clés Firebase commitées. Même si l'`apiKey` Firebase n'est techniquement pas un secret (elle est publique), le fait de la committer empêche d'avoir des projets séparés dev/staging/prod.

**À faire :** déplacer dans `.env.local` (et créer `.env.example`) :
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```

### 1.3. Double système d'authentification
Le code mélange Firebase Auth (`signInWithEmailAndPassword`), un backend Django avec `withCredentials: true` (cookies session), et une copie dans `localStorage`. Trois sources de vérité = bugs garantis (déconnexion partielle, état désynchronisé). À clarifier : qui est l'autorité ? Recommandation : **Firebase Auth est l'autorité**, le backend reçoit le `idToken` Firebase en header `Authorization: Bearer …` et le valide via Firebase Admin SDK.

### 1.4. URL backend hardcodée 19 fois
`https://lr-samr.pythonanywhere.com` apparaît dans 11 fichiers (Navbar, page produit, sitemap, search, cart…). Impossible de pointer vers un environnement de staging sans grep/replace.

**À faire :** une seule constante dans `lib/api.ts` lue via `process.env.NEXT_PUBLIC_API_URL`, et tout le monde importe `api` (axios) ou une helper `apiUrl()`.

---

## 2. Qualité du code — dette technique en cours

### 2.1. ESLint largement désactivé
`eslint.config.mjs` désactive : `no-explicit-any`, `no-unused-vars`, `react-hooks/exhaustive-deps`, `react/no-unescaped-entities`, `@next/next/no-img-element`. Et `next.config.ts` a `eslint.ignoreDuringBuilds: true`. Conclusion : aucun garde-fou pour empêcher les régressions.

**À faire :** réactiver progressivement, en commençant par `react-hooks/exhaustive-deps` (premier vecteur de bugs) et `no-unused-vars`. Garder `no-explicit-any` en `warn` plutôt qu'`off`.

### 2.2. ~23 occurrences de `any`
Surtout dans les pages auth, blogs, cart. Exemple : `useState<any>(null)` pour l'utilisateur. Définir une interface `User` (déjà existante : `CurrentUser`) et l'utiliser partout.

### 2.3. Fichiers `.jsx` orphelins
- `components/Footer.jsx` (41 lignes) — à renommer en `.tsx`, trivial.
- `components/ProductCard.legacy.jsx` (112 lignes) — soit supprimer (mort), soit migrer.

### 2.4. Catch silencieux
`app/inventory/page.tsx` a 3 blocs `} catch { /* ignore */ }`. Au minimum, logger ou afficher un toast d'erreur, sinon les utilisateurs voient un échec silencieux.

### 2.5. Composants trop gros
`HomePageClient.tsx` (322 l.), `SearchResultsClient.tsx` (301 l.), `Navbar.tsx` (260 l.), `inventory/page.tsx` (219 l.). À découper en sous-composants — gain de lisibilité et de testabilité.

### 2.6. Aucun test
Pas de Jest, Vitest, Playwright. Pour une appli e-commerce avec panier et auth, c'est risqué. Commencer par un test E2E « parcours achat » avec Playwright.

---

## 3. Performance

### 3.1. Recherche dans la Navbar : N+1 catastrophique
```tsx
// Navbar.tsx
const res = await axios.get('https://…/products/get-products/');
const filtered = res.data.filter(p => p.name.toLowerCase().includes(query) …);
```
À chaque keystroke (≥ 2 caractères), récupère **tous** les produits puis filtre côté client. Sur un catalogue qui grossira, c'est ingérable.

**À faire :**
- débouncer (300 ms) avec `useDeferredValue` ou un petit hook ;
- annuler les requêtes en vol avec `AbortController` ;
- utiliser un endpoint `/products/search/?q=…` (peut-être déjà `/products/search-products/`) ;
- mettre en cache via SWR ou React Query.

### 3.2. `axios` + `fetch` mélangés
Le code utilise `axios` dans `lib/api.ts` mais `fetch` natif dans les Server Components (`app/products/[slug]/page.tsx`). L'idéal côté Next.js App Router est d'utiliser `fetch` partout (cache automatique avec `next: { revalidate: … }`) et de garder `axios` uniquement côté client si vraiment nécessaire. Sinon, supprimer la dépendance axios.

### 3.3. Cache de build commité
`Nouveau dossier/.next/` (~70 Mo de cache webpack/server) est versionné. Ces fichiers sont régénérés par `npm run build`.

**À faire :** ajouter `Nouveau dossier/.next/` au `.gitignore`, faire un `git rm -r --cached "Nouveau dossier/.next"` puis commit. Allègera le repo de ~70 Mo.

---

## 4. SEO & accessibilité

### 4.1. Bon point
`generateMetadata` bien fait sur la page produit (titre dynamique, OG, canonical, revalidate 1h).

### 4.2. À améliorer
- **Sitemap** : utiliser le natif `app/sitemap.ts` (Next 13+) plutôt que `app/sitemap.xml/route.ts`. Avantage : Next gère la regénération et les types automatiquement.
- **Robots** : idem, `app/robots.ts` plutôt que `public/robots.txt` statique.
- **Alt texts** : auditer toutes les `<Image>` — la règle `@next/next/no-img-element` est désactivée donc il y a probablement des `<img>` sans alt.
- **Loading state** : `<p className="p-4">Chargement...</p>` — utiliser un skeleton ou `loading.tsx` de Next pour une meilleure UX perçue.

---

## 5. Architecture

### 5.1. État utilisateur dispersé
`getCurrentUser()` est appelé en synchrone via `localStorage` partout (Navbar, inventory, cart…). En parallèle, `watchAuth()` met à jour Firebase. Résultat : l'UI peut afficher un user déconnecté pendant un instant.

**À faire :** un `<AuthProvider>` (Context React) au-dessus du layout, qui expose `useAuth()` retournant `{ user, loading, isAdmin }`. Tous les composants consomment ce hook. Plus de `localStorage` direct.

### 5.2. Panier : double logique fragile
`lib/cart.ts` duplique la logique pour user connecté (API) et invité (localStorage). Les deux structures sont légèrement différentes (`item_id` vs `product_id`). Bug latent : à la connexion, le panier invité n'est pas fusionné avec celui du compte.

**À faire :** un store unifié (Zustand est très léger : ~3 Ko) avec un middleware de persistence. À la connexion, hook qui fait `mergeGuestCart()` côté backend.

### 5.3. Nommage du sous-dossier
`Nouveau dossier/` — nom par défaut Windows, avec espace. Casse les chemins en CI/CD Linux. À renommer (ex. `legacy/` ou supprimer si plus utilisé).

---

## 6. DX (Developer Experience)

| Manque | Effort | Impact |
|--------|--------|--------|
| `.env.example` documentant les variables | 5 min | Onboarding |
| `README.md` projet (le défaut create-next-app) | 30 min | Onboarding |
| Husky + lint-staged (pre-commit) | 30 min | Qualité |
| GitHub Actions : lint + build sur PR | 1 h | Régression |
| Prettier configuré | 15 min | Cohérence |
| `tsconfig` avec `"strict": true` (vérifier) | variable | Sûreté types |

---

## Priorisation suggérée

**Cette semaine (urgent / sécu) :**
1. Vérification admin côté serveur (1.1)
2. URL backend en variable d'env (1.4)
3. Retirer `Nouveau dossier/.next/` du tracking (3.3)

**Ce mois-ci (qualité) :**
4. Réactiver les règles ESLint clés (2.1)
5. AuthProvider unifié (5.1)
6. Débounce + AbortController sur la recherche Navbar (3.1)
7. CI GitHub Actions (lint + build)

**Trimestre :**
8. Décider Firebase OU Django comme autorité d'auth (1.3) et nettoyer
9. Migrer Footer / ProductCard.legacy en TypeScript (2.3)
10. Premiers tests E2E Playwright (2.6)
11. Refondre cart en store Zustand (5.2)

---

*Tous ces points sont des suggestions — chaque équipe arbitre selon ses contraintes (deadlines, taille équipe, criticité du module).*
