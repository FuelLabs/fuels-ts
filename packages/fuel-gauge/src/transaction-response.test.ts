import type {} from '@fuel-ts/account/dist/providers/__generated__/operations';
import { generateTestWallet, launchNode } from '@fuel-ts/account/test-utils';
import { ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { BN } from 'fuels';
import {
  BaseAssetId,
  FUEL_NETWORK_URL,
  Provider,
  TransactionResponse,
  Wallet,
  randomBytes,
  WalletUnlocked,
  ScriptTransactionRequest,
} from 'fuels';
import type { MockInstance } from 'vitest';

async function verifyKeepAliveMessageWasSent(subscriptionStream: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder();
  const reader = subscriptionStream.getReader();
  let hasKeepAliveMessage = false;
  do {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    const text = decoder.decode(value);
    if (text === ':keep-alive-text\n\n') {
      hasKeepAliveMessage = true;
    }
  } while (!hasKeepAliveMessage);

  // The keep-alive message is sent every 15 seconds,
  // and this assertion verifies that it was indeed sent.
  // if this fails, check if the duration was changed on the fuel-core side.
  // As of the time of writing, the latest permalink where this info can be found is:
  // https://github.com/FuelLabs/fuel-core/blob/bf1b22f47c58a9d078676c5756c942d839f38916/crates/fuel-core/src/graphql_api/service.rs#L247
  // To get the actual latest info you need to check out the master branch:
  // https://github.com/FuelLabs/fuel-core/blob/master/crates/fuel-core/src/graphql_api/service.rs#L247
  // This link can fail because master can change.
  expect(hasKeepAliveMessage).toBe(true);
}

function getSubscriptionStreamFromFetch(streamHolder: { stream: ReadableStream<Uint8Array> }) {
  function getFetchMock(
    fetchSpy: MockInstance<
      [input: RequestInfo | URL, init?: RequestInit | undefined],
      Promise<Response>
    >
  ) {
    return async (...args: Parameters<typeof fetch>) => {
      /**
       * We need to restore the original fetch implementation so that fetching is possible
       * We then get the response and mock the fetch implementation again
       * So that the mock can be used for the next fetch call
       */
      fetchSpy.mockRestore();
      const r = await fetch(...args);
      fetchSpy.mockImplementation(getFetchMock(fetchSpy));

      const isSubscriptionCall = args[0].toString().endsWith('graphql-sub');
      if (!isSubscriptionCall) {
        return r;
      }

      /**
       * This duplicates a stream and all writes happen to both streams.
       * We can thus use one stream to verify the keep-alive message was sent
       * and pass the other forward in place of the original stream,
       * thereby not affecting the response at all.
       * */
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const [stream1, stream2] = r.body!.tee();
      // eslint-disable-next-line no-param-reassign
      streamHolder.stream = stream1;
      return new Response(stream2);
    };
  }

  const fetchSpy = vi.spyOn(global, 'fetch');

  fetchSpy.mockImplementation(getFetchMock(fetchSpy));
  return streamHolder;
}

/**
 * @group node
 */
describe('TransactionResponse', () => {
  let provider: Provider;
  let adminWallet: WalletUnlocked;
  let gasPrice: BN;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    adminWallet = await generateTestWallet(provider, [[500_000]]);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
  });

  it('should ensure create method waits till a transaction response is given', async () => {
    const destination = Wallet.generate({
      provider,
    });

    const { id: transactionId } = await adminWallet.transfer(
      destination.address,
      100,
      BaseAssetId,
      { gasPrice, gasLimit: 10_000 }
    );

    const response = await TransactionResponse.create(transactionId, provider);

    expect(response.gqlTransaction).toBeDefined();
    expect(response.gqlTransaction?.status).toBeDefined();
    expect(response.gqlTransaction?.id).toBe(transactionId);
  });

  it('should ensure getTransactionSummary fetchs a transaction and assembles transaction summary', async () => {
    const destination = Wallet.generate({
      provider,
    });

    const { id: transactionId } = await adminWallet.transfer(
      destination.address,
      100,
      BaseAssetId,
      { gasPrice, gasLimit: 10_000 }
    );

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
      /**
       * This is set to so long in order to test keep-alive message handling as well.
       * Keep-alive messages are sent every 15s.
       * It is very important to test this because the keep-alive messages are not sent in the same format as the other messages
       * and it is reasonable to expect subscriptions lasting more than 15 seconds.
       * We need a proper integration test for this
       * because if the keep-alive message changed in any way between fuel-core versions and we missed it,
       * all our subscriptions would break.
       * We need at least one long test to ensure that the keep-alive messages are handled correctly.
       * */
      args: ['--poa-instant', 'false', '--poa-interval-period', '17sec'],
    });
    const nodeProvider = await Provider.create(`http://${ip}:${port}/graphql`);

    const genesisWallet = new WalletUnlocked(
      process.env.GENESIS_SECRET || randomBytes(32),
      nodeProvider
    );

    const destination = Wallet.generate({ provider: nodeProvider });

    const { id: transactionId } = await genesisWallet.transfer(
      destination.address,
      100,
      BaseAssetId,
      { gasPrice, gasLimit: 10_000 }
    );
    const response = await TransactionResponse.create(transactionId, nodeProvider);

    expect(response.gqlTransaction?.status?.type).toBe('SubmittedStatus');

    const subscriptionStreamHolder = {
      stream: new ReadableStream<Uint8Array>(),
    };

    getSubscriptionStreamFromFetch(subscriptionStreamHolder);

    await response.waitForResult();

    expect(response.gqlTransaction?.status?.type).toEqual('SuccessStatus');
    expect(response.gqlTransaction?.id).toBe(transactionId);

    await verifyKeepAliveMessageWasSent(subscriptionStreamHolder.stream);

    cleanup();
  }, 18500);

  it('should throw error for a SqueezedOut status update [waitForResult]', async () => {
    const { cleanup, ip, port } = await launchNode({
      /**
       * a larger --tx-pool-ttl 1s is necessary to ensure that the transaction doesn't get squeezed out
       * before the waitForResult (provider.operations.statusChange) call is made
       *  */
      args: ['--poa-instant', 'false', '--poa-interval-period', '2s', '--tx-pool-ttl', '1s'],
      loggingEnabled: false,
    });
    const nodeProvider = await Provider.create(`http://${ip}:${port}/graphql`);

    const genesisWallet = new WalletUnlocked(
      process.env.GENESIS_SECRET || randomBytes(32),
      nodeProvider
    );

    const request = new ScriptTransactionRequest();

    const resources = await genesisWallet.getResourcesToSpend([[100_000]]);

    request.addResources(resources);
    request.updateWitnessByOwner(
      genesisWallet.address,
      await genesisWallet.signTransaction(request)
    );

    const response = await nodeProvider.sendTransaction(request);

    await expectToThrowFuelError(
      async () => {
        await response.waitForResult();
      },
      { code: ErrorCode.TRANSACTION_SQUEEZED_OUT }
    );

    cleanup();
  });

  it('should throw error for a SqueezedOut status update [submitAndAwait]', async () => {
    const { cleanup, ip, port } = await launchNode({
      args: ['--poa-instant', 'false', '--poa-interval-period', '1s', '--tx-pool-ttl', '200ms'],
      loggingEnabled: false,
    });
    const nodeProvider = await Provider.create(`http://${ip}:${port}/graphql`);

    const genesisWallet = new WalletUnlocked(
      process.env.GENESIS_SECRET || randomBytes(32),
      nodeProvider
    );

    const request = new ScriptTransactionRequest();

    const resources = await genesisWallet.getResourcesToSpend([[100_000]]);

    request.addResources(resources);
    request.updateWitnessByOwner(
      genesisWallet.address,
      await genesisWallet.signTransaction(request)
    );

    await expectToThrowFuelError(
      async () => {
        await nodeProvider.sendTransaction(request, { awaitExecution: true });
      },
      { code: ErrorCode.TRANSACTION_SQUEEZED_OUT }
    );
    cleanup();
  });
});
