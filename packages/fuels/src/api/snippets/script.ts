/* eslint-disable no-console */

import type { JsonAbi } from '@fuel-ts/abi-coder';

import { fuels, TESTNET_NETWORK_URL } from '..';

import { DispatcherScript } from './typegend';

/**
 * Default
 */
export async function main() {
  const { wallet, script } = await fuels(TESTNET_NETWORK_URL);
  const vault = wallet('0x..');
  const { value } = await script(DispatcherScript, vault).functions.main().call();
  console.log({ value });
}

/**
 * Callback
 */
fuels(TESTNET_NETWORK_URL, async ({ script, wallet }) => {
  const vault = await wallet('0x..');
  const { value } = await script(DispatcherScript, vault).functions.main().call();
  console.log({ value });
});

/**
 * Promise
 */
fuels(TESTNET_NETWORK_URL)
  .then(async ({ script, wallet }) => {
    const vault = wallet('0x..');
    const { value } = await script(DispatcherScript, vault).functions.main().get();
    console.log({ value });
  })
  .catch(console.error);

/**
 * Constructing Directly
 */
fuels(TESTNET_NETWORK_URL, async ({ Script, wallet }) => {
  const bytecode = '<contract-bytecode>';
  const abi: JsonAbi = {} as JsonAbi;
  const account = await wallet('0x..');

  const script = new Script(bytecode, abi, account);
  const { value } = await script.functions.main().call();
  console.log({ value });
});

/**
 * Using Transaction Result
 */
fuels(TESTNET_NETWORK_URL, async ({ script, wallet }) => {
  const account = await wallet('0x..');
  const res = await script(DispatcherScript, account).functions.main().call(); // .submit()
  const {
    value,
    transactionResult: { gasUsed },
  } = res; // txResponse.gasUsed

  console.log({ value, gasUsed });
});
