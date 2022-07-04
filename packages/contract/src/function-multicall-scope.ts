/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InputValue } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import { toBigInt } from '@fuel-ts/math';
import type { Provider, CoinQuantity } from '@fuel-ts/providers';
import { InputType, transactionRequestify, ScriptTransactionRequest } from '@fuel-ts/providers';

import type Contract from './contract-new';
import { FunctionCallResult, FunctionInvocationResult } from './function-invocation-results';
import type { FunctionInvocationScope } from './function-invocation-scope';
import type { ContractCall } from './scripts';
import { contractCallScript } from './scripts';
import type { CallOptions, TxParams } from './types';
import { assert } from './util';

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
  private txParameters?: TxParams;
  private requiredCoins: CoinQuantity[] = [];

  constructor(contract: Contract, funcScopes: Array<FunctionInvocationScope>) {
    this.contract = contract;
    this.transactionRequest = new ScriptTransactionRequest({
      gasLimit: 1000000,
    });
    this.addCalls(funcScopes);
  }

  private get calls() {
    return this.functionInvocationScopes.map((funcScope) => createContractCall(funcScope));
  }

  private static getCallOptions(options?: CallOptions) {
    return { fundTransaction: true, ...options };
  }

  private updateScriptRequest() {
    const calls = this.calls;
    calls.forEach((c) => {
      this.transactionRequest.addContract(c.contractId);
    });
    this.transactionRequest.setScript(contractCallScript, calls);
  }

  private getRequiredCoins(): Array<CoinQuantity> {
    const assets = this.calls
      .map((call) => ({
        assetId: String(call.assetId),
        amount: toBigInt(call.amount || 0),
      }))
      // Add required amount to pay gas fee
      .concat({
        assetId: NativeAssetId,
        amount: 1n,
      })
      .filter(({ assetId, amount }) => assetId && amount);
    return assets;
  }

  private updateRequiredCoins() {
    const assets = this.getRequiredCoins();
    const reduceForwardCoins = (
      requiredCoins: Map<any, CoinQuantity>,
      { assetId, amount }: CoinQuantity
    ) => {
      const currentAmount = requiredCoins.get(assetId)?.amount || 0n;

      return requiredCoins.set(assetId, {
        assetId: String(assetId),
        amount: currentAmount + toBigInt(amount),
      });
    };
    this.requiredCoins = Array.from(
      assets.reduce(reduceForwardCoins, new Map<any, CoinQuantity>()).values()
    );
  }

  async fundWithRequiredCoins() {
    // Clean coin inputs before add new coins to the request
    this.transactionRequest.inputs = this.transactionRequest.inputs.filter(
      (i) => i.type !== InputType.Coin
    );
    const coins = await this.contract.wallet?.getCoinsToSpend(this.requiredCoins);
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
    this.updateScriptRequest();
    this.updateRequiredCoins();
    return this;
  }

  private async prepareTransaction(options?: CallOptions) {
    // Update request scripts before call
    this.updateScriptRequest();

    // Add funds required on forwards and to pay gas
    const opts = MultiCallInvocationScope.getCallOptions(options);
    if (opts.fundTransaction && this.contract.wallet) {
      await this.fundWithRequiredCoins();
    }
  }

  async call<T = any>(options?: CallOptions): Promise<FunctionInvocationResult<T>> {
    assert(this.contract.wallet, 'Wallet is required!');

    await this.prepareTransaction(options);
    const response = await this.contract.wallet.sendTransaction(this.transactionRequest);

    return FunctionInvocationResult.build<T>(this.functionInvocationScopes, response);
  }

  async simulate<T = any>(options?: CallOptions): Promise<FunctionCallResult<T>> {
    assert(this.contract.wallet, 'Wallet is required!');

    await this.prepareTransaction(options);
    const result = await this.contract.wallet.simulateTransaction(this.transactionRequest);

    return FunctionCallResult.build<T>(this.functionInvocationScopes, result);
  }

  async get<T = any>(options?: CallOptions): Promise<FunctionCallResult<T>> {
    const provider = (this.contract.wallet?.provider || this.contract.provider) as Provider;
    assert(provider, 'Wallet or Provider is required!');

    this.prepareTransaction(options);
    const request = transactionRequestify(this.transactionRequest);
    const response = await provider.call(request, {
      utxoValidation: false,
    });
    const result = await FunctionCallResult.build<T>(this.functionInvocationScopes, response);

    return result;
  }
}
