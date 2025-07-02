import { api } from './api';

export interface Site {
  id: number;
  name: string;
  [key: string]: any;
}

export interface StockEntry {
  site_id: number;
  site_name: string;
  quantity: number;
  [key: string]: any;
}

export async function listSites() {
  const res = await api.get('/inventory/sites/');
  return res.data;
}

export async function createSite(name: string) {
  const res = await api.post('/inventory/sites/', { name });
  return res.data;
}

export async function listProductStock(productId: number | string) {
  const res = await api.get(`/inventory/products/${productId}/stock/`);
  return res.data;
}

export async function updateProductStock(
  product_id: number | string,
  site_id: number | string,
  quantity: number,
) {
  const res = await api.post('/inventory/update-stock/', {
    product_id,
    site_id,
    quantity,
  });
  return res.data;
}

export interface TransferData {
  product_id: number | string;
  from_site_id: number | string;
  to_site_id: number | string;
  quantity: number;
}

export async function transferProductStock(data: TransferData) {
  const res = await api.post('/inventory/transfer-stock/', data);
  return res.data;
}
