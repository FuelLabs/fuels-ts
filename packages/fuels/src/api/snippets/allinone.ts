/* eslint-disable no-console */

import { fuels, NETWORK_URL } from '..';

import { CounterContract, DispatcherScript, VaultPredicate } from './typegend';

export async function main() {
  const { wallet, contract, script, predicate } = await fuels(NETWORK_URL);

  const vault = wallet('0x..');

  const walletBalances = await vault.getBalances();
  const predicateBalances = await predicate(VaultPredicate).getBalances();

  const { value: contractValue } = await contract(CounterContract).functions.getCount().get();
  const { value: scriptValue } = await script(DispatcherScript, vault).functions.main().get();

  console.log({ walletBalances, predicateBalances, contractValue, scriptValue });
}
