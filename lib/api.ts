import axios from 'axios';

/**
 * URL de base du backend Django.
 * Configurable via la variable d'environnement `NEXT_PUBLIC_API_URL`
 * (à définir dans `.env.local` — voir `.env.example`).
 * Le fallback pointe vers la prod historique pour ne pas casser le build
 * si la variable n'est pas encore définie.
 */
export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://lr-samr.pythonanywhere.com';

/**
 * Construit une URL absolue vers le backend.
 * - `apiUrl()` retourne la base.
 * - `apiUrl('/products/get-products/')` ajoute le slash si besoin.
 * - Si on lui passe déjà une URL absolue (http/https), elle est renvoyée telle quelle.
 */
export function apiUrl(path: string = ''): string {
  if (!path) return API_BASE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * Client axios par défaut — utilisé pour tous les endpoints publics
 * (produits, blogs, recherche, catégories, etc.).
 *
 * ⚠️ `withCredentials` e