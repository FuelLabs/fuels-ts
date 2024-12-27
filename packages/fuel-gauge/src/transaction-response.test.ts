import { ErrorCode } from '@fuel-ts/errors';
import { TransactionResponse, Wallet, ScriptTransactionRequest } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';
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
  function getFetchMock(fetchSpy: MockInstance) {
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
 * @group browser
 */
describe('TransactionResponse', () => {
  it('should ensure create method waits till a transaction response is given', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [adminWallet],
    } = launched;

    const destination = Wallet.generate({
      provider,
    });

    const { id: transactionId } = await adminWallet.transfer(
      destination.address,
      100,
      await provider.getBaseAssetId(),
      { gasLimit: 10_000 }
    );

    const response = await TransactionResponse.create(transactionId, provider);

    const { id } = await response.assembleResult();

    expect(id).toEqual(transactionId);
  });

  it('should ensure getTransactionSummary fetches a transaction and assembles transaction summary', async () => {
    using launched = await launchTestNode({
      nodeOptions: {
        args: [
          '--poa-instant',
          'false',
          '--poa-interval-period',
          '1s',
          '--tx-ttl-check-interval',
          '1s',
        ],
      },
    });

    const {
      provider,
      wallets: [adminWallet],
    } = launched;

    const destination = Wallet.generate({
      provider,
    });

    const { id: transactionId } = await adminWallet.transfer(
      destination.address,
      100,
      await provider.getBaseAssetId()
    );

    const response = await TransactionResponse.create(transactionId, provider);

    const transactionSummary = await response.waitForResult();

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
    expect(transactionSummary.isTypeBlob).toBeDefined();
    expect(transactionSummary.isTypeCreate).toBeDefined();
    expect(transactionSummary.isTypeScript).toBeDefined();
    expect(transactionSummary.isStatusFailure).toBeDefined();
    expect(transactionSummary.isStatusSuccess).toBeDefined();
    expect(transactionSummary.isStatusPending).toBeDefined();
    expect(transactionSummary.transaction).toBeDefined();
  });

  it.skip(
    'should ensure waitForResult always waits for the transaction to be processed',
    { timeout: 18_500 },
    async () => {
      using launched = await launchTestNode({
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
        nodeOptions: {
          args: [
            '--poa-instant',
            'false',
            '--poa-interval-period',
            '17sec',
            '--tx-ttl-check-interval',
            '1s',
          ],
        },
      });

      const {
        provider,
        wallets: [genesisWallet, destination],
      } = launched;

      const { id: transactionId } = await genesisWallet.transfer(
        destination.address,
        100,
        await provider.getBaseAssetId(),
        { gasLimit: 10_000 }
      );
      const response = await TransactionResponse.create(transactionId, provider);

      const subscriptionStreamHolder = {
        stream: new ReadableStream<Uint8Array>(),
      };

      getSubscriptionStreamFromFetch(subscriptionStreamHolder);

      await response.waitForResult();

      await verifyKeepAliveMessageWasSent(subscriptionStreamHolder.stream);
    }
  );

  it(
    'should throw error for a SqueezedOut status update [waitForResult]',
    { timeout: 10_000, retry: 10 },
    async () => {
      /**
       * a larger --tx-pool-ttl 1s is necessary to ensure that the transaction doesn't get squeezed out
       * before the waitForResult (provider.operations.statusChange) call is made
       *  */
      using launched = await launchTestNode({
        walletsConfig: {
          amountPerCoin: 500_000,
        },
        nodeOptions: {
          args: [
            '--poa-instant',
            'false',
            '--poa-interval-period',
            '2s',
            '--tx-pool-ttl',
            '1s',
            '--tx-ttl-check-interval',
            '1s',
          ],
          loggingEnabled: false,
        },
      });

      const {
        provider,
        wallets: [genesisWallet],
      } = launched;

      const request = new ScriptTransactionRequest();

      request.addCoinOutput(Wallet.generate(), 100, await provider.getBaseAssetId());

      const txCost = await genesisWallet.getTransactionCost(request);

      request.gasLimit = txCost.gasUsed;
      request.maxFee = txCost.maxFee;

      await genesisWallet.fund(request, txCost);

      request.updateWitnessByOwner(
        genesisWallet.address,
        await genesisWallet.signTransaction(request)
      );

      const response = await provider.sendTransaction(request);

      await expectToThrowFuelError(
        async () => {
          await response.waitForResult();
        },
        { code: ErrorCode.TRANSACTION_SQUEEZED_OUT }
      );
    }
  );

  it(
    'should throw error for a SqueezedOut status update [submitAndAwait]',
    { retry: 10 },
    async () => {
      using launched = await launchTestNode({
        nodeOptions: {
          args: [
            '--poa-instant',
            'false',
            '--poa-interval-period',
            '4s',
            '--tx-pool-ttl',
            '1s',
            '--tx-ttl-check-interval',
            '1s',
          ],
          loggingEnabled: false,
        },
      });

      const {
        provider,
        wallets: [genesisWallet],
      } = launched;

      const request = new ScriptTransactionRequest();

      request.addCoinOutput(Wallet.generate(), 100, await provider.getBaseAssetId());

      const txCost = await genesisWallet.getTransactionCost(request, {
        signatureCallback: (tx) => tx.addAccountWitnesses(genesisWallet),
      });

      request.gasLimit = txCost.gasUsed;
      request.maxFee = txCost.maxFee;

      await genesisWallet.fund(request, txCost);

      request.updateWitnessByOwner(
        genesisWallet.address,
        await genesisWallet.signTransaction(request)
      );

      await expectToThrowFuelError(
        async () => {
          const submit = await provider.sendTransaction(request);
          await submit.waitForResult();
        },
        { code: ErrorCode.TRANSACTION_SQUEEZED_OUT }
      );
    }
  );
});
