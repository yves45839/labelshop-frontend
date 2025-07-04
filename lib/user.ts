export interface CurrentUser {
  id: string;
  email: string | null;
  name: string | null;
}

const KEY = 'user';

export function getCurrentUser(): CurrentUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? (JSON.parse(stored) as CurrentUser) : null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: CurrentUser) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEY, JSON.stringify(user));
  }
}

export function removeCurrentUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(KEY);
  }
}
