import type { CoinTransactionRequestInput, MessageTransactionRequestInput } from 'fuels';
import {
  FuelError,
  hexlify,
  InputMessageCoder,
  InputType,
  isMessage,
  ScriptTransactionRequest,
  sleep,
  TransactionType,
} from 'fuels';
import { ASSET_A, expectToThrowFuelError, launchTestNode, TestMessage } from 'fuels/test-utils';

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

    const baseAssetId = await provider.getBaseAssetId();

    const {
      messages: [message],
    } = await fundedWallet.getMessages();

    const request = await contract.functions.foo(10).getTransactionRequest();
    request.addMessageInput(message);

    await request.estimateAndFund(fundedWallet);

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

    await request.estimateAndFund(fundedWallet);

    const tx = await fundedWallet.sendTransaction(request);

    const { isStatusSuccess } = await tx.waitForResult();

    // Wait for message status to update
    await sleep(1000);

    const status = await provider.getMessageStatus(message.nonce.toString());

    expect(isStatusSuccess).toBeTruthy();
    expect(status.state).toBe('SPENT');
  });

  it('should allow an asset burn when enabled (Coin)', async () => {
    const {
      wallets: [sender],
    } = await launchTestNode();

    const request = new ScriptTransactionRequest();

    // Add a coin input, which adds the relevant coin change output
    const { coins } = await sender.getCoins(ASSET_A);
    const [coin] = coins;
    const { id, owner, amount, assetId, predicate, predicateData } = coin;
    const coinInput: CoinTransactionRequestInput = {
      id,
      type: InputType.Coin,
      owner: owner.toB256(),
      amount,
      assetId,
      txPointer: '0x00000000000000000000000000000000',
      witnessIndex: request.getCoinInputWitnessIndexByOwner(owner) ?? request.addEmptyWitness(),
      predicate,
      predicateData,
    };
    request.inputs.push(coinInput);

    await request.estimateAndFund(sender);

    const tx = await sender.sendTransaction(request, {
      enableAssetBurn: true,
    });
    const { isStatusSuccess } = await tx.waitForResult();
    expect(isStatusSuccess).toEqual(true);
    expect(request.outputs).to.not.contain(
      expect.objectContaining({
        assetId: coinInput.assetId,
      })
    );
  });

  it('should throw an error when an asset burn is detected (Coin)', async () => {
    const {
      wallets: [sender],
    } = await launchTestNode();

    const request = new ScriptTransactionRequest();

    // Add a coin input, without any output change
    const { coins } = await sender.getCoins(ASSET_A);
    const [coin] = coins;
    const { id, owner, amount, assetId, predicate, predicateData } = coin;
    const coinInput: CoinTransactionRequestInput = {
      id,
      type: InputType.Coin,
      owner: owner.toB256(),
      amount,
      assetId,
      txPointer: '0x00000000000000000000000000000000',
      witnessIndex: request.getCoinInputWitnessIndexByOwner(owner) ?? request.addEmptyWitness(),
      predicate,
      predicateData,
    };
    request.inputs.push(coinInput);

    const expectedErrorMessage = [
      'Asset burn detected.',
      'Add the relevant change outputs to the transaction to avoid burning assets.',
      'Or enable asset burn, upon sending the transaction.',
    ].join('\n');
    await expectToThrowFuelError(
      () => sender.sendTransaction(request),
      new FuelError(FuelError.CODES.ASSET_BURN_DETECTED, expectedErrorMessage)
    );
    expect(request.outputs).to.not.contain(
      expect.objectContaining({
        assetId: coinInput.assetId,
      })
    );
  });

  it('should allow an asset burn when enabled (MessageCoin)', async () => {
    const testMessage = new TestMessage({
      amount: 100_000,
    });

    const {
      provider,
      wallets: [owner],
    } = await launchTestNode({
      walletsConfig: {
        amountPerCoin: 0,
        messages: [testMessage],
      },
    });

    const request = new ScriptTransactionRequest();

    const resources = await owner.getResourcesToSpend([
      { assetId: await provider.getBaseAssetId(), amount: 100 },
    ]);
    const [message] = resources.filter((r) => isMessage(r));

    // Add a message coin input, which adds the relevant coin change output
    const { sender, recipient, amount, nonce } = message;
    const coinInput: MessageTransactionRequestInput = {
      type: InputType.Message,
      sender: sender.toB256(),
      recipient: recipient.toB256(),
      amount,
      nonce,
      witnessIndex: request.getCoinInputWitnessIndexByOwner(owner) ?? request.addEmptyWitness(),
    };
    request.inputs.push(coinInput);

    await request.estimateAndFund(owner);

    const tx = await owner.sendTransaction(request, {
      enableAssetBurn: true,
    });
    const { isStatusSuccess } = await tx.waitForResult();
    expect(isStatusSuccess).toEqual(true);
    expect(request.outputs).to.not.contain(
      expect.objectContaining({
        assetId: await provider.getBaseAssetId(),
      })
    );
  });

  it('should throw an error when an asset burn is detected (MessageCoin)', async () => {
    const testMessage = new TestMessage({
      amount: 100_000,
    });

    const {
      provider,
      wallets: [owner],
    } = await launchTestNode({
      walletsConfig: {
        amountPerCoin: 0,
        messages: [testMessage],
      },
    });

    const request = new ScriptTransactionRequest();

    const resources = await owner.getResourcesToSpend([
      { assetId: await provider.getBaseAssetId(), amount: 100 },
    ]);
    const [message] = resources.filter((r) => isMessage(r));

    // Add a message coin input, without any output change
    const { sender, recipient, amount, nonce } = message;
    const coinInput: MessageTransactionRequestInput = {
      type: InputType.Message,
      sender: sender.toB256(),
      recipient: recipient.toB256(),
      amount,
      nonce,
      witnessIndex: request.getCoinInputWitnessIndexByOwner(owner) ?? request.addEmptyWitness(),
    };
    request.inputs.push(coinInput);

    await request.estimateAndFund(owner);

    const expectedErrorMessage = [
      'Asset burn detected.',
      'Add the relevant change outputs to the transaction to avoid burning assets.',
      'Or enable asset burn, upon sending the transaction.',
    ].join('\n');
    await expectToThrowFuelError(
      () => owner.sendTransaction(request),
      new FuelError(FuelError.CODES.ASSET_BURN_DETECTED, expectedErrorMessage)
    );
    expect(request.outputs).to.not.contain(
      expect.objectContaining({
        assetId: await provider.getBaseAssetId(),
      })
    );
  });
});
