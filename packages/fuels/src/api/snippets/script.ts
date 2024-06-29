/* eslint-disable no-console */

import type { JsonAbi } from '@fuel-ts/abi-coder';

import { fuels, NETWORK_URL } from '..';

import { Dispatcher } from './typegend';

/**
 * Default
 */
export async function main() {
  const { wallet, script } = await fuels(NETWORK_URL);
  const vault = wallet('0x..');
  const { value } = await script(Dispatcher, vault).functions.main().call();
  console.log({ value });
}

/**
 * Callback
 */
fuels(NETWORK_URL, async ({ script, wallet }) => {
  const vault = await wallet('0x..');
  const { value } = await script(Dispatcher, vault).functions.main().call();
  console.log({ value });
});

/**
 * Promise
 */
fuels(NETWORK_URL)
  .then(async ({ script, wallet }) => {
    const vault = wallet('0x..');
    const { value } = await script(Dispatcher, vault).functions.main().get();
    console.log({ value });
  })
  .catch(console.error);

/**
 * Constructing Directly
 */
fuels(NETWORK_URL, async ({ Script, wallet }) => {
  const bytecode = 'asdf';
  const abi: JsonAbi = {} as JsonAbi;
  const account = await wallet('0x..');

  const script = new Script(bytecode, abi, account);
  const { value } = await script.functions.main().call();
  console.log({ value });
});

/**
 * Using Transaction Result
 */
fuels(NETWORK_URL, async ({ script, wallet }) => {
  const account = await wallet('0x..');
  const res = await script(Dispatcher, account).functions.main().call(); // .submit()
  const {
    value,
    transactionResult: { gasUsed },
  } = res; // txResponse.gasUsed

  console.log({ value, gasUsed });
});
