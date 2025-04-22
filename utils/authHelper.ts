import { request, APIRequestContext } from '@playwright/test';

export async function getAuthContext(role: 'ADMIN' | 'USER'): Promise<APIRequestContext> {
  const credentials = {
    ADMIN: {
      email: 'pratihar+admin@itobuz.com',
      password: 'Itobuz#1234',
    },
    USER: {
      email: 'pratihar+user@itobuz.com',
      password: 'Itobuz#1234',
    },
  };

  const baseURL = 'https://evc.laravel-studio.io';

  const apiContext = await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      'app': role,
      'content-type': 'application/json',
      'accept': 'application/json',
    },
  });

  const loginRes = await apiContext.post('/api/login', {
    data: credentials[role],
  });

  const body = await loginRes.json();

  const token = body.data?.accessToken;

  if (!token) {
    throw new Error(`Login failed for role: ${role}`);
  }

  return await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      'app': role,
      'authorization': `jwt ${token}`,
      'accept': 'application/json',
    },
  });
}
