// // tests/login-api.spec.ts
// import { test, expect, request } from '@playwright/test';

// test.describe('Login API Tests', () => {
//   let apiContext;

//   test.beforeAll(async ({ playwright }) => {
//     apiContext = await request.newContext({
//       baseURL: 'https://evc.laravel-studio.io/api', // Change this to your actual API
//     });
//   });

//   test('Login with valid credentials', async () => {
//     const response = await apiContext.post('/login', {
//       data: {
//         "email": "pratihar+admin@itobuz.com",
//         "password": "Itobuz#1234"
//     }
//     });

//     expect(response.status()).toBe(200);

//     const body = await response.json();
//     console.log(body)
//     // expect(body).toHaveProperty('token');
//     // expect(body.token).toMatch(/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/); // Basic JWT check
//   });

//   test.skip('Login fails with invalid password', async () => {
//     const response = await apiContext.post('/login', {
//       data: {
//         email: 'user@example.com',
//         password: 'wrongpassword',
//       },
//     });

//     expect(response.status()).toBe(401);
//     const body = await response.json();
//     expect(body).toHaveProperty('error', 'Invalid credentials');
//   });

//   test.skip('Login fails with missing fields', async () => {
//     const response = await apiContext.post('/login', {
//       data: {},
//     });

//     expect(response.status()).toBe(400);
//     const body = await response.json();
//     expect(body.error).toContain('Missing'); // e.g., "Missing email or password"
//   });
// });




import { test, expect, request } from '@playwright/test';

test.describe.serial('EVC Admin Login API', () => {
  let apiContext ;
  let accessToken: string;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: 'https://evc.laravel-studio.io',
      extraHTTPHeaders: {
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/json',
        'app': 'ADMIN',
        // 'origin': 'https://ero-ev-admin.x-studio.io',
      },
    });
  });

  test.skip('Login fails with invalid password', async () => {
    const response = await apiContext.post('/api/login', {
      data: {
        email: 'pratihar+admin@itobuz.com',
        password: 'wrongpassword',
      },
    });
  
    expect(response.status()).toBe(400);
  
    const body = await response.json();
    console.log('Invalid password response:', body);
  
    expect(body.success).toBe(false);
    expect(body.message).toMatch(/invalid|password/i);
  });
  
  test.skip('Login fails with missing fields', async () => {
    const response = await apiContext.post('/api/login', {
      data: {},
    });
  
    expect(response.status()).toBe(400);
  
    const body = await response.json();
    console.log('Missing fields response:', body);
  
    expect(body.success).toBe(false);
    expect(body.message).toMatch(/required|missing/i);
  });

  test('Should login successfully with valid credentials', async () => {
    const response = await apiContext.post('/api/login', {
      data: {
        email: 'pratihar+admin@itobuz.com',
        password: 'Itobuz#1234',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    //console.log('Login response:', body);
    accessToken = body.data.accessToken;
    console.log("logintoken",accessToken)
    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty('accessToken');
    expect(body.data.accessToken).toBeTruthy();
  });

 
  test('Get user profile using accessToken', async () => {

    const authContext2 = await request.newContext({
      baseURL: 'https://evc.laravel-studio.io',
      extraHTTPHeaders: {
        'authorization': `jwt ${accessToken}`,
        'app': 'ADMIN', 
        'accept': 'application/json',
      },
    });

    const response = await authContext2.get('/api/user/profile');

    console.log("respons userr profile",response)
    expect(response.status()).toBe(200);

    const profile = await response.json();
    

    expect(profile.success).toBe(true);
    expect(profile.data).toHaveProperty('email', 'pratihar+admin@itobuz.com');
    expect(profile.data).toHaveProperty('role', 'admin');
  });
  
});
