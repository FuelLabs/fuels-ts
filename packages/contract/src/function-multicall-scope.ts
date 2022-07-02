/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InputValue } from '@fuel-ts/abi-coder';
import { toBigInt } from '@fuel-ts/math';
import type { Provider, CoinQuantity } from '@fuel-ts/providers';
import { transactionRequestify, ScriptTransactionRequest } from '@fuel-ts/providers';

import type Contract from './contract-new';
import { FunctionCallResult, FunctionInvocationResult } from './function-invocation-results';
import type { FunctionInvocationScope } from './function-invocation-scope';
import type { ContractCall } from './scripts';
import { contractCallScript } from './scripts';
import type { CallOptions, TxParams } from './types';

function createContractCall(funcScope: FunctionInvocationScope): ContractCall {
  const { contract, args, forward, func, txParameters } = funcScope.getCallConfig();
  const data = contract.interface.encodeFunctionData(func, args as Array<InputValue>);

  return {
    contractId: contract.id,
    data,
    assetId: forward?.assetId,
    amount: forward?.amount,
    gas: txParameters?.gasLimit,
  };
}

export class MultiCallInvocationScope {
  transactionRequest: ScriptTransactionRequest;
  private contract: Contract;
  private functionInvocationScopes: Array<FunctionInvocationScope> = [];
  private calls: Array<ContractCall> = [];
  private txParameters?: TxParams;
  private requiredCoins: CoinQuantity[] = [];

  constructor(contract: Contract, funcScopes: Array<FunctionInvocationScope>) {
    this.contract = contract;
    this.functionInvocationScopes = funcScopes;
    this.transactionRequest = new ScriptTransactionRequest({
      gasLimit: 1000000,
    });
    this.addCalls(funcScopes);
  }

  private static getCallOptions(options?: CallOptions) {
    return { fundTransaction: true, ...options };
  }

  private updateScriptRequest() {
    this.calls.forEach((c) => {
      this.transactionRequest.addContract(c.contractId);
    });
    this.transactionRequest.setScript(contractCallScript, this.calls);
  }

  private updateRequiredCoins() {
    const reduceForwardCoins = (requiredCoins: Map<any, CoinQuantity>, call: ContractCall) => {
      if (!call.assetId || !call.amount) return requiredCoins;

      const amount = requiredCoins.get(call.assetId)?.amount || 0n;

      return requiredCoins.set(call.assetId, {
        assetId: String(call.assetId),
        amount: amount + toBigInt(call.amount),
      });
    };
    this.requiredCoins = Array.from(
      this.calls.reduce(reduceForwardCoins, new Map<any, CoinQuantity>()).values()
    );
  }

  async addRequiredCoins() {
    const coins = await this.contract.wallet?.getCoinsToSpend([...this.requiredCoins, [1]]);
    this.transactionRequest.addCoins(coins || []);
    return this;
  }

  txParams(txParams: TxParams) {
    this.txParameters = txParams;
    const request = this.transactionRequest;

    request.gasLimit = toBigInt(txParams.gasLimit || request.gasLimit);
    request.gasPrice = toBigInt(txParams.gasPrice || request.gasPrice);
    request.bytePrice = toBigInt(txParams.bytePrice || request.bytePrice);
    request.addVariableOutputs(this.txParameters?.variableOutputs || 0);

    return this;
  }

  addCall(funcScope: FunctionInvocationScope) {
    this.addCalls([funcScope]);
    return this;
  }

  addCalls(funcScopes: Array<FunctionInvocationScope>) {
    this.functionInvocationScopes.push(...funcScopes);
    this.calls.push(...funcScopes.map((funcScope) => createContractCall(funcScope)));
    this.updateScriptRequest();
    this.updateRequiredCoins();
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
