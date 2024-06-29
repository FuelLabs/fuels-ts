/* eslint-disable no-console */

import { fuels, NETWORK_URL } from '..';

// Dummy transfer data
const to = 'destination';
const amount = 10_000;
const asset = 'assetId';

/**
 * Default
 */
export async function main() {
  const { wallet } = await fuels(NETWORK_URL);
  const balances = await wallet('0x..').getBalances();
  console.log({ balances });
}

/**
 * Constructing Directly
 */
export async function main2() {
  const { Wallet } = await fuels(NETWORK_URL);
  const balances = await Wallet.fromAddress('0x..').getBalances();
  console.log({ balances });
}

/**
 * Callback + waitForResult
 */
fuels(NETWORK_URL, async ({ wallet }) => {
  const { waitForResult } = await wallet('0x..').transfer(to, amount, asset);
  const { gasUsed } = await waitForResult();
  console.log({ gasUsed });
});
