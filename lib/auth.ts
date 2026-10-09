import { headers } from 'next/headers';

export type AuthenticatedUser = {
  id: string;
  email: string;
  name?: string;
};

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const requestHeaders = await headers();
  const id = requestHeaders.get('oai-authenticated-user-id');
  const email = requestHeaders.get('oai-authenticated-user-email');
  if (!id || !email) return null;

  const encodedName = requestHeaders.get('oai-authenticated-user-full-name');
  const encoding = requestHeaders.get('oai-authenticated-user-full-name-encoding');
  let name: string | undefined;
  if (encodedName && encoding === 'percent-encoded-utf-8') {
    try {
      name = decodeURIComponent(encodedName);
    } catch {
      name = undefined;
    }
  }

  return { id, email, name };
}

function configuredEditorEmail() {
  const configured = process.env.PORTFOLIO_EDITOR_EMAIL?.trim().toLowerCase();
  if (configured) return configured;
  return process.env.NODE_ENV === 'production' ? '' : 'seedy@sites.test';
}

export async function getEditorAccess() {
  const user = await getAuthenticatedUser();
  if (!user) return { user: null, allowed: false as const, reason: 'sign-in' as const };

  const allowed = user.email.trim().toLowerCase() === configuredEditorEmail();
  return { user, allowed, reason: allowed ? ('ok' as const) : ('forbidden' as const) };
}

export function chatGptSignInPath(returnTo = '/studio') {
  return `/signin-with-chatgpt?return_to=${encodeURIComponent(returnTo)}`;
}

export function chatGptSignOutPath(returnTo = '/') {
  return `/signout-with-chatgpt?return_to=${encodeURIComponent(returnTo)}`;
}
