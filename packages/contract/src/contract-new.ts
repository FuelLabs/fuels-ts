/* eslint-disable max-classes-per-file */

import type { FunctionFragment, InputValue, JsonAbi } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { AbstractContract } from '@fuel-ts/interfaces';
import type { BigNumberish } from '@fuel-ts/math';
import { toBigInt } from '@fuel-ts/math';
import type {
  CallResult,
  CoinQuantity,
  CoinQuantityLike,
  TransactionRequest,
  TransactionResponse,
  TransactionResult,
} from '@fuel-ts/providers';
import { coinQuantityfy, ScriptTransactionRequest, Provider } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';

import { contractCallScript } from './scripts';

type CallParams = Partial<{
  forward: CoinQuantityLike;
  gasLimit: BigNumberish;
}>;

type TxParams = Partial<{
  bytePrice: BigNumberish;
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  variableOutputs: number;
}>;

class FunctionCallResult<T = any> {
  functionScope: FunctionInvocationScope;
  callResult: CallResult;

  constructor(funcScope: FunctionInvocationScope, callResult: CallResult) {
    this.functionScope = funcScope;
    this.callResult = callResult;
  }

  static async build(funcScope: FunctionInvocationScope, callResult: CallResult) {
    const fnResult = new FunctionCallResult(funcScope, callResult);
    return fnResult;
  }

  get value() {
    const { contract, func } = this.functionScope.getCallConfig();
    const encodedResults = contractCallScript.decodeCallResult(this.callResult);
    const encodedResult = encodedResults[0];
    const returnValue = contract.interface.decodeFunctionResult(func, encodedResult)?.[0];

    return returnValue as T;
  }
}

class FunctionInvocationResult<T = any> {
  functionScope: FunctionInvocationScope;
  transactionResponse: TransactionResponse;
  transactionResult: TransactionResult<any>;

  constructor(
    funcScope: FunctionInvocationScope,
    transactionResponse: TransactionResponse,
    transactionResult: TransactionResult<any>
  ) {
    this.functionScope = funcScope;
    this.transactionResponse = transactionResponse;
    this.transactionResult = transactionResult;
  }

  static async build(funcScope: FunctionInvocationScope, transactionResponse: TransactionResponse) {
    const txResult = await transactionResponse.waitForResult();
    const fnResult = new FunctionInvocationResult(funcScope, transactionResponse, txResult);
    return fnResult;
  }

  get value() {
    const { contract, func } = this.functionScope.getCallConfig();
    const encodedResults = contractCallScript.decodeCallResult(this.transactionResult);
    const encodedResult = encodedResults[0];
    const returnValue = contract.interface.decodeFunctionResult(func, encodedResult)?.[0];

    return returnValue as T;
  }
}

type CallOptions = Partial<{
  fundTransaction: boolean;
  returnResult: boolean;
}>;
type CallOptionsResult = CallOptions & {
  returnResult: true;
};

class FunctionInvocationScope {
  transactionRequest: ScriptTransactionRequest;
  private func: FunctionFragment;
  private contract: Contract;
  private callParameters?: CallParams;
  private txParameters?: TxParams;
  private forward?: CoinQuantity;
  private args: Array<unknown> = [];

  constructor(contract: Contract, func: FunctionFragment, args: Array<unknown>) {
    this.func = func;
    this.contract = contract;
    this.transactionRequest = new ScriptTransactionRequest({
      gasLimit: 1000000,
    });
    this.transactionRequest.addContract(this.contract);
    this.setArguments(args);
  }

  getCallConfig() {
    return {
      func: this.func,
      contract: this.contract,
      callParameters: this.callParameters,
      txParameters: this.txParameters,
      forward: this.forward,
      args: this.args,
    };
  }

  setArguments(args: Array<unknown>) {
    this.args = args || [];

    // Set data on transactionRequest
    const data = this.contract.interface.encodeFunctionData(
      this.func,
      this.args as Array<InputValue>
    );
    this.transactionRequest.setScript(contractCallScript, [
      {
        contractId: this.contract.id,
        data,
        assetId: this.forward?.assetId,
        amount: this.forward?.amount,
        gas: this.txParameters?.gasLimit,
      },
    ]);

    return this;
  }

  async addRequiredCoins() {
    const coinsOnTransaction = [this.forward, [1]].filter((i) => !!i) as CoinQuantityLike[];
    const coins = await this.contract.wallet?.getCoinsToSpend(coinsOnTransaction);
    this.transactionRequest.addCoins(coins || []);
    return this;
  }

  callParams(callParams: CallParams) {
    this.callParameters = callParams;

    if (callParams?.forward) {
      this.forward = coinQuantityfy(callParams.forward);
      // Update transaction script with new forward params
      this.setArguments(this.args);
    }

    return this;
  }

  txParams(txParams: TxParams) {
    this.txParameters = txParams;
    const request = this.transactionRequest;

    request.gasLimit = toBigInt(txParams.gasLimit || request.gasLimit);
    request.gasPrice = toBigInt(txParams.gasPrice || request.gasPrice);
    request.bytePrice = toBigInt(txParams.bytePrice || request.bytePrice);
    request.addVariableOutputs(this.txParameters?.variableOutputs || 0);

    // Update transaction script with new forward params
    this.setArguments(this.args);

    return this;
  }

  private static getCallOptions(options?: CallOptions) {
    return { fundTransaction: true, returnResult: false, ...options };
  }

  async call<T = any>(options?: CallOptionsResult): Promise<FunctionInvocationResult<T>>;
  async call<T = any>(options?: CallOptions): Promise<T> {
    const opts = FunctionInvocationScope.getCallOptions(options);
    if (!this.contract.wallet) {
      throw new Error('Wallet is required!');
    }
    if (opts.fundTransaction) {
      await this.addRequiredCoins();
    }
    const response = await this.contract.wallet?.sendTransaction(this.transactionRequest);
    const result = await FunctionInvocationResult.build(this, response);

    return opts.returnResult ? result : result.value;
  }

  async simulate<T = any>(options?: CallOptionsResult): Promise<FunctionInvocationResult<T>>;
  async simulate<T = any>(options?: CallOptions): Promise<T> {
    const opts = FunctionInvocationScope.getCallOptions(options);
    if (!this.contract.wallet) {
      throw new Error('Wallet is required!');
    }
    if (opts.fundTransaction) {
      await this.addRequiredCoins();
    }
    const response = await this.contract.wallet.simulateTransaction(this.transactionRequest);
    const result = await FunctionCallResult.build(this, response);

    return opts.returnResult ? result : result.value;
  }

  // simulate() {
  //   return new FunctionInvocationResult();
  // }

  // dryRun() {
  //   return new FunctionInvocationResult();
  // }
}

interface Methods {
  [key: string]: (...args: Array<unknown>) => FunctionInvocationScope;
}

export default class Contract extends AbstractContract {
  interface!: Interface;
  id!: string;
  provider!: Provider | null;
  wallet!: Wallet | null;
  transaction?: string;
  request?: TransactionRequest;
  functions: Methods = {};

  constructor(
    id: string,
    abi: JsonAbi | Interface,
    walletOrProvider: Wallet | Provider | null = null,
    transactionId?: string,
    request?: TransactionRequest
  ) {
    super();
    this.interface = abi instanceof Interface ? abi : new Interface(abi);
    this.id = id;
    this.transaction = transactionId;
    this.request = request;

    if (walletOrProvider instanceof Wallet) {
      this.provider = walletOrProvider.provider;
      this.wallet = walletOrProvider;
    } else if (walletOrProvider instanceof Provider) {
      this.provider = walletOrProvider;
      this.wallet = null;
    } else {
      this.provider = null;
      this.wallet = null;
    }

    Object.keys(this.interface.functions).forEach((name) => {
      const fragment = this.interface.getFunction(name);
      Object.defineProperty(this.functions, fragment.name, {
        value: this.buildFunction(fragment),
        writable: false,
      });
    });
  }

  buildFunction(func: FunctionFragment) {
    return (...args: Array<unknown>) => new FunctionInvocationScope(this, func, args);
  }
}
