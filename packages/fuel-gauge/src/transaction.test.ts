import { sleep, Provider, TransactionType } from 'fuels';
import { launchNode } from 'fuels/test-utils';

/**
 * @group node
 */
describe('Transaction', () => {
  it('should ensure a mint transaction can be decoded just fine', async () => {
    const { cleanup, ip, port } = await launchNode({
      args: ['--poa-instant', 'false', '--poa-interval-period', '100ms'],
      loggingEnabled: false,
    });

    await sleep(500);
    const nodeProvider = await Provider.create(`http://${ip}:${port}/v1/graphql`);
    const {
      transactions: [tx],
    } = await nodeProvider.getTransactions({ first: 1 });

    expect(tx.type).toBe(TransactionType.Mint);

    cleanup();
  });
});
