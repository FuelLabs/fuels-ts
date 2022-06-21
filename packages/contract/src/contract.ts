/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@ethersproject/logger';
import { Interface } from '@fuel-ts/abi-coder';
import type { FunctionFragment, JsonAbi } from '@fuel-ts/abi-coder';
import { AbstractContract } from '@fuel-ts/interfaces';
import type { BigNumberish } from '@fuel-ts/math';
import type {
  CallResult,
  CoinQuantityLike,
  TransactionRequest,
  TransactionResult,
} from '@fuel-ts/providers';
import { coinQuantityfy, ScriptTransactionRequest, Provider } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';

import { contractCallScript } from './scripts';
import type { ContractCall as MulticallCall } from './scripts';

const logger = new Logger(process.env.BUILD_VERSION || '~');

type ContractFunction<T = any> = (...args: Array<any>) => Promise<T>;

type ContractCallOptions = Partial<{
  gasLimit: BigNumberish;
  forward: CoinQuantityLike;
  variableOutputs: number;
}>;

export type ContractCall = {
  contract: Contract;
  func: FunctionFragment;
  args: Array<any>;
  options: ContractCallOptions;
};

const buildMulticallCall = (
  contract: Contract,
  func: FunctionFragment,
  args: Array<any>,
  options: ContractCallOptions = {}
): MulticallCall => {
  const data = contract.interface.encodeFunctionData(func, args);
  const forwardQuantity = options.forward && coinQuantityfy(options.forward);
  const call = {
    contractId: contract.id,
    data,
    assetId: forwardQuantity?.assetId,
    amount: forwardQuantity?.amount,
    gas: options.gasLimit,
  };
  return call;
};

export type TransactionOverrides = Partial<{
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  bytePrice: BigNumberish;
  maturity: BigNumberish;
  transformRequest?: (
    transactionRequest: ScriptTransactionRequest
  ) => Promise<ScriptTransactionRequest>;
}>;

export type Overrides = ContractCallOptions & TransactionOverrides;

const splitFnArgs = <TRest extends Array<any>>(
  func: FunctionFragment,
  args: Array<any>
): [Array<any>, ...TRest] => {
  const fnArgs = args.slice(0, func.inputs.length);
  const rest = args.slice(func.inputs.length) as TRest;
  return [fnArgs, ...rest];
};

export type BuildTransactionOptions = Partial<{
  fundTransaction: boolean;
}> &
  TransactionOverrides;

export const buildTransaction = async (
  calls: ContractCall[],
  options: BuildTransactionOptions = {}
): Promise<ScriptTransactionRequest> => {
  const { fundTransaction, ...overrides } = options;

  // Keep a lists of things we need for the transaction
  const requiredContracts = new Set<Contract>();
  let requiredGasLimit = 0;
  const requiredForwards = new Map<Wallet, CoinQuantityLike[]>();
  const pushRequiredForward = (wallet: Wallet, forward: CoinQuantityLike) => {
    requiredForwards.set(wallet, [...(requiredForwards.get(wallet) ?? []), forward]);
  };
  let requiredVariableOutputs = 0;

  // Build MulticallCalls
  const multicallCalls = [] as MulticallCall[];
  for (const call of calls) {
    requiredContracts.add(call.contract);

    if (call.options.gasLimit) {
      requiredGasLimit += Number(call.options.gasLimit);
    }

    const forward = call.options.forward && coinQuantityfy(call.options.forward);
    if (forward) {
      const wallet = call.contract.wallet;
      if (!wallet) {
        throw new Error('Cannot get coins without a wallet');
      }
      pushRequiredForward(wallet, forward);
    }

    if (call.options.variableOutputs) {
      requiredVariableOutputs += call.options.variableOutputs;
    }

    multicallCalls.push(buildMulticallCall(call.contract, call.func, call.args, call.options));
  }

  // Check gasLimit
  const gasLimit = overrides.gasLimit ?? 1000000;
  if (gasLimit < requiredGasLimit) {
    throw new Error(
      `Gas limit ${gasLimit} is insufficient for the transaction, at least ${requiredGasLimit} is required.`
    );
  }

  const request = new ScriptTransactionRequest({
    gasLimit,
    ...overrides,
  });

  request.setScript(contractCallScript, multicallCalls);
  for (const contract of requiredContracts) {
    request.addContract(contract);
  }
  if (requiredVariableOutputs) {
    request.addVariableOutputs(requiredVariableOutputs);
  }

  // If fundTransaction is true we add amount of
  // native coins needed to fund the gasFee for the transaction
  if (options?.fundTransaction) {
    const fundingWallet = calls[0].contract.wallet;
    if (!fundingWallet) {
      throw new Error('Cannot fund transaction without a wallet');
    }
    const amount = request.calculateFee();
    pushRequiredForward(fundingWallet, [amount]);
  }

  // Get and add required coins to the transaction
  for (const [wallet, forwards] of requiredForwards) {
    const coins = await wallet.getCoinsToSpend(forwards);
    request.addCoins(coins);
  }

  // Enable user to transform the request right
  // before send transaction
  if (typeof overrides.transformRequest === 'function') {
    return overrides.transformRequest(request);
  }

  return request;
};

const buildPrepareCall = (
  contract: Contract,
  func: FunctionFragment
): ((...args: Array<any>) => ContractCall) =>
  function prepareCall(...args: Array<any>): ContractCall {
    const [fnArgs, callOptions = {}] = splitFnArgs<[ContractCallOptions?]>(func, args);
    const call = {
      contract,
      func,
      args: fnArgs,
      options: callOptions,
    };
    return call;
  };

const buildDryRunTransaction = (
  contract: Contract,
  func: FunctionFragment
): ContractFunction<CallResult> =>
  async function dryRunTransaction(...args: Array<any>): Promise<any> {
    if (!contract.provider) {
      return logger.throwArgumentError(
        'Cannot call without provider',
        'provider',
        contract.provider
      );
    }

    const [fnArgs, overrides = {}] = splitFnArgs<[Overrides?]>(func, args);
    const call = {
      contract,
      func,
      args: fnArgs,
      options: overrides,
    };
    const request = await buildTransaction([call], overrides);
    const result = await contract.provider.call(request, {
      utxoValidation: false,
    });
    return result;
  };

const buildDryRun = (contract: Contract, func: FunctionFragment): ContractFunction<any> =>
  async function dryRun(...args: Array<any>): Promise<any> {
    const result = await buildDryRunTransaction(contract, func).apply(contract, args);
    const encodedResults = contractCallScript.decodeCallResult(result);
    const encodedResult = encodedResults[0];
    const returnValue = contract.interface.decodeFunctionResult(func, encodedResult)[0];

    return returnValue;
  };

const buildSubmitTransaction = (
  contract: Contract,
  func: FunctionFragment
): ContractFunction<TransactionResult<any>> =>
  async function submitTransaction(...args: Array<any>): Promise<any> {
    if (!contract.wallet) {
      return logger.throwArgumentError('Cannot call without wallet', 'wallet', contract.wallet);
    }

    const [fnArgs, overrides = {}] = splitFnArgs<[Overrides?]>(func, args);
    const call = {
      contract,
      func,
      args: fnArgs,
      options: overrides,
    };
    const request = await buildTransaction([call], {
      ...overrides,
      fundTransaction: true,
    });
    const response = await contract.wallet.sendTransaction(request);
    const result = await response.waitForResult();
    return result;
  };

const buildSubmit = (contract: Contract, func: FunctionFragment): ContractFunction<any> =>
  async function submit(...args: Array<any>): Promise<any> {
    const result = await buildSubmitTransaction(contract, func).apply(contract, args);
    const encodedResults = contractCallScript.decodeCallResult(result);
    const encodedResult = encodedResults[0];
    const returnValue = contract.interface.decodeFunctionResult(func, encodedResult)?.[0];

    return returnValue;
  };

const buildSimulateTransaction = (
  contract: Contract,
  func: FunctionFragment
): ContractFunction<CallResult> =>
  async function submitTransaction(...args: Array<any>): Promise<any> {
    if (!contract.wallet) {
      return logger.throwArgumentError('Cannot call without wallet', 'wallet', contract.wallet);
    }

    const [fnArgs, overrides = {}] = splitFnArgs<[Overrides?]>(func, args);
    const call = {
      contract,
      func,
      args: fnArgs,
      options: overrides,
    };
    const request = await buildTransaction([call], {
      ...overrides,
      fundTransaction: true,
    });
    return contract.wallet.simulateTransaction(request);
  };

const buildSimulate = (contract: Contract, func: FunctionFragment): ContractFunction<any> =>
  async function simulate(...args: Array<any>): Promise<any> {
    const result = await buildSimulateTransaction(contract, func).apply(contract, args);
    const encodedResults = contractCallScript.decodeCallResult(result);
    const encodedResult = encodedResults[0];
    const returnValue = contract.interface.decodeFunctionResult(func, encodedResult)?.[0];

    return returnValue;
  };

export default class Contract extends AbstractContract {
  interface!: Interface;
  id!: string;
  provider!: Provider | null;
  wallet!: Wallet | null;
  transaction?: string;
  request?: TransactionRequest;
  // Keyable functions
  prepareCall!: { [key: string]: (...args: any[]) => ContractCall };
  dryRun!: { [key: string]: ContractFunction<any> };
  dryRunResult!: { [key: string]: ContractFunction<CallResult> };
  submit!: { [key: string]: ContractFunction<any> };
  submitResult!: { [key: string]: ContractFunction<TransactionResult<any>> };
  simulate!: { [key: string]: ContractFunction<any> };
  simulateResult!: { [key: string]: ContractFunction<CallResult> };

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

    this.dryRun = {};
    this.dryRunResult = {};
    this.submit = {};
    this.submitResult = {};
    this.prepareCall = {};
    this.simulate = {};
    this.simulateResult = {};

    Object.keys(this.interface.functions).forEach((name) => {
      const fragment = this.interface.getFunction(name);
      Object.defineProperty(this.prepareCall, fragment.name, {
        value: buildPrepareCall(this, fragment),
        writable: false,
      });
      Object.defineProperty(this.submit, fragment.name, {
        value: buildSubmit(this, fragment),
        writable: false,
      });
      Object.defineProperty(this.submitResult, fragment.name, {
        value: buildSubmitTransaction(this, fragment),
        writable: false,
      });
      Object.defineProperty(this.dryRun, fragment.name, {
        value: buildDryRun(this, fragment),
        writable: false,
      });
      Object.defineProperty(this.dryRunResult, fragment.name, {
        value: buildDryRunTransaction(this, fragment),
        writable: false,
      });
      Object.defineProperty(this.simulateResult, fragment.name, {
        value: buildSimulateTransaction(this, fragment),
        writable: false,
      });
      Object.defineProperty(this.simulate, fragment.name, {
        value: buildSimulate(this, fragment),
        writable: false,
      });
    });
  }

  async dryRunMulticall(
    calls: ContractCall[],
    options: BuildTransactionOptions = {}
  ): Promise<any[]> {
    if (!this.provider) {
      return logger.throwArgumentError('Cannot call without provider', 'provider', this.provider);
    }
    const request = await buildTransaction(calls, options);
    const result = await this.provider.call(request, {
      utxoValidation: false,
    });
    const encodedResults = contractCallScript.decodeCallResult(result);
    const returnValues = encodedResults.map((encodedResult, i) => {
      const func = calls[i].func;
      return this.interface.decodeFunctionResult(func, encodedResult)?.[0];
    });
    return returnValues;
  }

  async submitMulticall(
    calls: ContractCall[],
    options: BuildTransactionOptions = {}
  ): Promise<any[]> {
    if (!this.wallet) {
      return logger.throwArgumentError('Cannot call without wallet', 'wallet', this.wallet);
    }
    const request = await buildTransaction(calls, {
      fundTransaction: true,
      ...options,
    });
    const response = await this.wallet.sendTransaction(request);
    const result = await response.waitForResult();
    const encodedResults = contractCallScript.decodeCallResult(result);
    const returnValues = encodedResults.map((encodedResult, i) => {
      const func = calls[i].func;
      return this.interface.decodeFunctionResult(func, encodedResult)?.[0];
    });
    return returnValues;
  }
}
