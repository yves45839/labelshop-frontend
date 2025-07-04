import { api } from './api';

export interface StockItem {
  id: number;
  name: string;
  quantity: number;
  /** Quantités par site, clés = nom du site */
  site_quantities?: Record<string, number>;
  [key: string]: any;
}

export async function listStock() {
  const res = await api.get('/stock/');
  return res.data;
}

export async function updateStock(id: number, quantity: number) {
  const res = await api.post('/stock/update/', { id, quantity });
  return res.data;
}
