// tests/register.spec.ts
import { test, expect } from '@playwright/test';
import { WebSocketRegistrationClient } from '../src/utils/WebSocketRegistrationClient';

test('Registration with WebSocket', async () => {
  const client = new WebSocketRegistrationClient();
  client.connect();
  const credentials = await client.register();
  expect(credentials.name).toBeTruthy();
  expect(credentials.password).toBeTruthy();
  console.log('Registered credentials:', credentials);

  client.disconnect();
});
