import { BN } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { SimpleTokenFactory, TokenDepositorFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Inter-Contract Calls', () => {
  it('should successfully make call to another contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: SimpleTokenFactory,
        },
        {
          factory: TokenDepositorFactory,
        },
      ],
    });

    const {
      contracts: [simpleToken, tokenDepositor],
      wallets: [wallet],
    } = launched;

    // #region inter-contract-calls-3
    const amountToDeposit = 70;
    const call1 = await simpleToken.functions.get_balance(wallet.address.toB256()).call();

    const { value: initialBalance } = await call1.waitForResult();

    expect(new BN(initialBalance).toNumber()).toBe(0);

    const call2 = await tokenDepositor.functions
      .deposit_to_simple_token(simpleToken.id.toB256(), amountToDeposit)
      .addContracts([simpleToken])
      .call();

    await call2.waitForResult();

    const call3 = await simpleToken.functions.get_balance(wallet.address.toB256()).call();

    const { value: finalBalance } = await call3.waitForResult();

    expect(new BN(finalBalance).toNumber()).toBe(amountToDeposit);
    // #endregion inter-contract-calls-3
  });
});
