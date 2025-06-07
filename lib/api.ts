import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://labelshop-backend.onrender.com',
  // ✅ permet d'envoyer les cookies de session pour l'authentification
  withCredentials: true,
});
