/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FunctionFragment, InputValue } from '@fuel-ts/abi-coder';
import { toBigInt } from '@fuel-ts/math';
import type { Provider } from '@fuel-ts/providers';
import {
  CoinQuantity,
  CoinQuantityLike,
  transactionRequestify,
  coinQuantityfy,
  ScriptTransactionRequest,
} from '@fuel-ts/providers';

import type Contract from './contract-new';
import { FunctionCallResult, FunctionInvocationResult } from './function-invocation-results';
import type { FunctionInvocationScope } from './function-invocation-scope';
import { contractCallScript } from './scripts';
import type { CallOptions, TxParams } from './types';

export class MultiCallInvocationScope {
  contract: Contract;
  transactionRequest: ScriptTransactionRequest;
  private functionInvocationScopes: Array<FunctionInvocationScope> = [];
  private txParameters?: TxParams;

  constructor(contract: Contract, funcScopes: Array<FunctionInvocationScope>) {
    this.contract = contract;
    this.functionInvocationScopes = funcScopes;
    this.transactionRequest = new ScriptTransactionRequest({
      gasLimit: 1000000,
    });
    this.transactionRequest.addContract(this.contract);
  }

  private static getCallOptions(options?: CallOptions) {
    return { fundTransaction: true, ...options };
  }

  async addRequiredCoins() {
    // const coinsOnTransaction = [this.forward, [1]].filter((i) => !!i) as CoinQuantityLike[];
    // const coins = await this.contract.wallet?.getCoinsToSpend(coinsOnTransaction);
    // this.transactionRequest.addCoins(coins || []);
    return this;
  }

  // async buildTransaction() {}

  txParams(txParams: TxParams) {
    this.txParameters = txParams;
    const request = this.transactionRequest;

    request.gasLimit = toBigInt(txParams.gasLimit || request.gasLimit);
    request.gasPrice = toBigInt(txParams.gasPrice || request.gasPrice);
    request.bytePrice = toBigInt(txParams.bytePrice || request.bytePrice);
    request.addVariableOutputs(this.txParameters?.variableOutputs || 0);

    return this;
  }

  addCall(func: FunctionInvocationScope) {
    this.functionInvocationScopes = [func];
    return this;
  }

  addCalls(funcs: Array<FunctionInvocationScope>) {
    this.functionInvocationScopes = funcs;
    return this;
  }

  async call<T = any>(options?: CallOptions): Promise<FunctionInvocationResult<T>> {
    const opts = MultiCallInvocationScope.getCallOptions(options);
    if (!this.contract.wallet) {
      throw new Error('Wallet is required!');
    }
    if (opts.fundTransaction) {
      await this.addRequiredCoins();
    }
    const response = await this.contract.wallet?.sendTransaction(this.transactionRequest);

    return FunctionInvocationResult.build<T>(this.functionInvocationScopes, response);
  }

  async simulate<T = any>(options?: CallOptions): Promise<FunctionCallResult<T>> {
    const opts = MultiCallInvocationScope.getCallOptions(options);
    if (!this.contract.wallet) {
      throw new Error('Wallet is required!');
    }
    if (opts.fundTransaction) {
      await this.addRequiredCoins();
    }
    const result = await this.contract.wallet?.simulateTransaction(this.transactionRequest);

    return FunctionCallResult.build<T>(this.functionInvocationScopes, result);
  }

  async get<T = any>(): Promise<FunctionCallResult<T>> {
    if (!this.contract.wallet && !this.contract.provider) {
      throw new Error('Wallet or Provider is required!');
    }
    const provider = (this.contract.wallet?.provider || this.contract.provider) as Provider;
    const request = transactionRequestify(this.transactionRequest);
    const response = await provider.call(request, {
      utxoValidation: false,
    });
    const result = await FunctionCallResult.build<T>(this.functionInvocationScopes, response);

    return result;
  }
}
