import { generateTestWallet, launchNode } from '@fuel-ts/wallet/test-utils';
import {
  Provider,
  WalletUnlocked,
  FUEL_NETWORK_URL,
  TransactionResponse,
  Wallet,
  randomBytes,
} from 'fuels';

describe('TransactionSummary', () => {
  let provider: Provider;
  let adminWallet: WalletUnlocked;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    adminWallet = await generateTestWallet(provider, [[1_000]]);
  });

  it('should ensure create method waits till a transaction response is given', async () => {
    const destination = Wallet.generate({
      provider,
    });

    const { id: transactionId } = await adminWallet.transfer(destination.address, 100);

    const response = await TransactionResponse.create(transactionId, provider);

    expect(response.gqlTransaction).toBeDefined();
    expect(response.gqlTransaction?.status).toBeDefined();
    expect(response.gqlTransaction?.id).toBe(transactionId);
  });

  it('should ensure getTransactionSummary fetchs a transaction and assembles transaction summary', async () => {
    const destination = Wallet.generate({
      provider,
    });

    const { id: transactionId } = await adminWallet.transfer(destination.address, 100);

    const response = new TransactionResponse(transactionId, provider);

    expect(response.gqlTransaction).toBeUndefined();

    const transactionSummary = await response.getTransactionSummary();

    expect(transactionSummary.id).toBeDefined();
    expect(transactionSummary.fee).toBeDefined();
    expect(transactionSummary.gasUsed).toBeDefined();
    expect(transactionSummary.operations).toBeDefined();
    expect(transactionSummary.type).toBeDefined();
    expect(transactionSummary.blockId).toBeDefined();
    expect(transactionSummary.time).toBeDefined();
    expect(transactionSummary.status).toBeDefined();
    expect(transactionSummary.receipts).toBeDefined();
    expect(transactionSummary.mintedAssets).toBeDefined();
    expect(transactionSummary.burnedAssets).toBeDefined();
    expect(transactionSummary.isTypeMint).toBeDefined();
    expect(transactionSummary.isTypeCreate).toBeDefined();
    expect(transactionSummary.isTypeScript).toBeDefined();
    expect(transactionSummary.isStatusFailure).toBeDefined();
    expect(transactionSummary.isStatusSuccess).toBeDefined();
    expect(transactionSummary.isStatusPending).toBeDefined();
    expect(transactionSummary.transaction).toBeDefined();

    expect(response.gqlTransaction).toBeDefined();
    expect(response.gqlTransaction?.status).toBeDefined();
    expect(response.gqlTransaction?.id).toBe(transactionId);
  });

  it('should ensure waitForResult always waits for the transaction to be processed', async () => {
    const { cleanup, ip, port } = await launchNode({
      args: ['--poa-interval-period', '10s'],
    });
    const nodeProvider = await Provider.create(`http://${ip}:${port}/graphql`);

    const genesisWallet = new WalletUnlocked(
      process.env.GENESIS_SECRET || randomBytes(32),
      nodeProvider
    );

    const destinationWallet = Wallet.generate({ provider: nodeProvider });

    const { id: transactionId } = await genesisWallet.transfer(destinationWallet.address, 100);

    const response = await TransactionResponse.create(transactionId, nodeProvider);

    expect(response.gqlTransaction?.status?.type).toBe('SubmittedStatus');

    await response.waitForResult();

    expect(response.gqlTransaction?.status?.type).toEqual('SuccessStatus');
    expect(response.gqlTransaction?.id).toBe(transactionId);

    cleanup();
  }, 25000);
});
