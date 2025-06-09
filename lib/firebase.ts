import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteUser,
  updatePassword,
  onAuthStateChanged,
  sendEmailVerification,
  User,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

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

function translateAuthError(code: string) {
  switch (code) {
    case 'auth/invalid-email':
      return 'Email invalide';
    case 'auth/user-disabled':
      return 'Compte désactivé';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email ou mot de passe incorrect';
    case 'auth/email-already-in-use':
      return 'Email déjà utilisé';
    case 'auth/weak-password':
      return 'Mot de passe trop faible';
    default:
      return 'Erreur inconnue';
  }
}

export async function firebaseLogin(email: string, password: string) {
  const auth = getFirebaseAuth();
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    if (!cred.user.emailVerified) {
      await sendEmailVerification(cred.user);
      await signOut(auth);
      throw new Error('Veuillez vérifier votre email pour vous connecter');
    }
    return cred.user;
  } catch (err: any) {
    const message = translateAuthError((err as FirebaseError).code);
    throw new Error(message);
  }
}

export async function firebaseRegister(
  email: string,
  password: string,
  displayName?: string,
) {
  const auth = getFirebaseAuth();
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    await sendEmailVerification(cred.user);
    return cred.user;
  } catch (err: any) {
    const message = translateAuthError((err as FirebaseError).code);
    throw new Error(message);
  }
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

export async function firebaseUpdatePassword(newPassword: string) {
  const auth = getFirebaseAuth();
  if (!auth.currentUser) throw new Error('No user');
  await updatePassword(auth.currentUser, newPassword);
}

export function watchAuth(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
}
