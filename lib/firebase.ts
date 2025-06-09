import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteUser,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBQ-PvQx5TVbQu9wxTdvIpdwmro_uxHeP4',
  authDomain: 'labelshop-e7de7.firebaseapp.com',
  projectId: 'labelshop-e7de7',
  storageBucket: 'labelshop-e7de7.firebasestorage.app',
  messagingSenderId: '198061120466',
  appId: '1:198061120466:web:cd0ffb9fea4b5bff4c860b',
  measurementId: 'G-04Y94Q16LE',
};

let app: ReturnType<typeof initializeApp> | undefined;

export function initFirebase() {
  if (!getApps().length && typeof window !== 'undefined') {
    app = initializeApp(firebaseConfig);
    getAnalytics(app);
  } else if (getApps().length) {
    app = getApps()[0];
  }
  return app!;
}

export function getFirebaseAuth() {
  return getAuth(initFirebase());
}

export async function firebaseLogin(email: string, password: string) {
  const auth = getFirebaseAuth();
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function firebaseRegister(
  email: string,
  password: string,
  displayName?: string,
) {
  const auth = getFirebaseAuth();
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(cred.user, { displayName });
  }
  return cred.user;
}

export async function firebaseLogout() {
  const auth = getFirebaseAuth();
  await signOut(auth);
}

export async function firebaseDeleteAccount() {
  const auth = getFirebaseAuth();
  if (auth.currentUser) {
    await deleteUser(auth.currentUser);
  }
}

export function watchAuth(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
}
