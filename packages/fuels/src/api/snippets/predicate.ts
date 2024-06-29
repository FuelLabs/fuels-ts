/* eslint-disable no-console */

import type { JsonAbi } from '@fuel-ts/abi-coder';

import { fuels, NETWORK_URL } from '..';

import { VaultPredicate } from './typegend';

// Dummy transfer data
const to = 'destination';
const amount = 10_000;
const asset = 'assetId';

/**
 * Default
 */
export async function main() {
  const { predicate } = await fuels(NETWORK_URL);
  const { waitForResult } = await predicate(VaultPredicate).transfer(to, amount, asset);
  const { logs } = await waitForResult();
  console.log({ logs });
}

/**
 * Promise
 */
fuels(NETWORK_URL)
  .then(async ({ predicate }) => {
    const { waitForResult } = await predicate(VaultPredicate).transfer(to, amount, asset);
    const { logs } = await waitForResult();
    console.log({ logs });
  })
  .catch(console.error);

/**
 * Callback
 */
fuels(NETWORK_URL, async ({ predicate }) => {
  const { waitForResult } = await predicate(VaultPredicate).transfer(to, amount, asset);
  const { logs } = await waitForResult();
  console.log({ logs });
});

/**
 * Constructing Directly
 */
fuels(NETWORK_URL, async ({ Predicate, provider }) => {
  const predicate = new Predicate({
    bytecode: VaultPredicate.bytecode,
    abi: VaultPredicate.abi as JsonAbi,
    provider,
  });

  const { waitForResult } = await predicate.transfer(to, amount, asset);
  const { logs } = await waitForResult();
  console.log({ logs });
});
