import type { BaseWalletUnlocked, ContractTransferParams, ReceiptTransfer } from 'fuels';
import { Provider, ReceiptType, Wallet } from 'fuels';

import {
  CoverageContract,
  CoverageContractFactory,
  PredicateWithConfigurable,
  ScriptMainArgs,
  StorageTestContract,
  StorageTestContractFactory,
} from '../test/typegen';

/**
 * @group node
 * @group network
 */
describe('testnet-txs', () => {
  const timeout = 1000 * 50; // 50 seconds

  let contractId1: string;
  let contractId2: string;
  let provider: Provider;
  let wallet: BaseWalletUnlocked;
  let baseAssetId: string;

  beforeAll(async () => {
    if (!process.env.NETWORK_TEST_URL || !process.env.NETWORK_TEST_PVT_KEY) {
      throw new Error('Please provide NETWORK_TEST_URL and NETWORK_TEST_PVT_KEY in the .env file');
    }

    provider = new Provider(process.env.NETWORK_TEST_URL);
    wallet = Wallet.fromPrivateKey(process.env.NETWORK_TEST_PVT_KEY, provider);
    baseAssetId = await provider.getBaseAssetId();
  });

  it('should deploy contracts just fine', { timeout }, async () => {
    const { waitForResult } = await StorageTestContractFactory.deploy(wallet);
    const { contract: contract1, transactionResult: transactionResult1 } = await waitForResult();

    const { waitForResult: waitForResult2 } = await CoverageContractFactory.deploy(wallet);
    const { contract: contract2, transactionResult: transactionResult2 } = await waitForResult2();

    expect(transactionResult1.isStatusSuccess).toBeTruthy();
    expect(transactionResult2.isStatusSuccess).toBeTruthy();

    contractId1 = contract1.id.toB256();
    contractId2 = contract2.id.toB256();
  });

  it('should transfer to contracts just fine', { timeout }, async () => {
    const contractTransferParams: ContractTransferParams[] = [
      {
        contractId: contractId1,
        amount: 1,
        assetId: baseAssetId,
      },
      {
        contractId: contractId2,
        amount: 3,
        assetId: baseAssetId,
      },
      {
        contractId: contractId1,
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

  it('should execute contract call just fine', { timeout }, async () => {
    const contract = new StorageTestContract(contractId1, wallet);

    const call = await contract.functions.initialize_counter(1).call();
    const { transactionResult } = await call.waitForResult();

    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });

  it('should execute contract multi-call just fine', { timeout }, async () => {
    const contract1 = new StorageTestContract(contractId1, wallet);
    const contract2 = new CoverageContract(contractId2, wallet);

    const call = await contract1
      .multiCall([
        contract1.functions.increment_counter(2),
        contract1.functions.counter(),
        contract2.functions.echo_bool(true),
      ])
      .call();

    const { transactionResult } = await call.waitForResult();

    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });

  it('should deploy contract as blob and execute it just fine', { timeout }, async () => {
    const factory = new StorageTestContractFactory(wallet);
    const { waitForResult } = await factory.deployAsBlobTx();
    const { contract } = await waitForResult();

    const call = await contract.functions.initialize_counter(1).call();
    const { transactionResult } = await call.waitForResult();

    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });

  it('should deploy script as blob and execute it just fine', { timeout }, async () => {
    const script = new ScriptMainArgs(wallet);
    const { waitForResult } = await script.deploy(wallet);
    const scriptAsBlob = await waitForResult();

    const call = await scriptAsBlob.functions.main(100).call();

    const { transactionResult } = await call.waitForResult();
    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });

  it('should deploy predicate as blob and use it just fine', { timeout }, async () => {
    const predicate = new PredicateWithConfigurable({
      provider,
      configurableConstants: { FEE: 10, ADDRESS: wallet.address.toB256() },
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
