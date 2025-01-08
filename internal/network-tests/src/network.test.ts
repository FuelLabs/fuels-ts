import type { BaseWalletUnlocked, ContractTransferParams, ReceiptTransfer } from 'fuels';
import { Provider, ReceiptType, Wallet } from 'fuels';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, beforeAll, it, expect } from 'vitest';
import 'dotenv/config';

import {
  ContractWithStorage,
  ContractWithStorageFactory,
  PredicateWithConfigurable,
  ScriptTransfer,
} from './typegen';

describe('testnet-txs', () => {
  let CONTRACT_ID_1: string;
  let CONTRACT_ID_2: string;

  let provider: Provider;
  let wallet: BaseWalletUnlocked;
  let baseAssetId: string;

  beforeAll(async () => {
    if (!process.env.PROVIDER_URL || !process.env.PRIVATE_KEY) {
      throw new Error('Please provide PROVIDER_URL and PRIVATE_KEY in the .env file');
    }

    provider = new Provider(process.env.PROVIDER_URL);
    wallet = Wallet.fromPrivateKey(process.env.PRIVATE_KEY, provider);
    baseAssetId = await provider.getBaseAssetId();
  });

  it('should deploy contracts just fine', async () => {
    const { waitForResult } = await ContractWithStorageFactory.deploy(wallet);
    const { contract: contract1, transactionResult: transactionResult1 } = await waitForResult();

    const { waitForResult: waitForResult2 } = await ContractWithStorageFactory.deploy(wallet);
    const { contract: contract2, transactionResult: transactionResult2 } = await waitForResult2();

    expect(transactionResult1.isStatusSuccess).toBeTruthy();
    expect(transactionResult2.isStatusSuccess).toBeTruthy();

    CONTRACT_ID_1 = contract1.id.toB256();
    CONTRACT_ID_2 = contract2.id.toB256();
  });

  it('should transfer to contracts just fine', async () => {
    const contractTransferParams: ContractTransferParams[] = [
      {
        contractId: CONTRACT_ID_1,
        amount: 1,
        assetId: baseAssetId,
      },
      {
        contractId: CONTRACT_ID_2,
        amount: 3,
        assetId: baseAssetId,
      },
      {
        contractId: CONTRACT_ID_1,
        amount: 2,
        assetId: baseAssetId,
      },
    ];

    const submit = await wallet.batchTransferToContracts(contractTransferParams);
    const { receipts } = await submit.waitForResult();

    const transferReceipts = receipts.filter(
      ({ type }) => type === ReceiptType.Transfer
    ) as ReceiptTransfer[];

    expect(transferReceipts.length).toBe(contractTransferParams.length);

    contractTransferParams.forEach(({ amount, contractId, assetId = baseAssetId }) => {
      const foundReceipt = transferReceipts.find(
        (r) => r.amount.eq(amount) && r.to === contractId && r.assetId === assetId
      );

      expect(foundReceipt).toBeDefined();
    });
  });

  it('should execute contract call just fine', async () => {
    const contract = new ContractWithStorage(CONTRACT_ID_1, wallet);

    const call = await contract.functions.set_value(1).call();
    const { transactionResult } = await call.waitForResult();

    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });

  it('should execute contract multi-call just fine', async () => {
    const contract1 = new ContractWithStorage(CONTRACT_ID_1, wallet);
    const contract2 = new ContractWithStorage(CONTRACT_ID_2, wallet);

    const call = await contract1
      .multiCall([
        contract1.functions.set_value(1),
        contract1.functions.read_value(),
        contract2.functions.read_value(),
      ])
      .call();

    const { transactionResult } = await call.waitForResult();

    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });

  it('should deploy contract as blob and execute it just fine', async () => {
    const factory = new ContractWithStorageFactory(wallet);
    const { waitForResult } = await factory.deployAsBlobTx();
    const { contract } = await waitForResult();

    const call = await contract.functions.set_value(1).call();
    const { transactionResult } = await call.waitForResult();

    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });

  it('should deploy script as blob and execute it just fine', async () => {
    const script = new ScriptTransfer(wallet);
    const { waitForResult } = await script.deploy(wallet);
    const scriptAsBlob = await waitForResult();

    const call = await scriptAsBlob.functions
      .main({ Address: { bits: wallet.address.toB256() } }, { bits: baseAssetId }, 100)
      .call();

    const { transactionResult } = await call.waitForResult();
    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });

  it('should deploy predicate as blob and use it just fine', async () => {
    const predicate = new PredicateWithConfigurable({
      provider,
      configurableConstants: { INPUT: 10, ADDRESS: wallet.address.toB256() },
      data: [10, wallet.address.toB256()],
    });
    const { waitForResult } = await predicate.deploy(wallet);
    const predicateAsBlob = await waitForResult();

    const transfer = await wallet.transfer(predicateAsBlob.address, 800, baseAssetId);
    await transfer.waitForResult();

    const transfer2 = await predicateAsBlob.transfer(wallet.address, 100, baseAssetId);
    const { isStatusSuccess } = await transfer2.waitForResult();

    expect(isStatusSuccess).toBeTruthy();
  });
});
