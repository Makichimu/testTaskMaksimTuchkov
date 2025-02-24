import { test as base } from '@playwright/test';
import { AppSteps } from '../steps/AppSteps';
import { WebSocketRegistrationClient } from '../utils/WebSocketRegistrationClient';

export type AppFixtures = {
  app: AppSteps;
  credentials: { name: string; password: string };
};

export const test = base.extend<AppFixtures>({
  app: async ({ page, context }, use) => {
    const app = new AppSteps(page, context);
    await use(app);
  },
  credentials: [
    async ({}, use) => {
      const client = new WebSocketRegistrationClient();
      client.connect();
      try {
        const credentials = await client.register();
        await use(credentials);
      } finally {
        client.disconnect();
      }
    },
    { scope: 'test' }
  ]
});

export { expect } from '@playwright/test';
