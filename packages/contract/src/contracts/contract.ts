import type { BytesLike } from '@ethersproject/bytes';
import type { FunctionFragment, JsonAbi, JsonFlatAbi } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import type { Account } from '@fuel-ts/account';
import { Address } from '@fuel-ts/address';
import type { AbstractAddress, AbstractContract } from '@fuel-ts/interfaces';
import type { Provider } from '@fuel-ts/providers';

import type { InvokeFunctions } from '../types';

import { FunctionInvocationScope } from './functions/invocation-scope';
import { MultiCallInvocationScope } from './functions/multicall-scope';

export default class Contract implements AbstractContract {
  id!: AbstractAddress;
  provider!: Provider | null;
  interface!: Interface;
  account!: Account | null;
  functions: InvokeFunctions = {};

  constructor(
    id: string | AbstractAddress,
    abi: JsonAbi | JsonFlatAbi | Interface,
    accountOrProvider: Account | Provider
  ) {
    this.interface = abi instanceof Interface ? abi : new Interface(abi);
    this.id = Address.fromAddressOrString(id);

    /**
      Instead of using `instanceof` to compare classes, we instead check
      if `accountOrProvider` have a `provider` property inside. If yes,
      than we assume it's a Wallet.

      This approach is safer than using `instanceof` because it
      there might be different versions and bundles of the library.

      The same is done at:
        - ./contract-factory.ts

      @see ContractFactory
    */
    if (accountOrProvider && 'provider' in accountOrProvider) {
      this.provider = accountOrProvider.provider;
      this.account = accountOrProvider;
    } else {
      this.provider = accountOrProvider;
      this.account = null;
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

  /**
   * Get the balance for a given assset ID for this contract
   */
  getBalance(assetId: BytesLike) {
    if (!this.provider) {
      throw new Error('Contract instance has no provider.');
    }

    return this.provider.getContractBalance(this.id, assetId);
  }
}
