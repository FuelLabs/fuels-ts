import type { FunctionFragment, JsonAbi } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import type { Account, Provider } from '@fuel-ts/account';
import type { AddressInput } from '@fuel-ts/address';
import { Address } from '@fuel-ts/address';
import type { BytesLike } from '@fuel-ts/utils';

import { FunctionInvocationScope } from './functions/invocation-scope';
import { MultiCallInvocationScope } from './functions/multicall-scope';
import type { AbstractContract, InvokeFunction, InvokeFunctions } from './types';

/**
 * `Contract` provides a way to interact with the contract program type.
 */
export default class Contract implements AbstractContract {
  /**
   * The unique contract identifier.
   */
  id!: Address;

  /**
   * The provider for interacting with the contract.
   */
  provider!: Provider;

  /**
   * The contract's ABI interface.
   */
  interface!: Interface;

  /**
   * The account associated with the contract, if available.
   */
  account!: Account | null;

  /**
   * A collection of functions available on the contract.
   */
  functions: InvokeFunctions = {};

  /**
   * Creates an instance of the Contract class.
   *
   * @param id - The contract's address.
   * @param abi - The contract's ABI (JSON ABI or Interface instance).
   * @param accountOrProvider - The account or provider for interaction.
   */
  constructor(id: AddressInput, abi: JsonAbi | Interface, accountOrProvider: Account | Provider) {
    this.interface = abi instanceof Interface ? abi : new Interface(abi);
    this.id = new Address(id);

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

  /**
   * Build a function invocation scope for the provided function fragment.
   *
   * @param func - The function fragment to build a scope for.
   * @returns A function that creates a FunctionInvocationScope.
   */
  buildFunction(func: FunctionFragment) {
    return (() => {
      const funcInvocationScopeCreator = (...args: Array<unknown>) =>
        new FunctionInvocationScope(this, func, args);

      Object.defineProperty(funcInvocationScopeCreator, 'isReadOnly', {
        value: () => func.isReadOnly(),
        writable: false,
      });

      return funcInvocationScopeCreator;
    })() as InvokeFunction;
  }

  /**
   * Create a multi-call invocation scope for the provided function invocation scopes.
   *
   * @param calls - An array of FunctionInvocationScopes to execute in a batch.
   * @returns A MultiCallInvocationScope instance.
   */
  multiCall(calls: Array<FunctionInvocationScope>) {
    return new MultiCallInvocationScope(this, calls);
  }

  /**
   * Get the balance for a given asset ID for this contract.
   *
   * @param assetId - The specified asset ID.
   * @returns The balance of the contract for the specified asset.
   */
  getBalance(assetId: BytesLike) {
    return this.provider.getContractBalance(this.id, assetId);
  }
}
