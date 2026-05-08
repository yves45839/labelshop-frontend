import axios from 'axios';

/**
 * URL de base du backend Django.
 * Configurable via la variable d'environnement `NEXT_PUBLIC_API_URL`
 * (a definir dans `.env.local` -- voir `.env.example`).
 * Le fallback pointe vers la prod historique pour ne pas casser le build
 * si la variable n'est pas encore definie.
 */
export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://lr-samr.pythonanywhere.com';

/**
 * Construit une URL absolue vers le backend.
 * - `apiUrl()` retourne la base.
 * - `apiUrl('/products/get-products/')` ajoute le slash si besoin.
 * - Si on lui passe deja une URL absolue (http/https), elle est renvoyee telle quelle.
 */
export function apiUrl(path: string = ''): string {
  if (!path) return API_BASE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * Client axios par defaut -- utilise pour tous les endpoints publics
 * (produits, blogs, recherche, categories, etc.).
 *
 * NOTE: `withCredentials` est volontairement a `false`.
 * Le backend Django sur PythonAnywhere ne renvoie pas les en-tetes CORS
 * (`Access-Control-Allow-Origin` / `Access-Control-Allow-Credentials`).
 * Envoyer des cookies declenchait un blocage CORS dans le navigateur
 * ("Failed to fetch", code 503 cote DevTools) qui empechait notamment
 * la page /products de charger les produits.
 *
 * L'authentification est geree via Firebase Auth (Authorization: Bearer ...),
 * donc les cookies de session Django ne sont pas necessaires cote navigateur.
 *
 * Si un endpoint a reellement besoin de cookies de session, utiliser
 * `apiWithCredentials` (ci-dessous) -- il faudra alors configurer
 * django-cors-headers cote backend pour autoriser
 * https://www.labelretail.ci avec credentials.
 */
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

/**
 * Variante du client axios qui envoie les cookies de session.
 * A n'utiliser QUE si :
 *   1. l'endpoint en a vraiment besoin (session Django)
 *   2. ET le backend renvoie les bons en-tetes CORS pour cette origine.
 */
export const apiWithCredentials = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
