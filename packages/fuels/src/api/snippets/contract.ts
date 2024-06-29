/* eslint-disable no-console */

import type { JsonAbi } from '@fuel-ts/abi-coder';

import { fuels, NETWORK_URL } from '..';

import { Counter } from './typegend';

/**
 * Default
 */
export async function main() {
  const { contract } = await fuels(NETWORK_URL);
  const { value } = await contract(Counter).functions.getCount().get();
  console.log({ value });
}

/**
 * Callback
 */
fuels(NETWORK_URL, async ({ contract }) => {
  const { value } = await contract(Counter).functions.getCount().get();
  console.log({ value });
});

/**
 * Promise
 */
fuels(NETWORK_URL)
  .then(async ({ contract }) => {
    const { value } = await contract(Counter).functions.getCount().get();
    console.log({ value });
  })
  .catch(console.error);

/**
 * Constructing Directly
 */
fuels(NETWORK_URL, async ({ Contract, provider }) => {
  const counter = new Contract('0x..', {} as JsonAbi, provider);
  const { value } = await counter.functions.getCount().get();
  console.log({ value });
});

/**
 * Using Transaction Result
 */
fuels(NETWORK_URL, async ({ contract }) => {
  const {
    value,
    transactionResult: { gasUsed }, // txResponse?
  } = await contract(Counter).functions.increment().call(); // .submit()?

  console.log({ value, gasUsed });
});
