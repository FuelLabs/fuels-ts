/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InputValue, JsonAbi } from '@fuel-ts/abi-coder';
import type {
  Provider,
  CoinQuantity,
  CallResult,
  Account,
  TransferParams,
  TransactionResponse,
  TransactionCost,
  AbstractAccount,
  AssembleTxParams,
} from '@fuel-ts/account';
import {
  mergeQuantities,
  ScriptTransactionRequest,
  Wallet,
  setAndValidateGasAndFeeForAssembledTx,
} from '@fuel-ts/account';
import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import { InputType, OutputType, TransactionType } from '@fuel-ts/transactions';
import { isDefined } from '@fuel-ts/utils';
import * as asm from '@fuels/vm-asm';
import { clone } from 'ramda';

import { getContractCallScript } from '../contract-call-script';
import {
  buildDryRunResult,
  buildFunctionResult,
  buildPreConfirmationFunctionResult,
} from '../response';
import type {
  ContractCall,
  InvocationScopeLike,
  TxParams,
  FunctionResult,
  DryRunResult,
  AbstractContract,
  AbstractProgram,
  PreConfirmationFunctionResult,
} from '../types';
import { assert, getAbisFromAllCalls } from '../utils';

/**
 * Creates a contract call object based on the provided invocation scope.
 *
 * @param funcScope - The invocation scope containing the necessary information for the contract call.
 * @returns The contract call object.
 */
function createContractCall(funcScope: InvocationScopeLike): ContractCall {
  const { program, args, forward, func, callParameters, externalAbis } = funcScope.getCallConfig();
  const data = func.encodeArguments(args as Array<InputValue>);

  return {
    contractId: (program as AbstractContract).id,
    fnSelectorBytes: func.selectorBytes,
    data,
    assetId: forward?.assetId,
    amount: forward?.amount,
    gas: callParameters?.gasLimit,
    externalContractsAbis: externalAbis,
  };
}

/**
 * Base class for managing invocation scopes and preparing transactions.
 */
export class BaseInvocationScope<TReturn = any> {
  protected transactionRequest: ScriptTransactionRequest;
  protected program: AbstractProgram;
  protected functionInvocationScopes: Array<InvocationScopeLike> = [];
  protected txParameters?: TxParams;
  protected assembleTxParameters?: Partial<Omit<AssembleTxParams, 'request'>>;
  protected requiredCoins: CoinQuantity[] = [];
  protected isMultiCall: boolean = false;
  protected hasCallParamsGasLimit: boolean = false; // flag to check if any of the callParams has gasLimit set
  protected externalAbis: Record<string, JsonAbi> = {};
  /**
   * @deprecated - Should be removed with `addSigners`
   */
  private addSignersCallback?: (
    txRequest: ScriptTransactionRequest
  ) => Promise<ScriptTransactionRequest>;

  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(program: AbstractProgram, isMultiCall: boolean) {
    this.program = program;
    this.isMultiCall = isMultiCall;
    this.transactionRequest = new ScriptTransactionRequest();
  }

  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  protected get calls() {
    return this.functionInvocationScopes.map((funcScope) => createContractCall(funcScope));
  }

  /**
   * Updates the script request with the current contract calls.
   */
  protected async updateScriptRequest() {
    const provider = this.getProvider();
    const {
      consensusParameters: {
        txParameters: { maxInputs },
      },
    } = await provider.getChain();
    const contractCallScript = getContractCallScript(this.functionInvocationScopes, maxInputs);
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
      if (c.externalContractsAbis) {
        Object.keys(c.externalContractsAbis).forEach((contractId) =>
          this.transactionRequest.addContractInputAndOutput(new Address(contractId))
        );
      }
    });
  }

  /**
   * Gets the required coins for the transaction.
   *
   * @returns An array of required coin quantities.
   */
  protected getRequiredCoins(): Array<CoinQuantity> {
    const forwardingAssets = this.calls
      .map((call) => ({
        assetId: String(call.assetId),
        amount: bn(call.amount || 0),
      }))
      .filter(({ assetId, amount }) => assetId && !bn(amount).isZero());
    return forwardingAssets;
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
    await this.updateScriptRequest();

    // Update required coins before call
    this.updateRequiredCoins();

    // Check if gasLimit is less than the
    // sum of all call gasLimits
    this.checkGasLimitTotal();

    if (this.transactionRequest.type === TransactionType.Script) {
      this.transactionRequest.abis = getAbisFromAllCalls(this.functionInvocationScopes);
    }
  }

  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  protected checkGasLimitTotal() {
    const gasLimitOnCalls = this.calls.reduce((total, call) => total.add(call.gas || 0), bn(0));

    if (this.transactionRequest.gasLimit.eq(0)) {
      this.transactionRequest.gasLimit = gasLimitOnCalls;
    } else if (gasLimitOnCalls.gt(this.transactionRequest.gasLimit)) {
      throw new FuelError(
        ErrorCode.TRANSACTION_ERROR,
        "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
      );
    }
  }

  /**
   * Gets the transaction cost for dry running the transaction.
   *
   * @returns The transaction cost details.
   *
   * @deprecated Use contract.fundWithRequiredCoins instead
   * Check the migration guide https://docs.fuel.network/docs/fuels-ts/transactions/assemble-tx-migration-guide/ for more information.
   */
  async getTransactionCost(): Promise<TransactionCost> {
    const request = clone(await this.getTransactionRequest());
    const account: AbstractAccount =
      this.program.account ?? Wallet.generate({ provider: this.getProvider() });
    return account.getTransactionCost(request, {
      quantities: this.getRequiredCoins(),
      signatureCallback: this.addSignersCallback,
    });
  }

  /**
   * Funds the transaction request with the required coins and returns it.
   *
   * @returns The transaction request.
   */
  async fundWithRequiredCoins(): Promise<ScriptTransactionRequest> {
    let request = await this.getTransactionRequest();
    request = clone(request);

    // eslint-disable-next-line prefer-const
    let { feePayerAccount, accountCoinQuantities, ...restAssembleTxParams } =
      this.assembleTxParameters ?? {};

    request.maxFee = bn(0);
    request.gasLimit = bn(0);

    const provider = this.getProvider();
    const account = (this.program.account ?? Wallet.generate({ provider })) as Account;
    const baseAssetId = await provider.getBaseAssetId();

    if (!feePayerAccount) {
      feePayerAccount = account;
    }

    if (!accountCoinQuantities) {
      const outputQuantities = request.outputs
        .filter((o) => o.type === OutputType.Coin)
        .map(({ amount, assetId }) => ({ assetId: String(assetId), amount: bn(amount) }));

      accountCoinQuantities = mergeQuantities(outputQuantities, this.requiredCoins);

      if (!accountCoinQuantities.length) {
        accountCoinQuantities.push({ assetId: baseAssetId, amount: bn(0) });
      }
    }

    // eslint-disable-next-line prefer-const
    let { assembledRequest, gasPrice } = await provider.assembleTx({
      request,
      feePayerAccount,
      accountCoinQuantities,
      ...restAssembleTxParams,
    });

    assembledRequest = assembledRequest as ScriptTransactionRequest;

    await setAndValidateGasAndFeeForAssembledTx({
      gasPrice,
      provider,
      transactionRequest: assembledRequest,
      setGasLimit: this.txParameters?.gasLimit,
      setMaxFee: this.txParameters?.maxFee,
    });

    return assembledRequest;
  }

  /**
   * @deprecated - Should be removed with `addSigners`
   */
  private async legacyFundWithRequiredCoins(): Promise<ScriptTransactionRequest> {
    let transactionRequest = await this.getTransactionRequest();
    transactionRequest = clone(transactionRequest);

    const txCost = await this.getTransactionCost();
    const { gasUsed, missingContractIds, outputVariables, maxFee } = txCost;
    this.setDefaultTxParams(transactionRequest, gasUsed, maxFee);

    // Adding missing contract ids
    missingContractIds.forEach((contractId) => {
      transactionRequest.addContractInputAndOutput(new Address(contractId));
    });

    // Adding required number of OutputVariables
    transactionRequest.addVariableOutputs(outputVariables);

    await this.program.account?.fund(transactionRequest, txCost);

    if (this.addSignersCallback) {
      await this.addSignersCallback(transactionRequest);
    }
    return transactionRequest;
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

    request.tip = bn(txParams.tip || request.tip);
    request.gasLimit = bn(txParams.gasLimit || request.gasLimit);
    request.maxFee = txParams.maxFee ? bn(txParams.maxFee) : request.maxFee;
    request.witnessLimit = txParams.witnessLimit ? bn(txParams.witnessLimit) : request.witnessLimit;
    request.maturity = txParams.maturity || request.maturity;
    request.expiration = txParams.expiration || request.expiration;

    request.addVariableOutputs(this.txParameters?.variableOutputs || 0);

    return this;
  }

  /**
   * Sets the transaction parameters.
   *
   * @param assembleTxParams - The assembleTx parameters to set when invoking the `provider.assembleTx` method.
   * @returns The current instance of the class.
   */
  assembleTxParams(txParams: Partial<Omit<AssembleTxParams, 'request'>>) {
    this.assembleTxParameters = txParams;
    return this;
  }

  /**
   * Adds contracts to the invocation scope.
   *
   * @param contracts - An array of contracts to add.
   * @returns The current instance of the class.
   */
  addContracts(contracts: Array<AbstractContract | string>) {
    contracts.forEach((contract) => {
      if (typeof contract === 'string') {
        this.transactionRequest.addContractInputAndOutput(new Address(contract));
      } else {
        this.transactionRequest.addContractInputAndOutput(contract.id);
        this.externalAbis[contract.id.toB256()] = contract.interface.jsonAbi;
      }
    });
    return this;
  }

  /**
   * Adds an asset transfer to an Account on the contract call transaction request.
   *
   * @param transferParams - The object representing the transfer to be made.
   * @returns The current instance of the class.
   */
  addTransfer(transferParams: TransferParams) {
    const { amount, destination, assetId } = transferParams;
    this.transactionRequest = this.transactionRequest.addCoinOutput(
      new Address(destination),
      amount,
      assetId
    );

    return this;
  }

  /**
   * Adds multiple transfers to the contract call transaction request.
   *
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @returns The current instance of the class.
   */
  addBatchTransfer(transferParams: TransferParams[]) {
    transferParams.forEach(({ destination, amount, assetId }) => {
      this.transactionRequest = this.transactionRequest.addCoinOutput(
        new Address(destination),
        amount,
        assetId
      );
    });

    return this;
  }

  /**
   * Adds signers to the transaction request.
   *
   * @param signers - The signers to add.
   * @returns The current instance of the class.
   *
   * @deprecated This method is deprecated and will be removed in a future versions.
   * All signatures should be manually added to the transaction request witnesses. If your
   * Sway program relies on in-code signature validation, visit this guide:
   * https://docs.fuel.network/docs/fuels-ts/cookbook/sway-script-with-signature-validation/
   */
  addSigners(signers: Account | Account[]) {
    this.addSignersCallback = (transactionRequest) =>
      transactionRequest.addAccountWitnesses(signers);

    return this;
  }

  /**
   * Prepares and returns the transaction request object.
   *
   * @returns The prepared transaction request.
   */
  async getTransactionRequest(): Promise<ScriptTransactionRequest> {
    await this.prepareTransaction();
    return this.transactionRequest;
  }

  /**
   * Sets the transaction request. Useful when you have used `getTransactionRequest` or
   * `fundWithRequiredCoins` from the scope to apply customizations to the transaction request.
   *
   * @param request - The transaction request to set.
   * @returns The current instance of the class.
   */
  fromRequest(request: ScriptTransactionRequest) {
    this.transactionRequest = request;
    return this;
  }

  /**
   * Submits the contract call transaction and returns a promise that resolves to an object
   * containing the transaction ID and a function to wait for the result. The promise will resolve
   * as soon as the transaction is submitted to the node.
   *
   * @param params - Optional parameters for the call.
   * - `skipAssembleTx`: A boolean indicating whether to skip assembling the transaction. This is useful
   *   when customizations were made to the transaction request using the `assembleTx` method.
   *
   * @returns A promise that resolves to an object containing:
   * - `transactionId`: The ID of the submitted transaction.
   * - `waitForResult`: A function that waits for the transaction result.
   * - `waitForPreConfirmation`: A function that waits for the transaction pre-confirmation.
   * @template T - The type of the return value.
   */
  async call<T = TReturn>(params?: {
    skipAssembleTx?: boolean;
  }): Promise<{
    transactionId: string;
    waitForResult: () => Promise<FunctionResult<T>>;
    waitForPreConfirmation: () => Promise<PreConfirmationFunctionResult<T>>;
  }> {
    assert(this.program.account, 'Wallet is required!');

    let transactionRequest = await this.getTransactionRequest();

    const skipAssembleTx = params?.skipAssembleTx;

    if (!skipAssembleTx) {
      if (this.addSignersCallback) {
        transactionRequest = await this.legacyFundWithRequiredCoins();
      } else {
        transactionRequest = await this.fundWithRequiredCoins();
      }
    }

    const response = (await this.program.account.sendTransaction(transactionRequest, {
      estimateTxDependencies: false,
    })) as TransactionResponse;

    const transactionId = response.id;

    return {
      transactionId,
      waitForResult: async () =>
        buildFunctionResult<T>({
          funcScope: this.functionInvocationScopes,
          isMultiCall: this.isMultiCall,
          program: this.program,
          transactionResponse: response,
        }),
      waitForPreConfirmation: async () =>
        buildPreConfirmationFunctionResult<T>({
          funcScope: this.functionInvocationScopes,
          isMultiCall: this.isMultiCall,
          program: this.program,
          transactionResponse: response,
        }),
    };
  }

  /**
   * Simulates a transaction.
   *
   * @returns The result of the invocation call.
   */
  async simulate<T = TReturn>(): Promise<DryRunResult<T>> {
    assert(this.program.account, 'Wallet is required!');

    if (!('populateTransactionWitnessesSignature' in this.program.account)) {
      throw new FuelError(
        ErrorCode.ABI_MAIN_METHOD_MISSING,
        'An unlocked wallet is required to simulate a contract call.'
      );
    }
    const transactionRequest = await this.fundWithRequiredCoins();

    const callResult = await this.program.account.simulateTransaction(transactionRequest, {
      estimateTxDependencies: false,
    });

    return buildDryRunResult<T>({
      funcScopes: this.functionInvocationScopes,
      callResult,
      isMultiCall: this.isMultiCall,
    });
  }

  /**
   * Executes a transaction in dry run mode.
   *
   * @returns The result of the invocation call.
   *
   * @deprecated Use .get instead
   */
  async dryRun<T = TReturn>(): Promise<DryRunResult<T>> {
    const { receipts } = await this.getTransactionCost();

    const callResult: CallResult = {
      receipts,
    };

    return buildDryRunResult<T>({
      funcScopes: this.functionInvocationScopes,
      callResult,
      isMultiCall: this.isMultiCall,
    });
  }

  async get<T = TReturn>(): Promise<DryRunResult<T>> {
    let request = await this.getTransactionRequest();
    request = clone(request);

    request.maxFee = bn(0);
    request.gasLimit = bn(0);

    request.inputs = request.inputs.filter((i) => i.type !== InputType.Coin);

    const provider = this.getProvider();
    const account = (this.program.account ?? Wallet.generate({ provider })) as Account;
    const baseAssetId = await provider.getBaseAssetId();

    const allQuantities = request.outputs
      .filter((o) => o.type === OutputType.Coin)
      .map(({ amount, assetId }) => ({ assetId: String(assetId), amount: bn(amount) }))
      .concat(this.requiredCoins);

    const resources = account.generateFakeResources(allQuantities);
    const utxoForBaseAssetId = resources.find((utxo) => utxo.assetId === baseAssetId);
    const amountForFee = bn('1000000000000000');

    if (!utxoForBaseAssetId) {
      const [baseAssetResource] = account.generateFakeResources([
        { assetId: baseAssetId, amount: amountForFee },
      ]);
      resources.push(baseAssetResource);
    } else {
      utxoForBaseAssetId.amount = utxoForBaseAssetId.amount.add(amountForFee);
    }

    request.addResources(resources);

    const { receipts } = await provider.assembleTx({
      request,
      feePayerAccount: account,
    });

    return buildDryRunResult<T>({
      funcScopes: this.functionInvocationScopes,
      callResult: { receipts },
      isMultiCall: this.isMultiCall,
    });
  }

  getProvider(): Provider {
    const provider = <Provider>this.program.provider;

    return provider;
  }

  /**
   * In case the gasLimit is *not* set by the user, this method sets a default value.
   */
  private setDefaultTxParams(
    transactionRequest: ScriptTransactionRequest,
    gasUsed: BN,
    maxFee: BN
  ) {
    const gasLimitSpecified = isDefined(this.txParameters?.gasLimit) || this.hasCallParamsGasLimit;
    const maxFeeSpecified = isDefined(this.txParameters?.maxFee);

    const { gasLimit: setGasLimit, maxFee: setMaxFee } = transactionRequest;

    if (!gasLimitSpecified) {
      transactionRequest.gasLimit = gasUsed;
    } else if (setGasLimit.lt(gasUsed)) {
      throw new FuelError(
        ErrorCode.GAS_LIMIT_TOO_LOW,
        `Gas limit '${setGasLimit}' is lower than the required: '${gasUsed}'.`
      );
    }

    if (!maxFeeSpecified) {
      transactionRequest.maxFee = maxFee;
    } else if (maxFee.gt(setMaxFee)) {
      throw new FuelError(
        ErrorCode.MAX_FEE_TOO_LOW,
        `Max fee '${setMaxFee}' is lower than the required: '${maxFee}'.`
      );
    }
  }
}
