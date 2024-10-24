import type { TransactionResultMessageOutReceipt } from 'fuels';
import { Provider } from 'fuels';
import { TestMessage, launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('querying the chain', () => {
  it('get transactions', async () => {
    using launched = await launchTestNode();
    const {
      provider: testProvider,
      wallets: [wallet, receiver],
    } = launched;

    const tx = await wallet.transfer(receiver.address, 100);
    await tx.waitForResult();
    const FUEL_NETWORK_URL = testProvider.url;

    // #region get-transactions
    // #import { Provider };

    const provider = await Provider.create(FUEL_NETWORK_URL);

    const { transactions } = await provider.getTransactions();
    // #endregion get-transactions

    expect(transactions).toBeDefined();
    expect(transactions.length).toBe(2);
    // Includes base asset minting tx
  });
});
