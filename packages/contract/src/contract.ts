/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BigNumberish } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import type { JsonFragment, FunctionFragment } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { AbstractContract } from '@fuel-ts/interfaces';
import type { TransactionRequest } from '@fuel-ts/providers';
import { ScriptTransactionRequest, Provider } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';

import { contractCallScript } from './scripts';

type ContractFunction<T = any> = (...args: Array<any>) => Promise<T>;

export type Overrides = Partial<{
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  bytePrice: BigNumberish;
  maturity: BigNumberish;
  amount: BigNumberish;
  assetId: BytesLike;
  variableOutputs: number;
}>;

const logger = new Logger('0.0.1');

const getOverrides = (func: FunctionFragment, args: Array<any>) => {
  let options: Overrides = {};
  if (args.length === func.inputs.length + 1 && typeof args[args.length - 1] === 'object') {
    options = args.pop();
  }
  return options;
};

export const buildTransaction = (
  contract: Contract,
  func: FunctionFragment,
  args: Array<any>
): ScriptTransactionRequest => {
  const overrides = getOverrides(func, args);
  const data = contract.interface.encodeFunctionData(func, args);
  const request = new ScriptTransactionRequest({
    gasLimit: 1000000,
    ...overrides,
  });
  request.setScript(contractCallScript, {
    contractId: contract.id,
    data,
    assetId: overrides.assetId,
    amount: overrides.amount,
  });
  request.addContract(contract);
  request.addVariableOutputs(overrides.variableOutputs || 0);

  return request;
};

const buildCall = (contract: Contract, func: FunctionFragment): ContractFunction =>
  async function call(...args: Array<any>): Promise<any> {
    if (!contract.provider) {
      return logger.throwArgumentError(
        'Cannot call without provider',
        'provider',
        contract.provider
      );
    }

    const request = await buildTransaction(contract, func, args);
    const result = await contract.provider.call(request);
    const encodedResult = contractCallScript.decodeScriptResult(result);
    const returnValue = contract.interface.decodeFunctionResult(func, encodedResult)[0];

    return returnValue;
  };

const buildSubmit = (contract: Contract, func: FunctionFragment): ContractFunction =>
  async function submit(...args: Array<any>): Promise<any> {
    if (!contract.wallet) {
      return logger.throwArgumentError('Cannot call without wallet', 'wallet', contract.wallet);
    }

    const request = await buildTransaction(contract, func, args);
    await contract.wallet.fund(request);
    const response = await contract.wallet.sendTransaction(request);
    const result = await response.wait();
    const encodedResult = contractCallScript.decodeScriptResult(result);
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
  functions!: { [key: string]: any };
  callStatic!: { [key: string]: any };

  constructor(
    id: string,
    abi: ReadonlyArray<JsonFragment> | Interface,
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

    this.functions = {};
    this.callStatic = {};
    Object.keys(this.interface.functions).forEach((name) => {
      const fragment = this.interface.getFunction(name);
      Object.defineProperty(this.functions, fragment.name, {
        value: buildSubmit(this, fragment),
        writable: false,
      });
      Object.defineProperty(this.callStatic, fragment.name, {
        value: buildCall(this, fragment),
        writable: false,
      });
    });
  }
}
