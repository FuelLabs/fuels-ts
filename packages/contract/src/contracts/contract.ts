import type { FunctionFragment, JsonAbi, JsonFlatAbi } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import type { AbstractAddress, AbstractContract } from '@fuel-ts/interfaces';
import type { Provider } from '@fuel-ts/providers';
import type { BaseWalletLocked } from '@fuel-ts/wallet';

import type { InvokeFunctions } from '../types';

import { FunctionInvocationScope } from './functions/invocation-scope';
import { MultiCallInvocationScope } from './functions/multicall-scope';

export default class Contract implements AbstractContract {
  id!: AbstractAddress;
  provider!: Provider | null;
  interface!: Interface;
  wallet!: BaseWalletLocked | null;
  functions: InvokeFunctions = {};

  constructor(
    id: string | AbstractAddress,
    abi: JsonAbi | JsonFlatAbi | Interface,
    walletOrProvider: BaseWalletLocked | Provider | null = null
  ) {
    this.interface = abi instanceof Interface ? abi : new Interface(abi);
    this.id = Address.fromAddressOrString(id);

    // Check if walletOrProvider is a wallet
    // by checking if it has a provider property that
    // indicates it's a wallet this approach is safer than checking
    // for instanceof of BaseWalletLocked as class references may
    // differen between different versions and bundles of the library
    if (walletOrProvider && 'provider' in walletOrProvider) {
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
