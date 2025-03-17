/* eslint-disable no-param-reassign */

import type {
  BaseWalletUnlocked,
  Block,
  ChangeTransactionRequestOutput,
  CoinTransactionRequestOutput,
  ContractTransferParams,
  ReceiptMessageOut,
  ReceiptTransfer,
} from 'fuels';
import {
  bn,
  getAssetAmountInRequestInputs,
  OutputType,
  Provider,
  ReceiptType,
  ScriptTransactionRequest,
  sleep,
  Wallet,
} from 'fuels';

import {
  CoverageContract,
  CoverageContractFactory,
  PredicateWithConfigurable,
  ScriptMainArgs,
  StorageTestContract,
  StorageTestContractFactory,
} from '../test/typegen';

/**
 * @group network
 */
describe('network', () => {
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

  it('should withdraw to base layer just fine', { timeout }, async () => {
    const recipient = Wallet.generate({ provider });

    const submit = await wallet.withdrawToBaseLayer(recipient.address, 1);
    const { id, receipts, blockId } = await submit.waitForResult();

    const txBlock = (await provider.getBlock(blockId as string)) as Block;

    expect(txBlock.height).toBeDefined();

    let waitForCommit = true;
    let commitBlock: Block | undefined;

    /**
     * Waiting for the commit block, which means we need to wait at least one block
     * after the block in which the withdrawal transaction was included.
     */
    while (waitForCommit) {
      commitBlock = (await provider.getBlock('latest' as string)) as Block;

      if (commitBlock.height.lte(txBlock.height)) {
        await sleep(1000);
      } else {
        waitForCommit = false;
      }
    }

    const messageOutReceipt = receipts.find(
      ({ type }) => type === ReceiptType.MessageOut
    ) as ReceiptMessageOut;

    const messageProof = await provider.getMessageProof(
      id,
      messageOutReceipt.nonce,
      commitBlock?.id
    );

    expect(messageProof.nonce).toEqual(messageOutReceipt.nonce);
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

    const {
      consensusParameters: {
        txParameters: { maxInputs },
      },
    } = await provider.getChain();
    const amountToTransfer = bn(1);
    const request = new ScriptTransactionRequest();

    // Using the maximum number of allowed inputs to have the highest possible fee
    const fakeAmounts = Array.from({ length: maxInputs.toNumber() }, () => ({
      amount: bn(1),
      assetId: baseAssetId,
    }));

    const fakeResources = predicateAsBlob.generateFakeResources(fakeAmounts);
    request.addResources(fakeResources);
    request.addCoinOutput(wallet.address, amountToTransfer, baseAssetId);

    // Estimating the request cost using the maximum number of allowed inputs
    const cost = await predicateAsBlob.getTransactionCost(request);

    const required = amountToTransfer.add(cost.maxFee);

    // Funding the predicate with the highest possible amount to be required
    const transfer = await wallet.transfer(predicateAsBlob.address, required, baseAssetId);
    await transfer.waitForResult();

    // Removing fake resources
    request.inputs = [];

    // Fetching real resources
    const realResources = await predicateAsBlob.getResourcesToSpend([
      { amount: required, assetId: baseAssetId },
    ]);

    request.gasLimit = cost.gasUsed;
    request.addResources(realResources);
    request.updatePredicateGasUsed(cost.estimatedPredicates);

    // Re-estimate fee with the real resources
    const { maxFee: newFee } = await provider.estimateTxGasAndFee({
      transactionRequest: request,
      gasPrice: cost.gasPrice,
    });

    // Using new fee
    request.maxFee = newFee;

    const totalFunded = getAssetAmountInRequestInputs(request.inputs, baseAssetId, baseAssetId);
    const exceeded = totalFunded.sub(newFee.add(amountToTransfer));

    // Ensuring all exceeding amount goes back to the used wallet
    request.outputs.forEach((output) => {
      if (output.type === OutputType.Coin) {
        (output as CoinTransactionRequestOutput).amount = exceeded;
      } else if (output.type === OutputType.Change) {
        (output as ChangeTransactionRequestOutput).to = wallet.address.toB256();
      }
    });

    const transfer2 = await predicateAsBlob.sendTransaction(request);
    const { isStatusSuccess } = await transfer2.waitForResult();

    expect(isStatusSuccess).toBeTruthy();
  });
});
