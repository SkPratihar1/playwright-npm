import { test, expect } from '@playwright/test';
import { getAuthContext } from '../../utils/authHelper';

test.describe('User Profile API', () => {
  for (const role of ['ADMIN', 'USER'] as const) {
    test(`should fetch profile for ${role}`, async () => {
      const authContext = await getAuthContext(role);

      const response = await authContext.get('/api/user/profile');
      expect(response.status()).toBe(200);

      const body = await response.json();
      console.log(`${role} profile:`, body);

      expect(body.success).toBe(true);
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('role', role.toLowerCase());
    });
  }
});
