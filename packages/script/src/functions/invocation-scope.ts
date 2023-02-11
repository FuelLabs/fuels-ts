import { Logger } from '@ethersproject/logger';
import type { FunctionFragment } from '@fuel-ts/abi-coder';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { CoinQuantity } from '@fuel-ts/providers';
import { getDecodedLogs, coinQuantityfy, ScriptTransactionRequest } from '@fuel-ts/providers';
import { InputType, MAX_GAS_PER_TX, ReceiptType } from '@fuel-ts/transactions';
import { versions } from '@fuel-ts/versions';

import type { Script } from '../script';
import { ScriptRequest } from '../script-request';
import type { CallConfig, CallOptions, CallParams, InvocationScopeLike, TxParams } from '../types';
import { assert } from '../utils';

import { FunctionInvocationResult } from './invocation-results';

const logger = new Logger(versions.FUELS);

export class FunctionInvocationScope<TArgs extends Array<any> = Array<any>, TReturn = any> {
  private func: FunctionFragment;
  private callParameters?: CallParams;
  private forward?: CoinQuantity;
  private args: TArgs;
  transactionRequest: ScriptTransactionRequest;
  scriptRequest!: ScriptRequest<TArgs, TReturn>;
  protected script: Script<TArgs, TReturn>;
  protected txParameters?: TxParams;
  protected requiredCoins: CoinQuantity[] = [];

  constructor(script: Script<TArgs, TReturn>, func: FunctionFragment, args: TArgs) {
    this.script = script;
    this.func = func;
    this.args = args || [];
    this.setArguments(...args);
    this.transactionRequest = new ScriptTransactionRequest({
      gasLimit: MAX_GAS_PER_TX,
    });
    this.buildScriptRequest();
  }

  private buildScriptRequest() {
    this.scriptRequest = new ScriptRequest(
      this.script.bytecode,
      (args: TArgs) => this.script.interface.encodeFunctionData(this.func, args, 0, true),
      (scriptResult): TReturn => {
        const logs = getDecodedLogs(scriptResult.receipts, this.script.interface);

        if (scriptResult.returnReceipt.type === ReceiptType.Revert) {
          logger.throwError('Script Reverted', Logger.errors.CALL_EXCEPTION, logs);
        }

        if (
          scriptResult.returnReceipt.type !== ReceiptType.Return &&
          scriptResult.returnReceipt.type !== ReceiptType.ReturnData
        ) {
          logger.throwError(
            `Script Return Type [${scriptResult.returnReceipt.type}] Invalid`,
            Logger.errors.CALL_EXCEPTION,
            {
              logs,
              receipt: scriptResult.returnReceipt,
            }
          );
        }

        let value;
        if (scriptResult.returnReceipt.type === ReceiptType.Return) {
          value = scriptResult.returnReceipt.val;
        }
        if (scriptResult.returnReceipt.type === ReceiptType.ReturnData) {
          const decoded = this.script.interface.decodeFunctionResult(
            this.func,
            scriptResult.returnReceipt.data
          );
          value = (decoded as [TReturn])[0];
        }

        return value as TReturn;
      }
    );
  }

  protected static getCallOptions(options?: CallOptions) {
    return { fundTransaction: true, ...options };
  }

  protected getRequiredCoins(): Array<CoinQuantity> {
    const requiredCoinQuantities: CoinQuantity[] = [this.transactionRequest.calculateFee()];
    return requiredCoinQuantities;
  }

  protected updateRequiredCoins() {
    const assets = this.getRequiredCoins();
    const reduceForwardCoins = (
      requiredCoins: Map<any, CoinQuantity>,
      { assetId, amount }: CoinQuantity
    ) => {
      const currentAmount = requiredCoins.get(assetId)?.amount || bn(0);

      return requiredCoins.set(assetId, {
        assetId: String(assetId),
        amount: currentAmount.add(amount),
      });
    };
    this.requiredCoins = Array.from(
      assets.reduce(reduceForwardCoins, new Map<any, CoinQuantity>()).values()
    );
  }

  protected checkGasLimitTotal() {
    if ((this.callParameters?.gasLimit || 0) > this.transactionRequest.gasLimit) {
      throw new Error(
        "Transaction gasLimit can't be lower than the sum of the forwarded gas of each call"
      );
    }
  }

  protected async prepareTransaction(options?: CallOptions) {
    // Update required coins before call
    this.updateRequiredCoins();

    // Check if gasLimit is less than the
    // sum of all call gasLimits
    this.checkGasLimitTotal();

    // Add funds required on forwards and to pay gas
    const opts = FunctionInvocationScope.getCallOptions(options);
    if (opts.fundTransaction && this.script.wallet) {
      await this.fundWithRequiredCoins();
    }
  }

  /**
   * Add to the transaction scope the required amount of unspent UTXO's.
   *
   * Required Amount = forward coins + transfers + gas fee.
   */
  async fundWithRequiredCoins() {
    // Clean coin inputs before add new coins to the request
    this.transactionRequest.inputs = this.transactionRequest.inputs.filter(
      (i) => i.type !== InputType.Coin
    );
    const resources = await this.script.wallet?.getResourcesToSpend(this.requiredCoins);
    this.transactionRequest.addResources(resources || []);
    return this;
  }

  txParams(txParams: TxParams) {
    this.txParameters = txParams;
    const request = this.transactionRequest;

    request.gasLimit = bn(txParams.gasLimit || request.gasLimit);
    request.gasPrice = bn(txParams.gasPrice || request.gasPrice);
    request.addVariableOutputs(this.txParameters?.variableOutputs || 0);

    return this;
  }

  getCallConfig(): CallConfig<TArgs> {
    return {
      func: this.func,
      script: this.script,
      scriptRequest: this.scriptRequest,
      callParameters: this.callParameters,
      txParameters: this.txParameters,
      forward: this.forward,
      args: this.args,
    };
  }

  setArguments(...args: TArgs) {
    this.args = args || [];
    return this;
  }

  callParams(callParams: CallParams) {
    this.callParameters = callParams;

    if (callParams?.forward) {
      this.forward = coinQuantityfy(callParams.forward);
    }

    // Update required coins
    this.updateRequiredCoins();

    return this;
  }

  /**
   * Prepare transaction request object, adding Inputs, Outputs, coins, check gas costs
   * and transaction validity.
   *
   * It's possible to get the transaction without adding coins, by passing `fundTransaction`
   * as false.
   */
  async getTransactionRequest(options?: CallOptions): Promise<ScriptTransactionRequest> {
    await this.prepareTransaction(options);
    return this.transactionRequest;
  }

  /**
   * Submits a transaction to the blockchain.
   *
   * This is a final action and will spend the coins and change the state of the contract.
   * It also means that invalid transactions will throw an error, and consume gas. To avoid this
   * running invalid tx and consuming gas try to `simulate` first when possible.
   */
  async call<T = TReturn>(options?: CallOptions): Promise<FunctionInvocationResult<T>> {
    assert(this.script.provider, 'Provider is required!');

    const transactionRequest = await this.getTransactionRequest(options);
    const response = await this.script.provider.sendTransaction(transactionRequest);

    return FunctionInvocationResult.build<T>(this as unknown as InvocationScopeLike, response);
  }
}
