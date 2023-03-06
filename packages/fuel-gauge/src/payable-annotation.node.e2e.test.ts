import { readFileSync } from 'fs';
import { bn, NativeAssetId } from 'fuels';
import { join } from 'path';

import abiJSON from '../test-projects/payable-annotation/out/debug/payable-annotation-abi.json';

import { createSetupConfig } from './utils';

const contractBytecode = readFileSync(
  join(__dirname, '../test-projects/payable-annotation/out/debug/payable-annotation.bin')
);

const setupContract = createSetupConfig({
  contractBytecode,
  abi: abiJSON,
});

test('allow sending coins to payable functions', async () => {
  const contract = await setupContract();

  // This should not fail because the function is payable
  expect(
    contract.functions
      .payable()
      .callParams({
        forward: {
          amount: bn(100),
          assetId: NativeAssetId,
        },
      })
      .call()
  ).resolves.toBeTruthy();
});

test("don't allow sending coins to non-payable functions", async () => {
  const contract = await setupContract();

  // This should fail because the function is not payable
  expect(async () =>
    contract.functions
      .non_payable()
      .callParams({
        forward: {
          amount: bn(100),
          assetId: NativeAssetId,
        },
      })
      .call()
  ).rejects.toThrowError(/Function is not payable/);
});
