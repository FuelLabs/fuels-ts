import type { TransferParams } from 'fuels';
import { ScriptTransactionRequest, Wallet } from 'fuels';
import { launchTestNode, TestAssetId } from 'fuels/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { bench } from 'vitest';

import { CallTestContractFactory } from '../test/typegen/contracts';

/**
 * @group node
 */
describe('Cost Estimation Benchmarks', () => {
  bench(
    'should successfully get transaction cost estimate for a single contract call',
    async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: CallTestContractFactory,
          },
        ],
      });

      const {
        contracts: [contract],
      } = launched;

      const cost = await contract.functions
        .return_context_amount()
        .callParams({
          forward: [100, contract.provider.getBaseAssetId()],
        })
        .getTransactionCost();

      expect(cost.minFee).toBeDefined();
      expect(cost.maxFee).toBeDefined();
      expect(cost.gasPrice).toBeDefined();
      expect(cost.gasUsed).toBeDefined();
      expect(cost.gasPrice).toBeDefined();
    }
  );

  bench('should successfully get transaction cost estimate for multi contract calls', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [{ factory: CallTestContractFactory }],
    });

    const {
      contracts: [contract],
    } = launched;

    const invocationScope = contract.multiCall([
      contract.functions.return_context_amount().callParams({
        forward: [100, contract.provider.getBaseAssetId()],
      }),
      contract.functions.return_context_amount().callParams({
        forward: [200, TestAssetId.A.value],
      }),
    ]);

    const cost = await invocationScope.getTransactionCost();

    expect(cost.minFee).toBeDefined();
    expect(cost.maxFee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
  });

  bench('should successfully get transaction cost estimate for a single transfer', async () => {
    using launched = await launchTestNode({
      // Only deploying the contract so that we have the same config for both benchmarks
      contractsConfigs: [{ factory: CallTestContractFactory }],
    });

    const { provider } = launched;

    const request = new ScriptTransactionRequest({ gasLimit: 1000000 });

    const recipient = Wallet.generate({
      provider,
    });
    const sender = Wallet.fromPrivateKey(
      '0x30bb0bc68f5d2ec3b523cee5a65503031b40679d9c72280cd8088c2cfbc34e38',
      provider
    );

    request.addCoinOutput(recipient.address, 10, provider.getBaseAssetId());

    const cost = await sender.getTransactionCost(request);

    expect(cost.minFee).toBeDefined();
    expect(cost.maxFee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
  });

  bench('should successfully get transaction cost estimate for a batch transfer', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [{ factory: CallTestContractFactory }],
    });

    const {
      provider,
      contracts: [contract],
    } = launched;

    const receiver1 = Wallet.generate({ provider });
    const receiver2 = Wallet.generate({ provider });
    const receiver3 = Wallet.generate({ provider });

    const amountToTransfer1 = 989;
    const amountToTransfer2 = 699;
    const amountToTransfer3 = 122;

    const transferParams: TransferParams[] = [
      {
        destination: receiver1.address,
        amount: amountToTransfer1,
        assetId: provider.getBaseAssetId(),
      },
      { destination: receiver2.address, amount: amountToTransfer2, assetId: TestAssetId.A.value },
      { destination: receiver3.address, amount: amountToTransfer3, assetId: TestAssetId.B.value },
    ];

    const cost = await contract.functions
      .sum(40, 50)
      .addBatchTransfer(transferParams)
      .getTransactionCost();

    expect(cost.minFee).toBeDefined();
    expect(cost.maxFee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
  });
});
