import { test, expect } from '@playwright/test';

const WEB_SERVER_URL = 'http://localhost:5173';
const FAUCET_URL = `${WEB_SERVER_URL}/faucet`;

test.extend({
  page: async ({ page }, use) => {
    await page.evaluate(() => window.localStorage.clear());
    await use(page);
  },
});

test('counter contract - increment function call works properly', async ({ page }) => {
  await page.goto(WEB_SERVER_URL, { waitUntil: 'networkidle' });

  await page.waitForTimeout(5000);

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

test('top-up wallet button', async ({ page }) => {
  await page.goto(WEB_SERVER_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Check empty balance
  const walletBalance = page.getByTestId('wallet-balance');
  await expect(walletBalance).toContainText('Balance: 0.000 ETH');

  // Perform top-up
  const topUpWalletButton = page.getByText('Top-up Wallet');
  await topUpWalletButton.click();

  await page.waitForTimeout(1000);

  // Expect the balance to be updated
  await expect(walletBalance).not.toContainText('Balance: 0.000 ETH');
});

test('faucet page', async ({ page }) => {
  await page.goto(FAUCET_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Check empty balance
  const walletBalance = page.getByTestId('wallet-balance');
  await expect(walletBalance).toContainText('Balance: 0.000 ETH');

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

  // Check balance changed
  await expect(walletBalance).not.toContainText('Balance: 0.000 ETH');
});
