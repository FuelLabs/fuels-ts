import { test, expect } from '@playwright/test';

test('counter contract - increment function call works properly', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

  await page.waitForTimeout(2000);

  const topUpWalletButton = page.getByText('Top-up Wallet');
  await topUpWalletButton.click();

  const welcomeToFuelText = page.getByText('Welcome to Fuel');
  await expect(welcomeToFuelText).toBeVisible();

  await page.waitForTimeout(4000);

  const incrementButton = page.getByText('Increment Counter');
  await incrementButton.click();

  await page.waitForTimeout(2000);

  const counter = page.getByTestId('counter');
  await expect(counter).toBeVisible();
});

test('faucet page', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/faucet', { waitUntil: 'networkidle' });

  await page.waitForTimeout(2000);

  // check if the two fields are pre-filled
  const receiverAddressInput = page.getByLabel('Receiving address:');
  await expect(receiverAddressInput).not.toBeEmpty();

  const amountToSendInput = page.getByLabel('Amount (ETH):');
  await expect(amountToSendInput).toHaveValue('5');

  // click the send funds button
  const sendFundsButton = page.getByText('Send Funds');
  await sendFundsButton.click();

  await page.waitForTimeout(500);

  const successToast = page.getByText('Funds sent!');
  await expect(successToast).toBeVisible();

  // TODO: Validate and assert that the balance has been updated. We need to use `fuels` as a dependency to do this.
});
