/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FunctionFragment, JsonAbi } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { AbstractContract } from '@fuel-ts/interfaces';
import { Provider } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';

import { FunctionInvocationScope } from './function-invocation-scope';
import { MultiCallInvocationScope } from './function-multicall-scope';

interface Methods {
  [key: string]: <TArgs extends Array<any> = Array<any>, TReturn = any>(
    ...args: TArgs
  ) => FunctionInvocationScope<TArgs, TReturn>;
}

export default class Contract extends AbstractContract {
  id!: string;
  provider!: Provider | null;
  interface!: Interface;
  wallet!: Wallet | null;
  functions: Methods = {};

  constructor(
    id: string,
    abi: JsonAbi | Interface,
    walletOrProvider: Wallet | Provider | null = null
  ) {
    super();
    this.interface = abi instanceof Interface ? abi : new Interface(abi);
    this.id = id;

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
