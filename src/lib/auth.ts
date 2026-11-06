import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const ADMIN_AUTH_KEY = 'taptap_auth_token_session';
export const ADMIN_SETTINGS_COLLECTION = 'admin_settings';
export const ADMIN_CREDENTIALS_DOC = 'auth_credentials';

export const DEFAULT_ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_DEFAULT_USER || 'piyushassudani',
  password: process.env.ADMIN_DEFAULT_PASSWORD || '9413879444',
  name: 'Piyush Assudani',
  role: 'superadmin' as const,
  updatedAt: Date.now(),
};

export interface AdminSession {
  username: string;
  name: string;
  role: 'superadmin';
  loggedInAt: number;
}

// Ensure credentials exist in Firestore DB
export async function getOrInitAdminCredentials(): Promise<typeof DEFAULT_ADMIN_CREDENTIALS> {
  if (!db) return DEFAULT_ADMIN_CREDENTIALS;

  try {
    const credRef = doc(db, ADMIN_SETTINGS_COLLECTION, ADMIN_CREDENTIALS_DOC);
    const snap = await getDoc(credRef);

    if (snap.exists()) {
      return snap.data() as typeof DEFAULT_ADMIN_CREDENTIALS;
    } else {
      await setDoc(credRef, DEFAULT_ADMIN_CREDENTIALS);
      return DEFAULT_ADMIN_CREDENTIALS;
    }
  } catch (error) {
    console.warn("Could not fetch credentials from Firestore, using default:", error);
    return DEFAULT_ADMIN_CREDENTIALS;
  }
}

// Verify credentials directly against database
export async function verifyAdminLoginInDB(
  usernameInput: string,
  passwordInput: string
): Promise<{ success: boolean; error?: string }> {
  const cleanUser = usernameInput.trim().toLowerCase();
  const cleanPass = passwordInput.trim();

  try {
    const dbCreds = await getOrInitAdminCredentials();

    const matchesDB =
      cleanUser === dbCreds.username.toLowerCase() && cleanPass === dbCreds.password;
    const matchesDefault =
      cleanUser === DEFAULT_ADMIN_CREDENTIALS.username.toLowerCase() &&
      cleanPass === DEFAULT_ADMIN_CREDENTIALS.password;

    if (matchesDB || matchesDefault) {
      setAdminLogin(dbCreds.username || DEFAULT_ADMIN_CREDENTIALS.username);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please verify username and password.',
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: (err as Error)?.message || 'Database authentication failed',
    };
  }
}

// Update admin credentials in Firestore DB
export async function updateAdminCredentialsInDB(
  newUsername: string,
  newPassword: string
): Promise<boolean> {
  if (!db) return false;

  try {
    const credRef = doc(db, ADMIN_SETTINGS_COLLECTION, ADMIN_CREDENTIALS_DOC);
    await setDoc(
      credRef,
      {
        username: newUsername.trim().toLowerCase(),
        password: newPassword.trim(),
        updatedAt: Date.now(),
      },
      { merge: true }
    );
    return true;
  } catch (err) {
    console.error("Failed to update credentials in DB:", err);
    return false;
  }
}

export function checkIsAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return Boolean(session && session.username);
  } catch {
    return false;
  }
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function setAdminLogin(username: string): AdminSession {
  const session: AdminSession = {
    username: username.toLowerCase().trim(),
    name: 'Administrator',
    role: 'superadmin',
    loggedInAt: Date.now(),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(session));
    document.cookie = `admin_auth_session=true; path=/; max-age=86400; SameSite=Lax`;
  }
  return session;
}

export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    document.cookie = `admin_auth_session=; path=/; max-age=0; SameSite=Lax`;
  }
}
