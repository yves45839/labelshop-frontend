import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBQ-PvQx5TVbQu9wxTdvIpdwmro_uxHeP4',
  authDomain: 'labelshop-e7de7.firebaseapp.com',
  projectId: 'labelshop-e7de7',
  storageBucket: 'labelshop-e7de7.firebasestorage.app',
  messagingSenderId: '198061120466',
  appId: '1:198061120466:web:cd0ffb9fea4b5bff4c860b',
  measurementId: 'G-04Y94Q16LE',
};

export function initFirebase() {
  if (!getApps().length && typeof window !== 'undefined') {
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
  }
}
