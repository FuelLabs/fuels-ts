/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InputValue } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import { toBigInt } from '@fuel-ts/math';
import type { Provider, CoinQuantity } from '@fuel-ts/providers';
import { InputType, transactionRequestify, ScriptTransactionRequest } from '@fuel-ts/providers';

import type Contract from '../../contract';
import type { ContractCall } from '../../scripts';
import { contractCallScript } from '../../scripts';
import type { CallOptions, InvocationScopeLike, TxParams } from '../../types';
import { assert } from '../../util';

import { InvocationCallResult, FunctionInvocationResult } from './invocation-results';

function createContractCall(funcScope: InvocationScopeLike): ContractCall {
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
  protected functionInvocationScopes: Array<InvocationScopeLike> = [];
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

  protected addCall(funcScope: InvocationScopeLike) {
    this.addCalls([funcScope]);
    return this;
  }

  protected addCalls(funcScopes: Array<InvocationScopeLike>) {
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

  /**
   * Submits a transaction to the blockchain.
   *
   * This is a final action and will spend the coins and change the state of the contract.
   * It also means that invalid transactions will throw an error, and consume gas. To avoid this
   * running invalid tx and consuming gas try to `simulate` first when possible.
   */
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

  /**
   * Run a valid transaction and return the result without change the chain state.
   * This means, all signatures are validated but no UTXO is spent.
   *
   * This method is useful for validate propose to avoid spending coins on invalid TXs, also
   * to estimate the amount of gas that will be required to run the transaction.
   */
  async simulate<T = TReturn>(options?: CallOptions): Promise<InvocationCallResult<T>> {
    assert(this.contract.wallet, 'Wallet is required!');

    await this.prepareTransaction(options);
    const result = await this.contract.wallet.simulateTransaction(this.transactionRequest);

    return InvocationCallResult.build<T>(this.functionInvocationScopes, result, this.isMultiCall);
  }

  /**
   * Executes a transaction in dry run mode, without UTXO validations.
   *
   * A transaction in dry run mode can't change the state of the blockchain. It can be useful to access readonly
   * methods or just ust get.
   * The UTXO validation disable in this case, enables to send invalid inputs to emulate different conditions, of a
   * transaction
   */
  async dryRun<T = TReturn>(options?: CallOptions): Promise<InvocationCallResult<T>> {
    const provider = (this.contract.wallet?.provider || this.contract.provider) as Provider;
    assert(provider, 'Wallet or Provider is required!');

    this.prepareTransaction(options);
    const request = transactionRequestify(this.transactionRequest);
    const response = await provider.call(request, {
      utxoValidation: false,
    });
    const result = await InvocationCallResult.build<T>(
      this.functionInvocationScopes,
      response,
      this.isMultiCall
    );

    return result;
  }

  /**
   * Executes a readonly contract method call.
   *
   * Under the hood it uses the `dryRun` method.
   */
  async get<T = TReturn>(options?: CallOptions): Promise<InvocationCallResult<T>> {
    return this.dryRun<T>(options);
  }
}
