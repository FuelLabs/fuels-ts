import { readFileSync } from 'fs';
import type { BN, Contract } from 'fuels';
import { bn, BaseAssetId } from 'fuels';
import { join } from 'path';

import abiJSON from '../fixtures/forc-projects/payable-annotation/out/debug/payable-annotation-abi.json';

import { createSetupConfig } from './utils';

const contractBytecode = readFileSync(
  join(__dirname, '../fixtures/forc-projects/payable-annotation/out/debug/payable-annotation.bin')
);

const setupContract = createSetupConfig({
  contractBytecode,
  abi: abiJSON,
});

let contract: Contract;
let gasPrice: BN;

beforeAll(async () => {
  contract = await setupContract();
  ({ minGasPrice: gasPrice } = contract.provider.getGasConfig());
});

test('allow sending coins to payable functions', async () => {
  // This should not fail because the function is payable
  await expect(
    contract.functions
      .payable()
      .callParams({
        forward: {
          amount: bn(100),
          assetId: BaseAssetId,
        },
      })
      .txParams({ gasPrice })
      .call()
  ).resolves.toBeTruthy();
});

test("don't allow sending coins to non-payable functions", async () => {
  // This should fail because the function is not payable
  await expect(async () =>
    contract.functions
      .non_payable()
      .callParams({
        forward: {
          amount: bn(100),
          assetId: BaseAssetId,
        },
      })
      .txParams({ gasPrice })
      .call()
  ).rejects.toThrowError(
    `The target function non_payable cannot accept forwarded funds as it's not marked as 'payable'.`
  );
});
