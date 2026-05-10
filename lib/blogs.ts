import { api } from './api';

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

export async function listBlogs(): Promise<BlogData[]> {
  const res = await api.get('/blogs/');
  return res.data;
}

export async function getBlog(id: number | string): Promise<BlogData> {
  const res = await api.get(`/blogs/${id}/`);
  return res.data;
}

export async function createBlog(data: FormData): Promise<BlogData> {
  // Try standard DRF POST /blogs/ first, fall back to /blogs/create/
  try {
    const res = await api.post('/blogs/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err: any) {
    if (err?.response?.status === 405) {
      const res = await api.post('/blogs/create/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    }
    throw err;
  }
}

/** Version JSON pour l'import en masse (pas de fichiers joints) */
export async function createBlogJson(data: Record<string, string>): Promise<BlogData> {
  try {
    const res = await api.post('/blogs/', data);
    return res.data;
  } catch (err: any) {
    if (err?.response?.status === 405) {
      const res = await api.post('/blogs/create/', data);
      return res.data;
    }
    throw err;
  }
}

export async function updateBlog(id: number | string, data: FormData): Promise<BlogData> {
  // Try PATCH /blogs/{id}/ (standard DRF), fall back to POST /blogs/{id}/update/
  try {
    const res = await api.patch(`/blogs/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err: any) {
    if (err?.response?.status === 405) {
      const res = await api.post(`/blogs/${id}/update/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    }
    throw err;
  }
}

export async function deleteBlog(id: number | string): Promise<void> {
  // Try DELETE /blogs/{id}/ first, fall back to /blogs/{id}/delete/
  try {
    await api.delete(`/blogs/${id}/`);
  } catch (err: any) {
    if (err?.response?.status === 405) {
      await api.delete(`/blogs/${id}/delete/`);
      return;
    }
    throw err;
  }
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
