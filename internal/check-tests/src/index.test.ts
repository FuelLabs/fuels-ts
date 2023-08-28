/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Browser } from 'playwright';

import { testEach } from './index';
import 'expect-playwright';

/**
 * @group browser
 */
/**
 * @group browser
 */
describe('in:browser', () => {
  let browser: Browser;
  let page: any;

  beforeEach(async () => {
    // @ts-expect-error
    browser = await globalThis?.context?.browser();
    page = await browser.newPage();
  });

  it('should work on browser', () => {
    expect(testEach()).toEqual('browser');
  });

  it('should load a new browser environment and check text', async () => {
    await page.goto('https://github.com/FuelLabs/fuels-ts');
    await expect(page).toMatchText('#readme h1', 'Resources');
  });

  /** Ref: https://playwright.dev/docs/evaluating */
  it('should access browser globals', async () => {
    const { window, document } = await page.evaluate(() => ({ window, document }));
    expect(window).toBeTruthy();
    expect(document).toBeTruthy();
  });
});
