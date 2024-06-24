import { bn } from 'fuels';

import { FuelGaugeProjectsEnum } from '../test/fixtures';

import { launchTestContract } from './utils';

beforeAll(() => {});

/**
 * @group node
 * @group browser
 */
test('allow sending coins to payable functions', async () => {
  using contract = await launchTestContract(FuelGaugeProjectsEnum.PAYABLE_ANNOTATION);
  const baseAssetId = contract.provider.getBaseAssetId();

  // This should not fail because the function is payable
  await expect(
    contract.functions
      .payable()
      .callParams({
        forward: {
          amount: bn(100),
          assetId: baseAssetId,
        },
      })
      .call()
  ).resolves.toBeTruthy();
});

test("don't allow sending coins to non-payable functions", async () => {
  using contract = await launchTestContract(FuelGaugeProjectsEnum.PAYABLE_ANNOTATION);
  const baseAssetId = contract.provider.getBaseAssetId();

  // This should fail because the function is not payable
  await expect(async () =>
    contract.functions
      .non_payable()
      .callParams({
        forward: {
          amount: bn(100),
          assetId: baseAssetId,
        },
      })
      .call()
  ).rejects.toThrowError(
    `The target function non_payable cannot accept forwarded funds as it's not marked as 'payable'.`
  );
});
