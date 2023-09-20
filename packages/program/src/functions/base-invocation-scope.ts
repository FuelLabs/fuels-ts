/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InputValue } from '@fuel-ts/abi-coder';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractContract, AbstractProgram } from '@fuel-ts/interfaces';
import { bn, toNumber } from '@fuel-ts/math';
import type { Provider, CoinQuantity, TransactionRequest } from '@fuel-ts/providers';
import { transactionRequestify, ScriptTransactionRequest } from '@fuel-ts/providers';
import { InputType } from '@fuel-ts/transactions';
import { MAX_GAS_PER_TX } from '@fuel-ts/transactions/configs';
import type { BaseWalletUnlocked } from '@fuel-ts/wallet';
import * as asm from '@fuels/vm-asm';

import { getContractCallScript } from '../contract-call-script';
import { POINTER_DATA_OFFSET } from '../script-request';
import type { ContractCall, InvocationScopeLike, TransactionCostOptions, TxParams } from '../types';
import { assert } from '../utils';

import { InvocationCallResult, FunctionInvocationResult } from './invocation-results';

/**
 * Creates a contract call object based on the provided invocation scope.
 *
 * @param funcScope - The invocation scope containing the necessary information for the contract call.
 * @returns The contract call object.
 */
function createContractCall(funcScope: InvocationScopeLike, offset: number): ContractCall {
  const { program, args, forward, func, callParameters } = funcScope.getCallConfig();
  const DATA_POINTER_OFFSET = funcScope.getCallConfig().func.isInputDataPointer
    ? POINTER_DATA_OFFSET
    : 0;
  const data = func.encodeArguments(args as Array<InputValue>, offset + DATA_POINTER_OFFSET);

  return {
    contractId: (program as AbstractContract).id,
    fnSelector: func.selector,
    data,
    isInputDataPointer: func.isInputDataPointer,
    isOutputDataHeap: func.outputMetadata.isHeapType,
    outputEncodedLength: func.outputMetadata.encodedLength,
    assetId: forward?.assetId,
    amount: forward?.amount,
    gas: callParameters?.gasLimit,
  };
}

/**
 * Base class for managing invocation scopes and preparing transactions.
 */
export class BaseInvocationScope<TReturn = any> {
  transactionRequest: ScriptTransactionRequest;
  protected program: AbstractProgram;
  protected functionInvocationScopes: Array<InvocationScopeLike> = [];
  protected txParameters?: TxParams;
  protected requiredCoins: CoinQuantity[] = [];
  protected isMultiCall: boolean = false;

  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(program: AbstractProgram, isMultiCall: boolean) {
    this.program = program;
    this.isMultiCall = isMultiCall;
    this.transactionRequest = new ScriptTransactionRequest({
      gasLimit: MAX_GAS_PER_TX,
    });
  }

  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  protected get calls() {
    const script = getContractCallScript(this.functionInvocationScopes);
    const provider = this.program.provider as Provider;
    const consensusParams = provider.getChain().consensusParameters;
    if (!consensusParams) {
      throw new FuelError(
        FuelError.CODES.CHAIN_INFO_CACHE_EMPTY,
        'Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()``'
      );
    }
    const maxInputs = consensusParams.maxInputs.toNumber();
    return this.functionInvocationScopes.map((funcScope) =>
      createContractCall(funcScope, script.getScriptDataOffset(maxInputs))
    );
  }

  /**
   * Updates the script request with the current contract calls.
   */
  protected updateScriptRequest() {
    const contractCallScript = getContractCallScript(this.functionInvocationScopes);
    this.transactionRequest.setScript(contractCallScript, this.calls);
  }

  /**
   * Updates the transaction request with the current input/output.
   */
  protected updateContractInputAndOutput() {
    const calls = this.calls;
    calls.forEach((c) => {
      if (c.contractId) {
        this.transactionRequest.addContractInputAndOutput(c.contractId);
      }
    });
  }

  /**
   * Gets the required coins for the transaction.
   *
   * @returns An array of required coin quantities.
   */
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

  /**
   * Updates the required coins for the transaction.
   */
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

  /**
   * Adds a single call to the invocation scope.
   *
   * @param funcScope - The function scope to add.
   * @returns The current instance of the class.
   */
  protected addCall(funcScope: InvocationScopeLike) {
    this.addCalls([funcScope]);
    return this;
  }

  /**
   * Adds multiple calls to the invocation scope.
   *
   * @param funcScopes - An array of function scopes to add.
   * @returns The current instance of the class.
   */
  protected addCalls(funcScopes: Array<InvocationScopeLike>) {
    this.functionInvocationScopes.push(...funcScopes);
    this.updateContractInputAndOutput();
    this.updateRequiredCoins();
    return this;
  }

  /**
   * Prepares the transaction by updating the script request, required coins, and checking the gas limit.
   */
  protected async prepareTransaction() {
    // @ts-expect-error Property 'initWasm' does exist on type and is defined
    await asm.initWasm();

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

  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  protected checkGasLimitTotal() {
    const gasLimitOnCalls = this.calls.reduce((total, call) => total.add(call.gas || 0), bn(0));
    if (gasLimitOnCalls.gt(this.transactionRequest.gasLimit)) {
      throw new FuelError(
        ErrorCode.TRANSACTION_ERROR,
        "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
      );
    }
  }

  /**
   * Gets the transaction cost ny dry running the transaction.
   *
   * @param options - Optional transaction cost options.
   * @returns The transaction cost details.
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
   * Funds the transaction with the required coins.
   *
   * @returns The current instance of the class.
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

  /**
   * Sets the transaction parameters.
   *
   * @param txParams - The transaction parameters to set.
   * @returns The current instance of the class.
   */
  txParams(txParams: TxParams) {
    this.txParameters = txParams;
    const request = this.transactionRequest;

    request.gasLimit = bn(txParams.gasLimit || request.gasLimit);
    request.gasPrice = bn(txParams.gasPrice || request.gasPrice);
    request.addVariableOutputs(this.txParameters?.variableOutputs || 0);

    return this;
  }

  /**
   * Adds contracts to the invocation scope.
   *
   * @param contracts - An array of contracts to add.
   * @returns The current instance of the class.
   */
  addContracts(contracts: Array<AbstractContract>) {
    contracts.forEach((contract) => {
      this.transactionRequest.addContractInputAndOutput(contract.id);
      this.program.interface.updateExternalLoggedTypes(contract.id.toB256(), contract.interface);
    });
    return this;
  }

  /**
   * Prepares and returns the transaction request object.
   *
   * @returns The prepared transaction request.
   */
  async getTransactionRequest(): Promise<TransactionRequest> {
    await this.prepareTransaction();
    return this.transactionRequest;
  }

  /**
   * Submits a transaction.
   *
   * @returns The result of the function invocation.
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
   * Simulates a transaction.
   *
   * @returns The result of the invocation call.
   */
  async simulate<T = TReturn>(): Promise<InvocationCallResult<T>> {
    assert(this.program.account, 'Wallet is required!');
    /**
     * NOTE: Simulating a transaction with UTXOs validation requires the transaction
     * to be signed by the wallet. This is only possible if the wallet is unlocked.
     * Since there is no garantee at this point that the account instance is an unlocked wallet
     * (BaseWalletUnlocked instance), we need to check it before run the simulation. Perhaps
     * we should think in a redesign of the AbstractAccount class to avoid this problem.
     */
    const isUnlockedWallet = (<BaseWalletUnlocked>this.program.account)
      .populateTransactionWitnessesSignature;

    if (!isUnlockedWallet) {
      return this.dryRun<T>();
    }

    const transactionRequest = await this.getTransactionRequest();
    const result = await this.program.account.simulateTransaction(transactionRequest);

    return InvocationCallResult.build<T>(this.functionInvocationScopes, result, this.isMultiCall);
  }

  /**
   * Executes a transaction in dry run mode.
   *
   * @returns The result of the invocation call.
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
}
