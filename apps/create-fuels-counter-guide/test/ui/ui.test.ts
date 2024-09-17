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

// #region decrement-counter-ui-test
test('counter contract - decrement function call works properly', async ({ page }) => {
  await page.goto(WEB_SERVER_URL, { waitUntil: 'networkidle' });

  await page.waitForTimeout(2000); // These timeouts are needed to ensure that we wait for transactions to be mined

  const topUpWalletButton = page.getByText('Top-up Wallet');
  await topUpWalletButton.click();

  await page.waitForTimeout(2000);

  const initialCounterValue = +(page.getByTestId('counter').textContent);

  const decrementButton = page.getByText('Decrement Counter');
  await decrementButton.click();

  await page.waitForTimeout(2000);

  const counterValueAfterDecrement = +(page.getByTestId('counter').textContent);
  expect(+(counterValueAfterDecrement)).toEqual(+initialCounterValue - 1);
});
// #endregion decrement-counter-ui-test