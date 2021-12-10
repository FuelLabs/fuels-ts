/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BigNumberish } from '@ethersproject/bignumber';
import { Logger } from '@ethersproject/logger';
import type { JsonFragment, FunctionFragment } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { Provider } from '@fuel-ts/providers';

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
    const response = await contract.provider.submitContractCall(contract.id, data);
    const result = await response.wait();
    const returnValue = contract.interface.decodeFunctionResult(func, result.data)[0];

    return returnValue;
  };

export default class Contract {
  interface!: Interface;
  id!: string;
  provider!: Provider | null;
  // Keyable functions
  functions!: { [key: string]: any };

  constructor(
    id: string,
    abi: ReadonlyArray<JsonFragment>,
    signerOrProvider: Provider | null = null
  ) {
    this.interface = new Interface(abi);
    this.functions = this.interface.functions;
    this.id = id;

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
