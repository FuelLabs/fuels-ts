import type { BN, TxParams } from 'fuels';
import { ScriptTransactionRequest, bn } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';
import { expectTypeOf } from 'vitest';

import { CounterFactory, SumScript } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Transaction Parameters', () => {
  it('validates all parameters types', () => {
    // #region transaction-parameters-1
    // #import { BN, bn };

    const gasLimit: BN = bn(1000);
    // #endregion transaction-parameters-1

    // #region transaction-parameters-2
    // #import { BN, bn };

    const maxFee: BN = bn(10_000);
    // #endregion transaction-parameters-2

    // #region transaction-parameters-3
    // #import { BN, bn };

    const tip: BN = bn(100);
    // #endregion transaction-parameters-3

    // #region transaction-parameters-4
    const maturity = 10;
    // #endregion transaction-parameters-4

    // #region transaction-parameters-5
    // #import { BN, bn };

    const witnessLimit: BN = bn(5000);
    // #endregion transaction-parameters-5

    expectTypeOf(gasLimit).toMatchTypeOf<BN>();
    expectTypeOf(maxFee).toMatchTypeOf<BN>();
    expectTypeOf(tip).toMatchTypeOf<BN>();
    expectTypeOf(maturity).toMatchTypeOf<number>();
    expectTypeOf(witnessLimit).toMatchTypeOf<BN>();
  });

  it('matches tx param types', () => {
    // #region transaction-parameters-6
    // #import { TxParams, bn };

    const txParams: TxParams = {
      gasLimit: bn(1), // BigNumberish or undefined
      maxFee: bn(1), // BigNumberish or undefined
      maturity: 1, // number or undefined
      tip: bn(1), // BigNumberish or undefined
      witnessLimit: bn(1), // BigNumberish or undefined
      variableOutputs: 1, // number or undefined
    };
    // #endregion transaction-parameters-6

    expectTypeOf(txParams).toMatchTypeOf<TxParams>();
  });

  it('executes a script transaction request with txParams', () => {
    // #region transaction-parameters-7
    // #import { ScriptTransactionRequest };

    // Instantiate the transaction request using a ScriptTransactionRequest
    // We can set txParams in the request constructor
    const transactionRequest = new ScriptTransactionRequest({
      script: SumScript.bytecode,
      gasLimit: 100,
    });
    // #endregion transaction-parameters-7

    expect(transactionRequest.gasLimit.toNumber()).toBe(100);
  });

  it('executes contract call with txParams', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterFactory,
        },
      ],
    });
    const {
      contracts: [contract],
    } = launched;

    // #region transaction-parameters-8
    const { waitForResult } = await contract.functions
      .increment_counter(15)
      .txParams({
        variableOutputs: 1,
      })
      .call();

    const { transactionResult } = await waitForResult();
    // #endregion transaction-parameters-8

    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });
});
