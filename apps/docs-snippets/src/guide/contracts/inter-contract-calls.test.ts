import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { BN } from 'fuels';

import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  it('should successfully make call to another contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('simple-token'), getProgramDir('token-depositor')],
    });
    const {
      contracts: [simpleToken, tokenDepositor],
      wallets: [wallet],
      provider,
    } = launched;

    // #region inter-contract-calls-3
    const amountToDeposit = 70;
    const { minGasPrice, maxGasPerTx } = provider.getGasConfig();
    const { value: initialBalance } = await simpleToken.functions
      .get_balance(wallet.address.toB256())
      .txParams({ gasPrice: minGasPrice, gasLimit: maxGasPerTx })
      .call();

    expect(new BN(initialBalance).toNumber()).toBe(0);

    await tokenDepositor.functions
      .deposit_to_simple_token(simpleToken.id.toB256(), amountToDeposit)
      .addContracts([simpleToken])
      .txParams({ gasPrice: minGasPrice, gasLimit: maxGasPerTx })
      .call();

    const { value: finalBalance } = await simpleToken.functions
      .get_balance(wallet.address.toB256())
      .txParams({ gasPrice: minGasPrice, gasLimit: maxGasPerTx })
      .call();

    expect(new BN(finalBalance).toNumber()).toBe(amountToDeposit);
    // #endregion inter-contract-calls-3
  });
});
