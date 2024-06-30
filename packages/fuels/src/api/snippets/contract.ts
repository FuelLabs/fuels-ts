/* eslint-disable no-console */

import type { JsonAbi } from '..';
import { fuels, TESTNET_NETWORK_URL } from '..';

import { CounterContract } from './typegend';

/**
 * Default
 */
export async function main() {
  const { contract } = await fuels(TESTNET_NETWORK_URL);
  const { value } = await contract(CounterContract).functions.getCount().get();
  console.log({ value });
}

/**
 * Callback
 */
fuels(TESTNET_NETWORK_URL, async ({ contract }) => {
  const { value } = await contract(CounterContract).functions.getCount().get();
  console.log({ value });
});

/**
 * Promise
 */
fuels(TESTNET_NETWORK_URL)
  .then(async ({ contract }) => {
    const { value } = await contract(CounterContract).functions.getCount().get();
    console.log({ value });
  })
  .catch(console.error);

/**
 * Constructing Directly
 */
fuels(TESTNET_NETWORK_URL, async ({ Contract, provider }) => {
  const counter = new Contract('0x..', {} as JsonAbi, provider);
  const { value } = await counter.functions.getCount().get();
  console.log({ value });
});

/**
 * Using Transaction Result
 */
fuels(TESTNET_NETWORK_URL, async ({ contract }) => {
  const {
    value,
    transactionResult: { gasUsed }, // txResponse?
  } = await contract(CounterContract).functions.increment().call(); // .submit()?

  console.log({ value, gasUsed });
});
