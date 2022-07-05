/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InputValue } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import { toBigInt } from '@fuel-ts/math';
import type { Provider, CoinQuantity } from '@fuel-ts/providers';
import { InputType, transactionRequestify, ScriptTransactionRequest } from '@fuel-ts/providers';

import type Contract from './contract-new';
import { FunctionCallResult, FunctionInvocationResult } from './function-invocation-results';
import type { ContractCall } from './scripts';
import { contractCallScript } from './scripts';
import type { CallOptions, FunctionInvocationLike, TxParams } from './types';
import { assert } from './util';

function createContractCall(funcScope: FunctionInvocationLike): ContractCall {
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

export class BaseInvocationScope<TReturn = any> {
  transactionRequest: ScriptTransactionRequest;
  protected contract: Contract;
  protected functionInvocationScopes: Array<FunctionInvocationLike> = [];
  protected txParameters?: TxParams;
  protected requiredCoins: CoinQuantity[] = [];
  protected isMultiCall: boolean = false;

  constructor(contract: Contract, isMultiCall: boolean) {
    this.contract = contract;
    this.isMultiCall = isMultiCall;
    this.transactionRequest = new ScriptTransactionRequest({
      gasLimit: 1000000,
    });
  }

  protected get calls() {
    return this.functionInvocationScopes.map((funcScope) => createContractCall(funcScope));
  }

  protected static getCallOptions(options?: CallOptions) {
    return { fundTransaction: true, ...options };
  }

  protected updateScriptRequest() {
    const calls = this.calls;
    calls.forEach((c) => {
      this.transactionRequest.addContract(c.contractId);
    });
    this.transactionRequest.setScript(contractCallScript, calls);
  }

  protected getRequiredCoins(): Array<CoinQuantity> {
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

  protected updateRequiredCoins() {
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

  protected addCall(funcScope: FunctionInvocationLike) {
    this.addCalls([funcScope]);
    return this;
  }

  protected addCalls(funcScopes: Array<FunctionInvocationLike>) {
    this.functionInvocationScopes.push(...funcScopes);
    this.updateScriptRequest();
    this.updateRequiredCoins();
    return this;
  }

  protected async prepareTransaction(options?: CallOptions) {
    // Update request scripts before call
    this.updateScriptRequest();

    // Add funds required on forwards and to pay gas
    const opts = BaseInvocationScope.getCallOptions(options);
    if (opts.fundTransaction && this.contract.wallet) {
      await this.fundWithRequiredCoins();
    }
  }

  async call<T = TReturn>(options?: CallOptions): Promise<FunctionInvocationResult<T>> {
    assert(this.contract.wallet, 'Wallet is required!');

    await this.prepareTransaction(options);
    const response = await this.contract.wallet.sendTransaction(this.transactionRequest);

    return FunctionInvocationResult.build<T>(
      this.functionInvocationScopes,
      response,
      this.isMultiCall
    );
  }

  async simulate<T = TReturn>(options?: CallOptions): Promise<FunctionCallResult<T>> {
    assert(this.contract.wallet, 'Wallet is required!');

    await this.prepareTransaction(options);
    const result = await this.contract.wallet.simulateTransaction(this.transactionRequest);

    return FunctionCallResult.build<T>(this.functionInvocationScopes, result, this.isMultiCall);
  }

  async get<T = TReturn>(options?: CallOptions): Promise<FunctionCallResult<T>> {
    const provider = (this.contract.wallet?.provider || this.contract.provider) as Provider;
    assert(provider, 'Wallet or Provider is required!');

    this.prepareTransaction(options);
    const request = transactionRequestify(this.transactionRequest);
    const response = await provider.call(request, {
      utxoValidation: false,
    });
    const result = await FunctionCallResult.build<T>(
      this.functionInvocationScopes,
      response,
      this.isMultiCall
    );

    return result;
  }
}
