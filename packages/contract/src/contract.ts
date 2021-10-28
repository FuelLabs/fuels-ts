/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from '@ethersproject/bignumber';
import { Logger } from '@ethersproject/logger';
import type { JsonFragment, FunctionFragment } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import type { TransactionRequest, TransactionResponse } from '@fuel-ts/providers';
import { Provider } from '@fuel-ts/providers';
import { TransactionType } from '@fuel-ts/transactions';

type ContractFunction<T = any> = (...args: Array<any>) => Promise<T>;

const logger = new Logger('0.0.1');

const buildCall = (contract: Contract, func: FunctionFragment): ContractFunction =>
  async function call(...args: Array<any>): Promise<TransactionResponse> {
    if (contract.provider === null || contract.provider === undefined) {
      logger.throwArgumentError('Cannot call without provider', 'provider', contract.provider);
      return { receipts: [], outputs: [] };
    }
    let overrides = {};
    if (args.length === func.inputs.length + 1 && typeof args[args.length - 1] === 'object') {
      overrides = args.pop();
    }
    const scriptData = contract.interface.encodeFunctionData(func, args);

    const script = Uint8Array.from([]);
    const inputs = [] as any[];
    const transaction: TransactionRequest = {
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      maturity: BigNumber.from(0),
      script,
      scriptData,
      inputs,
    };
    return contract.provider.call(transaction);
  };

export default class Contract {
  interface!: Interface;
  address!: string;
  provider!: Provider | null;
  // Keyable functions
  functions!: { [key: string]: any };

  constructor(
    address: string,
    abi: ReadonlyArray<JsonFragment>,
    signerOrProvider: Provider | null = null
  ) {
    this.interface = new Interface(abi);
    this.functions = this.interface.functions;
    this.address = address;

    if (signerOrProvider === null) {
      this.provider = null;
    } else if (signerOrProvider instanceof Provider) {
      this.provider = signerOrProvider;
    }

    //  TODO: Update this so the generated methods call the contract
    Object.keys(this.functions).forEach((name) => {
      const fragment = this.interface.getFunction(name);
      Object.defineProperty(this.functions, fragment.name, {
        value: buildCall(this, fragment),
        writable: false,
      });
    });
  }
}
