import { api } from './api';

export interface RegisterData {
  username: string;
  email?: string;
  password: string;
  role: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export async function register(data: RegisterData) {
  const res = await api.post('/accounts/register/', data);
  return res.data;
}

export async function login(data: LoginData) {
  const res = await api.post('/accounts/login/', data);
  return res.data;
}

export async function logout() {
  const res = await api.post('/accounts/logout/');
  return res.data;
}

export async function cancelAccount() {
  const res = await api.delete('/accounts/cancel/');
  return res.data;
}

export interface VerifyOTPData {
  email: string;
  code: string;
}

export async function verifyOTP(data: VerifyOTPData) {
  const res = await api.post('/accounts/verify-otp/', data);
  return res.data;
}
