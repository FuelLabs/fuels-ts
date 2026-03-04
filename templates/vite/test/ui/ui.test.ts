import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

const WEB_SERVER_URL = 'http://localhost:5173';

const setup = async ({ page }: { page: Page }) => {
  await page.goto(WEB_SERVER_URL, { waitUntil: 'networkidle' });

  await page.waitForTimeout(2000);

  const connectWalletButton = page.getByText('Connect Wallet');
  await connectWalletButton.click();

  const burnerWalletButton = page.getByText('Burner Wallet');
  await burnerWalletButton.click();
};

test.extend({
  page: async ({ page }, use) => {
    await page.evaluate(() => window.localStorage.clear());
    await use(page);
  },
});

test('counter contract - increment function call works properly', async ({ page }) => {
  await setup({ page });

  const topUpWalletButton = page.getByText('Transfer 5 ETH', { exact: true });
  await topUpWalletButton.click();

  await page.waitForTimeout(2000);

  const contractTab = page.getByText('Contract');
  await contractTab.click();

  const initialCounterValue = +page.getByTestId('counter').textContent;

  const incrementButton = page.getByText('Increment', { exact: true });
  await incrementButton.click();

  await page.waitForTimeout(2000);

  const counterValueAfterIncrement = +page.getByTestId('counter').textContent;
  expect(counterValueAfterIncrement).toEqual(initialCounterValue + 1);
});
