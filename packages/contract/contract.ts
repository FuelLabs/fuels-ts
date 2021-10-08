/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonFragment } from '../abi-coder/fragments/fragment';
import Interface from '../abi-coder/interface';

export default class Contract {
  interface: Interface;
  // Keyable functions
  functions: { [key: string]: any };

  constructor(abi: ReadonlyArray<JsonFragment>) {
    this.interface = new Interface(abi);
    this.functions = this.interface.functions;

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
