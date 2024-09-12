import { test, expect } from '@playwright/test';

const WEB_SERVER_URL = 'http://localhost:5173';

test.extend({
  page: async ({ page }, use) => {
    await page.evaluate(() => window.localStorage.clear());
    await use(page);
  },
});

test('counter contract - increment function call works properly', async ({ page }) => {
  await page.goto(WEB_SERVER_URL, { waitUntil: 'networkidle' });

  await page.waitForTimeout(2000);

  const topUpWalletButton = page.getByText('Top-up Wallet');
  await topUpWalletButton.click();

  await page.waitForTimeout(2000);

  const initialCounterValue = +page.getByTestId('counter').textContent;

  const incrementButton = page.getByText('Increment Counter');
  await incrementButton.click();

  await page.waitForTimeout(2000);

  const counterValueAfterIncrement = +page.getByTestId('counter').textContent;
  expect(counterValueAfterIncrement).toEqual(initialCounterValue + 1);
});
