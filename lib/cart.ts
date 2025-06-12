import { api } from './api';

export interface CartItemData {
  product_id: number;
  quantity: number;
  product_name?: string;
  product_image?: string;
  price?: number;
}

export interface UpdateCartData {
  item_id: number;
  quantity: number;
}

const LOCAL_KEY = 'cart';

function emitCart(items: CartItemData[]) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cart-changed', { detail: items }));
  }
}

function readLocalCart(): CartItemData[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLocalCart(items: CartItemData[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
    emitCart(items);
  }
}

export async function addToCart(data: CartItemData) {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user = stored ? JSON.parse(stored) : null;
  if (user) {
    const res = await api.post('/cart/add/', data);
    const items = await viewCart(user.id);
    emitCart(items);
    return res.data;
  }
  const items = readLocalCart();
  const existing = items.find((it) => it.product_id === data.product_id);
  if (existing) {
    existing.quantity += data.quantity;
    if (data.product_name) existing.product_name = data.product_name;
    if (data.product_image) existing.product_image = data.product_image;
    if (data.price) existing.price = data.price;
  } else {
    items.push(data);
  }
  saveLocalCart(items);
  return items;
}

export async function updateCartItem(data: UpdateCartData) {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user = stored ? JSON.parse(stored) : null;
  if (user) {
    const res = await api.post('/cart/update/', data);
    const items = await viewCart(user.id);
    emitCart(items);
    return res.data;
  }
  const items = readLocalCart();
  const item = items.find((it) => (it as any).item_id === data.item_id || it.product_id === data.item_id);
  if (item) {
    item.quantity = data.quantity;
    saveLocalCart(items);
  }
  return items;
}

export async function removeFromCart(item_id: number) {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user = stored ? JSON.parse(stored) : null;
  if (user) {
    const res = await api.post('/cart/remove/', { item_id });
    const items = await viewCart(user.id);
    emitCart(items);
    return res.data;
  }
  const items = readLocalCart().filter(
    (it) => (it as any).item_id !== item_id && it.product_id !== item_id
  );
  saveLocalCart(items);
  return items;
}

export async function viewCart(user_id?: number | string) {
  if (user_id) {
    const res = await api.get(`/cart/${user_id}/`);
    return res.data;
  }
  return readLocalCart();
}
