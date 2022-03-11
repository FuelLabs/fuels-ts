/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import { hexlify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { randomBytes } from '@ethersproject/random';
import type { JsonFragment, FunctionFragment } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { NativeAssetId, ZeroBytes32 } from '@fuel-ts/constants';
import type { TransactionRequest } from '@fuel-ts/providers';
import { Provider, InputType, OutputType, TransactionType } from '@fuel-ts/providers';

import { contractCallScript } from './scripts';

type ContractFunction<T = any> = (...args: Array<any>) => Promise<T>;

export type Overrides = {
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  maturity: BigNumberish;
};

const logger = new Logger('0.0.1');

const buildCall = (contract: Contract, func: FunctionFragment): ContractFunction =>
  async function call(...args: Array<any>): Promise<any> {
    if (contract.provider === null || contract.provider === undefined) {
      return logger.throwArgumentError(
        'Cannot call without provider',
        'provider',
        contract.provider
      );
    }

    // TODO: Enable when Provider supports these parameters
    // let overrides: Overrides | void;
    // if (args.length === func.inputs.length + 1 && typeof args[args.length - 1] === 'object') {
    //   overrides = args.pop();
    // }

    const data = contract.interface.encodeFunctionData(func, args);
    const scriptResult = await contract.provider.call({
      type: TransactionType.Script,
      gasPrice: 0,
      gasLimit: 1000000,
      bytePrice: 0,
      script: contractCallScript.bytes,
      scriptData: contractCallScript.encodeScriptData([contract.id, data]),
      inputs: [
        {
          type: InputType.Contract,
          contractId: contract.id,
        },
      ],
      outputs: [
        {
          type: OutputType.Contract,
          inputIndex: 0,
        },
      ],
      witnesses: ['0x'],
    });
    const result = { ...scriptResult, data: contractCallScript.decodeScriptResult(scriptResult) };
    const returnValue = contract.interface.decodeFunctionResult(func, result.data)[0];

    return returnValue;
  };

const buildSubmit = (contract: Contract, func: FunctionFragment): ContractFunction =>
  async function submit(...args: Array<any>): Promise<any> {
    if (contract.provider === null || contract.provider === undefined) {
      return logger.throwArgumentError(
        'Cannot submit without provider',
        'provider',
        contract.provider
      );
    }

    // TODO: Enable when Provider supports these parameters
    // let overrides: Overrides | void;
    // if (args.length === func.inputs.length + 1 && typeof args[args.length - 1] === 'object') {
    //   overrides = args.pop();
    // }

    const data = contract.interface.encodeFunctionData(func, args);
    const response = await contract.provider.sendTransaction({
      type: TransactionType.Script,
      gasPrice: 0,
      gasLimit: 1000000,
      bytePrice: 0,
      script: contractCallScript.bytes,
      scriptData: contractCallScript.encodeScriptData([contract.id, data]),
      inputs: [
        {
          type: InputType.Contract,
          contractId: contract.id,
        },
        // TODO: Remove this when it becomes unnecessary
        // A dummy coin to make the transaction hash change to avoid collisions
        {
          type: InputType.Coin,
          id: `${hexlify(randomBytes(32))}00`,
          assetId: NativeAssetId,
          amount: BigNumber.from(0),
          owner: ZeroBytes32,
          witnessIndex: 0,
          maturity: 0,
          predicate: '0x',
          predicateData: '0x',
        },
      ],
      outputs: [
        {
          type: OutputType.Contract,
          inputIndex: 0,
        },
      ],
      witnesses: ['0x'],
    });

    const scriptResult = await response.wait();
    const result = { ...scriptResult, data: contractCallScript.decodeScriptResult(scriptResult) };
    const returnValue = contract.interface.decodeFunctionResult(func, result.data)?.[0];

    return returnValue;
  };

export default class Contract {
  interface!: Interface;
  id!: string;
  provider!: Provider | null;
  transaction?: string;
  request?: TransactionRequest;
  // Keyable functions
  functions!: { [key: string]: any };
  callStatic!: { [key: string]: any };

  constructor(
    id: string,
    abi: ReadonlyArray<JsonFragment> | Interface,
    signerOrProvider: Provider | null = null,
    transactionId?: string,
    request?: TransactionRequest
  ) {
    this.interface = abi instanceof Interface ? abi : new Interface(abi);
    this.id = id;
    this.transaction = transactionId;
    this.request = request;

    if (signerOrProvider === null) {
      this.provider = null;
    } else if (signerOrProvider instanceof Provider) {
      this.provider = signerOrProvider;
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
