import { api } from './api';

export interface OrderData {
  [key: string]: any;
}

export async function createOrder(data: OrderData) {
  const res = await api.post('/orders/create/', data);
  return res.data;
}

export async function listOrders(user_id: number | string) {
  const res = await api.get(`/orders/${user_id}/`);
  return res.data;
}
