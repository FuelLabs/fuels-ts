/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@ethersproject/logger';
import type { JsonFragment } from '@fuels-ts/abi-coder';
import { Interface } from '@fuels-ts/abi-coder';
import { Provider } from '@fuels-ts/providers';

const logger = new Logger('0.0.1');

export default class Contract {
  interface: Interface;
  provider: Provider | null | undefined;
  // Keyable functions
  functions: { [key: string]: any };

  constructor(abi: ReadonlyArray<JsonFragment>, signerOrProvider: Provider | null = null) {
    this.interface = new Interface(abi);
    this.functions = this.interface.functions;

    if (signerOrProvider === null) {
      this.provider = null;
    } else if (signerOrProvider === undefined) {
      logger.throwArgumentError('invalid signer or provider', 'signerOrProvider', signerOrProvider);
    } else if (signerOrProvider instanceof Provider) {
      this.provider = signerOrProvider;
    }

    //  TODO: Update this so the generated methods call the contract
    Object.keys(this.functions).forEach((name) => {
      const fragment = this.interface.getFunction(name);
      Object.defineProperty(this.functions, fragment.name, {
        value: (...args: any[]) => this.interface.encodeFunctionData(fragment, args),
        writable: false,
      });
    });
  }
}
