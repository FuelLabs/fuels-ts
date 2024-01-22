import { readFileSync } from 'fs';
import type { BN, Contract } from 'fuels';
import { join } from 'path';

import { setup } from './utils';

let contractInstance: Contract;
let gasPrice: BN;

const U8_MAX = 2 ** 8 - 1;
const U16_MAX = 2 ** 16 - 1;
const U32_MAX = 2 ** 32 - 1;

beforeAll(async () => {
  const contractName = 'logging';
  const path = join(
    __dirname,
    `../test/fixtures/forc-projects-experimental/${contractName}/out/debug/${contractName}`
  );
  const contractBytecode = readFileSync(`${path}.bin`);
  const abi = JSON.parse(readFileSync(`${path}-abi.json`, 'utf8'));
  // TODO: shouldn't be setting this manually
  const versionedAbi = { version: 1, ...abi };

  contractInstance = await setup({ contractBytecode, abi: versionedAbi });

  ({ minGasPrice: gasPrice } = contractInstance.provider.getGasConfig());
});

describe('Experimental Logging', () => {
  it('logs u8', async () => {
    const expected = U8_MAX;

    const { value, logs } = await contractInstance.functions
      .log_u8(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(value).toBe(expected);
    expect(logs[0]).toBe(expected);
  });

  it('logs u16', async () => {
    const expected = U16_MAX;

    const { value, logs } = await contractInstance.functions
      .log_u16(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(value).toBe(expected);
    expect(logs[0]).toBe(expected);
  });

  it('logs u32', async () => {
    const expected = U32_MAX;

    const { value, logs } = await contractInstance.functions
      .log_u32(expected)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(value).toBe(expected);
    expect(logs[0]).toBe(expected);
  });
});
