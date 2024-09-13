/* eslint-disable import/no-extraneous-dependencies */

import type { TransferParams, WalletUnlocked } from 'fuels';
import { Wallet, Provider, ScriptTransactionRequest } from 'fuels';
import { launchTestNode, TestAssetId } from 'fuels/test-utils';
import { bench } from 'vitest';

import type { CallTestContract } from '../test/typegen/contracts';
import { CallTestContractFactory } from '../test/typegen/contracts';

import { DEVNET_CONFIG } from './config';

/**
 * @group node
 * @group browser
 */
describe('Cost Estimation Benchmarks', () => {
  let contract: CallTestContract;
  let provider: Provider;
  let request: ScriptTransactionRequest;
  let recipient: WalletUnlocked;
  let receiver1: WalletUnlocked;
  let receiver2: WalletUnlocked;
  let receiver3: WalletUnlocked;
  let sender: WalletUnlocked;

  let cleanup: () => void;

  const setup = (testProvider: Provider) => {
    request = new ScriptTransactionRequest({ gasLimit: 1000000 });

    recipient = Wallet.generate({
      provider: testProvider,
    });
    receiver1 = Wallet.generate({
      provider: testProvider,
    });
    receiver2 = Wallet.generate({
      provider: testProvider,
    });
    receiver3 = Wallet.generate({
      provider: testProvider,
    });
    sender = Wallet.fromPrivateKey(
      '0x30bb0bc68f5d2ec3b523cee5a65503031b40679d9c72280cd8088c2cfbc34e38',
      testProvider
    );
  };

  if (process.env.DEVNET_WALLET_PVT_KEY !== undefined) {
    beforeAll(async () => {
      const { networkUrl } = DEVNET_CONFIG;
      provider = await Provider.create(networkUrl);

      setup(provider);
    });
  } else {
    beforeEach(async () => {
      const launched = await launchTestNode({
        contractsConfigs: [{ factory: CallTestContractFactory }],
      });

      cleanup = launched.cleanup;
      contract = launched.contracts[0];
      provider = contract.provider;

      setup(provider);
    });

    afterEach(() => {
      cleanup();
    });
  }

  bench(
    'should successfully get transaction cost estimate for a single contract call done 10 times',
    async () => {
      for (let i = 0; i < 10; i++) {
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
    }
  );

  bench('should successfully get transaction cost estimate for multi contract calls', async () => {
    for (let i = 0; i < 10; i++) {
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
    }
  });

  bench('should successfully get transaction cost estimate for a single transfer', async () => {
    for (let i = 0; i < 10; i++) {
      request.addCoinOutput(recipient.address, 10, provider.getBaseAssetId());

      const cost = await sender.getTransactionCost(request);

      expect(cost.minFee).toBeDefined();
      expect(cost.maxFee).toBeDefined();
      expect(cost.gasPrice).toBeDefined();
      expect(cost.gasUsed).toBeDefined();
      expect(cost.gasPrice).toBeDefined();
    }
  });

  bench('should successfully get transaction cost estimate for a batch transfer', async () => {
    for (let i = 0; i < 10; i++) {
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
    }
  });

  it('should successfully get transaction cost estimate for a mint 10 times', async () => {
    for (let i = 0; i < 10; i++) {
      const subId = '0x4a778acfad1abc155a009dc976d2cf0db6197d3d360194d74b1fb92b96986b00';

      const cost = await contract.functions.mint_coins(subId, 1_000).getTransactionCost();

      expect(cost.minFee).toBeDefined();
      expect(cost.maxFee).toBeDefined();
      expect(cost.gasPrice).toBeDefined();
      expect(cost.gasUsed).toBeDefined();
      expect(cost.gasPrice).toBeDefined();
    }
  });
});
