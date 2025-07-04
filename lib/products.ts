import { api } from './api';

export interface ProductData {
  name: string;
  slug: string;
  reference: string;
  price: number;
  [key: string]: any;
}

export async function createProduct(data: ProductData) {
  const res = await api.post('/products/create/', data);
  return res.data;
}
