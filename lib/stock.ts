import { api } from './api';

export interface StockItem {
  id: number;
  name: string;
  quantity: number;
  [key: string]: any;
}

export async function listStock() {
  const res = await api.get('/products/get-products/');
  return (res.data as any[]).map((p) => ({
    id: p.id,
    name: p.name,
    quantity: p.stock_quantity ?? 0,
    reference: p.default_code,
    price: p.list_price,
    image: p.image_1024
      ? p.image_1024.startsWith('http')
        ? p.image_1024
        : `${api.defaults.baseURL}${p.image_1024}`
      : undefined,
  }));
}

export async function updateStock(id: number, quantity: number) {
  const res = await api.post('/stock/update/', { id, quantity });
  return res.data;
}
