import type { BN, Contract } from 'fuels';
import { bn, BaseAssetId } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

import { createSetupConfig } from './utils';

const { binHexlified: contractBytecode, abiContents: abiJSON } = getFuelGaugeForcProject(
  FuelGaugeProjectsEnum.PAYABLE_ANNOTATION
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

/**
 * @group node
 */
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
      .txParams({ gasPrice, gasLimit: 10_000 })
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
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call()
  ).rejects.toThrowError(
    `The target function non_payable cannot accept forwarded funds as it's not marked as 'payable'.`
  );
});
