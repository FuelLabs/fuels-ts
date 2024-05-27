import { test, expect } from '@playwright/test';

test('counter contract - increment function call works properly', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

  await page.waitForTimeout(2000);

  const topUpWalletButton = page.getByText('Top-up Wallet');
  await topUpWalletButton.click();

  const welcomeToFuelText = page.getByText('Welcome to Fuel');
  await expect(welcomeToFuelText).toBeVisible();

  await page.waitForTimeout(2000);

  await page.reload();

  await page.waitForTimeout(5000);

  const incrementButton = page.getByText('Increment Counter');
  await incrementButton.click();

  await page.waitForTimeout(2000);

  const counter = page.getByTestId('counter');
  await expect(counter).toBeVisible();
});
