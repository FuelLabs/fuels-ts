import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  await page.waitForTimeout(2000);

  const topUpWalletButton = page.getByText('Top-up Wallet');
  await topUpWalletButton.click();

  await page.reload();

  await page.waitForTimeout(2000);

  const incrementButton = page.getByText('Increment Counter');
  await incrementButton.click();

  // the counter should be incremented
  const counter = page.getByText('1');
  await expect(counter).toBeVisible();
});
