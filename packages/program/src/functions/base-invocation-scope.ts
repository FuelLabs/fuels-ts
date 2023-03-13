/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InputValue } from '@fuel-ts/abi-coder';
import type { AbstractContract, AbstractProgram } from '@fuel-ts/interfaces';
import { bn, toNumber } from '@fuel-ts/math';
import type { Provider, CoinQuantity, TransactionRequest } from '@fuel-ts/providers';
import { transactionRequestify, ScriptTransactionRequest } from '@fuel-ts/providers';
import { MAX_GAS_PER_TX, InputType } from '@fuel-ts/transactions';

import { contractCallScript } from '../contract-call-script';
import type {
  CallOptions,
  ContractCall,
  InvocationScopeLike,
  TransactionCostOptions,
  TxParams,
} from '../types';
import { assert } from '../utils';

import { InvocationCallResult, FunctionInvocationResult } from './invocation-results';

function createContractCall(funcScope: InvocationScopeLike): ContractCall {
  const { program, args, forward, func, callParameters, bytesOffset } = funcScope.getCallConfig();

  const data = program.interface.encodeFunctionData(
    func,
    args as Array<InputValue>,
    contractCallScript.getScriptDataOffset() + bytesOffset
  );

  return {
    contractId: (program as AbstractContract).id,
    data,
    assetId: forward?.assetId,
    amount: forward?.amount,
    gas: callParameters?.gasLimit,
  };
}

export class BaseInvocationScope<TReturn = any> {
  transactionRequest: ScriptTransactionRequest;
  protected program: AbstractProgram;
  protected functionInvocationScopes: Array<InvocationScopeLike> = [];
  protected txParameters?: TxParams;
  protected requiredCoins: CoinQuantity[] = [];
  protected isMultiCall: boolean = false;

  constructor(program: AbstractProgram, isMultiCall: boolean) {
    this.program = program;
    this.isMultiCall = isMultiCall;
    this.transactionRequest = new ScriptTransactionRequest({
      gasLimit: MAX_GAS_PER_TX,
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
        amount: bn(call.amount || 0),
      }))
      .concat(this.transactionRequest.calculateFee())
      .filter(({ assetId, amount }) => assetId && !bn(amount).isZero());
    return assets;
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

    // Update required coins before call
    this.updateRequiredCoins();

    // Check if gasLimit is less than the
    // sum of all call gasLimits
    this.checkGasLimitTotal();

    // Add funds required on forwards and to pay gas
    const opts = BaseInvocationScope.getCallOptions(options);
    if (opts.fundTransaction && this.program.account) {
      await this.fundWithRequiredCoins();
    }
  }

  protected checkGasLimitTotal() {
    const gasLimitOnCalls = this.calls.reduce((total, call) => total.add(call.gas || 0), bn(0));
    if (gasLimitOnCalls.gt(this.transactionRequest.gasLimit)) {
      throw new Error(
        "Transaction gasLimit can't be lower than the sum of the forwarded gas of each call"
      );
    }
  }

  /**
   * Run a valid transaction in dryRun mode and returns useful details about
   * gasUsed, gasPrice and transaction estimate fee in native coins.
   */
  async getTransactionCost(options?: TransactionCostOptions) {
    const provider = (this.program.account?.provider || this.program.provider) as Provider;
    assert(provider, 'Wallet or Provider is required!');

    await this.prepareTransaction(options);
    const request = transactionRequestify(this.transactionRequest);
    request.gasPrice = bn(toNumber(request.gasPrice) || toNumber(options?.gasPrice || 0));
    const txCost = await provider.getTransactionCost(request, options?.tolerance);

    return txCost;
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
    const resources = await this.program.account?.getResourcesToSpend(this.requiredCoins);
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

  addContracts(contracts: Array<AbstractContract>) {
    contracts.forEach((contract) => {
      this.transactionRequest.addContract(contract.id);
      this.program.interface.updateExternalLoggedTypes(contract.id.toB256(), [
        ...contract.interface.loggedTypes,
      ]);
    });
    return this;
  }

  /**
   * Prepare transaction request object, adding Inputs, Outputs, coins, check gas costs
   * and transaction validity.
   *
   * It's possible to get the transaction without adding coins, by passing `fundTransaction`
   * as false.
   */
  async getTransactionRequest(options?: CallOptions): Promise<TransactionRequest> {
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
    assert(this.program.account, 'Wallet is required!');

    const transactionRequest = await this.getTransactionRequest(options);
    const response = await this.program.account.sendTransaction(transactionRequest);

    return FunctionInvocationResult.build<T>(
      this.functionInvocationScopes,
      response,
      this.isMultiCall,
      this.program as AbstractContract
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
    assert(this.program.account, 'Wallet is required!');

    const transactionRequest = await this.getTransactionRequest(options);
    const result = await this.program.account.simulateTransaction(transactionRequest);

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
    const provider = (this.program.account?.provider || this.program.provider) as Provider;
    assert(provider, 'Wallet or Provider is required!');

    const transactionRequest = await this.getTransactionRequest(options);
    const request = transactionRequestify(transactionRequest);
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
   * Under the hood it uses the `dryRun` method but don't fund the transaction
   * with coins by default, for emulating executions with forward coins use `dryRun`
   * or pass the options.fundTransaction as true
   */
  async get<T = TReturn>(options?: CallOptions): Promise<InvocationCallResult<T>> {
    return this.dryRun<T>({
      fundTransaction: false,
      ...options,
    });
  }
}
