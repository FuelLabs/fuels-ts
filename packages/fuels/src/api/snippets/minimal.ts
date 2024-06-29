/* eslint-disable no-console */

import { fuels, NETWORK_URL } from '..';

import { CounterContract } from './typegend';

export async function minimalWallet() {
  const { wallet } = await fuels(NETWORK_URL);
  const balances = wallet('0x..').getBalances();
  console.log({ balances });
}

export async function minimalContract() {
  const { contract } = await fuels(NETWORK_URL);
  const { value } = await contract(CounterContract).functions.getCount().get();
  console.log({ value });
}
