import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { bn, BaseAssetId } from 'fuels';

import { getProgramDir } from './utils';

const contractDir = getProgramDir('payable-annotation');

/**
 * @group node
 */
test('allow sending coins to payable functions', async () => {
  await using launched = await TestNodeLauncher.launch({
    deployContracts: [contractDir],
  });
  const {
    contracts: [contract],
  } = launched;

  const { minGasPrice: gasPrice } = contract.provider.getGasConfig();

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
  await using launched = await TestNodeLauncher.launch({
    deployContracts: [contractDir],
  });
  const {
    contracts: [contract],
  } = launched;

  const { minGasPrice: gasPrice } = contract.provider.getGasConfig();

  // This should fail because the function is not payable
  await expect(() =>
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
