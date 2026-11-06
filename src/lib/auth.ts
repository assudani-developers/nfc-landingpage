export const ADMIN_AUTH_KEY = 'taptap_piyush_auth_token_v1';

export interface AdminSession {
  username: string;
  name: string;
  role: 'superadmin';
  loggedInAt: number;
}

export function checkIsAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return Boolean(session && session.username === 'piyush');
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
    name: 'Piyush Assudani',
    role: 'superadmin',
    loggedInAt: Date.now(),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(session));
    // Also set a document cookie for SSR/client sync
    document.cookie = `piyush_admin_auth=true; path=/; max-age=86400; SameSite=Lax`;
  }
  return session;
}

export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    document.cookie = `piyush_admin_auth=; path=/; max-age=0; SameSite=Lax`;
  }
}

