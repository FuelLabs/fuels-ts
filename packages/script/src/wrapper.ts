import { arrayify } from '@ethersproject/bytes';
import type { InputValue } from '@fuel-ts/abi-coder';
import { AbiCoder } from '@fuel-ts/abi-coder';
import type { IRawAbi } from '@fuel-ts/abi-typegen';
import type { BigNumberish } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { CoinQuantityLike } from '@fuel-ts/providers';
import { ScriptTransactionRequest } from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';
import type { BaseWalletLocked } from '@fuel-ts/wallet';

import type { ScriptResult } from './script';
import { Script } from './script';

// Duplicating ingerface `TxParams` — can't import it normally
// from `@fuel-ts/contract`, due to cyclic dependency problem
export type TxParams = Partial<{
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  variableOutput: number;
}>;

/**
 * This class provides a facade on top of the Script class,
 * providing a more fluent API for common script calls.
 *
 * It draws inspiration from the Contract class, however it
 * does not uses an `Interface`, but instead follows the
 * `call-script` examples present in the unit tests.
 */
export class ScriptWrapper<Inputs extends InputValue, Output> {
  public readonly coder: AbiCoder;
  public readonly script: Script<Inputs, Output>;

  public readonly txParameters?: TxParams;
  public readonly transactionRequest = new ScriptTransactionRequest();

  constructor(abi: IRawAbi, bin: Uint8Array) {
    this.coder = new AbiCoder();

    this.script = new Script<Inputs, Output>(
      bin,
      (data: Inputs) => {
        // TODO: Review mismatch: TYPEGEN IRawAbiFunctionIO[] vs CODER 'JsonAbiFragmentType[]'
        const encoded = this.coder.encode(abi.functions[0].inputs as any, [data]);
        return arrayify(encoded);
      },
      (scriptResult: ScriptResult): Output => {
        if (scriptResult.returnReceipt.type === ReceiptType.Revert) {
          throw new Error('Script call reverted');
        }
        if (scriptResult.returnReceipt.type !== ReceiptType.ReturnData) {
          throw new Error('Script call failed');
        }
        const decoded = this.coder.decode(
          // TODO: Review mismatch: TYPEGEN 'IRawAbiFunctionIO' vs CODER 'JsonAbiFragmentType'.
          [abi.functions[0].output as any],
          scriptResult.returnReceipt.data
        );
        return decoded?.[0] as Output;
      }
    );
  }

  txParams(txParams: TxParams) {
    const request = this.transactionRequest;

    request.gasLimit = bn(txParams.gasLimit || request.gasLimit);
    request.gasPrice = bn(txParams.gasPrice || request.gasPrice);

    request.addVariableOutputs(this.txParameters?.variableOutput || 0);

    return this;
  }

  async call(params: { data: Inputs; wallet: BaseWalletLocked }) {
    const request = this.transactionRequest;

    const { script } = this;
    const { data, wallet } = params;

    request.setScript(script, data);

    const requiredCoinQuantities: CoinQuantityLike[] = [];
    requiredCoinQuantities.push(request.calculateFee());

    if (requiredCoinQuantities.length) {
      const resources = await wallet.getResourcesToSpend(requiredCoinQuantities);
      request.addResources(resources);
    }

    const response = await wallet.sendTransaction(request);
    const transactionResult = await response.waitForResult();
    const result = script.decodeCallResult(transactionResult);

    return { transactionResult, result, response };
  }
}
