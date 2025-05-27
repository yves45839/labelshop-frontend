import { api } from './api';

export interface CartItemData {
  product_id: number;
  quantity: number;
}

export interface UpdateCartData {
  item_id: number;
  quantity: number;
}

export async function addToCart(data: CartItemData) {
  const res = await api.post('/cart/add/', data);
  return res.data;
}

export async function updateCartItem(data: UpdateCartData) {
  const res = await api.post('/cart/update/', data);
  return res.data;
}

export async function removeFromCart(item_id: number) {
  const res = await api.post('/cart/remove/', { item_id });
  return res.data;
}

export async function viewCart(user_id: number | string) {
  const res = await api.get(`/cart/${user_id}/`);
  return res.data;
}
