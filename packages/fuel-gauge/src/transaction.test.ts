import { TransactionType } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('Transaction', () => {
  it('should ensure a mint transaction can be decoded just fine', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;

    const {
      transactions: [tx],
    } = await provider.getTransactions({ first: 1 });

    expect(tx.type).toBe(TransactionType.Mint);
  });
});
