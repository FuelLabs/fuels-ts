import {
  FuelError,
  hexlify,
  InputMessageCoder,
  ScriptTransactionRequest,
  sleep,
  TransactionType,
} from 'fuels';
import { expectToThrowFuelError, launchTestNode, TestMessage } from 'fuels/test-utils';

import { CallTestContractFactory } from '../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Transaction', () => {
  it('should ensure a mint transaction can be decoded just fine', async () => {
    using launched = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1ms'],
        loggingEnabled: false,
      },
    });
    const { provider } = launched;

    const {
      transactions: [tx],
    } = await provider.getTransactions({ first: 1 });

    expect(tx.type).toBe(TransactionType.Mint);
  });

  it('should spent message with data just fine (W/ AMOUNT)', async () => {
    const messageAmount = 100_000;
    const initialBalance = 50_000;

    const testMessage = new TestMessage({
      data: hexlify(InputMessageCoder.encodeData('0x09')),
      amount: messageAmount,
    });

    using launched = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1ms'],
      },
      contractsConfigs: [
        {
          factory: CallTestContractFactory,
        },
      ],
      walletsConfig: {
        count: 1,
        amountPerCoin: initialBalance,
        messages: [testMessage],
      },
    });

    const {
      provider,
      contracts: [contract],
      wallets: [fundedWallet],
    } = launched;

    const baseAssetId = provider.getBaseAssetId();

    const {
      messages: [message],
    } = await fundedWallet.getMessages();

    const request = await contract.functions.foo(10).getTransactionRequest();
    request.addMessageInput(message);

    const cost = await fundedWallet.getTransactionCost(request);

    request.gasLimit = cost.gasUsed;
    request.maxFee = cost.maxFee;

    await fundedWallet.fund(request, cost);

    const tx = await fundedWallet.sendTransaction(request);

    const { isStatusSuccess } = await tx.waitForResult();

    // Wait for message status to update
    await sleep(1000);

    const finalBalance = await fundedWallet.getBalance(baseAssetId);
    const status = await provider.getMessageStatus(message.nonce.toString());

    expect(finalBalance.toNumber()).toBeGreaterThan(messageAmount);
    expect(status.state).toBe('SPENT');
    expect(isStatusSuccess).toBeTruthy();
  });

  it('should spent message with data just fine (W/O AMOUNT)', async () => {
    const messageAmount = 0;

    const testMessage = new TestMessage({
      data: hexlify(InputMessageCoder.encodeData('0x09')),
      amount: messageAmount,
    });

    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CallTestContractFactory,
        },
      ],
      walletsConfig: {
        count: 1,
        amountPerCoin: 200_000,
        messages: [testMessage],
      },
    });

    const {
      provider,
      contracts: [contract],
      wallets: [fundedWallet],
    } = launched;

    const {
      messages: [message],
    } = await fundedWallet.getMessages();

    const request = await contract.functions.foo(10).getTransactionRequest();
    request.addMessageInput(message);

    const cost = await fundedWallet.getTransactionCost(request);

    request.gasLimit = cost.gasUsed;
    request.maxFee = cost.maxFee;

    await fundedWallet.fund(request, cost);

    const tx = await fundedWallet.sendTransaction(request);

    const { isStatusSuccess } = await tx.waitForResult();

    // Wait for message status to update
    await sleep(1000);

    const status = await provider.getMessageStatus(message.nonce.toString());

    expect(isStatusSuccess).toBeTruthy();
    expect(status.state).toBe('SPENT');
  });

  it('should allow an asset burn when enabled', async () => {
    const {
      provider,
      wallets: [sender],
    } = await launchTestNode();

    const request = new ScriptTransactionRequest();

    // Set the asset burn flag
    request.enableBurn(true);

    // Add a coin input, without any output change
    const baseAssetId = provider.getBaseAssetId();
    const { coins } = await sender.getCoins(baseAssetId);
    const [coin] = coins;
    request.addCoinInput(coin);

    const cost = await sender.getTransactionCost(request);
    request.gasLimit = cost.gasUsed;
    request.maxFee = cost.maxFee;
    await sender.fund(request, cost);

    const { waitForResult } = await sender.sendTransaction(request);
    const { isStatusSuccess } = await waitForResult();
    expect(isStatusSuccess).toEqual(true);
  });

  it('should throw an error when an asset burn is detected', async () => {
    const {
      provider,
      wallets: [sender],
    } = await launchTestNode();

    const request = new ScriptTransactionRequest();

    // Add a coin input, without any output change
    const baseAssetId = provider.getBaseAssetId();
    const { coins } = await sender.getCoins(baseAssetId);
    const [coin] = coins;
    request.addCoinInput(coin);

    const cost = await sender.getTransactionCost(request);
    request.gasLimit = cost.gasUsed;
    request.maxFee = cost.maxFee;
    await sender.fund(request, cost);

    await expectToThrowFuelError(
      () => sender.sendTransaction(request),
      new FuelError(
        FuelError.CODES.ASSET_BURN_DETECTED,
        'Asset burn detected.\nAdd relevant coin change outputs to the transaction, or enable asset burn in the transaction request (`request.enableBurn()`).'
      )
    );
  });
});
