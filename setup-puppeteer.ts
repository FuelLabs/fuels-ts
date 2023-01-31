import type { Browser } from 'puppeteer';
import puppeteer from 'puppeteer';

let browser: Browser;

beforeAll(async () => {
  browser = await puppeteer.launch();
});

afterAll(async () => {
  await browser.close();
});
