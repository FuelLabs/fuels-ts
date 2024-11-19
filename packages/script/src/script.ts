/* eslint-disable @typescript-eslint/no-explicit-any */
import { Interface } from '@fuel-ts/abi-coder';
import type { InputValue, JsonAbi } from '@fuel-ts/abi-coder';
import { deployScriptOrPredicate, type Account, type Provider } from '@fuel-ts/account';
import { FuelError } from '@fuel-ts/errors';
import { AbstractScript } from '@fuel-ts/interfaces';
import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import type { ScriptRequest } from '@fuel-ts/program';
import { arrayify } from '@fuel-ts/utils';

import { ScriptInvocationScope } from './script-invocation-scope';

/**
 * Represents the result of a script execution.
 */
type Result<T> = {
  value: T | BN | undefined;
  logs: unknown[];
};

/**
 * Represents a function that can be invoked within a script.
 */
type InvokeMain<TArgs extends Array<any> = Array<any>, TReturn = any> = (
  ...args: TArgs
) => ScriptInvocationScope<TArgs, TReturn>;

/**
 * `Script` provides a typed interface for interacting with the script program type.
 */
export class Script<TInput extends Array<any>, TOutput> extends AbstractScript {
  /**
   * The compiled bytecode of the script.
   */
  bytes: Uint8Array;

  /**
   * The ABI interface for the script.
   */
  interface: Interface;

  /**
   * The account associated with the script.
   */
  account: Account;

  /**
   * The script request object.
   */
  script!: ScriptRequest<InputValue<void>[], Result<TOutput>>;

  /**
   * The provider used for interacting with the network.
   */
  provider: Provider;

  /**
   * Functions that can be invoked within the script.
   */
  functions: { main: InvokeMain<TInput, TOutput> };

  /**
   * Create a new instance of the Script class.
   *
   * @param bytecode - The compiled bytecode of the script.
   * @param abi - The ABI interface for the script.
   * @param account - The account associated with the script.
   */
  constructor(bytecode: BytesLike, abi: JsonAbi, account: Account) {
    super();
    this.bytes = arrayify(bytecode);
    this.interface = new Interface(abi);

    this.provider = account.provider;
    this.account = account;

    this.functions = {
      main: (...args: TInput) =>
        new ScriptInvocationScope(this, this.interface.getFunction('main'), args),
    };
  }

  /**
   * Set the configurable constants of the script.
   *
   * @param configurables - An object containing the configurable constants and their values.
   * @throws Will throw an error if the script has no configurable constants to be set or if an invalid constant is provided.
   * @returns This instance of the `Script`.
   */
  setConfigurableConstants(configurables: { [name: string]: unknown }) {
    try {
      if (!Object.keys(this.interface.configurables).length) {
        throw new FuelError(
          FuelError.CODES.INVALID_CONFIGURABLE_CONSTANTS,
          `The script does not have configurable constants to be set`
        );
      }

      Object.entries(configurables).forEach(([key, value]) => {
        if (!this.interface.configurables[key]) {
          throw new FuelError(
            FuelError.CODES.CONFIGURABLE_NOT_FOUND,
            `The script does not have a configurable constant named: '${key}'`
          );
        }

        const { offset } = this.interface.configurables[key];

        const encoded = this.interface.encodeConfigurable(key, value as InputValue);

        this.bytes.set(encoded, offset);
      });
    } catch (err) {
      throw new FuelError(
        FuelError.CODES.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${(<Error>err).message}.`
      );
    }

    return this;
  }

  /**
   *
   * @param account - The account used to pay the deployment costs.
   * @returns The _blobId_ and a _waitForResult_ callback that returns the deployed predicate
   * once the blob deployment transaction finishes.
   *
   * The returned loader script will have the same configurable constants
   * as the original script which was used to generate the loader script.
   */
  deploy<T = this>(account: Account) {
    return deployScriptOrPredicate<T>({
      deployer: account,
      abi: this.interface.jsonAbi,
      bytecode: this.bytes,
      loaderInstanceCallback: (loaderBytecode, newAbi) =>
        new Script(loaderBytecode, newAbi, this.account) as T,
    });
  }
}
