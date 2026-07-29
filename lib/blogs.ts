export interface BlogData {
  id?: number;
  title: string;
  content: string;
  author_name: string;
  author_image?: File | string | null;
  attachments?: File[];
  /** Date de publication affichée (YYYY-MM-DD ou ISO) */
  published_date?: string;
  /** Catégorie / thème de l'article */
  category?: string;
  /** Langue(s) de l'article */
  language?: string;
  /** Champs renvoyés par le backend */
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

/* ------------------------------------------------------------------ */
/* Côté serveur (SSR/SSG/sitemap) : appels directs au backend, ISR 1h  */
/* ------------------------------------------------------------------ */

import { apiUrl } from '@/lib/api';
import { slugify } from '@/lib/seo';

export async function listBlogsServer(): Promise<BlogData[]> {
  const res = await fetch(apiUrl('/blogs/'), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`listBlogsServer: erreur ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : data?.results ?? [];
}

export async function getBlogServer(id: number | string): Promise<BlogData | null> {
  const res = await fetch(apiUrl(`/blogs/${id}/`), { next: { revalidate: 3600 } });
  if (res.ok) return res.json();
  if (res.status === 404) return null;
  // Certains backends n'exposent pas /blogs/<id>/ : repli sur la liste.
  const all = await listBlogsServer().catch(() => [] as BlogData[]);
  return all.find((b) => String(b.id) === String(id)) ?? null;
}

/** URL canonique d'un article : /blogs/{slug-du-titre}-{id} (le backend ne fournit pas de slug). */
export function blogPath(blog: Pick<BlogData, 'id' | 'title'>): string {
  return `/blogs/${slugify(blog.title)}-${blog.id}`;
}

/** Extrait l'id numérique d'un segment "/blogs/mon-titre-42" ou "/blogs/42". */
export function parseBlogId(segment: string): number | null {
  const match = segment.match(/(\d+)$/);
  return match ? Number(match[1]) : null;
}

/** Tous les appels passent par le proxy Next.js → zéro CORS, zéro CSRF */
export async function listBlogs(): Promise<BlogData[]> {
  const res = await fetch('/api/blogs', { cache: 'no-store' });
  if (!res.ok) throw new Error(`listBlogs: erreur ${res.status}`);
  return res.json();
}

export async function getBlog(id: number | string): Promise<BlogData> {
  const res = await fetch(`/api/blogs?id=${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`getBlog: erreur ${res.status}`);
  return res.json();
}

/** Proxy interne Next.js — contourne le CSRF Django côté serveur */
async function proxyPost(body: Record<string, unknown>): Promise<BlogData> {
  const res = await fetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw { response: { status: res.status, data } };
  return data;
}

async function proxyPatch(id: number | string, body: Record<string, unknown>): Promise<BlogData> {
  const res = await fetch(`/api/blogs?id=${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw { response: { status: res.status, data } };
  return data;
}

async function proxyDelete(id: number | string): Promise<void> {
  const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw { response: { status: res.status, data } };
  }
}

export async function createBlog(data: FormData): Promise<BlogData> {
  const body: Record<string, unknown> = {};
  data.forEach((v, k) => { body[k] = v; });
  return proxyPost(body);
}

/** Version JSON pour l'import en masse (pas de fichiers joints) */
export async function createBlogJson(data: Record<string, string>): Promise<BlogData> {
  return proxyPost(data);
}

export async function updateBlog(id: number | string, data: FormData): Promise<BlogData> {
  const body: Record<string, unknown> = {};
  data.forEach((v, k) => { body[k] = v; });
  return proxyPatch(id, body);
}

export async function deleteBlog(id: number | string): Promise<void> {
  return proxyDelete(id);
}

/** Formate une date ISO en texte lisible (ex: "15 janvier 2025") */
export function formatDate(dateStr?: string | null): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/** Formate en date + heure courte (ex: "15 jan. 2025 à 14:32") */
export function formatDateTime(dateStr?: string | null): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}
