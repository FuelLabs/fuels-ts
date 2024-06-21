import { bn } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

const { binHexlified: contractBytecode, abiContents: abiJSON } = getFuelGaugeForcProject(
  FuelGaugeProjectsEnum.PAYABLE_ANNOTATION
);

const setupContract = async () => {
  const {
    contracts: [contract],
    cleanup,
  } = await launchTestNode({
    contractsConfigs: [{ deployer: abi, contractBytecode }],
  });
  return Object.assign(contract, { [Symbol.dispose]: cleanup });
};

beforeAll(() => {});

/**
 * @group node
 */
test('allow sending coins to payable functions', async () => {
  using contract = await setupContract();
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
  using contract = await setupContract();
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
