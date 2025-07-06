import { api } from './api';

export interface BlogData {
  id?: number;
  title: string;
  content: string;
  author_name: string;
  author_image?: File | string | null;
  attachments?: File[];
  [key: string]: any;
}

export async function listBlogs() {
  const res = await api.get('/blogs/');
  return res.data;
}

export async function getBlog(id: number | string) {
  const res = await api.get(`/blogs/${id}/`);
  return res.data;
}

export async function createBlog(data: FormData) {
  const res = await api.post('/blogs/create/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function updateBlog(id: number | string, data: FormData) {
  const res = await api.post(`/blogs/${id}/update/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function deleteBlog(id: number | string) {
  const res = await api.delete(`/blogs/${id}/delete/`);
  return res.data;
}
