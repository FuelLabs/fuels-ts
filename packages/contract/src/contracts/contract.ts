import type { FunctionFragment, JsonAbi } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import { AbstractAddress } from '@fuel-ts/interfaces';
import type { AbstractContract } from '@fuel-ts/interfaces';
import type { Provider } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';

import type { InvokeFunctions } from '../types';

import { FunctionInvocationScope } from './functions/invocation-scope';
import { MultiCallInvocationScope } from './functions/multicall-scope';

export default class Contract implements AbstractContract {
  id!: AbstractAddress;
  provider!: Provider | null;
  interface!: Interface;
  wallet!: Wallet | null;
  functions: InvokeFunctions = {};

  constructor(
    id: string | AbstractAddress,
    abi: JsonAbi | Interface,
    walletOrProvider: Wallet | Provider | null = null
  ) {
    this.interface = abi instanceof Interface ? abi : new Interface(abi);
    if (typeof id === 'string') {
      this.id = Address.fromString(id);
    } else {
      this.id = id;
    }

    if (walletOrProvider instanceof Wallet) {
      this.provider = walletOrProvider.provider;
      this.wallet = walletOrProvider;
    } else {
      this.provider = walletOrProvider;
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

  multiCall(calls: Array<FunctionInvocationScope>) {
    return new MultiCallInvocationScope(this, calls);
  }
}
