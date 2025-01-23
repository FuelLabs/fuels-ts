import { FuelError } from '@fuel-ts/errors';

import type { Abi, AbiSpecification } from '../parser';
import { AbiParser } from '../parser';

import type {
  AbiCoderConfigurable,
  AbiCoderFunction,
  AbiCoderLog,
  AbiCoderType,
} from './abi-coder-types';
import type { AbiEncoding } from './encoding';
import { encoding } from './encoding';
import { createConfigurable } from './utils/createConfigurable';
import { createFunction } from './utils/createFunction';
import { createLog } from './utils/createLog';
import { createType } from './utils/createType';

export class AbiCoder {
  public readonly abi: Abi;
  public readonly specification: AbiSpecification;

  private readonly encoding: AbiEncoding;
  private readonly functionLookup: Map<string, AbiCoderFunction>;
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
    this.encoding = encoding.fromVersion(this.abi.encodingVersion);

    const { functions, configurables, loggedTypes } = this.abi;
    this.functionLookup = new Map();
    this.functions = Object.fromEntries(
      functions.map((fn) => {
        const func = createFunction(fn, this.encoding);
        this.functionLookup.set(fn.name, func);
        this.functionLookup.set(func.signature, func);
        this.functionLookup.set(func.selector, func);
        return [fn.name, func];
      })
    );
    this.configurables = Object.fromEntries(
      configurables.map((conf) => [conf.name, createConfigurable(conf, this.encoding)])
    );
    this.logs = Object.fromEntries(
      loggedTypes.map((log) => [log.logId, createLog(log, this.encoding)])
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
   *
   * @throws FuelError - when the function is not found
   */
  public getFunction(nameOrSignatureOrSelector: string): AbiCoderFunction {
    const fn = this.functionLookup.get(nameOrSignatureOrSelector);

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
   *
   * @throws FuelError - when the configurable is not found
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
   *
   * @throws FuelError - when the log is not found
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
   *
   * @throws FuelError - when the type is not found
   */
  public getType(concreteTypeId: string): AbiCoderType {
    const type = this.abi.concreteTypes.find((t) => t.concreteTypeId === concreteTypeId);
    if (type === undefined) {
      throw new FuelError(
        FuelError.CODES.TYPE_NOT_FOUND,
        `Type with concreteTypeId '${concreteTypeId}' doesn't exist in the ABI.`
      );
    }

    return createType(type, this.encoding);
  }
}
