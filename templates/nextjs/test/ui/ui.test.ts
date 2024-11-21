import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

const WEB_SERVER_URL = 'http://localhost:3000';

const setup = async ({ page }: { page: Page }) => {
  await page.goto(WEB_SERVER_URL, { waitUntil: 'networkidle' });

  await page.waitForTimeout(2000);

  const connectWalletButton = await page.getByText('Connect Wallet');
  await connectWalletButton.click();

  const burnerWalletButton = await page.getByText('Burner Wallet');
  await burnerWalletButton.click();
};

test.describe('Counter Contract Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => window.localStorage.clear());
  });

  test('counter contract - increment function call works properly', async ({ page }) => {
    await setup({ page });

    const topUpWalletButton = await page.getByText('Transfer 5 ETH', { exact: true });
    await topUpWalletButton.click();

    await page.waitForTimeout(2000);

    const contractTab = await page.getByText('Contract');
    await contractTab.click();

    const initialCounterValue = +(await page.getByTestId('counter').textContent());

    const incrementButton = await page.getByText('Increment', { exact: true });
    await incrementButton.click();

    await page.waitForTimeout(2000);

    const counterValueAfterIncrement = +(await page.getByTestId('counter').textContent());
    expect(counterValueAfterIncrement).toEqual(initialCounterValue + 1);
  });
});
