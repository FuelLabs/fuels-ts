/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InputValue } from '@fuel-ts/abi-coder';
import type { AbstractContract, AbstractProgram } from '@fuel-ts/interfaces';
import { bn, toNumber } from '@fuel-ts/math';
import type { Provider, CoinQuantity, TransactionRequest } from '@fuel-ts/providers';
import { transactionRequestify, ScriptTransactionRequest } from '@fuel-ts/providers';
import { InputType } from '@fuel-ts/transactions';
import { MAX_GAS_PER_TX } from '@fuel-ts/transactions/configs';

import { getContractCallScript } from '../contract-call-script';
import { POINTER_DATA_OFFSET } from '../script-request';
import type { ContractCall, InvocationScopeLike, TransactionCostOptions, TxParams } from '../types';
import { assert } from '../utils';

import { InvocationCallResult, FunctionInvocationResult } from './invocation-results';

function createContractCall(funcScope: InvocationScopeLike, offset: number): ContractCall {
  const { program, args, forward, func, callParameters } = funcScope.getCallConfig();
  const DATA_POINTER_OFFSET = funcScope.getCallConfig().func.isInputDataPointer()
    ? POINTER_DATA_OFFSET
    : 0;
  const data = func.encodeArguments(args as Array<InputValue>, offset + DATA_POINTER_OFFSET);

  return {
    contractId: (program as AbstractContract).id,
    fnSelector: func.selector,
    data,
    isDataPointer: func.isInputDataPointer(),
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
    const script = getContractCallScript(this.functionInvocationScopes.length);
    return this.functionInvocationScopes.map((funcScope) =>
      createContractCall(funcScope, script.getScriptDataOffset())
    );
  }

  protected updateScriptRequest() {
    const calls = this.calls;
    calls.forEach((c) => {
      this.transactionRequest.addContractInputAndOutput(c.contractId);
    });
    const contractCallScript = getContractCallScript(this.functionInvocationScopes.length);
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

  protected async prepareTransaction() {
    // Update request scripts before call
    this.updateScriptRequest();

    // Update required coins before call
    this.updateRequiredCoins();

    // Check if gasLimit is less than the
    // sum of all call gasLimits
    this.checkGasLimitTotal();

    if (this.program.account) {
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

    await this.prepareTransaction();
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
    this.transactionRequest.addResourceInputsAndOutputs(resources || []);
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
      this.transactionRequest.addContractInputAndOutput(contract.id);
      this.program.interface.updateExternalLoggedTypes(contract.id.toB256(), contract.interface);
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
  async getTransactionRequest(): Promise<TransactionRequest> {
    await this.prepareTransaction();
    return this.transactionRequest;
  }

  /**
   * Submits a transaction to the blockchain.
   *
   * This is a final action and will spend the coins and change the state of the contract.
   * It also means that invalid transactions will throw an error, and consume gas. To avoid this
   * running invalid tx and consuming gas try to `simulate` first when possible.
   */
  async call<T = TReturn>(): Promise<FunctionInvocationResult<T>> {
    assert(this.program.account, 'Wallet is required!');

    const transactionRequest = await this.getTransactionRequest();
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
  async simulate<T = TReturn>(): Promise<InvocationCallResult<T>> {
    assert(this.program.account, 'Wallet is required!');

    const transactionRequest = await this.getTransactionRequest();
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
  async dryRun<T = TReturn>(): Promise<InvocationCallResult<T>> {
    const provider = (this.program.account?.provider || this.program.provider) as Provider;
    assert(provider, 'Wallet or Provider is required!');

    const transactionRequest = await this.getTransactionRequest();
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
   * Executes a readonly contract method call by dry running a transaction.
   *
   * Note: This method is the same as `dryRun` but with a more semantic name that consumers are familiar with.
   */
  async get<T = TReturn>(): Promise<InvocationCallResult<T>> {
    return this.dryRun<T>();
  }
}
