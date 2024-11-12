import { FuelError } from '@fuel-ts/errors';

import type { AbiFunction } from '../../parser';
import type { AbiCoderFunction } from '../abi-coder-types';
import type { AbiEncoding } from '../encoding/encoding';
import { createFunctionSelector } from '../utils/createFunctionSelector';
import { createFunctionSignature } from '../utils/createFunctionSignature';

export class FunctionRepository {
  /**
   * Function factory
   *
   * @param fn - The JSON ABI function
   * @param encoding - The encoding schema
   * @returns The function for coding related operations
   */
  private static make = (fn: AbiFunction, encoding: AbiEncoding): AbiCoderFunction => {
    const signature = createFunctionSignature(fn);
    return {
      // Function fields
      name: fn.name,
      signature,
      selector: createFunctionSelector(signature),
      selectorBytes: encoding.coders.stdString.encode(fn.name),
      attributes: fn.attributes ?? [],

      // Coders
      arguments: encoding.coders.tuple({
        coders: fn.inputs.map((input) => encoding.getCoder(input)),
      }),
      output: encoding.getCoder({ type: fn.output }),
    };
  };

  /**
   * Internal member fields
   */
  private _functions: Record<string, AbiCoderFunction> = {};

  /**
   * @param functions - The JSON ABI functions
   * @param encoding - The encoding schema
   */
  public constructor(functions: AbiFunction[], encoding: AbiEncoding) {
    this._functions = Object.fromEntries(
      functions.map((fn) => [fn.name, FunctionRepository.make(fn, encoding)])
    );
  }

  /**
   * Get all the functions
   */
  public get functions(): Record<string, AbiCoderFunction> {
    return this._functions;
  }

  /**
   * @param name - The name of the function
   * @returns The function
   *
   * @throws If the function is not found
   */
  public findByName(name: string): AbiCoderFunction {
    const fn = this._functions[name];

    if (fn === undefined) {
      throw new FuelError(
        FuelError.CODES.FUNCTION_NOT_FOUND,
        `The function with the name "${name}" could not be found.`
      );
    }

    return fn;
  }

  /**
   * @param signature - The signature of the function
   * @returns The function
   *
   * @throws If the function is not found
   */
  public findBySignature(signature: string): AbiCoderFunction {
    const fn = Object.values(this._functions).find((f) => f.signature === signature);

    if (fn === undefined) {
      throw new FuelError(
        FuelError.CODES.FUNCTION_NOT_FOUND,
        `The function with the signature "${signature}" could not be found.`
      );
    }

    return fn;
  }

  /**
   * @param selector - The selector of the function
   * @returns The function
   *
   * @throws If the function is not found
   */
  public findBySelector(selector: string): AbiCoderFunction {
    const fn = Object.values(this._functions).find((f) => f.selector === selector);

    if (fn === undefined) {
      throw new FuelError(
        FuelError.CODES.FUNCTION_NOT_FOUND,
        `The function with the selector "${selector}" could not be found.`
      );
    }

    return fn;
  }
}
