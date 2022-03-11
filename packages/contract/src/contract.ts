/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BigNumberish } from '@ethersproject/bignumber';
import { Logger } from '@ethersproject/logger';
import type { JsonFragment, FunctionFragment } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import type { TransactionRequest } from '@fuel-ts/providers';
import { Provider, InputType, OutputType, TransactionType } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';

import { contractCallScript } from './scripts';

type ContractFunction<T = any> = (...args: Array<any>) => Promise<T>;

export type Overrides = {
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  bytePrice: BigNumberish;
  maturity: BigNumberish;
};

const logger = new Logger('0.0.1');

const buildCall = (contract: Contract, func: FunctionFragment): ContractFunction =>
  async function call(...args: Array<any>): Promise<any> {
    if (!contract.provider) {
      return logger.throwArgumentError(
        'Cannot call without provider',
        'provider',
        contract.provider
      );
    }

    let overrides: Overrides | void;
    if (args.length === func.inputs.length + 1 && typeof args[args.length - 1] === 'object') {
      overrides = args.pop();
    }

    const data = contract.interface.encodeFunctionData(func, args);
    const result = await contract.provider.call({
      type: TransactionType.Script,
      gasPrice: overrides?.gasPrice ?? 0,
      gasLimit: overrides?.gasLimit ?? 1000000,
      bytePrice: overrides?.bytePrice ?? 0,
      maturity: overrides?.maturity,
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
    });
    const encodedResult = contractCallScript.decodeScriptResult(result);
    const returnValue = contract.interface.decodeFunctionResult(func, encodedResult)[0];

    return returnValue;
  };

const buildSubmit = (contract: Contract, func: FunctionFragment): ContractFunction =>
  async function submit(...args: Array<any>): Promise<any> {
    if (!contract.wallet) {
      return logger.throwArgumentError('Cannot call without wallet', 'wallet', contract.wallet);
    }

    let overrides: Overrides | void;
    if (args.length === func.inputs.length + 1 && typeof args[args.length - 1] === 'object') {
      overrides = args.pop();
    }

    const data = contract.interface.encodeFunctionData(func, args);

    // Collect enough coins to cover the fees
    // TODO: Calculate the correct amount
    const feeAmount = 1;
    const coins = await contract.wallet.provider.getCoinsToSpend(contract.wallet.address, [
      { assetId: NativeAssetId, amount: feeAmount },
    ]);

    // Submit the transaction
    const response = await contract.wallet.sendTransaction({
      type: TransactionType.Script,
      gasPrice: overrides?.gasPrice ?? 0,
      gasLimit: overrides?.gasLimit ?? 1000000,
      bytePrice: overrides?.bytePrice ?? 0,
      maturity: overrides?.maturity,
      script: contractCallScript.bytes,
      scriptData: contractCallScript.encodeScriptData([contract.id, data]),
      inputs: [
        {
          type: InputType.Contract,
          contractId: contract.id,
        },
        ...coins.map((coin) => ({
          type: InputType.Coin as const,
          ...coin,
          witnessIndex: 0,
        })),
      ],
      outputs: [
        {
          type: OutputType.Contract,
          inputIndex: 0,
        },
        {
          type: OutputType.Change,
          assetId: NativeAssetId,
          to: contract.wallet.address,
        },
      ],
    });
    const result = await response.wait();
    const encodedResult = contractCallScript.decodeScriptResult(result);
    const returnValue = contract.interface.decodeFunctionResult(func, encodedResult)?.[0];

    return returnValue;
  };

export default class Contract {
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
