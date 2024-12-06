import { FuelError } from '@fuel-ts/errors';

import type { Abi, AbiSpecification } from '../parser';
import { AbiParser } from '../parser';

import type {
  AbiCoderConfigurable,
  AbiCoderFunction,
  AbiCoderLog,
  AbiCoderType,
} from './abi-coder-types';
import { AbiEncoding } from './encoding';
import { makeConfigurable } from './utils/createConfigurable';
import { makeFunction } from './utils/createFunction';
import { makeLog } from './utils/createLog';
import { makeType } from './utils/createType';

export class AbiCoder {
  // Internal properties
  public readonly abi: Abi;
  public readonly specification: AbiSpecification;
  private encoding: AbiEncoding;

  // Exposed properties
  public readonly functions: Record<string, AbiCoderFunction>;
  public readonly configurables: Record<string, AbiCoderConfigurable>;
  public readonly logs: Record<string, AbiCoderLog>;

  /**
   * Create an instance of `AbiCoder` from an ABI specification
   *
   * @param specification - The ABI specification
   */
  public constructor(specification: AbiSpecification) {
    this.abi = AbiParser.parse(specification);
    this.specification = specification;
    this.encoding = AbiEncoding.from(this.abi.encodingVersion);

    const { functions, configurables, loggedTypes } = this.abi;
    this.functions = Object.fromEntries(
      functions.map((fn) => [fn.name, makeFunction(fn, this.encoding)])
    );
    this.configurables = Object.fromEntries(
      configurables.map((conf) => [conf.name, makeConfigurable(conf, this.encoding)])
    );
    this.logs = Object.fromEntries(
      loggedTypes.map((log) => [log.logId, makeLog(log, this.encoding)])
    );
  }

  /**
   * Create an instance of `AbiCoder` from an ABI specification
   *
   * @param abi - The ABI specification
   * @returns The `AbiCoder` instance
   */
  static fromAbi(abi: AbiSpecification): AbiCoder {
    return new AbiCoder(abi);
  }

  /**
   * Get a function by its name, signature or selector
   *
   * @param nameOrSignatureOrSelector - The function name, signature or selector
   * @returns The function
   */
  public getFunction(nameOrSignatureOrSelector: string): AbiCoderFunction {
    const fn = Object.values<AbiCoderFunction>(this.functions).find(
      (f) =>
        f.name === nameOrSignatureOrSelector ||
        f.signature === nameOrSignatureOrSelector ||
        f.selector === nameOrSignatureOrSelector
    );

    if (fn === undefined) {
      throw new FuelError(
        FuelError.CODES.FUNCTION_NOT_FOUND,
        `Unable to find function with the name or signature or selector of "${nameOrSignatureOrSelector}".`
      );
    }

    return fn;
  }

  /**
   * Get a configurable by its name
   *
   * @param name - The configurable name
   * @returns The configurable
   */
  public getConfigurable(name: string): AbiCoderConfigurable {
    const configurable = this.configurables[name];
    if (configurable === undefined) {
      throw new FuelError(
        FuelError.CODES.CONFIGURABLE_NOT_FOUND,
        `Configurable with name '${name}' doesn't exist in the ABI.`
      );
    }

    return configurable;
  }

  /**
   * Get a log by its log ID
   *
   * @param logId - The log ID
   * @returns The log
   */
  public getLog(logId: string): AbiCoderLog {
    const log = this.logs[logId];
    if (log === undefined) {
      throw new FuelError(
        FuelError.CODES.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${logId}' doesn't exist in the ABI.`
      );
    }

    return log;
  }

  /**
   * Get a type by its concrete type ID
   *
   * @param concreteTypeId - The concrete type ID
   * @returns The type
   */
  public getType(concreteTypeId: string): AbiCoderType {
    const type = this.abi.types.find((t) => t.concreteTypeId === concreteTypeId);
    if (type === undefined) {
      throw new FuelError(
        FuelError.CODES.TYPE_NOT_FOUND,
        `Type with concreteTypeId '${concreteTypeId}' doesn't exist in the ABI.`
      );
    }

    return makeType(type, this.encoding);
  }
}
