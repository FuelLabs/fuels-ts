/* eslint-disable import/no-extraneous-dependencies */

import type { TransferParams, Provider } from 'fuels';
import { ScriptTransactionRequest, Wallet } from 'fuels';
import { launchTestNode, TestAssetId } from 'fuels/test-utils';
import { bench } from 'vitest';

import type { CallTestContract } from '../test/typegen/contracts';
import { CallTestContractFactory } from '../test/typegen/contracts';

/**
 * @group node
 * @group browser
 */
describe('Cost Estimation Benchmarks', () => {
  let contract: CallTestContract;
  let provider: Provider;
  let cleanup: () => void;
  beforeEach(async () => {
    const launched = await launchTestNode({
      contractsConfigs: [{ factory: CallTestContractFactory }],
    });

    cleanup = launched.cleanup;
    contract = launched.contracts[0];
    provider = contract.provider;
  });

  afterEach(() => {
    cleanup();
  });

  bench(
    'should successfully get transaction cost estimate for a single contract call',
    async () => {
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

  it('should successfully get transaction cost estimate for a mint', async () => {
    const subId = '0x4a778acfad1abc155a009dc976d2cf0db6197d3d360194d74b1fb92b96986b00';

    const cost = await contract.functions.mint_coins(subId, 1_000).getTransactionCost();

    expect(cost.minFee).toBeDefined();
    expect(cost.maxFee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
  });
});
