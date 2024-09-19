import { DEVNET_NETWORK_URL } from '@internal/utils';
import type { TransferParams, TransactionCost } from 'fuels';
import { Wallet, Provider, ScriptTransactionRequest, WalletUnlocked } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import type { CallTestContract } from '../test/typegen/contracts';
import { CallTestContractFactory } from '../test/typegen/contracts';

import { isDevnet, runBenchmark } from './config';

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

  const setupTestEnvironment = async () => {
    if (isDevnet) {
      provider = await Provider.create(DEVNET_NETWORK_URL);
      const wallet = new WalletUnlocked(process.env.DEVNET_WALLET_PVT_KEY as string, provider);

      const contractFactory = new CallTestContractFactory(wallet);
      const { waitForResult } = await contractFactory.deploy<CallTestContract>();
      const { contract: deployedContract } = await waitForResult();
      contract = deployedContract;
    } else {
      const launched = await launchTestNode({
        contractsConfigs: [{ factory: CallTestContractFactory }],
      });

      cleanup = launched.cleanup;
      contract = launched.contracts[0];
      provider = contract.provider;
    }

    request = new ScriptTransactionRequest({ gasLimit: 1000000 });
    recipient = Wallet.generate({ provider });
    receiver1 = Wallet.generate({ provider });
    receiver2 = Wallet.generate({ provider });
    receiver3 = Wallet.generate({ provider });
    sender = Wallet.fromPrivateKey(
      '0x30bb0bc68f5d2ec3b523cee5a65503031b40679d9c72280cd8088c2cfbc34e38',
      provider
    );
  };

  beforeAll(setupTestEnvironment);

  afterAll(() => {
    if (!isDevnet && cleanup) {
      cleanup();
    }
  });

  const expectCostToBeDefined = (cost: TransactionCost) => {
    expect(cost.minFee).toBeDefined();
    expect(cost.maxFee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
  };

  runBenchmark(
    'should successfully get transaction cost estimate for a single contract call',
    async () => {
      const cost = await contract.functions
        .return_context_amount()
        .callParams({
          forward: [100, contract.provider.getBaseAssetId()],
        })
        .getTransactionCost();

      expectCostToBeDefined(cost);
    }
  );

  runBenchmark(
    'should successfully get transaction cost estimate for multi contract calls',
    async () => {
      const invocationScope = contract.multiCall([
        contract.functions.return_context_amount().callParams({
          forward: [100, provider.getBaseAssetId()],
        }),
        contract.functions.return_context_amount().callParams({
          forward: [200, provider.getBaseAssetId()],
        }),
      ]);

      const cost = await invocationScope.getTransactionCost();

      expectCostToBeDefined(cost);
    }
  );

  runBenchmark(
    'should successfully get transaction cost estimate for a single transfer',
    async () => {
      request.addCoinOutput(recipient.address, 10, provider.getBaseAssetId());

      const cost = await sender.getTransactionCost(request);

      expectCostToBeDefined(cost);
    }
  );

  runBenchmark(
    'should successfully get transaction cost estimate for a batch transfer',
    async () => {
      const amountToTransfer1 = 989;
      const amountToTransfer2 = 699;
      const amountToTransfer3 = 122;
      const transferParams: TransferParams[] = [
        {
          destination: receiver1.address,
          amount: amountToTransfer1,
          assetId: provider.getBaseAssetId(),
        },
        {
          destination: receiver2.address,
          amount: amountToTransfer2,
          assetId: provider.getBaseAssetId(),
        },
        {
          destination: receiver3.address,
          amount: amountToTransfer3,
          assetId: provider.getBaseAssetId(),
        },
      ];

      const cost = await contract.functions
        .sum(40, 50)
        .addBatchTransfer(transferParams)
        .getTransactionCost();

      expectCostToBeDefined(cost);
    }
  );

  runBenchmark('should successfully get transaction cost estimate for a mint', async () => {
    const subId = '0x4a778acfad1abc155a009dc976d2cf0db6197d3d360194d74b1fb92b96986b00';
    const amountToMint = 1_000;

    const cost = await contract.functions.mint_coins(subId, amountToMint).getTransactionCost();

    expectCostToBeDefined(cost);
  });
});
