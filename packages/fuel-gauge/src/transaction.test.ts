import { hexlify, InputMessageCoder, sleep, TransactionType } from 'fuels';
import { launchTestNode, TestMessage } from 'fuels/test-utils';

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

    await request.autoCost(fundedWallet);

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

    await request.autoCost(fundedWallet);

    const tx = await fundedWallet.sendTransaction(request);

    const { isStatusSuccess } = await tx.waitForResult();

    // Wait for message status to update
    await sleep(1000);

    const status = await provider.getMessageStatus(message.nonce.toString());

    expect(isStatusSuccess).toBeTruthy();
    expect(status.state).toBe('SPENT');
  });
});
