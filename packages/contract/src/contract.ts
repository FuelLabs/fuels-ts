/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@ethersproject/logger';
import { Interface } from '@fuel-ts/abi-coder';
import type { FunctionFragment, JsonAbi } from '@fuel-ts/abi-coder';
import { AbstractContract } from '@fuel-ts/interfaces';
import type { BigNumberish } from '@fuel-ts/math';
import type { CoinQuantityLike, TransactionRequest } from '@fuel-ts/providers';
import { coinQuantityfy, ScriptTransactionRequest, Provider } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';

import { contractCallScript } from './scripts';

type ContractFunction<T = any> = (...args: Array<any>) => Promise<T>;

export type Overrides = Partial<{
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  bytePrice: BigNumberish;
  maturity: BigNumberish;
  forward: CoinQuantityLike;
  variableOutputs: number;
  transformRequest?: (
    transactionRequest: ScriptTransactionRequest
  ) => Promise<ScriptTransactionRequest>;
}>;

const logger = new Logger(process.env.BUILD_VERSION || '~');

const getOverrides = (func: FunctionFragment, args: Array<any>) => {
  let options: Overrides = {};
  if (args.length === func.inputs.length + 1 && typeof args[args.length - 1] === 'object') {
    options = args.pop();
  }
  return options;
};

export const buildTransaction = async (
  contract: Contract,
  func: FunctionFragment,
  args: Array<any>,
  options?: {
    fundTransaction: boolean;
  }
): Promise<ScriptTransactionRequest> => {
  const overrides = getOverrides(func, args);
  const data = contract.interface.encodeFunctionData(func, args);
  const request = new ScriptTransactionRequest({
    gasLimit: 1000000,
    ...overrides,
  });
  const forwardQuantity = overrides.forward && coinQuantityfy(overrides.forward);
  request.setScript(contractCallScript, {
    contractId: contract.id,
    data,
    assetId: forwardQuantity?.assetId,
    amount: forwardQuantity?.amount,
  });
  request.addContract(contract);
  if (overrides.variableOutputs) {
    request.addVariableOutputs(overrides.variableOutputs);
  }

  // Keep a list of coins we need to input to this transaction
  const requiredCoinQuantities: CoinQuantityLike[] = [];

  if (forwardQuantity) {
    requiredCoinQuantities.push(forwardQuantity);
  }

  // If fundTransaction is true we add amount of
  // native coins needed to fund the gasFee for the transaction
  if (options?.fundTransaction) {
    const amount = request.calculateFee();
    requiredCoinQuantities.push([amount]);
  }

  // Get and add required coins to the transaction
  if (requiredCoinQuantities.length) {
    if (!contract.wallet) {
      throw new Error('Cannot get coins without a wallet');
    }

    const coins = await contract.wallet.getCoinsToSpend(requiredCoinQuantities);
    request.addCoins(coins);
  }

  // Enable user to transform the request right
  // before send transaction
  if (typeof overrides.transformRequest === 'function') {
    return overrides.transformRequest(request);
  }

  return request;
};

const prepareTransaction = (contract: Contract, func: FunctionFragment): ContractFunction =>
  async function submitTransaction(...args: Array<any>): Promise<any> {
    const request = await buildTransaction(contract, func, args, {
      fundTransaction: true,
    });
    return request;
  };

const buildDryRunTransaction = (
  contract: Contract,
  func: FunctionFragment,
  utxoValidation = false
): ContractFunction =>
  async function dryRunTransaction(...args: Array<any>): Promise<any> {
    if (!contract.provider) {
      return logger.throwArgumentError(
        'Cannot call without provider',
        'provider',
        contract.provider
      );
    }

    const request = await buildTransaction(contract, func, args);
    // TODO: Split dryRun into different instances with utxoValidation on and off
    // The utxoValidation on instance should also required wallet and fund the tx
    const result = await contract.provider.call(request, {
      utxoValidation,
    });
    return result;
  };

const buildDryRun = (contract: Contract, func: FunctionFragment): ContractFunction =>
  async function dryRun(...args: Array<any>): Promise<any> {
    const result = await buildDryRunTransaction(contract, func).apply(contract, args);
    const encodedResult = contractCallScript.decodeCallResult(result);
    const returnValue = contract.interface.decodeFunctionResult(func, encodedResult)[0];

    return returnValue;
  };

const buildSubmitTransaction = (contract: Contract, func: FunctionFragment): ContractFunction =>
  async function submitTransaction(...args: Array<any>): Promise<any> {
    if (!contract.wallet) {
      return logger.throwArgumentError('Cannot call without wallet', 'wallet', contract.wallet);
    }

    const request = await buildTransaction(contract, func, args, {
      fundTransaction: true,
    });
    const response = await contract.wallet.sendTransaction(request);
    const result = await response.waitForResult();
    return result;
  };

const buildSubmit = (contract: Contract, func: FunctionFragment): ContractFunction =>
  async function submit(...args: Array<any>): Promise<any> {
    const result = await buildSubmitTransaction(contract, func).apply(contract, args);
    const encodedResult = contractCallScript.decodeCallResult(result);
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
  dryRun!: { [key: string]: any };
  dryRunResult!: { [key: string]: any };
  submit!: { [key: string]: any };
  submitResult!: { [key: string]: any };
  prepareCall!: { [key: string]: any };
  simulate!: { [key: string]: any };

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
    Object.keys(this.interface.functions).forEach((name) => {
      const fragment = this.interface.getFunction(name);
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
      Object.defineProperty(this.prepareCall, fragment.name, {
        value: prepareTransaction(this, fragment),
        writable: false,
      });
      Object.defineProperty(this.simulate, fragment.name, {
        value: buildDryRunTransaction(this, fragment, true),
        writable: false,
      });
    });
  }
}
